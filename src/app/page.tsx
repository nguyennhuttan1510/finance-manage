'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  router.replace('/login');
  return <div></div>;
};

export default Home;
