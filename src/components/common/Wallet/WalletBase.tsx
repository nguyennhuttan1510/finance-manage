import React from 'react';
import Icon from "@/components/common/Icon";

import { IoFastFoodOutline } from "react-icons/io5";

type WalletBasePropsType = {
  onOpenWallets?: () => void
  children: React.ReactNode
} & JSX.IntrinsicElements['div']

const WalletBase = (props: WalletBasePropsType ) => {
  const { children, className, onOpenWallets, ...rest} = props
  return (
    <div className={`w-full flex flex-col justify-center items-center gap-y-1 ${className}`} {...rest}>
        {children}
    </div>
  );
};

export default WalletBase;