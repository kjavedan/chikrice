// NUTS
export default {
  unit: "gram",
  value: "nuts",
  label: "🥜 Nuts",
  portionWeight: 100,
  priority: { loseWeight: 1, gainWeight: 3 },
  foodBoxType: "single",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 607,
    protein: 15,
    carbs: 6.1,
    fat: 58.7,
  },

  // NUTRIENT_FACTS RAW
  nutrientFactsRaw: {
    calories: 607,
    protein: 15,
    carbs: 6.1,
    fat: 58.7,
  },

  // To determine its percentage in the meal plan
  type: "static",

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: "cup",
  countWeight: 143,
};
