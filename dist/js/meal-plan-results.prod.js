const { createApp, ref, onBeforeMount } = Vue;
import mealPlan from "../data/mealPlan/index.js";
import proteinsList from "../data/proteins/index.js";
import carbsList from "../data/carbs/index.js";
import fatsList from "../data/fats/index.js";
import vegetablesList from "../data/vegetables/index.js";

createApp({
  setup() {
    const mealPlanResult = ref(mealPlan);

    // STEP 1 (GET USER INPUTS)
    const userInputs = ref(
      JSON.parse(localStorage.getItem("mealPlanData")) || {}
    );

    const foodBank = ref({
      proteinsList,
      carbsList,
      fatsList,
      vegetablesList,
    });

    //FUNCS
    const generateMealPlan = () => {
      console.log(foodBank.value.proteinsList);
      console.log("my first meal plan");
      //STEP 2 (ADD THE PROTEINS)
      //STEP 3 (ADD THE CARBS)
      //STEP 4 (ADD THE FATS)
      //SETP 5 (ADD THE VEGETABLES)
      //SETP 6 (CALCULATE THE MACROS & CALORIES OF EACH MEAL)
    };

    //HOOKS
    onBeforeMount(() => {
      generateMealPlan();
    });

    return {
      foodBank,
      mealPlanResult,
    };
  },
}).mount("#meal-plan-results-app");
