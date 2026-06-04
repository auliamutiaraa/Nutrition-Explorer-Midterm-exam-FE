import { useEffect, useState } from "react";
import { fetchFoodByCode } from "../services/foodApi.js";
import { saveRecentFood } from "../utils/recentFoods.js";

export function useFoodDetail(code) {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadDetail() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchFoodByCode(code);
        if (!ignore) {
          setFood(data);
          saveRecentFood(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      ignore = true;
    };
  }, [code]);

  return {
    food,
    loading,
    error,
  };
}
