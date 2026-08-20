/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";

const MangaContext = createContext();

export const useMangaContext = () => useContext(MangaContext);

export const MangaProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem("favorites");
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (manga) => {
    setFavorites((prev) => [...prev, manga]);
  };

  const removeFromFavorites = (mangaId) => {
    setFavorites((prev) => 
        prev.filter((manga) => manga.mal_id !== mangaId)
    );
  };

  const isFavorite = (mangaId) => {
    return (
        favorites.some((manga) => manga.mal_id === mangaId)
    );
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MangaContext.Provider value={value}>{children}</MangaContext.Provider>
  );
};