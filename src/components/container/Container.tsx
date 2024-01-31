import React from 'react';

type ContainerType = {
  withBackground?: boolean
  main?: boolean
  children: React.ReactNode
} & JSX.IntrinsicElements['div']

const Container = (props: ContainerType) => {
  const {children, main = false, withBackground = false, className = '', ...restProp} = props
  const styleBackground = withBackground ? {background: 'linear-gradient(to right, #30475E, #222831)'} : {}
  return (
    <div className={`min-h-screen w-full ${main ? 'container-content' : ''} ${className}`} style={{...styleBackground}} {...restProp}>
      {children}
    </div>
  );
};

export default Container;