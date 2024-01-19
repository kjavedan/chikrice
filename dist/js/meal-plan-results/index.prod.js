const { createApp, ref, onBeforeMount } = Vue;
import mealPlan from "../../data/mealPlan/index.js";

import { addCarbs } from "./addCarbs.js";
import { addFats } from "./addFats.js";
import { addProteins } from "./addProteins.js";
import { calculatePlanSummary } from "./calculatePlanSummary.js";
import { SPRINT_DAYS } from "./constants.js";

createApp({
  setup() {
    const mealPlanResult = ref(mealPlan);

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
      fats: userFatsList,
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
      const fatAvailable = parseInt(availableMacros.value.fat) * SPRINT_DAYS;

      //STEP 5 (ADD THE FATS)
      const fatsGroccery = [
        {
          value: "oil",
          label: "🫒🌻 Any Type of Oil",
          rawWeight: fatAvailable,
          cookedWeight: fatAvailable,
        },
      ];

      const grocceryList = {
        fats: fatsGroccery,
        carbs: carbsGroccery,
        protiens: proteinsGroccery,
      };

      console.log(grocceryList);
    };

    //HOOKS
    onBeforeMount(() => {
      generateMealPlan();
    });

    return {
      userInputs,
      mealPlanResult,
      mealPlanSummary,
    };
  },
}).mount("#meal-plan-results-app");
