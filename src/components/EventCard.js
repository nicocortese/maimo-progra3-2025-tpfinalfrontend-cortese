"use client";

import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { BsBroadcast } from "react-icons/bs";
import { usePageContext } from "@/contexts/PageContext";
import { useState } from "react";

const EventCard = ({ item, type }) => {
  const { favorites, addFavorite, removeFavorite, categories } = usePageContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const isFavorite = favorites.some((fav) => fav._id === item._id);
  const onLive = Math.random() > 0.5;

  const showModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 2500);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(item._id);
      showModal(`Se eliminó ${item.name} de favoritos`);
    } else {
      const imagePath = item.image ? `/imgs/${item.image}` : null;

      let favoriteItem = {
        _id: item._id,
        athlete: item.name,
        image: imagePath,
        discipline: type === "category" ? item.name : item.discipline,
        country: item.country || "N/A",
        disciplineImg: null,
        countryImg: null,
      };

      if (type === "athlete" && item.categories && categories.length > 0) {
        const disciplineCategory = categories.find((c) => c.name === item.discipline);
        const countryCategory = categories.find((c) => item.categories.includes(c._id) && c.name !== item.discipline);

        if (disciplineCategory?.image) {
           favoriteItem.disciplineImg = `/imgs/${disciplineCategory.image}`;
        }
        if (countryCategory?.image) {
           favoriteItem.countryImg = `/imgs/${countryCategory.image}`;
        }
      }

      addFavorite(favoriteItem);
      showModal(`¡Se agregó ${item.name} a tus favoritos!`);
    }
  };

  const cardLink = type === "athlete" ? `/athletes/${item._id}` : `/categories/${item.slug || item._id}`;

  return (
    <>
      <Link href={cardLink}>
        <div className="w-[159px] h-[220px] md:w-[200px] md:h-[260px] rounded-2xl relative group transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#DAC07D]/10 border border-[#726540]/50 hover:border-[#DAC07D] bg-[#272727] text-[#FEFCF4]">
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {onLive ? (
              <div className="flex items-center gap-1.5  text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                <BsBroadcast  className="text-red-600 w-10 h-10"/>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-[#726540] text-[#FEFCF4] text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-md backdrop-blur-sm">
                <span>RESUMEN</span>
              </div>
            )}
          </div>

          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-[#DAC07D] p-2 rounded-full transition-all backdrop-blur-sm"
          >
            {isFavorite ? (
              <HiHeart className="w-5 h-5 text-[#DAC07D] cursor-pointer" />
            ) : (
              <HiOutlineHeart className="w-5 h-5 text-[#FEFCF4]/70 group-hover:text-[#FEFCF4] cursor-pointer" />
            )}
          </button>

          <div className="relative z-10 flex flex-col h-full p-4">
            
            <div className="flex-1 flex items-center justify-center my-2">
              {item.image ? (
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#726540] shadow-lg group-hover:border-[#DAC07D] transition-all duration-300 bg-[#DAC07D]">
                  <Image
                    src={`/imgs/${item.image}`}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#726540] flex items-center justify-center border-2 border-[#DAC07D] border-dashed text-xs text-[#FEFCF4]/50">
                   Sin img
                </div>
              )}
            </div>

            <div className="text-center mt-auto bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-2 border border-[#726540]/30 transition-colors group-hover:bg-[#1a1a1a]/80">
              <h3 className="font-bold text-sm md:text-base leading-tight text-[#FEFCF4] group-hover:text-[#DAC07D] transition-colors line-clamp-2 mb-1">
                {item.name}
              </h3>
            </div>
          </div>
        </div>
      </Link>

      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black z-60 backdrop-blur-sm" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#272727] rounded-xl shadow-2xl shadow-[#DAC07D]/20 z-70 p-6 flex flex-col items-center gap-4 max-w-xs w-full border border-[#DAC07D]/30">
            <Image src="/imgs/otrologo.png" alt="Logo" width={200} height={200} />
            <p className="text-center text-[#DAC07D] font-semibold">{modalMessage}</p>
            <Link
              href="/favorites"
              className="bg-[#DAC07D] text-[#1a1a1a] font-bold px-5 py-2 rounded hover:bg-[#c5ae70] transition shadow-lg"
            >
              Ir a mis favoritos
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default EventCard;