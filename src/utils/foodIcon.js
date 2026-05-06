const iconRules = [
  { terms: ["salad", "lettuce", "vegetable", "veggie", "green"], icon: "\u{1F957}" },
  { terms: ["milk", "yogurt", "dairy", "cheese"], icon: "\u{1F95B}" },
  { terms: ["oat", "cereal", "grain", "porridge", "breakfast"], icon: "\u{1F963}" },
  { terms: ["chicken", "turkey", "meat", "protein"], icon: "\u{1F357}" },
  { terms: ["fish", "tuna", "salmon", "seafood"], icon: "\u{1F41F}" },
  { terms: ["soup", "broth", "noodle"], icon: "\u{1F372}" },
  { terms: ["bread", "toast", "sandwich"], icon: "\u{1F35E}" },
  { terms: ["rice", "bowl"], icon: "\u{1F35A}" },
  { terms: ["apple", "fruit", "banana", "berry", "cranberry"], icon: "\u{1F34E}" },
  { terms: ["mushroom"], icon: "\u{1F344}" },
  { terms: ["drink", "juice", "smoothie", "beverage"], icon: "\u{1F9C3}" },
  { terms: ["popcorn"], icon: "\u{1F37F}" },
  { terms: ["coffee"], icon: "\u{2615}" },
];

export function getFoodIcon(food) {
  const text = `${food?.product_name || ""} ${food?.categories || ""} ${food?.brands || ""}`.toLowerCase();
  const match = iconRules.find((rule) => rule.terms.some((term) => text.includes(term)));

  return match?.icon || "\u{1F958}";
}
