"use client";

import { usePageContext } from "@/contexts/PageContext";
import AthleteCard from "./AthleteCard";

const AthleteGrid = () => {
  const { athletes, categories } = usePageContext();

  if (!athletes || athletes.length === 0) {
    return (
      <div className="text-[#fefcf4] text-center py-20">
        Cargando atletas...
      </div>
    );
  }

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-24 mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#fefcf4] uppercase tracking-tight border-l-4 border-[#dac07d] pl-6">
          Nuestros Atletas
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {athletes.map((athlete) => {
          let disciplineImg = null;
          let countryImg = null;

          const athleteCountry = (athlete.country || "").trim().toLowerCase();

          if (athlete.categories && athlete.categories.length > 0) {
            athlete.categories.forEach((item) => {
              let categoryData = null;

              if (item.name) {
                categoryData = item;
              } else if (categories) {
                categoryData = categories.find((c) => c._id === item);
              }

              if (categoryData && categoryData.name) {
                const catName = categoryData.name.trim().toLowerCase();

                if (catName === athleteCountry) {
                  countryImg = categoryData.image;
                } else {
                  disciplineImg = categoryData.image;
                }
              }
            });
          }

          return (
            <AthleteCard
              key={athlete._id}
              athlete={athlete}
              disciplineImage={disciplineImg}
              countryImage={countryImg}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AthleteGrid;
