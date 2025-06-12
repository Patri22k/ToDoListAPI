import React from "react";

interface CustomInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: React.ReactNode;
}

const CustomInput = (props: CustomInputProps) => {
  return (
    <input
      className="p-2 border rounded "
      {...props}
    >
      {props.children}
    </input>
  );
};

export default CustomInput;