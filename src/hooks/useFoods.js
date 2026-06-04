import { useEffect, useState } from "react";
import { fetchFoods } from "../services/foodApi.js";

export function useFoods(initialQuery = "healthy") {
  const [foods, setFoods] = useState([]);
  const [searchRequest, setSearchRequest] = useState({
    query: initialQuery,
    allowFallback: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const { query, allowFallback } = searchRequest;

  useEffect(() => {
    let ignore = false;

    async function loadFoods() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchFoods(query, { allowFallback });
        if (!ignore) {
          setFoods(data);
        }
      } catch (err) {
        if (!ignore) {
          setFoods([]);
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadFoods();

    return () => {
      ignore = true;
    };
  }, [query, allowFallback, reloadKey]);

  function setQuery(nextQuery, options = {}) {
    setSearchRequest({
      query: nextQuery,
      allowFallback: options.allowFallback ?? false,
    });
  }

  function retry() {
    setReloadKey((current) => current + 1);
  }

  return {
    foods,
    query,
    setQuery,
    loading,
    error,
    retry,
  };
}
