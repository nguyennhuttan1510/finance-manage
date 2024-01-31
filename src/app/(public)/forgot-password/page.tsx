import React from 'react';
import Input from "@/components/input";
import Button from "@/components/button";
import Container from "@/components/container/Container";

const ForgotPassword = () => {
  return (
    <Container className='flex justify-center items-center bg-white' style={{background: 'linear-gradient(to right, #30475E, #222831)'}}>
      <div className='card w-96 flex flex-col items-center gap-y-6 p-4'>
        <Input className='w-full border border-black' type='text' placeholder='Email' />
        <Button>Reset Password</Button>
      </div>
    </Container>
  );
};

export default ForgotPassword;