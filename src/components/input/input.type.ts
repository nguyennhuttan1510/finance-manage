import React from 'react';
import { StatusInput } from '@/components/common/StatusInput';

export interface StyleComponent {
  root: React.CSSProperties;
}

export type InputBasePropsType = {
  prefix?: React.ReactNode;
  className?: string;
  sizeInput?: 'small' | 'medium' | 'large';
  stylesComponent?: StyleComponent;
  helpText?: string | JSX.Element;
  statusInput?: StatusInput;
} & JSX.IntrinsicElements['input'];
