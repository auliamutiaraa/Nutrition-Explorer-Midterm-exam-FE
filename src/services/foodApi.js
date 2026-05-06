import { findFallbackFood, searchFallbackFoods } from "../data/fallbackFoods.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function assertApiConfig() {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL belum diatur di file .env");
  }

  if (!API_KEY) {
    throw new Error("VITE_API_KEY belum diatur di file .env");
  }
}

async function requestFood(url) {
  assertApiConfig();
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Gagal mengambil data makanan. Coba beberapa saat lagi.");
  }

  return response.json();
}

export async function fetchFoods(query = "healthy") {
  const params = new URLSearchParams({
    api_key: API_KEY,
    query,
    pageSize: "18",
  });

  params.append("dataType", "Foundation");
  params.append("dataType", "SR Legacy");
  params.append("dataType", "Branded");

  try {
    const data = await requestFood(`${API_BASE_URL}/foods/search?${params}`);
    const foods = (data.foods || []).filter((food) => food.description && food.fdcId).map(normalizeSearchFood);
    return foods.length > 0 ? foods : searchFallbackFoods(query);
  } catch (error) {
    return searchFallbackFoods(query);
  }
}

export async function fetchFoodByCode(code) {
  const fallbackFood = findFallbackFood(code);

  if (fallbackFood) {
    return fallbackFood;
  }

  const params = new URLSearchParams({ api_key: API_KEY });
  const data = await requestFood(`${API_BASE_URL}/food/${code}?${params}`);

  if (!data.fdcId) {
    throw new Error("Detail makanan tidak ditemukan.");
  }

  return normalizeDetailFood(data);
}

function normalizeSearchFood(food) {
  return {
    code: String(food.fdcId),
    product_name: titleCase(food.description),
    brands: food.brandOwner || food.dataType || food.foodCategory || "USDA FoodData",
    categories: food.foodCategory || food.additionalDescriptions || "FoodData Central item",
    nutriscore_grade: food.dataType?.slice(0, 1),
    nutriments: nutrientsFromSearch(food.foodNutrients),
  };
}

function normalizeDetailFood(food) {
  return {
    code: String(food.fdcId),
    product_name: titleCase(food.description),
    brands: food.brandOwner || food.dataType || food.foodClass || "USDA FoodData",
    categories: food.foodCategory?.description || food.wweiaFoodCategory?.wweiaFoodCategoryDescription || food.dataType,
    nutriscore_grade: food.dataType?.slice(0, 1),
    nutriments: nutrientsFromDetail(food.foodNutrients),
  };
}

function nutrientsFromSearch(nutrients = []) {
  return {
    "energy-kcal_100g": findSearchNutrient(nutrients, ["Energy"], "KCAL"),
    proteins_100g: findSearchNutrient(nutrients, ["Protein"]),
    fat_100g: findSearchNutrient(nutrients, ["Total lipid", "Total fat", "fat"]),
    carbohydrates_100g: findSearchNutrient(nutrients, ["Carbohydrate"]),
  };
}

function nutrientsFromDetail(nutrients = []) {
  return {
    "energy-kcal_100g": findDetailNutrient(nutrients, ["Energy"], "KCAL"),
    proteins_100g: findDetailNutrient(nutrients, ["Protein"]),
    fat_100g: findDetailNutrient(nutrients, ["Total lipid", "Total fat", "fat"]),
    carbohydrates_100g: findDetailNutrient(nutrients, ["Carbohydrate"]),
  };
}

function findSearchNutrient(nutrients, names, unit) {
  const nutrient = nutrients.find((item) => {
    const matchesName = names.some((name) => item.nutrientName?.toLowerCase().includes(name.toLowerCase()));
    const matchesUnit = unit ? item.unitName?.toUpperCase() === unit : true;
    return matchesName && matchesUnit;
  });

  return nutrient?.value;
}

function findDetailNutrient(nutrients, names, unit) {
  const nutrient = nutrients.find((item) => {
    const name = item.nutrient?.name?.toLowerCase() || "";
    const unitName = item.nutrient?.unitName?.toUpperCase();
    const matchesName = names.some((target) => name.includes(target.toLowerCase()));
    const matchesUnit = unit ? unitName === unit : true;
    return matchesName && matchesUnit;
  });

  return nutrient?.amount;
}

function titleCase(value = "") {
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
