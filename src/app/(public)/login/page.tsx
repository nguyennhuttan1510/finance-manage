'use client'
import React, {useEffect, useState} from 'react';
import Input from "@/components/input";
import Button from "@/components/button";
import './styles.css'
import Link from "next/link";
import Container from "@/components/container/Container";
import {useRouter} from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"

// @ts-ignore
const LoginPage = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false)
  const router = useRouter()
  const session = useSession();
  console.log('session-data', session || 'not data')

  const handleLogin = () => {
    signIn('google')
  }

  const isAuthenticated = session.status === 'authenticated'

  useEffect(() => {
    if(isAuthenticated) {
      router.push('/dashboard')
    }
  }, [session, isAuthenticated, router]);

  return (
    <Container className='flex w-full min-h-screen overflow-x-hidden overflow-y-hidden justify-center items-center absolute' withBackground>
      <div className={`card flex w-[60%] min-h-[500px] rounded-xl bg-white overflow-hidden absolute`} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} >
        <div className='flex-1'>
          <div className='flex flex-col justify-center h-full p-16' style={{backgroundImage: 'url(/images/bg-login-finance.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className='text-5xl font-bold text-white'>Hello World</div>
            <div className='text-sm text-white'>It is a long established fact that a reader will be distracted</div>
          </div>
        </div>

        <div className='flex-1'>
          <div className='flex flex-col gap-y-8 p-14'>
            <div className='header flex justify-center'>
              <div className='text-3xl font-medium text-black'>
                SignUp
              </div>
            </div>
            <div className='body flex flex-col gap-y-6'>
              <Input className='border border-black' placeholder='Username' />
              <Input className='border border-black' placeholder='Password' />
              <Input className='border border-black' placeholder='Password' />
              <Button size='large' className='!w-full' >Signup</Button>
            </div>
            <div className='footer cursor-pointer text-black' onClick={() => {setIsSignup(false)}}>
              I have account
            </div>
          </div>
        </div>
      </div>

      <div className={`card flex w-[60%] min-h-[500px] rounded-xl bg-white overflow-hidden relative ${isSignup ? 'effect' : ''}`} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} >
        <div className='flex-1'>
          <div className='flex flex-col justify-center h-full p-16' style={{backgroundImage: 'url(/images/bg-login-finance.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className='text-5xl font-bold text-white'>Hello World</div>
            <div className='text-sm text-white'>It is a long established fact that a reader will be distracted</div>
          </div>
        </div>

        <div className='flex-1'>
          <div className='flex flex-col gap-y-8 p-14'>
            <div className='header flex justify-center'>
              <div className='text-3xl font-medium text-black'>
                SignIn
              </div>
            </div>
            <div className='body flex flex-col gap-y-6'>
              <Input className='border border-black' placeholder='Username' />
              <Input className='border border-black' placeholder='Password' />
              <Button size='large' className='!w-full' onClick={() => {handleLogin()}}>Login</Button>
            </div>
            <div className='flex justify-between footer'>
              <div className='text-sm text-black cursor-pointer' onClick={() => {setIsSignup(true)}}>
                create account
              </div>
              <div className='text-sm text-black cursor-pointer'>
                <Link href='forgot-password'>forgot password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;