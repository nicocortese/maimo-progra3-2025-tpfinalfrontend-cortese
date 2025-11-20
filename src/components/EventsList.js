"use client";

import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import EventCard from "./EventCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const EventsList = () => {
  const {
    athletes,
    categories,
    getAthletes,
    getCategories
  } = usePageContext();

  useEffect(() => {
    if (!athletes || athletes.length === 0) getAthletes();
    if (!categories || categories.length === 0) getCategories();
  }, [athletes, categories, getAthletes, getCategories]);

 //busco el elemento por id y muevo el scroll
  const moverScroll = (direccion) => {
    const contenedor = document.getElementById('carrusel-eventos');
    
    if (contenedor) {
      if (direccion === 'izquierda') {
        contenedor.scrollLeft -= 300;
      } else {
        contenedor.scrollLeft += 300;
      }
    }
  };

  const allItems = [
    ...(categories?.slice(0, 3).map(cat => ({ ...cat, type: 'category' })) || []),
    ...(athletes?.slice(0, 5).map(ath => ({ ...ath, type: 'athlete' })) || [])
  ];

  if (allItems.length === 0) return null;

  return (
    <section className="relative py-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold pt-5  text-[#fefcf4]">
          Eventos Olímpicos
        </h2>
      </div>

      <div className="relative group">
        <button
          onClick={() => moverScroll('izquierda')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-[#272727]/90 hover:bg-[#dac07d] text-[#fefcf4] p-3 rounded-full shadow-xl transition-all opacity-0 group-hover:opacity-100"
        >
          <HiChevronLeft className="w-6 h-6 cursor-pointer" />
        </button>

        <div
          id="carrusel-eventos"
          className="flex gap-6 overflow-x-auto py-12 px-4 md:px-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
        >
          {allItems.map((item, index) => (
            <div key={`${item.type}-${item._id}-${index}`}>
              <EventCard item={item} type={item.type} />
            </div>
          ))}
        </div>

        <button
          onClick={() => moverScroll('derecha')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-[#272727]/90 hover:bg-[#dac07d] text-[#fefcf4] p-3 rounded-full shadow-xl transition-all opacity-0 group-hover:opacity-100"
        >
          <HiChevronRight className="w-6 h-6 cursor-pointer" />
        </button>
      </div>
    </section>
  );
};

export default EventsList;