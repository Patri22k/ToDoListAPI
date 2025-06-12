import React from "react";

interface LayoutProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
}

interface TodoModalLayoutProps extends LayoutProps {
  Inner?: React.FC<LayoutProps>;
}

const TodoModalLayout: React.FC<TodoModalLayoutProps> = (props: LayoutProps) => {
  return (
    <div
      className="fixed inset-0 m-10 sm:mx-20 lg:mx-30 flex items-center justify-center z-50 rounded-2xl shadow-xl border bg-white"
      {...props}
    >
      {props.children}
    </div>
  );
};

TodoModalLayout.Inner = (props: LayoutProps) => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-y-5 md:gap-y-8"
    {...props}
    >
      {props.children}
    </div>
  );
};

export default TodoModalLayout;