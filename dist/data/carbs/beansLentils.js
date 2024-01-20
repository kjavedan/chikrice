// BEANS AND LENTILS
export default {
  unit: "gram",
  value: "beansLentils",
  label: "🍛 Beans & Lentils",
  portionWeight: 100,
  priority: null,
  foodBoxType: "daily",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
  },

  nutrientFactsRaw: {
    calories: 341,
    protein: 21.6,
    carbs: 63.4,
    fat: 1.1,
  },

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: "cup",
  countWeight: 180,
};
