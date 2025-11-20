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
  const [athlete, setAthlete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

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
  }, [API_URL]);

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
  }, [API_URL]);

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
  }, [API_URL]);

  const addFavorite = useCallback((favoriteItem) => {
    setFavorites((prev) => {
      // Evitar duplicados
      if (prev.some(f => f._id === favoriteItem._id)) return prev;
      return [...prev, favoriteItem];
    });
  }, []);

  const removeFavorite = useCallback((favoriteId) => {
    setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
  }, []);

  const createOrder = useCallback(async (orderData) => {
    await axios.post(`${API_URL}/orders`, orderData);
  }, [API_URL]);

  useEffect(() => {
    getAthletes();
    getCategories();
  }, [getAthletes, getCategories]);

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
        createOrder,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context)
    throw new Error("usePageContext must be used within a PageContextProvider");
  return context;
};