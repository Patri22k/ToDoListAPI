import {Response} from "express";
import {ZodError} from "zod";
import {Prisma} from "@prisma/client";

export enum PrismaErrorCode {
  CONFLICT= "CONFLICT",
  NOT_FOUND = "NOT_FOUND",
}

export const handleError = (
  res: Response, error: any, unknownErrorCallback?: (prismaErrorCode?: PrismaErrorCode) => any) => {
  // Check if the error is an instance of ZodError
  if (error instanceof ZodError && "errors" in error) {
    handleZodError(res, error);
  } else {
    let handled = false;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      handled = handlePrismaError(res, error);
    }

    if (handled) {
      return;
    }

    const prismaErrorCode = determinePrismaErrorCode(error);

    (unknownErrorCallback ?? ((_prismaErrorCode) => {
      res.status(500).json({message: "An unexpected error occurred"});
    }))(prismaErrorCode);
  }
}

const handleZodError = (res: Response, error: ZodError) => {
  return res.status(400).json({
    message: "Validation failed",
    errors: error.errors,
  });
}

const handlePrismaError = (res: Response, error: Prisma.PrismaClientKnownRequestError) => {
  // Handle things that aren't passed to determinePrismaErrorCode
  switch (error.code) {
    case "P1001": // Cannot connect to a database
    case "P1002": // Timeout
    case "P1010": // Authentication failed
      res.status(500).json({ message: "Database connection error" });
      return true;

    default:
      return false;
  }
}

const determinePrismaErrorCode = (error: Prisma.PrismaClientKnownRequestError) => {
  switch (error.code) {
    case "P2002": // Unique constraint failed
      return PrismaErrorCode.CONFLICT;
    case "P2025": // Record not found
      return PrismaErrorCode.NOT_FOUND;
  }

  return undefined;
}