"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

import axios from "axios";
import { FaHeart } from "react-icons/fa";


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

const getOneAthlete = useCallback(async (id) => {
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

const addFavorite = useCallback((item) => {
    const exists = favorites.some((fav) => fav.athlete === athlete.name  || fav.athlete === item.name);
    if(exists) return;

    const body = {
      athlete: item.name || item.athlete,
      image: item.image,
      discipline: item.discipline || item.category?.[0],
      country: item.country,
      _id: item._id || item.athlete || item.name
    }

    setFavorites(prev => [...prev, body]);
  }, [favorites])

    const removeFavorite = useCallback((athleteName) => {
    setFavorites(prev => prev.filter(f => f.athlete !== athleteName));
  }, []);


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