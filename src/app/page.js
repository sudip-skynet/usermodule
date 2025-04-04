import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex justify-center items-center flex-col h-screen">
      <h1 className=" text-5xl mb-7">User Module</h1>
      <div className="flex gap-3 flex-row">
        <Link href='signup' className=" bg-black py-3.5 px-10 text-white text-md text-center">Sing Up</Link>
        <Link href='signin' className="bg-black py-3.5 px-10 text-white text-md text-center">Sing In</Link>
      </div>
    </div>
  );
}
