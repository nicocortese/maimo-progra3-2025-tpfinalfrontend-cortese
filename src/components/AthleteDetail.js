"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";
import { HiHeart, HiOutlineHeart, HiArrowLeft } from "react-icons/hi2";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTrophy,
  FaMedal,
} from "react-icons/fa";

const AthleteDetail = ({ id }) => {
  const {
    athlete,
    getOneAthlete,
    loading,
    athletes,
    favorites,
    addFavorite,
    removeFavorite,
    categories,
  } = usePageContext();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (id) getOneAthlete(id);
  }, [id, getOneAthlete]);

  if (loading || !athlete?._id) return <Loading />;

  let disciplineImg = null;
  let countryImg = null;

  const clean = (str) => str?.trim().toLowerCase() || "";

  if (athlete.categories && Array.isArray(athlete.categories)) {
    athlete.categories.forEach((cat) => {
      if (typeof cat === "object" && cat.name) {
        if (clean(cat.name) === clean(athlete.country)) {
          countryImg = cat.image;
        } else {
          disciplineImg = cat.image;
        }
      }
    });
  }

  if (!disciplineImg && categories) {
    const foundDisc = categories.find(
      (c) => clean(c.name) === clean(athlete.discipline)
    );
    if (foundDisc) disciplineImg = foundDisc.image;
  }
  if (!countryImg && categories) {
    const foundCountry = categories.find(
      (c) => clean(c.name) === clean(athlete.country)
    );
    if (foundCountry) countryImg = foundCountry.image;
  }

  const lastHistoryItem = athlete.history?.[athlete.history.length - 1];
  const athleteAge = athlete.age || lastHistoryItem?.age;
  const athleteDate = athlete.date || lastHistoryItem?.date;
  const athletePlace = athlete.place || lastHistoryItem?.place;

  const isFavorite = favorites.some((fav) => fav._id === athlete._id);

  const showModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 2500);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(athlete._id);
      showModal(`Se eliminó ${athlete.name} de favoritos`);
    } else {
      const favoriteObj = {
        _id: athlete._id,
        athlete: athlete.name,
        image: athlete.image ? `/imgs/${athlete.image}` : null,
        discipline: athlete.discipline,
        country: athlete.country,
        disciplineImg: disciplineImg ? `/imgs/${disciplineImg}` : null,
        countryImg: countryImg ? `/imgs/${countryImg}` : null,
      };

      addFavorite(favoriteObj);
      showModal(`¡Se agregó ${athlete.name} a tus favoritos!`);
    }
  };

  const handleSearch = () => {
    const text = search.toLowerCase();
    const match = athletes.find((a) => a.name.toLowerCase().includes(text));
    if (match) window.location.href = `/athletes/${match._id}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const getImgUrl = (img) =>
    img ? (img.startsWith("http") ? img : `/imgs/${img}`) : null;

  return (
    <section className="w-full min-h-screen bg-[#fefcf4]">
      <div className="w-full bg-[#272727] pb-16 pt-8 px-6 md:px-12 shadow-md relative">
        <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#dac07d] hover:text-[#fefcf4] transition-colors font-medium self-start md:self-center cursor-pointer"
          >
            <HiArrowLeft size={20} /> Volver al Inicio
          </Link>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar otro atleta..."
              className="w-full bg-[#fefcf4]/5 text-[#fefcf4] py-2 pl-10 pr-4 rounded-full border border-[#dac07d]/20 focus:outline-none focus:border-[#dac07d] focus:bg-[#272727] transition-colors placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#dac07d]/70" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="relative w-48 h-48 md:w-60 md:h-60 shrink-0 rounded-full overflow-hidden border-[5px] border-[#dac07d] shadow-2xl bg-[#726540]">
            <Image
              src={getImgUrl(athlete.image)}
              alt={athlete.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-[#fefcf4] uppercase tracking-tight leading-none">
              {athlete.name}
            </h1>
            <div className="flex items-center gap-3 mt-4 bg-[#dac07d]/10 px-4 py-2 rounded-lg border border-[#dac07d]/20">
              <span className="text-[#dac07d] text-xl font-semibold tracking-widest uppercase">
                {athlete.discipline}
              </span>
            </div>
            <button
              onClick={handleToggleFavorite}
              className="mt-6 flex items-center gap-2 bg-[#dac07d] text-[#272727] px-6 py-2 rounded-full font-bold hover:bg-[#bfa25f] transition-colors shadow-lg cursor-pointer"
            >
              {isFavorite ? (
                <>
                  {" "}
                  <HiHeart className="text-xl" /> En Favoritos{" "}
                </>
              ) : (
                <>
                  {" "}
                  <HiOutlineHeart className="text-xl" /> Agregar{" "}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#dac07d] h-full flex flex-col justify-between">
            <h2 className="text-xs font-bold text-[#726540] uppercase tracking-wider mb-3">
              Disciplina
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-[#272727] leading-tight">
                {athlete.discipline}
              </p>
              {disciplineImg && (
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src={getImgUrl(disciplineImg)}
                    alt="Disciplina"
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#dac07d] h-full flex flex-col justify-between">
            <h2 className="text-xs font-bold text-[#726540] uppercase tracking-wider mb-3">
              País
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-[#272727] leading-tight">
                {athlete.country}
              </p>
              {countryImg && (
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src={getImgUrl(countryImg)}
                    alt="País"
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#dac07d] h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-[#726540] uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaBirthdayCake /> Fecha Nacimiento
              </h2>
              <p className="text-xl font-bold text-[#272727]">
                {athleteDate
                  ? new Date(athleteDate).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            {athleteAge && (
              <p className="text-sm text-gray-500 mt-2 pt-2 border-t border-gray-100">
                {athleteAge} años
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#dac07d] h-full flex flex-col justify-between">
            <h2 className="text-xs font-bold text-[#726540] uppercase tracking-wider mb-3 flex items-center gap-2">
              <FaMapMarkerAlt /> Lugar Nacimiento
            </h2>
            <div className="flex items-center h-full">
              <p className="text-lg font-bold text-[#272727] leading-snug">
                {athletePlace || "No disponible"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#272727] text-[#fefcf4] p-6 rounded-xl shadow-lg h-full">
            <h2 className="text-xl font-bold mb-6 border-b border-[#dac07d]/30 pb-3 flex items-center gap-2">
              <FaTrophy className="text-[#dac07d]" /> Medallero
            </h2>

            {athlete.medals ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-2 hover:bg-[#ffffff]/5 rounded transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/imgs/oro.png"
                        alt="Oro"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-semibold">Oro</span>
                  </div>
                  <span className="text-2xl font-bold text-[#dac07d]">
                    {athlete.medals.gold || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-[#ffffff]/5 rounded transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/imgs/plata.png"
                        alt="Plata"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-semibold text-gray-300">Plata</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {athlete.medals.silver || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-[#ffffff]/5 rounded transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/imgs/bronce.png"
                        alt="Bronce"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-semibold text-[#ad8a56]">Bronce</span>
                  </div>
                  <span className="text-2xl font-bold">
                    {athlete.medals.bronze || 0}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 italic">Sin medallas registradas.</p>
            )}
          </div>
        </div>

        
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#dac07d] h-full">
            <div className="flex items-center gap-3 mb-6 border-b pb-3 border-gray-200">
              <FaMedal className="text-[#dac07d] text-2xl" />
              <h2 className="text-2xl font-bold text-[#272727]">
                Historial de Competencias
              </h2>
            </div>

            {athlete.history && athlete.history.length > 0 ? (
              <div className="flex flex-col gap-4">
                {athlete.history
                  .filter((item) => item.event)
                  .map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-[#fefcf4] hover:border-[#dac07d]/30 border border-transparent transition-all shadow-sm"
                    >
                      <div className="mb-3 sm:mb-0">
                        <p className="font-bold text-lg text-[#272727] leading-tight">
                          {item.event}
                        </p>
                        {(item.city || item.year) &&
                          !item.event.includes(item.year) && (
                            <p className="text-sm text-gray-500 mt-1 font-medium">
                              {item.city} {item.year ? `- ${item.year}` : ""}
                            </p>
                          )}
                      </div>

                      <div className="shrink-0 self-start sm:self-center">
                        <span className="inline-flex items-center justify-center bg-[#272727] text-[#dac07d] px-4 py-2 rounded-lg font-bold text-sm shadow-md border border-[#dac07d]/20 whitespace-nowrap">
                          {item.position}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No hay historial disponible.
              </p>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#272727] rounded-xl shadow-2xl shadow-[#dac07d]/20 z-70 p-6 flex flex-col items-center gap-4 max-w-xs w-full border border-[#dac07d]/30">
            <Image
              src="/imgs/otrologo.png"
              alt="Logo"
              width={200}
              height={200}
            />
            <p className="text-center text-[#dac07d] font-semibold">
              {modalMessage}
            </p>
            <Link
              href="/favorites"
              className="bg-[#dac07d] text-[#272727] font-bold px-5 py-2 rounded hover:bg-[#c5ae70] transition shadow-lg cursor-pointer"
            >
              Ir a mis favoritos
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default AthleteDetail;
