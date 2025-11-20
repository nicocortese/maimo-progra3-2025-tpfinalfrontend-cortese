"use client";


import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiOutlineHeart, HiArrowLeft } from "react-icons/hi2";
import { usePageContext } from "@/contexts/PageContext"; 

const allNewsData = [
  {
    id: "hero-1",
    title: "Increíble Duplantis: gana una carrera de 100 metros al vallista Warlhom con una marca cercana al récord sueco",
    image: "/imgs/duplantis-hero.jpg",
    category: "ATLETISMO",
    link: "/noticias/duplantis",
    resume: "Armand Duplantis demuestra su versatilidad y velocidad en un desafío inusual."
  },
  {
    id: "hero-2",
    title: "La brasileña Ana Marcela Cunha se lleva el oro en aguas abiertas",
    image: "/imgs/anamarcelacunha-hero.jpg",
    category: "NATACIÓN DE MARATÓN",
    link: "/noticias/anamarcelacunha",
    resume: "Ana Marcela Cunha vuelve a dominar las aguas abiertas con una actuación impecable."
  },
  {
    id: "hero-3",
    title: "Argentina le ganó a Turquía y tiene un pie y medio en los Cuartos de Final",
    image: "/imgs/argentinavoley-hero.jpg",
    category: "VÓLEY",
    link: "/noticias/argentina",
    resume: "El equipo argentino de vóley sorprende y avanza en el torneo olímpico."
  },
  {
    id: "hero-4",
    title: "Récord olímpico: el héroe de Paquistán, que eligió la jabalina sobre el criquet y festejó con un lanzamiento memorable",
    image: "/imgs/pakistani-hero.jpeg",
    category: "LANZAMIENTO DE JABALINA",
    link: "/noticias/arshadnadeem",
    resume: "El atleta paquistaní Arshad Nadeem rompe récords con un lanzamiento espectacular."
  },
  {
    id: "hero-5",
    title: "Decepción: Simone Biles y una caída que la dejó sin medalla en una de sus pruebas favoritas",
    image: "/imgs/simonebiles-hero.jpg",
    category: "GIMNASIA ARTÍSTICA",
    link: "/noticias/simonebiles",
    resume: "Simone Biles sufre un revés inesperado en su camino por las medallas."
  },
 
  {
    id: "daily-1",
    title: "Imágenes del día - Día 3 | Juegos Olímpicos París 2024",
    resume: "Las mejores imágenes del tercer día de competencia.",
    category: "RESUMEN DEL DÍA",
    image: "/imgs/resumenuno.jpg",
    link: "/noticias/imagenes-dia-3"
  },
  {
    id: "daily-2",
    title: "800m libres (M) - Final",
    resume: "En los 800m libres masculinos Daniel Wiffen (IRL) consiguió el oro con un tiempo récord olímpico, Bobby Finke (USA) se llevó la plata y Gregorio Paltrinieri (ITA) completó el podio.",
    category: "NATACIÓN",
    image: "/imgs/resumendos.jpg",
    link: "/noticias/800m-libres-final"
  },
  {
    id: "daily-3",
    title: "Medallas de oro del día 3",
    resume: "Revisa los ganadores de las medallas de oro del tercer día de competencia y sus increíbles logros.",
    category: "RUGBY 7",
    image: "/imgs/resumentres.jpg",
    link: "/noticias/medallas-oro-dia-3"
  },
  {
    id: "daily-4",
    title: "Final - 52kg (F)",
    resume: "Se celebró en el Gran Palais Éphémere. Diyora Keldiyorova (UZB) se colgó la medalla de oro, Distria Krasniqi (KOS) la de plata.",
    category: "JUDO",
    image: "/imgs/resumencuatro.jpg",
    link: "/noticias/final-judo-52kg"
  },
  {
    id: "daily-5",
    title: "Partido por la medalla de oro en dobles mixtos",
    resume: "El partido por la medalla de oro entre China y Corea del Norte se celebró en el París Sur Arena. China se llevó el con un resultado final de 4-2.",
    category: "TENIS DE MESA",
    image: "/imgs/resumencinco.jpg",
    link: "/noticias/tenis-mesa-dobles-mixtos"
  },
  {
    id: "daily-6",
    title: "Scull individual (M)",
    resume: "Resumen de la competición de cuartos de final de scull individual masculino en remo que se celebró en el Estadio Náutico Vaires-sur-Marne!",
    category: "REMO",
    image: "/imgs/resumenseis.jpg",
    link: "/noticias/scull-individual-m"
  },
];



const SummaryDay = () => {
  const { favorites, addFavorite, removeFavorite } = usePageContext();

  const checkIsFavorite = (itemName) => {
    return favorites.some(fav => fav.name === itemName);
  };

  const handleToggleFavorite = (item) => {
    if (checkIsFavorite(item.title)) {
      removeFavorite(item.title); 
    } else {
      addFavorite({
        name: item.title,
        image: item.image,
        discipline: item.category, 
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] p-6 md:p-10">
      <div className="container mx-auto">
        
        
        <Link href="/" className="flex items-center gap-2 text-[#726540] hover:text-[#dac07d] transition-colors mb-8 w-fit">
          <HiArrowLeft size={20} /> Volver al Inicio
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-12">
          Resumen del Día Olímpico
        </h1>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allNewsData.map((newsItem) => {
            const isFavorite = checkIsFavorite(newsItem.title);
            return (
              <div
                key={newsItem.id}
                className="relative bg-[#fefcf4] rounded-xl shadow-lg border border-[#726540]/10 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                {/* Imagen de la Noticia */}
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={newsItem.image}
                    alt={newsItem.title}
                    fill
                    className="object-cover"
                  />
                  {/* Categoría superpuesta */}
                  <span className="absolute top-3 left-3 bg-[#dac07d] text-[#272727] text-xs font-bold px-3 py-1 rounded-full uppercase z-10">
                    {newsItem.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col grow">
                  {/* Título de la Noticia */}
                  <h2 className="text-lg md:text-xl font-bold text-[#272727] leading-tight mb-2 grow">
                    <Link href={newsItem.link || "#"} className="hover:text-[#dac07d] transition-colors">
                      {newsItem.title}
                    </Link>
                  </h2>
                  {/* Resumen */}
                  <p className="text-sm text-[#272727] mb-4 line-clamp-3">
                    {newsItem.resume}
                  </p>

                  {/* Botón de Favorito */}
                  <div className="flex justify-end mt-auto"> {/* mt-auto empuja al final */}
                    <button
                      onClick={() => handleToggleFavorite(newsItem)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                      {isFavorite ? (
                        <HiHeart className="w-6 h-6 text-[#dac07d]" />
                      ) : (
                        <HiOutlineHeart className="w-6 h-6 text-[#dac07d]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SummaryDay;