import { useEffect, useState } from "react";
import { getRecentFoods } from "../utils/recentFoods.js";

export function useRecentFoods() {
  const [recentFoods, setRecentFoods] = useState([]);

  useEffect(() => {
    function syncRecentFoods() {
      setRecentFoods(getRecentFoods());
    }

    syncRecentFoods();
    window.addEventListener("focus", syncRecentFoods);

    return () => {
      window.removeEventListener("focus", syncRecentFoods);
    };
  }, []);

  return recentFoods;
}
