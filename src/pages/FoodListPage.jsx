import { useEffect, useState } from "react";
import ErrorAlert from "../components/ErrorAlert.jsx";
import FoodGrid from "../components/FoodGrid.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { fetchFoods } from "../services/foodApi.js";

const quickSearches = ["healthy", "oat", "yogurt", "salad"];

const apiOptions = [
  {
    name: "Edamam Food Database API",
    description: "Detail nutrisi makanan.",
    tone: "bg-leaf-50 text-leaf-700 border-leaf-100",
  },
  {
    name: "USDA FoodData Central API",
    description: "Data gizi resmi yang dipakai website ini.",
    tone: "bg-mist-50 text-mist-700 border-mist-100",
  },
  {
    name: "Nutritionix API",
    description: "Makanan populer dan nutrisi yang lebih ringan.",
    tone: "bg-amber-50 text-amber-700 border-amber-100",
  },
];

export default function FoodListPage() {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("healthy");
  const [searchTerm, setSearchTerm] = useState("healthy");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(searchTerm.trim() || "healthy");
  }

  return (
    <section id="home" className="soft-grid">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="animate-fadeUp">
            <p className="font-semibold text-leaf-700">Discover Food & Health</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
              Nutrition Explorer
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Jelajahi produk makanan, lihat kalori per 100g, dan buka detail nutrisi penting dalam tampilan yang bersih,
              ringan, dan responsif.
            </p>
          </div>

          <div className="animate-fadeUp rounded-lg border border-white bg-white/84 p-5 shadow-soft backdrop-blur" id="about">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-mist-100 text-3xl animate-floaty">
                🥛
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">Health shelf, not a boring catalog</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Data diambil dari USDA FoodData Central API dengan state loading, error handling, dan halaman detail
                  memakai React Router.
                </p>
              </div>
            </div>
          </div>
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
          {!loading && error ? <ErrorAlert message={error} onRetry={() => setQuery(`${query}`)} /> : null}
          {!loading && !error ? <FoodGrid foods={foods} /> : null}
        </div>

        <section className="mt-12 rounded-lg border border-white bg-white/88 p-5 shadow-soft backdrop-blur sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700">Public API</p>
              <h2 className="mt-2 text-2xl font-extrabold text-ink">Nutrition data sources</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Pilihan API dari brief desain. Fetch aktif di project ini menggunakan USDA FoodData Central.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {apiOptions.map((api) => (
              <article key={api.name} className={`rounded-lg border p-4 ${api.tone}`}>
                <h3 className="text-base font-extrabold">{api.name}</h3>
                <p className="mt-2 text-sm leading-6 opacity-90">{api.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
