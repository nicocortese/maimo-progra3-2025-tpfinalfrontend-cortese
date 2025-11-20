"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";

const AthleteDetail = ({ id }) => {
  const {
    athlete,
    athletes,
    loading,
    getOneAthlete,
    favorites,
    addFavorite,
    removeFavorite,
    categories,
  } = usePageContext();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (id) getOneAthlete(id);
  }, [id]);

  if (loading || !athlete?._id) return <Loading />;

  const disciplineData = categories?.find(
    (cat) => cat.slug === athlete.discipline?.toLowerCase()
  );
  const countryData = categories?.find(
    (cat) => cat.slug === athlete.country?.toLowerCase()
  );

  const handleSearch = () => {
    const text = search.toLowerCase();
    const match = athletes.find((a) => a.name.toLowerCase() === text);
    if (match) window.location.href = `/athletes/${match._id}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const isFavorite = favorites.some((fav) => fav.athlete === athlete.name);

  const handleToggleFavorite = () => {
    const isFav = favorites.some((fav) => fav.athlete === athlete.name);
    if (isFav) removeFavorite(athlete.name);
    else
      addFavorite({
        athlete: athlete.name,
        image: athlete.image,
        discipline: athlete.discipline,
        country: athlete.country,
      });
  };

  return (
    <section className="w-full min-h-screen bg-[#fefcf4] py-14 px-8">
      <div className="relative w-300">
        <input
          type="text"
          placeholder="Buscar atletas..."
          className="w-full bg-[#272727] text-[#fefcf4] py-2 pl-10 pr-4 rounded-full border border-[#726540]/30 focus:outline-none focus:border-[#dac07d]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2 flex flex-col md:flex-row items-center gap-8 bg-[#fefcf4] p-8 rounded-2xl shadow-lg border border-[#726540]/10"></div>

        <div className="relative w-40 h-40 md:w-52 md:h-52 shrink-0 rounded-full overflow-hidden border-4 border-[#dac07d] shadow-xl">
          <Image
            src={`/imgs/${athlete.image}`}
            alt={athlete.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold text-[#272727]">{athlete.name}</h1>
          <button
            onClick={handleToggleFavorite}
            className="mt-4 text-4xl text-[#dac07d] hover:text-amber-500 transition-colors cursor-pointer"
          >
            {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
          </button>
        </div>
      </div>

      <div className="bg-[#dac07d]/10 p-6 rounded-2xl shadow-lg border border-[#726540]/10 mt-8 flex gap-8 flex-wrap">
        <div>
          <h2 className="text-xl font-bold mb-2">Disciplina</h2>
          <p>{athlete.discipline}</p>
          {disciplineData?.image && (
            <div className="relative w-28 h-28 mt-2">
              <Image
                src={disciplineData.image}
                alt={disciplineData.name}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">País</h2>
          <p>{athlete.country}</p>
          {countryData?.image && (
            <div className="relative w-28 h-28 mt-2">
              <Image
                src={countryData.image}
                alt={athlete.country}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-14 bg-gray-100 p-6 rounded-2xl shadow-lg border border-[#726540]/10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Historial deportivo</h2>
        {athlete.history?.length > 0 ? (
          athlete.history.map((item, index) => (
            <div
              key={item._id || `${item.event}-${index}`}
              className="border-b border-gray-200 py-4"
            >
              <p className="text-lg font-semibold">{item.event}</p>
              <p>Puesto: {item.position}</p>
            </div>
          ))
        ) : (
          <p>No hay historial registrado.</p>
        )}
      </div>

      <div className="mt-6 bg-gray-100 p-6 rounded-2xl shadow-lg border border-[#726540]/10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Datos personales</h2>
        {athlete.history?.length > 0 &&
          athlete.history.map((item, index) => (
            <div key={item._id || `${item.place}-${index}`} className="mb-2">
              <p>Edad: {item.age}</p>
              <p>Lugar: {item.place}</p>
              <p>Fecha: {new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AthleteDetail;
