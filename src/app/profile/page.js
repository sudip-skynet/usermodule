"use client"
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function profilePage() {
  const router = useRouter();

  const onLogout = async (e)=> {
    e.preventDefault();

    //API CALL
    const response = await axios.get('/api/user/logout');
    if(response.status === 200) {
      router.push('/signin');
    }
    
  }


  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <h1 className='text-5xl mb-6'>Wellcom to your Profile</h1>
      <button className='bg-red-700 text-white py-3 px-8 rounded-4xl cursor-pointer' onClick={(e) => onLogout(e)}>Logout</button>
    </div>
  )
}
