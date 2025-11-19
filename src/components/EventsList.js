"use client";

import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import EventCard from "./EventCard";

const EventsList = () => {
  const {
    athletes,
    categories,
    favorites, 
    addFavorite,
    removeFavorite,
    getAthletes,
    getCategories
  } = usePageContext();

  useEffect(() => {
    if(!athletes || athletes.length === 0) getAthletes();
    if(!categories || categories.length === 0) getCategories();
  }, []);

 const handleToggleFavorite  = (item) => {
  const event = favorites.filter(fav => 
    fav.athlete === item.name || fav.name === item.name
  )
  if(event.length > 0) {
    removeFavorite(item.name)
  } else {
    addFavorite({
      name: item.name,
      image: item.Image || "",
      discipline: item.discipline || item.name,
    })
  }
 }

 const checkIsFavorite = (itemName) => {
  const cardFound = favorites.filter((fav) =>
  fav.athlete === itemName || fav.name === itemName
  )
  return cardFound.length > 0;
 }

 const handleFavoriteClick = (item) => {
  if (checkIsFavorite(item.name)) {
    removeFavorite(item.name)
  } else {
    addFavorite({
      name: item.name, 
      image: item.Image || "",
      discipline: item.discipline || item.name,
    })
  }
 };

 return (
  <section className="w-full py-6 px-4 md:px-0 relative z-10">
    <h2 className="text-2xl md:text-3-xl font-bold text-[#fefcf4] mb-6">
      Eventos Olímpicos
    </h2>
    <div className="flex gap-4 overflow-x-auto pb-8">
    {categories && categories.map((cat, index) => (
      index < 3 && (
        <div key={`cat-${index}`} className="shrink-0">
          <EventCard
          item={cat}
          type="category"
          isFavorite={checkIsFavorite(cat.name)}
          onToggleFavorite={handleFavoriteClick}
          />
          </div>
      )
    ))}
    {athletes && athletes.map((ath, index) => {
      index < 5 && (
        <div key={`ath-${index}`} className="shrink-0">
          <EventCard
          item={ath}
          type="athlete"
          isFavorite={checkIsFavorite(ath.name)}
          onToggleFavorite={handleFavoriteClick}
          />
          </div>
      )
    })}
      </div>
  </section>
 )
}

export default EventsList;