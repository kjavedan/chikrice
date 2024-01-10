const { createApp, ref, onMounted, watch } = Vue;

createApp({
  setup() {
    const data = ref({
      goal: "lose weight",
      calories: "2000",
      macros: { proteins: "40", carbs: "40", fats: "20" },
      proteins: [],
      carbs: [],
      fats: [],
      vegetables: [],
      mealsNumber: 4,
      snackNumber: 1,
    });

    const step = ref(1);

    const stepError = ref(0);

    // FUNCTIONS
    const onNext = () => {
      if (step.value < 8) {
        step.value++;
      }
    };

    const onBack = () => {
      if (step.value > 1) {
        step.value--;
      }
    };

    // HOOKS
    onMounted(() => {
      const mealPlanStep = localStorage.getItem("mealPlanStep");
      const mealPlanData = localStorage.getItem("mealPlanData");

      // INIT MEAL_PLAN_STEP
      if (mealPlanStep) {
        step.value = JSON.parse(mealPlanStep);
      } else {
        localStorage.setItem("mealPlanStep", 1);
      }
      // INIT MEAL_PLAN_DATA
      if (mealPlanData) {
        data.value = JSON.parse(mealPlanData);
      } else {
        localStorage.setItem("mealPlanData", JSON.stringify(data.value));
      }

      // INIT Calories base on url
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(currentUrl.split("?")[1]);
      const calories = urlParams.get("calories");

      if (calories) {
        data.value.calories = calories;
      }
    });

    watch(step, (newVal) => {
      localStorage.setItem("mealPlanStep", JSON.stringify(newVal));
    });

    watch(
      data,
      (newVal) => {
        localStorage.setItem("mealPlanData", JSON.stringify(newVal));
      },
      { deep: true }
    );

    watch(
      () => data.value.macros,
      (newMacros) => {
        const totalPercentage =
          parseInt(newMacros.proteins) +
          parseInt(newMacros.carbs) +
          parseInt(newMacros.fats);

        if (totalPercentage !== 100) {
          stepError.value = 3;
        } else {
          stepError.value = 0;
        }
      },
      { deep: true }
    );

    watch(
      () => data.value.calories,
      (newCalories) => {
        console.log(typeof newCalories);
        if (Number(newCalories) >= 1200) {
          stepError.value = 0;
        } else {
          stepError.value = 2;
        }
      }
    );

    return {
      data,
      step,
      onBack,
      onNext,
      stepError,
    };
  },
}).mount("#meal-plan-generator-app");
