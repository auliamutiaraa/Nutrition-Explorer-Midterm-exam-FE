import { createContext, useContext, useMemo, useState } from "react";
import { useFoods } from "../hooks/useFoods.js";
import { useRecentFoods } from "../hooks/useRecentFoods.js";

const NutritionContext = createContext(null);

export function NutritionProvider({ children }) {
  const foodsState = useFoods("healthy");
  const [searchTerm, setSearchTerm] = useState("healthy");
  const recentFoods = useRecentFoods();

  function searchFoods(nextQuery, options = {}) {
    const cleanQuery = nextQuery.trim() || "healthy";
    setSearchTerm(cleanQuery);
    foodsState.setQuery(cleanQuery, options);
  }

  function clearSearch() {
    setSearchTerm("");
    foodsState.setQuery("healthy", { allowFallback: true });
  }

  const value = useMemo(
    () => ({
      ...foodsState,
      searchTerm,
      setSearchTerm,
      searchFoods,
      clearSearch,
      recentFoods,
    }),
    [foodsState, searchTerm, recentFoods]
  );

  return <NutritionContext.Provider value={value}>{children}</NutritionContext.Provider>;
}

export function useNutrition() {
  const context = useContext(NutritionContext);

  if (!context) {
    throw new Error("useNutrition must be used inside NutritionProvider");
  }

  return context;
}
