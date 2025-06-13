import React from "react";

interface MobileSidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
}

const MobileSidebar = (props: MobileSidebarProps) => {
  return (
    <div className="Mobile-sidebar fixed inset-0 py-5 gap-y-3 mx-auto w-[95%] min-h-1/2 h-fit shadow-3xl shadow-emerald-100 border-x border-b rounded-b-2xl sm:hidden flex flex-col justify-between z-50 bg-emerald-50" {...props}>
      {props.children}
    </div>
  );
};

export default MobileSidebar;