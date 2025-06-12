import React from "react";

interface SubmitButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode;
}

const CustomButton = (props: SubmitButtonProps) => {
  return (
    <button
      className="text-sm sm:text-base lg:text-xl px-6 py-2 bg-gray-300 rounded-lg hover:text-amber-50 hover:bg-gray-700 hover:transition hover:duration-500"
      {...props}
    >
      {props.children ?? "Submit"}
    </button>
  );
};

export default CustomButton;