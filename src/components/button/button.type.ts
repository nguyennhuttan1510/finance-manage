import React from 'react';

export interface StyleComponent {
  root: React.CSSProperties;
}

export type ButtonBasePropsType = {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  className?: string;
  stylesComponent?: StyleComponent;
  size?: 'small' | 'medium' | 'large';
} & JSX.IntrinsicElements['button'];
