import React from 'react';

interface Props {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const IconWithBackground = ({ children, size = 'lg' }: Props) => {
  return (
    <div className={`mx-auto  bg-primary/10 rounded-full w-fit ${sizeClasses[size]}`}>
      {children}
    </div>
  );
};

const sizeClasses = {
  sm: 'p-1.5',
  md: 'p-2.5',
  lg: 'p-3.5',
};
