import * as React from "react";

interface TodoLayoutProps {
  children?: React.ReactNode;
}

const TodoGridLayout = (props: TodoLayoutProps) => {
  return (
    <div className="w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center justify-center">
      {props.children}
    </div>
  );
};

export default TodoGridLayout;