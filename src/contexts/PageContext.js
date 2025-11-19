"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

import axios from "axios";

const PageContext = createContext();

export const PageContextProvider = ({ children }) => {
const [athletes, setAthletes] = useState([]);
const [athlete, setAthlete] = useState([]);
const [categories, setCategories] = useState([]);
const [favorites, setFavorites] = useState([]);
const [loading, setLoading] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const toggleSidebar =  () => setSidebarOpen((prev) => !prev);

const getAthletes = useCallback(async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${API_URL}/athletes`);
    setAthletes(res.data.athletes);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}, []);

const getOneAthlete = useCallback(async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${API_URL}/athletes/${id}`);
    setAthlete(res.data.athlete);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}, []);

const getCategories = useCallback(async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${API_URL}/categories`);
    setCategories(res.data.categories || []);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}, []);

const addFavorite = useCallback(async (athlete) => {
  try {
    const body = {
      athlete: athlete.name,
      image: athlete.image,
      discipline: athlete.discipline,
    }
    const res = await axios.post(`${API_URL}/favorites`, body);
    setFavorites((prev) => [...prev, res.data.favorite])
  } catch (error) {
    console.log(error)
  }
});

const removeFavorite = useCallback((athleteName) => {
  setFavorites((prev) => prev.filter((f) => f.athlete !== athleteName));
}, [])

useEffect(() => {
  getAthletes();
  getCategories();
}, []);


  return (
    <PageContext.Provider
      value={{
        athletes,
        athlete,
        categories,
        favorites,
        loading,
        getAthletes,
        getOneAthlete,
        getCategories,
        addFavorite,
        removeFavorite,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be use within a ShopContextProvider");
  }
  return context;
}