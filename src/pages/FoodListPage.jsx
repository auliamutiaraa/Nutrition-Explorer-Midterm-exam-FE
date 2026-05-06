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

  function clearSearch() {
    setSearchTerm("");
    setQuery("healthy");
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

        <form onSubmit={handleSubmit} className="mt-10 rounded-lg border border-white bg-white p-4 shadow-soft">
          <label htmlFor="food-search" className="mb-2 block text-sm font-bold text-ink">
            Cari makanan atau bahan makanan
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <input
                id="food-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Contoh: milk, oat, salad, chicken..."
                className="min-h-12 w-full rounded-lg border border-leaf-100 bg-leaf-50 px-4 pr-20 text-base outline-none transition-all duration-300 focus:border-leaf-500 focus:bg-white"
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm font-bold text-slate-500 transition-all duration-300 hover:bg-white hover:text-leaf-700"
                >
                  Clear
                </button>
              ) : null}
            </div>
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
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  query === item
                    ? "border-leaf-500 bg-leaf-50 text-leaf-700"
                    : "border-mist-100 text-slate-600 hover:border-leaf-500 hover:bg-leaf-50 hover:text-leaf-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </form>

        <div id="foods" className="mt-8 scroll-mt-28">
          {!loading && !error ? (
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700">Food List</p>
                <h2 className="mt-1 text-2xl font-extrabold text-ink">Hasil untuk "{query}"</h2>
              </div>
              <p className="text-sm font-semibold text-slate-500">{foods.length} item ditemukan</p>
            </div>
          ) : null}

          {loading ? <LoadingSpinner /> : null}
          {!loading && error ? <ErrorAlert message={error} onRetry={() => setReloadKey((current) => current + 1)} /> : null}
          {!loading && !error && foods.length > 0 ? <FoodGrid foods={foods} /> : null}
          {!loading && !error && foods.length === 0 ? (
            <div className="rounded-lg border border-dashed border-leaf-200 bg-white/80 p-8 text-center shadow-soft">
              <p className="text-4xl">{"\u{1F50D}"}</p>
              <h3 className="mt-3 text-xl font-extrabold text-ink">Makanan tidak ditemukan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Coba gunakan kata kunci lain seperti milk, oat, salad, atau chicken.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
