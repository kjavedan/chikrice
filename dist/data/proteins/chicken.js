// CHICKEN
export default {
  limit: null,
  unit: "gram",
  value: "chicken",
  label: "🍗 Chicken",
  portionWeight: 100,
  mealOrderPriority: 1,

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  //RAW NUTRIENT_FACTS
  nutrientFactsRaw: {
    calories: 120,
    protein: 26,
    carbs: 0,
    fat: 2,
  },
  // To determine its percentage in the meal plan
  type: "dynamic",

  // To decide whether to calculate raw weight or not
  isRaw: true,
};
