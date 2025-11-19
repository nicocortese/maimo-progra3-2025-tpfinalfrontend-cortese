"use client";

import Image from "next/image";
import { usePageContext } from "@/contexts/PageContext";
import { HiBars3 } from "react-icons/hi2";


export default function Navbar () {
  const {toggleSidebar} = usePageContext();
  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#FEFCF4] z-40 flex items-center justify-between px-6 shadow-sm">
      <button
      onClick={toggleSidebar}
      className="p-2 text-[#272727] hover:bg-gray-200 rounded-full transition-colors"
      >
        <HiBars3 className="w-8 h-8 cursor-pointer" />
        </button>
      <div className="absolute left-1/2 transform -translate-x-1/2 pt-2">
        <Image
        src="/imgs/logovariante.png"
        alt="Logo"
        width={200}
        height={180}
        priority
        className="object-contain"
        />
      </div>
    </nav>
  )
}