'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children?: React.ReactNode;
  params: any;
};
const NextAuthProvider = (props: Props) => {
  const { children, params } = props;
  return (
    <SessionProvider session={params?.session}>{children}</SessionProvider>
  );
};

export default NextAuthProvider;
