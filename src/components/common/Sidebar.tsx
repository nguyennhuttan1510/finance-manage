import React from 'react';
import Overlay from '@/components/overlay/Overlay';

interface SidebarPropsType {
  open: boolean;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
}

const Sidebar = (props: SidebarPropsType) => {
  const { open, className = '', onClose, children } = props;
  return (
    <>
      <Overlay open={open} onClose={onClose} />
      <div
        className={`box-shadow min-w-[300px] h-screen p-8 fixed z-20 top-0 right-0 rounded-bl-xl rounded-tl-xl bg-white ${
          open ? 'translate-x-0' : 'translate-x-full'
        } ${className}`}
        style={{ transition: '.4s all ease' }}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
