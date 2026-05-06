export const fallbackFoods = [
  {
    code: "local-oat-bowl",
    product_name: "Oat Bowl With Banana",
    brands: "Nutrition Explorer Pantry",
    categories: "Whole grain breakfast",
    nutriscore_grade: "A",
    nutriments: {
      "energy-kcal_100g": 142,
      proteins_100g: 5.1,
      fat_100g: 3.2,
      carbohydrates_100g: 23.5,
    },
  },
  {
    code: "local-greek-yogurt",
    product_name: "Greek Yogurt Plain",
    brands: "Nutrition Explorer Pantry",
    categories: "Dairy and fermented food",
    nutriscore_grade: "A",
    nutriments: {
      "energy-kcal_100g": 97,
      proteins_100g: 9.0,
      fat_100g: 5.0,
      carbohydrates_100g: 3.9,
    },
  },
  {
    code: "local-green-salad",
    product_name: "Garden Green Salad",
    brands: "Nutrition Explorer Pantry",
    categories: "Vegetables and fresh meals",
    nutriscore_grade: "A",
    nutriments: {
      "energy-kcal_100g": 46,
      proteins_100g: 2.1,
      fat_100g: 1.8,
      carbohydrates_100g: 6.4,
    },
  },
  {
    code: "local-milk",
    product_name: "Low Fat Milk",
    brands: "Nutrition Explorer Pantry",
    categories: "Milk and dairy drinks",
    nutriscore_grade: "B",
    nutriments: {
      "energy-kcal_100g": 42,
      proteins_100g: 3.4,
      fat_100g: 1.0,
      carbohydrates_100g: 5.0,
    },
  },
  {
    code: "local-apple",
    product_name: "Fresh Apple",
    brands: "Nutrition Explorer Pantry",
    categories: "Fruit",
    nutriscore_grade: "A",
    nutriments: {
      "energy-kcal_100g": 52,
      proteins_100g: 0.3,
      fat_100g: 0.2,
      carbohydrates_100g: 13.8,
    },
  },
  {
    code: "local-grilled-chicken",
    product_name: "Grilled Chicken Breast",
    brands: "Nutrition Explorer Pantry",
    categories: "Lean protein",
    nutriscore_grade: "A",
    nutriments: {
      "energy-kcal_100g": 165,
      proteins_100g: 31.0,
      fat_100g: 3.6,
      carbohydrates_100g: 0,
    },
  },
];

export function searchFallbackFoods(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return fallbackFoods;
  }

  const matches = fallbackFoods.filter((food) => {
    const haystack = `${food.product_name} ${food.brands} ${food.categories}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  return matches.length > 0 ? matches : fallbackFoods;
}

export function findFallbackFood(code) {
  return fallbackFoods.find((food) => food.code === code);
}
