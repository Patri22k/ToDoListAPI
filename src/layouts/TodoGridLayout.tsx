import * as React from "react";

interface TodoLayoutProps {
  children?: React.ReactNode;
}

const TodoGridLayout = (props: TodoLayoutProps) => {
  return (
    <div className="TodoLayout w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
      {props.children}
    </div>
  );
};

export default TodoGridLayout;