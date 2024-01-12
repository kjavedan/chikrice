const { createApp, ref } = Vue;

createApp({
  setup() {
    const foodBank = ref({
      proteins: {
        beef: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
          label: "🥩 Beef",
          portionWeight: 100,
          mealOrderPriority: 1,

          // NUTRIENT_FACTS
          nutrientFacts: {
            calories: 250,
            protein: 26,
            carbs: 0,
            fat: 17,
          },
        },
        fish: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
          label: "🐟 Fish",
          portionWeight: 100,
          mealOrderPriority: 1,

          // NUTRIENT_FACTS
          nutrientFacts: {
            calories: 206,
            protein: 22,
            carbs: 0,
            fat: 13,
          },
        },
        eggs: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
          label: "🥚 Eggs",
          portionWeight: 100,
          mealOrderPriority: 1,

          // NUTRIENT_FACTS
          nutrientFacts: {
            calories: 155,
            protein: 13,
            carbs: 1,
            fat: 11,
          },
        },
        chicken: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
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
        },
        turkey: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
          label: "🦃 Turkey",
          portionWeight: 100,
          mealOrderPriority: 1,

          // NUTRIENT_FACTS
          nutrientFacts: {
            calories: 135,
            protein: 30,
            carbs: 0,
            fat: 1,
          },
        },
        eggWhite: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
          label: "🍳 Egg White",
          portionWeight: 100,
          mealOrderPriority: 1,

          // NUTRIENT_FACTS
          nutrientFacts: {
            calories: 52,
            protein: 11,
            carbs: 1,
            fat: 0,
          },
        },
        greekYogurt: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
          label: "🥛 Greek Yogurt",
          portionWeight: 100,
          mealOrderPriority: 1,

          // NUTRIENT_FACTS
          nutrientFacts: {
            calories: 59,
            protein: 10,
            carbs: 3.6,
            fat: 0,
          },
        },
        proteinSupplements: {
          tier: 1,
          limit: null,
          unit: "gram",
          value: "beef",
          label: "🧋 Protein Supplements",
          portionWeight: 100,
          mealOrderPriority: 1,

          // NUTRIENT_FACTS
          nutrientFacts: {
            calories: 139,
            protein: 30,
            carbs: 2.5,
            fat: 1,
          },
        },
      },
      carbs: [],
      fats: [],
    });

    return {
      foodBank,
    };
  },
}).mount("#meal-plan-results-app");
