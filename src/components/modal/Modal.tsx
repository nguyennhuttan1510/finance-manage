import React from 'react';
import Overlay from '@/components/overlay/Overlay';
interface ModalPropsType {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalPropsType) => {
  const { children, open = false, onClose } = props;
  return (
    <div className="relative top-0 left-0 right-0 bottom-0 z-30">
      <Overlay open={open} onClose={onClose} />
      <div
        className={`modal p-4 bg-white fixed min-w-96 rounded-lg box-shadow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          open ? 'visible' : 'hidden'
        } z-50`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
