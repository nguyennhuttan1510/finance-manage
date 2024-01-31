'use client';
import React from 'react';
import './styles.scss';
interface LoadingPropsType {
  isLoading: boolean;
  children?: React.ReactNode;
}
const Loading = (props: LoadingPropsType) => {
  const { isLoading, children } = props;
  if (isLoading)
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="loading-spinner"></div>
      </div>
    );

  return <>{children}</>;
};

export default Loading;
