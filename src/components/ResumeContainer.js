"use client";

import React from "react";
import Image from "next/image";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { usePageContext } from "@/contexts/PageContext";

const resumeData = [
{
id: 1,
title: "Imágenes del día - Día 3 | Juegos Olímpicos París 2024",
resume: "Las mejores imágenes del tercer día de competencia.",
category: ["RESUMEN DEL DÍA"],
image: "/imgs/resumenuno.jpg",
},
{
id: 2,
title: "800m libres (M) - Final",
resume: "En los 800m libres masculinos Daniel Wiffen (IRL) consiguió el oro con un tiempo récord olímpico, Bobby Finke (USA) se llevó la plata y Gregorio Paltrinieri (ITA) completó el podio.",
category: ["NATACIÓN", "IRLANDA", "ESTADOS UNIDOS", "ITALIA", "RESUMEN DEL DÍA"],
image: "/imgs/resumendos.jpg",
},
{
id: 3,
title: "Medallas de oro del día 3",
resume: "Revisa los ganadores de las medallas de oro del tercer día de competencia y sus increíbles logros.",
category: ["RUGBY 7", "NUEVA ZELANDA", "RESUMEN DEL DÍA"],
image: "/imgs/resumentres.jpg",
},
{
id: 4,
title: "Final - 52kg (F)",
resume: "Se celebró en el Gran Palais Éphémere. Diyora Keldiyorova (UZB) se colgó la medalla de oro, Distria Krasniqi (KOS) la de plata.",
category: ["JUDO", "RESUMEN DEL DÍA"],
image: "/imgs/resumencuatro.jpg",
},
{
id: 5,
title: "Partido por la medalla de oro en dobles mixtos",
resume: "El partido por la medalla de oro entre China y Corea del Norte se celebró en el París Sur Arena. China se llevó el oro con un resultado final de 4-2.",
category: ["TENIS DE MESA", "CHINA", "COREA DEL NORTE", "RESUMEN DEL DÍA"],
image: "/imgs/resumencinco.jpg",
},
{
id: 6,
title: "Scull individual (M)",
resume: "Resumen de la competición de cuartos de final de scull individual masculino en remo que se celebró en el Estadio Náutico Vaires-sur-Marne!",
category: ["REMO", "RESUMEN DEL DÍA"],
image: "/imgs/resumenseis.jpg",
},
];

const ResumeContainer = () => {
const { favorites, addFavorite, removeFavorite } = usePageContext();

const checkIsFavorite = (itemTitle) => {
return favorites.some((fav) => fav.name === itemTitle || fav.athlete === itemTitle);
};

const handleToggleFavorite = (item) => {
  const isFav = favorites.some(fav => fav.athlete === item.title);
  if (isFav) {
    removeFavorite(item.title);
  } else {
    addFavorite({
      athlete: item.title,
      image: item.image,
      discipline: item.category?.[0] || "Noticia",
    });
  }
};


return ( <section className="w-full py-6 px-4 md:px-0 relative z-10"> <h3 className="text-3xl md:text-4xl font-bold text-[#272727] mb-6">
Resumen día 3 (29 de julio) </h3>


  <div className="flex flex-col gap-4">
    {resumeData.map((item) => {
      const isFavorite = checkIsFavorite(item.title);

      return (
        <div
          key={item.id}
          className="flex w-full bg-[#fefcf4] p-3 rounded-xl shadow-md border border-[#726540]/20 items-center"
        >
          <div className="relative w-[110px] h-[79px] shrink-0 overflow-hidden rounded-lg shadow-sm">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>

          <div className="flex flex-col justify-between flex-1 px-4 h-full">
            <div>
              <span className="text-[10px] font-bold text-[#dac07d] uppercase tracking-wider">
                {item.category[0]}
              </span>
              <h4 className="text-sm md:text-base font-bold text-[#272727] leading-tight line-clamp-2 mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-1">{item.resume}</p>
            </div>
          </div>

          <button
            onClick={() => handleToggleFavorite(item)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isFavorite ? (
              <HiHeart className="w-6 h-6 text-[#dac07d] cursor-pointer" />
            ) : (
              <HiOutlineHeart className="w-6 h-6 text-[#dac07d] cursor-pointer" />
            )}
          </button>
        </div>
      );
    })}
  </div>
</section>


);
};

export default ResumeContainer;
