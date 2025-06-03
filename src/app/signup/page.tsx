"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function Signup() {
  const router = useRouter()

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: ""
  })
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const [loadign, setloading] = useState(false)

  useEffect(() => {
    const allFieldsFilled = user.name && user.email && user.phone && user.password && user.confirm_password;
    setbuttonDisabled(!allFieldsFilled);
  }, [user]);

  const onSignup = async (e:any) => {
    e.preventDefault();

    try {
      setloading(true)
      const Response = await axios.post("/api/signup", user)
      console.log("Signup Success", Response.data)
      toast.error(Response.data)
      //router.push('/login')
    } catch (error:any) {
      console.log("Signup failed")
      toast.error(error.message)
    }
  }
 

  let classforBtn = "mt-4 w-full bg-blue-600 text-white font-semibold py-4 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition";
  let classForInput = "w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className=' text-4xl font-bold text-black text-center mb-5'>{loadign ? "Processing" : "Sign Up"}</h1>
        <div className='w-2xl mx-auto border-2 border-gray-200 bg-white px-6 py-8 rounded-lg shadow-lg'>
          <form className='flex flex-col gap-2.5'>
            <input name='name' value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} placeholder='Enter your name' className={classForInput}></input>
            <input name='email' value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} placeholder='Enter your email' className={classForInput}></input>
            <input name='phone' value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} placeholder='Enter your phone' className={classForInput}></input>
            <input name='password' value={user.password} onChange={(e) => setUser({...user,password: e.target.value})} placeholder='Enter your password' className={classForInput}></input>
            <input name='confirm_password' value={user.confirm_password} onChange={(e) => setUser({...user, confirm_password: e.target.value})} placeholder='Re-enter your password' className={classForInput}></input>
            <button type="submit" onClick={onSignup} className={classforBtn} disabled={buttonDisabled}>
              {buttonDisabled ? "Fill Value" : "Sign Up"}
            </button>
            <hr className="my-6 border-gray-300" />
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
