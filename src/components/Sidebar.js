"use client";

import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Image from "next/image";
import { usePageContext } from "@/contexts/PageContext";
import Link from "next/link";

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = usePageContext();
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`
          flex flex-col fixed top-0 left-0 h-full w-80 bg-[#1a1a1a] text-[#fefcf4] z-50 shadow-2xl  border-r border-[#726540]/30 
          transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#726540]/30">
          <Image
            src="/imgs/2024_jjoo_logo.png"
            alt="Logo 2024"
            width={60}
            height={50}
          />
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#fefcf4]/10 rounded-full text-[#dac07d]"
          >
            <HiXMark className="w-8 h-8 cursor-pointer" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-10 p-4 bg-[#272727] rounded-xl border border-[#726540]/20">
            <div className="w-12 h-12 rounded-full bg-[#dac07d] text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              US
            </div>
            <div>
              <p className="text-sm font-bold text-[#fefcf4]">Nombre Usuario</p>
              <p className="text-xs text-[#fefcf4]/60">Ver perfil</p>
            </div>
          </div>

          <ul className="flex flex-col gap-2 list-none cursor-pointer text-[20px]">
            <li className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#dac07d] transition-all group">
              <span className="font-medium group-hover:text-[#1a1a1a]">
                Medallero
              </span>
              <FaChevronRight className="text-[#dac07d] group-hover:text-[#1a1a1a] text-xs" />
            </li>
            <li className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#dac07d] transition-all group">
              <span className="font-medium group-hover:text-[#1a1a1a]">
                Disciplinas
              </span>
              <FaChevronRight className="text-[#dac07d] group-hover:text-[#1a1a1a] text-xs" />
            </li>

            <Link href="/summaryday" onClick={toggleSidebar}>
            <li className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#dac07d] transition-all group">
              <span className="font-medium group-hover:text-[#1a1a1a]">
                Resumen del día
              </span>
              <FaChevronRight className="text-[#dac07d] group-hover:text-[#1a1a1a] text-xs" />
            </li>
            </Link>
            <li className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#dac07d] transition-all group">
              <span className="font-medium group-hover:text-[#1a1a1a]">
                Atletas
              </span>
              <FaChevronRight className="text-[#dac07d] group-hover:text-[#1a1a1a] text-xs" />
            </li>

            <Link href="/favorites" onClick={toggleSidebar}>
            <li className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#dac07d] transition-all group">
              <span className="font-medium group-hover:text-[#1a1a1a]">
                Mi Lista
              </span>
              <FaChevronRight className="text-[#dac07d] group-hover:text-[#1a1a1a] text-xs" />
            </li>
            </Link>
            <Link href="/about" onClick={toggleSidebar}>
            <li className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-[#dac07d] transition-all group">
              <span className="font-medium group-hover:text-[#1a1a1a]">
                About
              </span>
              <FaChevronRight className="text-[#dac07d] group-hover:text-[#1a1a1a] text-xs" />
            </li>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
