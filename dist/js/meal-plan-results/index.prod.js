const { createApp, ref, onBeforeMount } = Vue;
import fatsBank from "../../data/fats/index.js";
import mealPlan from "../../data/mealPlan/index.js";
import proteinsBank from "../../data/proteins/index.js";

import { addCarbs } from "./addCarbs.js";
import { addProteins } from "./addProteins.js";
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

      const fatsGroccery = [];

      //STEP 4 (ADD THE PROTEINS)
      const proteinsGroccery = addProteins(
        userGoal,
        userProteinsList,
        availableMacros
      );

      console.log(availableMacros.value);

      //STEP 5 (ADD THE FATS)
      //SETP 6 (CALCULATE THE MACROS & CALORIES OF EACH MEAL)

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
