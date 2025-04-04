"use client"
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultData = {name:"", email:"", phone:"", password:""}

export default function SignupPage() {

    const router = useRouter();

    const [data, setData]=useState(defaultData);

    const onValueChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    

    const formHandle = async (e)=> {
        e.preventDefault();

        if(!data.name || !data.email || !data.phone || !data.password) {
            alert('fill the all fields.');
            return;
        }

        //API CALL
        try {
            const response = await axios.post("/api/user/signup", data);
            if(response.status === 200){
                router.push("/signin");
            }
        } catch (error) {
            console.log(error)
            if(error.response.status === 400) {
                alert('email already exist');
            }
            if(error.response.status === 401) {
                alert('name. email, phone and password are requierd');
            }
        }

    }

    return (
        <div className=" flex justify-center items-center flex-col h-screen">
            <div className=" w-3xl mx-auto p-8 border-2 shadow-2xs rounded-2xl border-black">
                <h2 className="text-3xl text-black text-center font-bold">Sing Up</h2>
                <hr className="my-7"></hr> 
                <form onSubmit={formHandle}>
                    <input type="text" name="name" value={data.name} onChange={(e) => onValueChange(e)} placeholder="Your Name" className=" border-1 py-4 px-3 text-black placeholder-black w-full rounded-xl mb-3.5"></input>
                    <input type="text" name="email" value={data.email} onChange={(e) => onValueChange(e)} placeholder="Your Email" className=" border-1 py-4 px-3 text-black placeholder-black w-full rounded-xl mb-3.5"></input>
                    <input type="text" name="phone" value={data.phone} onChange={(e) => onValueChange(e)} placeholder="Your Phone" className=" border-1 py-4 px-3 text-black placeholder-black w-full rounded-xl mb-3.5"></input>
                    <input type="password" name="password" value={data.password} onChange={(e) => onValueChange(e)} placeholder="Enter Password" className=" border-1 py-4 px-3 text-black placeholder-black w-full rounded-xl mb-7"></input>
                    <button type="submit" className="bg-black py-4.5 px-16 text-white text-md text-center flex mx-auto rounded-xl cursor-pointer">Submit</button>
                </form>
                <hr className='my-7'></hr>
                <h5 className='text-md text-center'>You have a account? <Link href="/signin" className='text-blue-900'>Signin Now</Link></h5>
            </div>
        </div>
    );
}
