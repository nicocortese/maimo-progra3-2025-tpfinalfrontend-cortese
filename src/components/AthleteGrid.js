"use client";

import { usePageContext } from "@/contexts/PageContext";
import AthleteCard from "./AthleteCard";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const AthleteGrid = () => {
  const { athletes, categories, favorites, addFavorite, removeFavorite } = usePageContext();

  
  const electedPositions = [6, 8, 10, 14, 16, 18, 20, 15];

  const featuredAthletes = electedPositions
    .map(index => athletes[index])
    .filter(athlete => athlete);

  let athleteCardsList = null;

  if (featuredAthletes.length > 0) {
    athleteCardsList = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredAthletes.map((athlete, index) => {
          const matchCategory = categories.find(cat => cat.name === athlete.discipline);
          const disciplineImage = matchCategory ? matchCategory.image : null;

     
          const isFavorite = favorites.some(fav => fav._id === athlete._id || fav.athlete === athlete.name);

          
          const toggleFavorite = () => {
            if (isFavorite) {
              removeFavorite(athlete._id || athlete.name);
            } else {
              addFavorite({
                athlete: athlete.name,
                image: athlete.image,
                discipline: athlete.discipline,
                country: athlete.country,
                _id: athlete._id || athlete.name, 
              });
            }
          };

          return (
            <AthleteCard
              key={athlete._id || `${athlete.name}-${index}`} 
              athlete={athlete}
              disciplineImage={disciplineImage}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
    );
  }

  return (
    <section className="w-full py-8 px-4 md:px-0">
      <div className="flex justify-between items-end mb-8 px-4 md:px-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#fefcf4]">
            Atletas Destacados
          </h2>
          <p className="text-sm text-[#fefcf4]/60 mt-1 hidden md:block">
            Selección manual de las figuras de París 2024.
          </p>
        </div>

        <Link
          href="#"
          className="flex items-center gap-2 text-[#dac07d] text-sm font-semibold hover:text-white transition-colors group"
        >
          Ver todos <HiArrowRight className="group-hover:translate-x-1 transition-transform"/>
        </Link>
      </div>

      {athleteCardsList}
    </section>
  );
};

export default AthleteGrid;
