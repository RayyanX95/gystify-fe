import React from 'react';

export const IconWithBackground = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{children}</div>;
};
