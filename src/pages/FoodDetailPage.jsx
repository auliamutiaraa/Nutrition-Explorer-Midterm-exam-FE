import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { fetchFoodByCode } from "../services/foodApi.js";
import { normalizeGrade, nutritionRows } from "../utils/nutrition.js";

export default function FoodDetailPage() {
  const { code } = useParams();
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

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <LoadingSpinner label="Membuka detail nutrisi..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <ErrorAlert message={error} />
        <BackLink />
      </section>
    );
  }

  const rows = nutritionRows(food.nutriments);

  return (
    <section className="bg-gradient-to-b from-mist-50 to-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <BackLink />

        <article className="mt-6 animate-fadeUp overflow-hidden rounded-lg border border-white bg-white shadow-lift">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-80 bg-gradient-to-br from-leaf-50 via-white to-mist-100 p-8">
              <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-leaf-700 shadow-sm">
                USDA {normalizeGrade(food.nutriscore_grade)}
              </div>
              <div className="grid h-72 place-items-center">
                <div className="relative h-44 w-44 rounded-full bg-white shadow-lift">
                  <div className="absolute inset-5 rounded-full border border-leaf-100 bg-gradient-to-br from-white via-leaf-50 to-mist-100" />
                  <div className="absolute inset-0 grid place-items-center text-8xl">🍎</div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-mist-700">{food.brands || "Food item"}</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{food.product_name}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                {food.categories || "Kategori belum tersedia dari sumber API."}
              </p>

              <div className="mt-8 overflow-hidden rounded-lg border border-leaf-100">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-ink text-white">
                    <tr>
                      <th className="px-5 py-4 text-sm font-bold">Nutrisi</th>
                      <th className="px-5 py-4 text-sm font-bold">Per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.label} className={index % 2 === 0 ? "bg-leaf-50" : "bg-white"}>
                        <td className="px-5 py-4 font-semibold text-ink">{row.label}</td>
                        <td className="px-5 py-4 text-slate-700">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center rounded-full bg-leaf-600 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mist-700"
    >
      Back to List
    </Link>
  );
}
