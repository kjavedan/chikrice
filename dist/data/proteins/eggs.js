// EGGS
export default {
  limit: 4,
  unit: "gram",
  value: "beef",
  label: "🥚 Eggs",
  portionWeight: 100,
  mealOrderPriority: 1,

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 155,
    protein: 13,
    carbs: 1,
    fat: 11,
  },

  // To determine its percentage in the meal plan
  type: "static",

  // To decide whether to calculate raw weight or not
  isRaw: false,
};
