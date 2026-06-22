import { useEffect, useState } from "react";
import ErrorAlert from "../components/ErrorAlert.jsx";
import FoodGrid from "../components/FoodGrid.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useNutrition } from "../contexts/NutritionContext.jsx";
import { getFoodIcon } from "../utils/foodIcon.js";
import { formatCalories } from "../utils/nutrition.js";

const quickSearches = ["healthy", "oat", "yogurt", "salad"];
const heroImages = [
  "/images/nutrition-hero-1.jpeg",
  "/images/nutrition-hero-2.jpeg",
  "/images/nutrition-hero-3.jpeg",
  "/images/nutrition-hero-4.jpeg",
];
const defaultShelfFoods = [
  {
    code: "default-yogurt",
    product_name: "Greek Yogurt",
    categories: "Dairy and fermented food",
    nutriments: { "energy-kcal_100g": 97 },
  },
  {
    code: "default-salad",
    product_name: "Green Salad",
    categories: "Vegetables and fresh meals",
    nutriments: { "energy-kcal_100g": 46 },
  },
  {
    code: "default-oat",
    product_name: "Oat Bowl",
    categories: "Whole grain breakfast",
    nutriments: { "energy-kcal_100g": 142 },
  },
];

export default function FoodListPage() {
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const {
    foods,
    query,
    loading,
    error,
    retry,
    searchTerm,
    setSearchTerm,
    searchFoods,
    clearSearch,
    recentFoods,
  } = useNutrition();

  function handleSubmit(event) {
    event.preventDefault();
    searchFoods(searchTerm);
  }

  const shelfFoods = recentFoods.length > 0 ? recentFoods : defaultShelfFoods;
  const shelfTitle = recentFoods.length > 0 ? "Terakhir dilihat" : "Balanced picks";
  const shelfLabel = recentFoods.length > 0 ? "Recent Shelf" : "Today Shelf";
  const currentHeroImage = heroImages[activeHeroImage];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroImage((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="soft-grid">
      <section id="home" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="grid min-h-[calc(100vh-116px)] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-4xl animate-fadeUp py-6 lg:py-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-herb-100 bg-white/90 px-6 py-3 text-base font-bold text-herb-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-herb-100">
                <span className="h-3 w-3 rounded-full bg-herb-500" />
                Discover Food & Health
              </div>
              <h1 className="mt-7 max-w-3xl font-display text-6xl font-black leading-[0.95] text-ink dark:text-white sm:text-7xl lg:text-8xl">
                Nutrition Explorer
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-600 dark:text-slate-300 sm:text-xl">
                Cari makanan sehari-hari, bandingkan kalori per 100g, lalu buka ringkasan nutrisi yang mudah dibaca.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                {["Kalori", "Protein", "Lemak", "Karbohidrat"].map((item) => (
                  <span key={item} className="rounded-full border border-white bg-white/90 px-6 py-3 text-base font-bold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative animate-fadeUp">
              <div className="absolute -inset-6 rounded-full bg-herb-100/70 blur-3xl dark:bg-herb-600/20" />
              <div className="relative overflow-hidden rounded-lg shadow-lift">
                <img
                  key={currentHeroImage}
                  src={currentHeroImage}
                  alt="Healthy food inspiration"
                  className="h-[430px] w-full object-cover transition-opacity duration-700 sm:h-[560px] lg:h-[620px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                  <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-extrabold text-leaf-700 shadow-sm backdrop-blur dark:bg-[#050914]/85 dark:text-leaf-100">
                    Food inspiration
                  </div>
                  <div className="flex gap-2">
                    {heroImages.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveHeroImage(index)}
                        aria-label={`Show hero image ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeHeroImage === index ? "w-8 bg-white" : "w-2.5 bg-white/55 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recent-shelf" className="scroll-mt-28 border-y border-white/70 bg-white/60 py-14 backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700 dark:text-leaf-100">{shelfLabel}</p>
              <h2 className="mt-2 font-display text-4xl font-black text-ink dark:text-white">{shelfTitle}</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {shelfFoods.map((food, index) => (
              <article key={food.code} className="group overflow-hidden rounded-lg border border-white bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-slate-700 dark:bg-slate-900">
                <div className="relative grid h-44 place-items-center bg-gradient-to-br from-herb-50 via-white to-mist-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-herb-700 shadow-sm dark:bg-[#050914]/80 dark:text-herb-100">
                    #{index + 1}
                  </div>
                  <div className="relative grid h-28 w-28 place-items-center rounded-full bg-white text-6xl shadow-soft transition-transform duration-500 group-hover:scale-110 dark:bg-slate-950">
                    <div className="absolute inset-3 rounded-full border border-herb-100 bg-gradient-to-br from-white to-herb-50 dark:border-white/10 dark:from-slate-900 dark:to-slate-800" />
                    <span className="relative">{getFoodIcon(food)}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-mist-700 dark:text-mist-100">{food.categories || "Nutrition item"}</p>
                  <h3 className="mt-2 line-clamp-2 min-h-14 text-xl font-extrabold text-ink dark:text-white">{food.product_name}</h3>
                  <div className="mt-4 flex items-center justify-between rounded-lg bg-leaf-50 px-4 py-3 dark:bg-slate-800">
                    <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-300">Kalori / 100g</span>
                    <span className="text-lg font-black text-leaf-700 dark:text-leaf-100">{formatCalories(food.nutriments)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <form id="search-foods" onSubmit={handleSubmit} className="scroll-mt-28 rounded-lg border border-white bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <label htmlFor="food-search" className="mb-2 block text-sm font-bold text-ink dark:text-white">
            Cari makanan atau bahan makanan
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <input
                id="food-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Contoh: milk, oat, salad, chicken..."
                className="min-h-12 w-full rounded-lg border border-leaf-100 bg-leaf-50 px-4 pr-20 text-base outline-none transition-all duration-300 focus:border-leaf-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm font-bold text-slate-500 transition-all duration-300 hover:bg-white hover:text-leaf-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
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
                  searchFoods(item);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  query === item
                    ? "border-leaf-500 bg-leaf-50 text-leaf-700 dark:bg-leaf-600 dark:text-white"
                    : "border-mist-100 text-slate-600 hover:border-leaf-500 hover:bg-leaf-50 hover:text-leaf-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-700 dark:text-leaf-100">Food List</p>
                <h2 className="mt-1 text-2xl font-extrabold text-ink dark:text-white">Hasil untuk "{query}"</h2>
              </div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">{foods.length} item ditemukan</p>
            </div>
          ) : null}

          {loading ? <LoadingSpinner /> : null}
          {!loading && error ? <ErrorAlert message={error} onRetry={retry} /> : null}
          {!loading && !error && foods.length > 0 ? <FoodGrid foods={foods} /> : null}
          {!loading && !error && foods.length === 0 ? (
            <div className="rounded-lg border border-dashed border-leaf-200 bg-white/80 p-8 text-center shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-4xl">{"\u{1F50D}"}</p>
              <h3 className="mt-3 text-xl font-extrabold text-ink dark:text-white">Makanan tidak ditemukan</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Coba gunakan kata kunci lain seperti milk, oat, salad, atau chicken.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
