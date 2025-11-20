"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { FaUniversity, FaLaptopCode, FaMedal } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#272727] text-[#fefcf4]">
      <div className="relative h-[50vh] w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <Image
            src="/imgs/fuegoolimpico.jpg"
            alt="Fondo Hero"
            fill
            className="object-cover object-center opacity-50 blur-sms"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#272727] via-[#272727]/40 to-black/60" />
        <div className="absolute top-6 left-6 z-30">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#726540] hover:text-[#dac07d] transition-colors mb-8 w-fit"
          >
            <HiArrowLeft size={20} /> Volver al Inicio
          </Link>
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl mt-8">
          <h1 className="text-5xl md:text-7xl font-black text-[#fefcf4] mb-2 drop-shadow-2xl tracking-tight uppercase">
            Olympic<span className="text-[#dac07d]">Hub</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#fefcf4] font-medium tracking-wide pb-10 mx-auto">
            La pasión por el deporte, centralizada en un solo lugar.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 relative z-30">
        <div className="-mt-20 bg-[#1a1a1a] rounded-2xl shadow-2xl border-t-4 border-[#dac07d] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-[#fefcf4] mb-3 flex items-center gap-3">
                  <FaLaptopCode className="text-[#dac07d]" />
                  Un proyecto que evolucionó
                </h2>

                <div className="h-1 w-24 bg-[#dac07d] rounded-full mb-6 shadow-[0_0_10px_#dac07d]"></div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-[#dac07d]">OlympicHub</strong> nació
                como un proyecto universitario en la
                <span className="font-semibold text-[#fefcf4]">
                  {" "}
                  Universidad Maimónides
                </span>
                , dentro de la materia <em>Diseño de Interfaces</em>.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                La idea original era crear una aplicación pensada para jóvenes
                fanáticos del deporte que quisieran seguir de cerca todo lo
                relacionado con los Juegos Olímpicos, ofreciendo datos precisos,
                biografías de atletas y un seguimiento en tiempo real.
              </p>
            </div>

            <div className="w-full md:w-1/3 bg-[#272727] p-8 rounded-xl border border-[#dac07d]/20 shadow-lg">
              <h3 className="text-[#dac07d] font-bold mb-6 uppercase tracking-widest text-sm border-b border-[#dac07d]/20 pb-2">
                Detalles del Proyecto
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <FaUniversity className="text-gray-400 text-xl mt-1" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Universidad
                    </p>
                    <p className="text-[#fefcf4] font-medium">MAIMÓNIDES</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#dac07d] flex items-center justify-center text-[#1a1a1a] font-bold text-xs mt-1">
                    2025
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Carrera
                    </p>
                    <p className="text-[#fefcf4] font-medium">
                      TECNOLOGÍA MULTIMEDIAL
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FaMedal className="text-gray-400 text-xl mt-1" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Objetivo
                    </p>
                    <p className="text-[#fefcf4] font-medium">
                      INFORMACIÓN OLÍMPICA
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
