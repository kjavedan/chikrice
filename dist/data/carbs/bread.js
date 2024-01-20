// BREAD
export default {
  unit: "gram",
  value: "bread",
  label: "🥖 Bread",
  portionWeight: 100,
  priority: null,
  foodBoxType: "single",

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 265,
    protein: 9.4,
    carbs: 49.4,
    fat: 2.7,
  },

  // To decide whether to calculate raw weight or not
  isRaw: false,

  // To show equivalent count of weight
  isCount: true,
  countLabel: "slice",
  countWeight: 30,
};
