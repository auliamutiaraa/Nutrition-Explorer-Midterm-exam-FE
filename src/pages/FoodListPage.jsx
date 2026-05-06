import { useEffect, useState } from "react";
import ErrorAlert from "../components/ErrorAlert.jsx";
import FoodGrid from "../components/FoodGrid.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { fetchFoods } from "../services/foodApi.js";

const quickSearches = ["healthy", "oat", "yogurt", "salad"];

export default function FoodListPage() {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("healthy");
  const [searchTerm, setSearchTerm] = useState("healthy");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadFoods() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchFoods(query);
        if (!ignore) {
          setFoods(data);
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

    loadFoods();

    return () => {
      ignore = true;
    };
  }, [query, reloadKey]);

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(searchTerm.trim() || "healthy");
  }

  return (
    <section id="home" className="soft-grid">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="max-w-4xl animate-fadeUp">
          <p className="font-semibold text-leaf-700">Discover Food & Health</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Nutrition Explorer
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Jelajahi produk makanan, lihat kalori per 100g, dan buka detail nutrisi penting dalam tampilan yang bersih,
            ringan, dan responsif.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 rounded-lg border border-white bg-white p-3 shadow-soft">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Cari makanan sehat..."
              className="min-h-12 flex-1 rounded-lg border border-leaf-100 bg-leaf-50 px-4 text-base outline-none transition-all duration-300 focus:border-leaf-500 focus:bg-white"
            />
            <button
              type="submit"
              className="min-h-12 rounded-lg bg-leaf-600 px-6 font-bold text-white transition-all duration-300 hover:bg-mist-700"
            >
              Search
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setSearchTerm(item);
                  setQuery(item);
                }}
                className="rounded-full border border-mist-100 px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-leaf-500 hover:bg-leaf-50 hover:text-leaf-700"
              >
                {item}
              </button>
            ))}
          </div>
        </form>

        <div className="mt-8">
          {loading ? <LoadingSpinner /> : null}
          {!loading && error ? <ErrorAlert message={error} onRetry={() => setReloadKey((current) => current + 1)} /> : null}
          {!loading && !error ? <FoodGrid foods={foods} /> : null}
        </div>
      </div>
    </section>
  );
}
