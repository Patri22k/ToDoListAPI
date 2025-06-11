import React from 'react';

interface SidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="Sidebar" {...props}>
      {props.children}
    </div>
  );
};

export default Sidebar;