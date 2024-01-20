export default {
  limit: null,
  unit: "gram",
  value: "tofu",
  label: "🧈 Tofu",
  portionWeight: 100,
  priority: { loseWeight: 4, gainWeight: 8 },
  foodBoxType: "daily",
  icon: "🧈",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 144,
    protein: 15,
    carbs: 3.9,
    fat: 8,
  },

  // RAW NUTRIENT_FACTS
  nutrientFactsRaw: {
    calories: 144,
    protein: 15,
    carbs: 1.9,
    fat: 8,
  },

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: "cup",
  countWeight: 200,
};
