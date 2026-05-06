import { Link } from "react-router-dom";
import { getFoodIcon } from "../utils/foodIcon.js";
import { formatCalories, normalizeGrade } from "../utils/nutrition.js";

export default function FoodCard({ food }) {
  const calories = formatCalories(food.nutriments);
  const grade = normalizeGrade(food.nutriscore_grade);
  const plateIcon = getFoodIcon(food);

  return (
    <article className="group flex min-h-[390px] flex-col overflow-hidden rounded-lg border border-white bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-lift">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-leaf-50 via-mist-50 to-white">
        <div className="grid h-full place-items-center">
          <div className="relative h-28 w-28 rounded-full bg-white shadow-soft transition-transform duration-500 group-hover:scale-110">
            <div className="absolute inset-3 rounded-full border border-leaf-100 bg-gradient-to-br from-white to-leaf-50" />
            <div className="absolute inset-0 grid place-items-center text-6xl">{plateIcon}</div>
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-leaf-700 shadow-sm">
          USDA {grade}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-mist-700">{food.brands || "Food item"}</p>
        <h2 className="mt-2 line-clamp-2 min-h-14 text-xl font-bold text-ink">{food.product_name}</h2>
        <div className="mt-4 rounded-lg bg-leaf-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-slate-500">Kalori per 100g</p>
          <p className="mt-1 text-2xl font-extrabold text-leaf-700">{calories}</p>
        </div>
        <Link
          to={`/foods/${food.code}`}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-leaf-600"
        >
          View Detail
        </Link>
      </div>
    </article>
  );
}
