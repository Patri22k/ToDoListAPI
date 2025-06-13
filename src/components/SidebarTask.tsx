import React from "react";

interface SidebarTaskProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode;
}

const SidebarTask = (props: SidebarTaskProps) => {
  return (
    <button type="button" className="w-[80%] mx-auto flex items-center justify-center text-center py-2 bg-emerald-300 rounded-lg sm:text-xl hover:bg-emerald-600 hover:text-white hover:duration-500 hover:transition-colors" {...props}>
      {props.children}
    </button>
  );
};

export default SidebarTask;