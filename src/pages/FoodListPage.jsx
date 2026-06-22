import ErrorAlert from "../components/ErrorAlert.jsx";
import FoodGrid from "../components/FoodGrid.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useNutrition } from "../contexts/NutritionContext.jsx";
import { getFoodIcon } from "../utils/foodIcon.js";
import { formatCalories } from "../utils/nutrition.js";

const quickSearches = ["healthy", "oat", "yogurt", "salad"];
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

  return (
    <section id="home" className="soft-grid">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-4xl animate-fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border border-leaf-100 bg-white/90 px-4 py-2 text-sm font-bold text-leaf-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-leaf-100">
              <span className="h-2 w-2 rounded-full bg-leaf-500" />
              Discover Food & Health
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-ink dark:text-white sm:text-5xl lg:text-6xl">
              Nutrition Explorer
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Cari makanan sehari-hari, bandingkan kalori per 100g, lalu buka ringkasan nutrisi yang mudah dibaca.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["Kalori", "Protein", "Lemak", "Karbohidrat"].map((item) => (
                <span key={item} className="rounded-full border border-white bg-white/88 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative animate-fadeUp">
            <div className="absolute inset-x-8 top-8 h-40 rounded-[48%] bg-leaf-100/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-lg border border-white bg-white/88 p-5 shadow-lift backdrop-blur dark:border-slate-700 dark:bg-slate-900/88">
              <div className="flex items-center justify-between gap-3 border-b border-leaf-100 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-mist-700 dark:text-mist-100">{shelfLabel}</p>
                  <h2 className="mt-1 text-xl font-extrabold text-ink dark:text-white">{shelfTitle}</h2>
                </div>
                <div className="rounded-full bg-leaf-50 px-3 py-2 text-sm font-extrabold text-leaf-700 dark:bg-leaf-600 dark:text-white">USDA</div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="grid place-items-center rounded-lg bg-gradient-to-br from-leaf-50 via-white to-mist-50 p-6 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
                  <div className="relative h-44 w-44 rounded-full border-[14px] border-white bg-leaf-50 shadow-soft">
                    {shelfFoods.slice(0, 3).map((food, index) => (
                      <div
                        key={food.code}
                        className={`absolute grid place-items-center rounded-full bg-white shadow-sm ${
                          index === 0
                            ? "left-7 top-5 h-16 w-16 text-4xl"
                            : index === 1
                              ? "bottom-5 left-12 h-14 w-14 text-3xl"
                              : "right-5 top-16 h-16 w-16 text-4xl"
                        }`}
                      >
                        {getFoodIcon(food)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {shelfFoods.map((food, index) => (
                    <div key={food.code} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                      <div
                        className={`grid h-11 w-11 place-items-center rounded-lg text-2xl ${
                          index === 0
                            ? "bg-mist-50 text-mist-700"
                            : index === 1
                              ? "bg-leaf-50 text-leaf-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {getFoodIcon(food)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-ink dark:text-white">{food.product_name}</p>
                        <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                          <div className="h-2 w-2/3 rounded-full bg-leaf-500" />
                        </div>
                      </div>
                      <p className="text-sm font-extrabold text-slate-600 dark:text-slate-200">{formatCalories(food.nutriments)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 rounded-lg border border-white bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
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
      </div>
    </section>
  );
}
