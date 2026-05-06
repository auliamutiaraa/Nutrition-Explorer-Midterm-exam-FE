export function formatCalories(nutriments) {
  const calories = nutriments?.["energy-kcal_100g"] ?? nutriments?.["energy-kcal"];
  return Number.isFinite(Number(calories)) ? `${Math.round(Number(calories))} kcal` : "Data belum ada";
}

export function nutritionRows(nutriments = {}) {
  return [
    {
      label: "Energi",
      value: formatCalories(nutriments),
    },
    {
      label: "Protein",
      value: formatGram(nutriments.proteins_100g),
    },
    {
      label: "Lemak",
      value: formatGram(nutriments.fat_100g),
    },
    {
      label: "Karbohidrat",
      value: formatGram(nutriments.carbohydrates_100g),
    },
  ];
}

export function normalizeGrade(grade) {
  return grade ? grade.toUpperCase() : "N/A";
}

function formatGram(value) {
  return Number.isFinite(Number(value)) ? `${Number(value).toFixed(1)} gr` : "Data belum ada";
}
