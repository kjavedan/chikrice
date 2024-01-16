const { createApp, ref, onBeforeMount } = Vue;
import fatsBank from "../../data/fats/index.js";
import mealPlan from "../../data/mealPlan/index.js";
import proteinsBank from "../../data/proteins/index.js";

import { addCarbs } from "./addCarbs.js";
import { calculatePlanSummary } from "./calculatePlanSummary.js";

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
      calories: userCalories,
      carbs: userCarbsList,
      fruits: userFruitsList,
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
      const grocceryList = addCarbs(
        userGoal,
        mealPlanSummary.value.macros,
        userCarbsList,
        userFruitsList,
        userVegetablesList,
        availableMacros
      );

      console.log(availableMacros.value);

      //STEP 4 (ADD THE PROTEINS)
      //STEP 5 (ADD THE FATS)
      //SETP 6 (ADD THE VEGETABLES)
      //SETP 6 (CALCULATE THE MACROS & CALORIES OF EACH MEAL)
    };

    const addProteins = () => {};

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
