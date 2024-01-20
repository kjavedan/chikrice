// FISH
export default {
  limit: null,
  unit: "gram",
  value: "fish",
  label: "🐟 Fish",
  portionWeight: 100,
  priority: { loseWeight: 7, gainWeight: 6 },
  foodBoxType: "sprint",
  icon: "🐟",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 117,
    protein: 22,
    carbs: 0,
    fat: 3,
  },

  //RAW NUTRIENT_FACTS
  nutrientFactsRaw: {
    calories: 120,
    protein: 19,
    carbs: 0,
    fat: 3,
  },

  // To determine its percentage in the meal plan
  type: "static",

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: false,
};
