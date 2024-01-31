'use client';
import React from 'react';
import Container from '@/components/container/Container';

import {
  FaHouse,
  FaRightFromBracket,
  FaListUl,
  FaChevronLeft,
  FaCubes,
} from 'react-icons/fa6';
import Icon from '@/components/common/Icon';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Container className="flex">
      <div className="container-sidebar sidebar flex text-[14px] flex-col h-screen py-8 fixed left-0 top-0 bg-[#222831]">
        <div
          className="px-6 mb-8 flex gap-x-4 items-center cursor-pointer"
          onClick={router.back}
        >
          <Icon sizeIcon="small" className="!text-white">
            <FaChevronLeft />
          </Icon>
          <div className="text-md text-white">Dashboard</div>
        </div>
        <div className="px-6 mb-8 flex items-center gap-x-2 cursor-pointer">
          <div className="text-2xl text-white font-bold">Setting</div>
        </div>
        <div className="menu flex flex-col ">
          {/*<div className='menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]'><FaHouse/> Dashboard</div>*/}
          {/*<div className='menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]'><FaCubes />Service</div>*/}
          {/*<div className='menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]'><FaListUl />Report</div>*/}
          <div className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]">
            <FaListUl />
            Category
          </div>
        </div>
        <div className="mt-auto">
          <div className="menu-item flex items-center gap-x-4 w-full h-12 px-6 text-white cursor-pointer transition hover:bg-[#30475E]">
            <FaRightFromBracket />
            Logout
          </div>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </Container>
  );
};

export default Layout;
