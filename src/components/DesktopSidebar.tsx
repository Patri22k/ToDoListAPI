import React from 'react';

interface SidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
}

const DesktopSidebar = (props: SidebarProps) => {
  return (
    <div className="Sidebar hidden sm:flex sm:flex-col sm:justify-between sm:gap-y-4 sm:w-1/3 lg:w-1/4 bg-black/85 py-3 md:py-6" {...props}>
      {props.children}
    </div>
  );
};

export default DesktopSidebar;