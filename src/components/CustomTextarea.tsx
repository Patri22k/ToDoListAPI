import React from "react";

interface CustomTextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  children?: React.ReactNode;
}

const CustomTextarea = (props: CustomTextareaProps) => {
  return (
    <textarea
      className="w-full p-2 border rounded-lg h-30"
      {...props}
    >
      {props.children}
    </textarea>
  );
};

export default CustomTextarea;