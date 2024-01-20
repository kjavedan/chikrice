// EGGS
export default {
  limit: 4,
  unit: "gram",
  value: "eggs",
  label: "🥚 Eggs",
  portionWeight: 100,
  priority: { loseWeight: 3, gainWeight: 5 },
  foodBoxType: "single",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 155,
    protein: 13,
    carbs: 1,
    fat: 11,
  },

  // NUTRIENT_FACTS RAW
  nutrientFactsRaw: {
    calories: 155,
    protein: 13,
    carbs: 1,
    fat: 11,
  },

  // To determine its percentage in the meal plan
  type: "static",

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: "egg",
  countWeight: 50,
};
