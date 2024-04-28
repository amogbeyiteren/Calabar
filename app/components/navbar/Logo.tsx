'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Home from "@/app/page";
import { IoHomeOutline } from "react-icons/io5";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div className="flex gap-2">
    <IoHomeOutline className=" text-green-500" size={24}/>
    <Link href="/" className="text-green-500 text-xl font-bold">Calabar</Link>
    </div>
   );
}
 
export default Logo;
