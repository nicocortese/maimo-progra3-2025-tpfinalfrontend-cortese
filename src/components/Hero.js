"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiChevronLeft,
  HiChevronRight,
  HiHeart,
  HiOutlineHeart,
} from "react-icons/hi2";

const heroSlide = [
  {
    id: 1,
    title:
      "Increíble Duplantis: gana una carrera de 100 metros al vallista Warlhom con una marca cercana al récord sueco",
    image: "/imgs/duplantis-hero.jpg",
    category: "ATLETISMO",
    link: "noticias/duplantis",
    isFavorite: true,
  },
  {
    id: 2,
    title: "La brasileña Ana Marcela Cunha se lleva el oro en aguas abiertas",
    image: "/imgs/anamarcelacunha-hero.jpg",
    category: "NATACIÓN DE MARATÓN",
    link: "noticias/anamarcelacunha",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Argentina le ganó a Turquía y tiene un pie y medio en los Cuartos de Final",
    image: "/imgs/argentinavoley-hero.jpg",
    category: "VÓLEY",
    link: "noticias/argentina",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Récord olímpico: el héroe de Paquistán, que eligió la jabalina sobre el criquet y festejó con un lanzamiento memorable",
    image: "/imgs/pakistani-hero.jpeg",
    category: "LANZAMIENTO DE JABALINA",
    link: "noticias/arshadnadeem",
    isFavorite: true,
  },
  {
    id: 5,
    title: "Decepción: Simone Biles y una caída que la dejó sin medalla en una de sus pruebas favoritas",
    image: "/imgs/simonebiles-hero.jpg",
    category: "GIMNASIA ARTÍSTICA",
    link: "noticias/simonebiles",
    isFavorite: true,
  }
];

const Hero = () => {
  const [ currentIndex, setCurrentIndex ] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if(prev === heroSlide.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    })
  }
  const previousSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return heroSlide.length - 1;
      } else {
        return prev - 1;
      }
    })
  }
  const slide = heroSlide[currentIndex];

  return (
    <section className="relative w-full h-[550px] overflow-hidden group bg-black">
      <div className="absolute inset-0 w-full h-full">
      <Image
      src={slide.image}
      alt={slide.title}
      fill
      className="object-cover opacity 90 transition-all duration-500"
      priority
      />
      {/*capa oscura */}
      <div className="absolute inset-0 bg-linear-to-t from-[#726540] via-black/20 to-transparent z-10"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-[#fefcf4] z-20 flex flex-col justify-end items-start">
        <Link href={slide.link}>
        <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight hover:text-[#dac07d] transition-colors cursor-pointer drop-shadow-lg max-w-3xl">
          {slide.title}
        </h2>
        </Link>

        <div className="flex items-center gap-4 mt-2">
          <span className="bg-[#D9D9D9] text-[#FEFCF4] text-xs md:text-sm font-normal px-3 py-1 rounded uppercase tracking-wider shadow-md">
            {slide.category}
          </span>

          <button className={`p-2 rounded-full transition-all group/heart ${slide.isFavorite ? `bg-[#dac07d] hover:bg-[#726540]` : `bg-transparent border-[#fefcf4] hover:bg-[#726540]/30`}`}
          onClick={() => alert (`Agregado ${slide.category} a favoritos`)}>
          {slide.isFavorite ? (
            <HiHeart className="h-6 w-6 text-[#FEFCF4] cursor-pointer group-hover/heart:scale-100 transition-transform" />
          ): (
            <HiOutlineHeart className="h-6 w-6 stroke-[#FEFCF4] cursor-pointer group-hover/heart:scale-110 transition-transform" />
          )}
          </button>
        </div>
      </div>
      <button
      onClick={previousSlide}
      className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full text-[#fefcf4] hover:bg-[#d9d9d9] hover:text-blue-950 transition-all hidden group-hover:block z-30 shadow-lg">
        <HiChevronLeft className="h-8 w-8" />
      </button>

      <button
      onClick={nextSlide}
      className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full text-[#fefcf4] hover:bg-[#d9d9d9] hover:text-blue-950 transition-all hidden group-hover:block z-30 shadow-lg">
        <HiChevronRight className="h-8 w-8" />
      </button>
    </section>
  )
};

export default Hero;
