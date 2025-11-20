"use client";

import { useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { FormContainer } from "@/components/FormContainer";
import Image from "next/image";


export default function FavoritesPage() {
  const { favorites, removeFavorite } = usePageContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const handleShowModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 2500);
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#1a1a1a] text-[#fefcf4]">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#dac07d]">Mis Favoritos</h1>

      <FormContainer showModal={handleShowModal} />

      <div className="mt-8 grid gap-4">
        {favorites.length === 0 ? (
          <p className="text-gray-400 italic">No tienes favoritos aún.</p>
        ) : (
          favorites.map((fav) => (
            <div key={fav._id} className="flex items-center gap-4 p-4 bg-[#272727] rounded-xl border border-[#dac07d]/20 shadow-lg">
              
              {/* PROTECCIÓN DE IMAGEN: Si fav.image es válida, la muestra. Si no, muestra un cuadro gris */}
              <div className="relative w-[60px] h-[60px] shrink-0">
                {fav.image && fav.image.startsWith('/') ? (
                  <Image 
                    src={fav.image} 
                    alt={fav.athlete} 
                    fill 
                    className="rounded-full object-cover border-2 border-[#dac07d]" 
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#333] border-2 border-[#dac07d] flex items-center justify-center text-xs text-gray-500">
                    Sin Foto
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#DAC07D] text-lg truncate">{fav.athlete}</p>
                <p className="text-sm text-gray-400">{fav.country}</p>
                
                <div className="flex gap-2 mt-2">
                  {fav.countryImg && fav.countryImg.startsWith('/') && (
                    <Image src={fav.countryImg} alt="País" width={24} height={24} title="País" />
                  )}
                  {fav.disciplineImg && fav.disciplineImg.startsWith('/') && (
                    <Image src={fav.disciplineImg} alt={fav.discipline} width={24} height={24} title={fav.discipline} />
                  )}
                </div>
              </div>

              <button
                onClick={() => removeFavorite(fav._id)}
                className="text-red-400 hover:text-red-300 font-semibold text-sm px-3 py-1 border border-red-400/30 rounded hover:bg-red-400/10 transition"
              >
                Quitar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal simple */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#272727] p-6 rounded-xl text-white text-center shadow-lg border border-[#dac07d]">
            {modalMessage}
          </div>
        </div>
      )}
    </div>
  );
}