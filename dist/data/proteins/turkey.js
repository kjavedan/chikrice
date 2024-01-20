// TURKEY
export default {
  limit: null,
  unit: "gram",
  value: "turkey",
  label: "🦃 Turkey",
  portionWeight: 100,
  priority: { loseWeight: 9, gainWeight: 7 },
  foodBoxType: "sprint",
  icon: "🦃",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 135,
    protein: 30,
    carbs: 0,
    fat: 1,
  },

  nutrientFactsRaw: {
    calories: 97,
    protein: 20,
    carbs: 0,
    fat: 2,
  },

  // To determine its percentage in the meal plan
  type: "dynamic",

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: false,
};
