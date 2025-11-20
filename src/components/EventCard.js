"use client";

import Image from "next/image";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { BsBroadcast } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import { usePageContext } from "@/contexts/PageContext";

const EventCard = ({ item, type }) => {
  const { favorites, addFavorite, removeFavorite } = usePageContext();

  const isFavorite = favorites.some((fav) => fav.id === item.id);

   const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const onLive = Math.random() > 0.5;

  return (
    <div className="w-[140px] h-[159px] md:w-[180px] md:h-[200px] rounded-xl overflow-hidden relative group shadow-lg transition-transform hover:scale-105 border border-[#726540]/30">
      <div className="relative z-10 flex flex-col justify-between h-full p-3 text-[#fefcf4]">
        <h3 className="text-center font-bold text-sm md:text-base leading-tight drop-shadow-md h-10 flex items-center justify-center">
          {item.name}
        </h3>

        <div className="flex-1 flex items-center justify-center my-2">
          {type === "athlete" && item.image ? (
            <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden shadow-inner">
              <Image
                src={`/imgs/${item.image}`}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <FaMedal className="text-4xl md:text-5xl text-[#fefcf4]/80 drop-shadow-lg" />
          )}
        </div>

        <div className="flex justify-between items-end pb-1">
          <div className="flex items-center">
            {onLive ? (
              <div className="flex items-center gap-1 text-red-600 animate-pulse px-2 py-1">
                <BsBroadcast size={12} />
              </div>
            ) : (
              <span className="text-xs font-medium opacity-90 text-[#dac07d]">
                Resumen
              </span>
            )}
          </div>

          <button
            onClick={toggleFavorite}
            className="text-[#dac07d] hover:text-amber-600 transition-colors cursor-pointer"
          >
            {isFavorite ? (
              <HiHeart className="w-5 h-5" />
            ) : (
              <HiOutlineHeart className="w-5 h-5 border-[#dac07d]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard