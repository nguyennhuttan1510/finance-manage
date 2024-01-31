import React from 'react';
import Icon, {IconPropsType} from "@/components/common/Icon";
import {IoCafeOutline} from "react-icons/io5";
import icon from "@/components/common/Icon";

type IconType = {id: number, renderIcon: JSX.Element} & Pick<IconPropsType, 'sizeIcon' | 'className' | 'onClick' | 'touch'>

export interface IconCategoryPropsType {
  onClickIcon?: () => void
  icons: IconType[]
  className?: string
}

const IconCategory = (props: IconCategoryPropsType) => {
  const {onClickIcon, icons, className} = props
  return (
    <div className='max-w-xl flex flex-wrap gap-4'>
      {Array.isArray(icons) && icons.map(item => (
        <Icon key={item.id} onClick={onClickIcon} sizeIcon='large' touch={true} className={`p-2 bg-amber-400 ${className}`}><IoCafeOutline/></Icon>
      ))}
    </div>
  );
};

export default IconCategory;