import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import React from "react";

interface CustomLinkProps extends RouterLinkProps  {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

const CustomLink = ({ to, className, children, ...rest }: CustomLinkProps) => {
  return (
    <RouterLink
      to={to}
      className={`text-sm sm:text-base lg:text-xl w-full text-center px-6 py-2 bg-gray-300 rounded-lg hover:text-white hover:bg-gray-600 hover:transition-colors hover:duration-500 ${className}`}
      {...rest}
    >
      {children}
    </RouterLink>
  );
};

export default CustomLink;