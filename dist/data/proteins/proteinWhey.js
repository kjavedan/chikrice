// PROTEIN WHY
export default {
  limit: null,
  unit: "gram",
  value: "proteinWhey",
  label: "🧋 Protein Whey",
  portionWeight: 100,
  priority: { loseWeight: 3, gainWeight: 2 },
  foodBoxType: "single",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 139,
    protein: 30,
    carbs: 2.5,
    fat: 1,
  },

  // To determine its percentage in the meal plan
  type: "static",

  // To decide whether to calculate raw weight or not
  isRaw: false,
  // To show equivalent count of weight
  isCount: true,
  countLabel: "scope",
  countWeight: 30,
};
