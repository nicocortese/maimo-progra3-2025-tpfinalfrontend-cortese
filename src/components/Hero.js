"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight, HiHeart, HiOutlineHeart } from "react-icons/hi2";

const heroSlide = [
  {
    id: "hero-1",
    title: "Increíble Duplantis: gana una carrera de 100 metros al vallista Warlhom con una marca cercana al récord sueco",
    image: "/imgs/duplantis-hero.jpg",
    category: "ATLETISMO",
    athleteName: "Armand Duplantis",
    athleteImage: "/imgs/armandduplantis.png",
    country: "Suecia",
    countryImage: "/imgs/suecia.png",
    disciplineImage: "/imgs/atletismo.png",
    link: "/summaryday/1",
    canFavorite: true
  },
  {
    id: "hero-2",
    title: "La brasileña Ana Marcela Cunha se lleva el oro en aguas abiertas",
    image: "/imgs/anamarcelacunha-hero.jpg",
    category: "NATACIÓN DE MARATÓN",
    athleteName: "Ana Marcela Cunha",
    athleteImage: "/imgs/anamarcelacunha.png",
    country: "Brasil",
    countryImage: "/imgs/brasil.png",
    disciplineImage: "/imgs/natacionmaraton.png",
    link: "/summaryday/2",
    canFavorite: true
  },
  {
    id: "hero-3",
    title: "Argentina le ganó a Turquía y tiene un pie y medio en los Cuartos de Final",
    image: "/imgs/argentinavoley-hero.jpg",
    category: "VÓLEY",
    athleteName: "Selección Argentina",
    link: "/summaryday/3",
    canFavorite: false // NO se puede agregar a favoritos
  },
  {
    id: "hero-4",
    title: "Récord olímpico: el héroe de Paquistán, que eligió la jabalina sobre el criquet y festejó con un lanzamiento memorable",
    image: "/imgs/pakistani-hero.jpeg",
    category: "LANZAMIENTO DE JABALINA",
    athleteName: "Arshad Nadeem",
    athleteImage: "/imgs/arshadnadeem.png",
    country: "Pakistán",
    countryImage: "/imgs/pakistan.png",
    disciplineImage: "/imgs/atletismo.png",
    link: "/summaryday/4",
    canFavorite: true
  },
  {
    id: "hero-5",
    title: "Decepción: Simone Biles y una caída que la dejó sin medalla en una de sus pruebas favoritas",
    image: "/imgs/simonebiles-hero.jpg",
    category: "GIMNASIA ARTÍSTICA",
    athleteName: "Simone Biles",
    athleteImage: "/imgs/simonebiles.png",
    country: "Estados Unidos",
    countryImage: "/imgs/usa.png",
    disciplineImage: "/imgs/gimnasiaentrampolin.png",
    link: "/summaryday/5",
    canFavorite: true
  },
];

export default function Hero() {
  const { favorites, addFavorite, removeFavorite } = usePageContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const slide = heroSlide[currentIndex];
  const isFavorite = favorites.some(f => f._id === slide.id);

  const handleToggleFavorite = () => {
    // Si no se puede agregar a favoritos (Argentina), no hacer nada
    if (!slide.canFavorite) return;

    if (isFavorite) {
      // Quitar de favoritos
      removeFavorite(slide.id);
      showModal(`Se eliminó ${slide.athleteName} de favoritos`);
    } else {
      // Agregar a favoritos con toda la información
      addFavorite({
        _id: slide.id,
        athlete: slide.athleteName,
        image: slide.athleteImage,
        country: slide.country,
        countryImg: slide.countryImage,
        disciplineImg: slide.disciplineImage,
        discipline: slide.category
      });
      showModal(`¡Se agregó ${slide.athleteName} a tus favoritos!`);
    }
  };

  const showModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 2500);
  };

  const nextSlide = () => setCurrentIndex(prev => (prev === heroSlide.length - 1 ? 0 : prev + 1));
  const previousSlide = () => setCurrentIndex(prev => (prev === 0 ? heroSlide.length - 1 : prev - 1));

  return (
    <section className="relative group h-[500px] md:h-[600px] w-full overflow-hidden">
      <Image src={slide.image} alt={slide.title} fill className="object-cover" priority />

      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-[#726540]/20 to-transparent z-10" />

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-[#fefcf4] z-20 flex flex-col justify-end items-start">
        {/* Link al summaryday */}
        <Link
          href={`/summaryday`}
          className="text-2xl md:text-4xl font-bold mb-4 leading-tight hover:text-[#dac07d] transition-colors cursor-pointer drop-shadow-lg max-w-3xl"
        >
          {slide.title}
        </Link>

        <div className="flex items-center gap-4 mt-2">
          <span className="bg-[#272727]/80 text-[#DAC07D] text-xs md:text-sm font-semibold px-3 py-1 rounded uppercase tracking-wider shadow-md">
            {slide.category}
          </span>

          {/* Mostrar corazón solo si se puede agregar a favoritos */}
          {slide.canFavorite && (
            <button 
              className="p-1 rounded-full transition-colors cursor-pointer hover:bg-white/10" 
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {isFavorite ? (
                <HiHeart className="h-6 w-6 text-[#DAC07D]" />
              ) : (
                <HiOutlineHeart className="h-6 w-6 text-[#DAC07D]" />
              )}
            </button>
          )}
        </div>
      </div>

      <button 
        onClick={previousSlide} 
        className="absolute top-1/2 left-4 -translate-y-1/2 text-[#fefcf4] hover:text-[#dac07d] transition-colors hidden group-hover:block z-30 cursor-pointer"
        aria-label="Slide anterior"
      >
        <HiChevronLeft className="h-12 w-12" />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 right-4 -translate-y-1/2 text-[#fefcf4] hover:text-[#dac07d] transition-colors hidden group-hover:block z-30 cursor-pointer"
        aria-label="Siguiente slide"
      >
        <HiChevronRight className="h-12 w-12" />
      </button>

      {/* Modal */}
      {modalOpen && (
        <>
          {/* Fondo oscuro */}
          <div className="fixed inset-0 bg-black/50 z-40" />
          
          {/* Modal centrado */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#272727] rounded-xl shadow-2xl z-50 p-6 flex flex-col items-center gap-4 max-w-xs w-full">
            <Image src="/imgs/otrologo.png" alt="Logo" width={60} height={60} />
            <p className="text-center text-[#DAC07D] font-semibold">{modalMessage}</p>
            <Link 
              href="/favorites" 
              className="bg-[#DAC07D] text-[#272727] font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"
            >
              Ir a mis favoritos
            </Link>
          </div>
        </>
      )}
    </section>
  );
}