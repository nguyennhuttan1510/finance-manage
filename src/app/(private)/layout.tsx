'use client';
import React, { useEffect } from 'react';
import Container from '@/components/container/Container';

import {
  FaHouse,
  FaRightFromBracket,
  FaListUl,
  FaCubes,
  FaChartColumn,
  FaLandmark,
  FaChartLine,
} from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WalletSidebarProvider from '@/contexts/WalletSidebarProvider';
import WrapperWalletForPage from '@/components/common/Wallet/WrapperWalletForPage';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === 'loading') return <div></div>;
  if (status === 'unauthenticated') {
    router.push('/login');
    return;
  }

  return (
    <Container className="flex">
      <div className="container-sidebar sidebar flex text-[14px] flex-col h-screen py-8 fixed left-0 top-0 bg-[#222831]">
        <div className="account px-6 mb-8 flex items-center gap-x-2 cursor-pointer">
          {/*<div className='w-10 h-10 rounded-full bg-black'></div>*/}
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={data?.user?.image || ''}
            alt="avatar"
          />
          <div className="username text-white">{data?.user?.name}</div>
        </div>
        <div className="menu flex flex-col ">
          <Link href="/dashboard">
            <div className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]">
              <FaHouse /> Dashboard
            </div>
          </Link>
          <Link href="/transaction">
            <div className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]">
              <FaChartLine />
              Transaction
            </div>
          </Link>
          <Link href="/budget">
            <div className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]">
              <FaLandmark />
              Budget
            </div>
          </Link>
          <Link href="/report">
            <div className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]">
              <FaChartColumn />
              Report
            </div>
          </Link>
          <Link href="/configuration/category">
            <div className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]">
              <FaListUl />
              Setting
            </div>
          </Link>
        </div>
        <div className="mt-auto">
          <div
            className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]"
            onClick={() => {
              signOut();
            }}
          >
            <FaRightFromBracket />
            Logout
          </div>
        </div>
      </div>
      <WalletSidebarProvider>
        <div className="container-main flex-1">{children}</div>
        <WrapperWalletForPage />
      </WalletSidebarProvider>
    </Container>
  );
};

export default Layout;
