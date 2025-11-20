"use client";

import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { usePageContext } from "@/contexts/PageContext";
import { useState } from "react";

const AthleteCard = ({ athlete, disciplineImage, countryImage }) => {
  const { favorites, addFavorite, removeFavorite } = usePageContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  if (!athlete) return null;

  const isFavorite = favorites.some((fav) => fav._id === athlete._id);

  const displayModal = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 2000);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(athlete._id);
      displayModal(`Se eliminó ${athlete.name} de favoritos`);
    } else {
      addFavorite({
        _id: athlete._id,
        athlete: athlete.name,
        image: athlete.image,
        discipline: athlete.discipline,
        country: athlete.country,
        disciplineImg: disciplineImage,
        countryImg: countryImage,
      });
      displayModal(`¡Se agregó ${athlete.name} a favoritos!`);
    }
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.indexOf("http") !== -1) return img;
    return "/imgs/" + img;
  };

  return (
    <>
      <Link href={`/athletes/${athlete._id}`} className="block group h-full">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-[#dac07d]/20 bg-[#1a1a1a] hover:border-[#dac07d] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(218,192,125,0.15)]">
          
          <div className="relative w-full aspect-[3/4]">
            <Image
              src={getImageUrl(athlete.image)}
              alt={athlete.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent opacity-95"></div>
          </div>

          {/* Icono Disciplina */}
          {disciplineImage && (
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#dac07d]/90 backdrop-blur-sm flex items-center justify-center shadow-md z-20 border border-[#1a1a1a]/50" title={athlete.discipline}>
              <Image
                src={getImageUrl(disciplineImage)}
                alt="Disciplina"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
          )}

          <div className="absolute top-4 left-4 z-30">
            <button
              onClick={handleToggleFavorite}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-[#dac07d] group/btn transition-all border border-white/10 cursor-pointer"
            >
              {isFavorite ? (
                <HiHeart className="w-5 h-5 text-[#dac07d] group-hover/btn:text-[#1a1a1a]" />
              ) : (
                <HiOutlineHeart className="w-5 h-5 text-[#fefcf4] group-hover/btn:text-[#1a1a1a]" />
              )}
            </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-5 z-20 flex flex-col gap-3">
            
            <h3 className="text-xl font-bold text-[#fefcf4] leading-snug group-hover:text-[#dac07d] transition-colors">
              {athlete.name}
            </h3>

            <div className="flex items-center gap-2.5">
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/30 bg-white/10 shrink-0 shadow-sm">
                 {countryImage ? (
                    <Image
                      src={getImageUrl(countryImage)}
                      alt={athlete.country}
                      fill
                      className="object-cover"
                    />
                 ) : (
                   <div className="w-full h-full bg-[#dac07d]/30"></div>
                 )}
              </div>
              <span className="text-sm font-bold text-[#dac07d] uppercase tracking-wider truncate">
                {athlete.country}
              </span>
            </div>
            
            <div className="w-full h-0.5 bg-[#dac07d]/30">
                <div className="w-0 group-hover:w-full h-full bg-[#dac07d] transition-all duration-500 ease-out"></div>
            </div>
          </div>
        </div>
      </Link>

      
      {modalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
          <div className="relative bg-[#272727] rounded-xl shadow-2xl p-6 flex flex-col items-center gap-4 max-w-xs w-full border border-[#dac07d]/30 animate-in fade-in zoom-in duration-200">
            <Image src="/imgs/otrologo.png" alt="Logo" width={70} height={70} />
            <p className="text-center text-[#fefcf4] text-sm font-medium">
              {modalMessage}
            </p>
            <Link 
              href="/favorites" 
              className="bg-[#dac07d] text-[#272727] font-bold px-5 py-2 rounded-full hover:bg-[#bfa25f] transition-all shadow-lg w-full text-center text-sm"
            >
              Ir a mis favoritos
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AthleteCard;