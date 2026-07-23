import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import ErrorAlert from "../components/ErrorAlert.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { getFoodIcon } from "../utils/foodIcon.js";

export default function ReviewFoodPage() {
  const { data: foods, isLoading, error } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const { data, error } = await supabase.from("foods").select("*");
      if (error) throw error;
      return data;
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-mist-50 to-white pt-4 pb-20 dark:from-slate-950 dark:to-slate-900 sm:pt-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-3xl mx-auto text-center animate-fadeUp">
          <h1 className="mb-4 font-display text-4xl font-black leading-tight text-ink dark:text-white sm:text-5xl lg:text-6xl">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-leaf-600 to-herb-600">Reviews</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Explore foods reviewed and added by the community from our Supabase database.
          </p>
        </div>

        {isLoading && (
          <div className="py-20 text-center">
            <LoadingSpinner />
            <p className="mt-4 text-slate-500 dark:text-slate-400">Loading food reviews...</p>
          </div>
        )}

        {error && (
          <ErrorAlert 
            message={error.message || "Failed to load foods from Supabase."} 
            onRetry={() => window.location.reload()} 
          />
        )}

        {!isLoading && !error && foods?.length === 0 && (
          <div className="rounded-lg border border-dashed border-leaf-200 bg-white/80 p-12 text-center shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
            <p className="text-5xl">🍽️</p>
            <h3 className="mt-4 text-xl font-extrabold text-ink dark:text-white">Belum Ada Review</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Jadilah yang pertama menambahkan review makanan ke database.
            </p>
          </div>
        )}

        {!isLoading && !error && foods?.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {foods.map((food) => (
              <article 
                key={food.id || Math.random()} 
                className="group flex min-h-[410px] flex-col overflow-hidden rounded-lg border border-white bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lift dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-leaf-50 via-mist-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
                  <div className="grid h-full place-items-center">
                    <div className="relative h-28 w-28 rounded-full bg-white shadow-soft transition-transform duration-500 group-hover:scale-110">
                      <div className="absolute inset-3 rounded-full border border-leaf-100 bg-gradient-to-br from-white to-leaf-50" />
                      <div className="absolute inset-0 grid place-items-center text-6xl">
                        {getFoodIcon(food.name || food.title || "")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-mist-700 dark:text-mist-100">Review Makanan</p>
                  <h2 className="mt-2 line-clamp-2 min-h-14 text-xl font-bold text-ink dark:text-white">
                    {food.name || food.title || "Unknown Food"}
                  </h2>
                  {food.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-300">
                      {food.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4">
                    <div className="rounded-lg bg-leaf-50 px-4 py-3 dark:bg-slate-800">
                      <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-300">Kalori</p>
                      <p className="mt-1 text-2xl font-extrabold text-leaf-700 dark:text-leaf-100">
                        {food.calories ? `${food.calories} kcal` : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
