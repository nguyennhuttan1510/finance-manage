'use client';
import React, { useEffect, useState } from 'react';
import Overlay from '@/components/overlay/Overlay';
export type MenuTye = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
};

export interface ContextMenuPropsType {
  menu: MenuTye[];
  open: boolean;
  onClose: () => void;
}

type PositionState = {
  x: number;
  y: number;
};

const ContextMenu = (props: ContextMenuPropsType) => {
  const { menu, open, onClose } = props;
  const [position, setPosition] = useState<PositionState>({
    x: 0,
    y: 0,
  });

  const handleClickContextMenuItem = (item: MenuTye) => {
    item.onClick();
    onClose();
  };

  useEffect(() => {
    window.addEventListener('dblclick', (event) => {
      const localX = event.clientX;
      const localY = event.clientY;
      setPosition({
        x: localX,
        y: localY,
      });
    });
    return () => {
      window.removeEventListener('dblclick', () => {});
    };
  }, []);
  return (
    <div className="relative top-0 left-0 right-0 bottom-0 z-30 noselect">
      <Overlay open={open} onClose={onClose} />
      <div
        className="box-shadow w-fit p-2 rounded bg-white fixed z-50"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <div className="min-w-32 flex flex-col gap-y-2">
          {menu &&
            Array.isArray(menu) &&
            menu.map((item, index) => (
              <div
                key={index}
                className="flex gap-x-4 items-baseline"
                onClick={() => {
                  handleClickContextMenuItem(item);
                }}
              >
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
