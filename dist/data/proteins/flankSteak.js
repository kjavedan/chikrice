//BEEF
export default {
  limit: null,
  unit: "gram",
  value: "flankSteak",
  label: "🥩 flank steak",
  portionWeight: 100,
  priority: { loseWeight: 4, gainWeight: 8 },
  foodBoxType: "sprint",

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

  // To show equivalent count of weight
  isCount: false,
};
