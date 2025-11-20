"use client";

import { usePageContext } from "@/contexts/PageContext";
import { FormContainer } from "@/components/FormContainer";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = usePageContext();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Mis Favoritos</h1>
      <FormContainer />
      <div className="mt-6">
        {favorites.length === 0 ? (
          <p className="text-gray-500">No hay favoritos aún.</p>
        ) : (
          favorites.map((fav, index) => (
            <div
              key={fav._id || `${fav.athlete}-${index}`}
              className="flex items-center gap-4 border p-3 my-2 rounded justify-between"
            >
              <img
                src={fav.image}
                alt={fav.athlete}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <p>{fav.athlete}</p>
                <div className="flex gap-2 items-center">
                  {fav.discipline?.image && (
                    <img
                      src={fav.discipline.image}
                      alt={fav.discipline.name}
                      className="w-6 h-6"
                    />
                  )}
                  <span>{fav.discipline?.name}</span>
                  {fav.country?.image && (
                    <img
                      src={fav.country.image}
                      alt={fav.country.name}
                      className="w-6 h-6"
                    />
                  )}
                  <span>{fav.country?.name}</span>
                </div>
              </div>
              <button
                onClick={() => removeFavorite(fav.athlete)}
                className="text-red-500 hover:text-red-700"
              >
                Quitar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
