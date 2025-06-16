import React from "react";

export interface CustomInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

const CustomInput = (props: CustomInputProps) => {
  return (
    <input
      className="p-2 border rounded w-full"
      {...props}
    />
  );
};

export default CustomInput;