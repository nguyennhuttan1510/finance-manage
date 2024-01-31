import React from 'react';
import './styles.scss'
import {TextareaPropsType} from "@/components/textarea/textarea.type";

const Textarea = (props: TextareaPropsType) => {
  const { rows = 2, className } = props
  return (
    <textarea className={`textarea p-2 border rounded-md ${className}`} rows={rows} {...props}/>
  );
};

export default Textarea;