import * as React from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

interface TodoLayoutProps extends React.FC<LayoutProps> {
  Header: React.FC<LayoutProps>;
  Main: React.FC<LayoutProps>;
  Footer: React.FC<LayoutProps>;
}

const TodoLayout: TodoLayoutProps = (props: LayoutProps) => {
  return (
    <div className="Todo w-full min-h-screen flex">
      {props.children}
    </div>
  );
};

TodoLayout.Header = (props: LayoutProps) => {
  return (
    <header className="Todo-header flex flex-col mx-auto w-[90%] pb-3 md:pb-5 border-b-2">
      {props.children}
    </header>
  );
};

TodoLayout.Main = (props: LayoutProps) => {
  return (
    <main className="Todo-main flex justify-center items-center text-center mx-auto w-[90%]">
      {props.children}
    </main>
  );
};

TodoLayout.Footer = (props: LayoutProps) => {
  return (
    <footer className="Todo-footer flex flex-col justify-center items-center text-center mx-auto w-[90%]">
      {props.children}
    </footer>
  );
};

export default TodoLayout;