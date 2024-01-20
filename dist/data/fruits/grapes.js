// GRAPES
export default {
  unit: "gram",
  value: "grapes",
  label: "🍇 Grapes",
  portionWeight: 100,
  priority: null,
  foodBoxType: "single",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 69,
    protein: 0.6,
    carbs: 18,
    fat: 0.2,
  },
  // NUTRIENT_FACTS RAW
  nutrientFactsRaw: {
    calories: 69,
    protein: 0.6,
    carbs: 18,
    fat: 0.2,
  },

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: "cup",
  countWeight: 180,
};
