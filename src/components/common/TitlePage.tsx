import React from 'react';

type TittlePagePropsType = {
  children: React.ReactNode
} & JSX.IntrinsicElements['div']

const TitlePage = (props: TittlePagePropsType) => {
  const {children, className} = props
  return (
    <div className={`-mt-4 -mx-4 mb-4 h-16 flex justify-center items-center text-xl text-white font-bold bg-primary ${className}`} style={{width: 'calc(100% + 2rem)'}}>
      {children}
    </div>
  );
};

export default TitlePage;