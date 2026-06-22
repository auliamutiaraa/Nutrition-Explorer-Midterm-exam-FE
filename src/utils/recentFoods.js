const RECENT_FOODS_KEY = "nutrition-explorer:recent-foods";
const MAX_RECENT_FOODS = 3;

export function getRecentFoods() {
  try {
    const savedFoods = JSON.parse(localStorage.getItem(RECENT_FOODS_KEY) || "[]");
    return Array.isArray(savedFoods) ? savedFoods : [];
  } catch (error) {
    return [];
  }
}

export function saveRecentFood(food) {
  if (!food?.code || !food?.product_name) {
    return;
  }

  const recentFood = {
    code: food.code,
    product_name: food.product_name,
    brands: food.brands,
    categories: food.categories,
    nutriscore_grade: food.nutriscore_grade,
    nutriments: food.nutriments,
  };

  const nextFoods = [
    recentFood,
    ...getRecentFoods().filter((item) => item.code !== food.code),
  ].slice(0, MAX_RECENT_FOODS);

  localStorage.setItem(RECENT_FOODS_KEY, JSON.stringify(nextFoods));
  window.dispatchEvent(new Event("recent-foods-updated"));
}
