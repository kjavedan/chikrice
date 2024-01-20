// GREEK YOGURT
export default {
  limit: null,
  unit: "gram",
  value: "greekYogurt",
  label: "🥛 Greek Yogurt",
  portionWeight: 100,
  priority: { loseWeight: 2, gainWeight: 4 },
  foodBoxType: "single",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0,
  },

  // NUTRIENT_FACTS
  nutrientFactsRaw: {
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0,
  },

  // To determine its percentage in the meal plan
  type: "static",

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: "cup",
  countWeight: 240,
};
