//BEEF
export default {
  limit: null,
  unit: "gram",
  value: "beef",
  label: "🥩 Beef",
  portionWeight: 100,
  mealOrderPriority: 2,

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 5,
  },

  //RAW NUTRIENT_FACTS
  nutrientFactsRaw: {
    calories: 136,
    protein: 21,
    carbs: 0,
    fat: 5,
  },

  // To determine its percentage in the meal plan
  type: "static",

  // To decide whether to calculate raw weight or not
  isRaw: true,
};
