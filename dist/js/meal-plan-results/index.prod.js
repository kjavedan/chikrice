const { createApp, ref, onBeforeMount } = Vue;

import { addCarbs } from "./addCarbs.js";
import { addProteins } from "./addProteins.js";
import { calculatePlanSummary } from "./calculatePlanSummary.js";
import { processWeight } from "./common.js";

createApp({
  setup() {
    const groceryList = ref({ fats: [], carbs: {}, proteins: [] });

    const mealPlanSummary = ref({
      macros: 0,
      calories: 0,
    });

    const availableMacros = ref({});

    // STEP 1 (GET USER INPUTS)
    const userInputs = ref(
      JSON.parse(localStorage.getItem("mealPlanData")) || {}
    );

    const {
      goal: userGoal,
      speed: dietSpeed,
      macros: userMacros,
      carbs: userCarbsList,
      fruits: userFruitsList,
      calories: userCalories,
      proteins: userProteinsList,
      vegetables: userVegetablesList,
    } = userInputs.value;

    //FUNCS
    const generateMealPlan = () => {
      //STEP 2 (CALCULATE THE MACROS & CALORIES)
      const { macros, calories } = calculatePlanSummary(
        userGoal,
        userCalories,
        dietSpeed,
        userMacros
      );
      mealPlanSummary.value = { macros, calories };

      availableMacros.value = {
        pro: macros.pro.amount,
        carbs: macros.carb.amount,
        fat: macros.fat.amount,
      };

      //STEP 3(ADD THE CARBS)
      const carbsGroccery = addCarbs(
        userGoal,
        mealPlanSummary.value.macros,
        userCarbsList,
        userFruitsList,
        userVegetablesList,
        availableMacros
      );

      //STEP 4 (ADD THE PROTEINS)
      const proteinsGroccery = addProteins(
        userGoal,
        userProteinsList,
        availableMacros
      );

      //STEP 5 (ADD THE FATS)
      const fatsGroccery = [
        {
          value: "oil",
          label: "🫒🌻 Any Type of Oil",
          rawWeight: processWeight(availableMacros.value.fat, {}),
          cookedWeight: processWeight(availableMacros.value.fat, {
            isCount: true,
            countLabel: "table spon",
            countWeight: 15,
          }),
        },
      ];

      groceryList.value = {
        fats: fatsGroccery,
        carbs: carbsGroccery,
        proteins: proteinsGroccery,
      };

      console.log(groceryList.value);
    };

    //HOOKS
    onBeforeMount(() => {
      generateMealPlan();
    });

    return {
      userInputs,
      groceryList,
      mealPlanSummary,
    };
  },
}).mount("#meal-plan-results-app");
