const { createApp, ref, onMounted, watch } = Vue;

createApp({
  setup() {
    const data = ref({
      snackNumber: 1,
      mealsNumber: 4,
      calories: "2000",
      speed: "moderate",
      goal: "lose weight",
      fats: ["oliveOil", "regularOil"],
      macros: { proteins: "40", carbs: "40", fats: "20" },
      carbs: ["oats", "rice", "potato", "apple", "orange"],
      proteins: ["beef", "fish", "eggs", "chicken"],
      vegetables: ["tomato", "lettuce", "broccoli", "cucumber", "sweetPepper"],
    });

    const step = ref(1);
    const stepError = ref(0);
    const macrosError = ref(0);

    const speedOptions = ref([
      { value: "slow", label: "🐌 Slow" },
      { value: "moderate", label: "🚶 Moderate (recommended)" },
      { value: "fast", label: "🏃‍♂️ Fast" },
    ]);

    const proteinsOptions = ref([
      { label: "🥩 Beef", value: "beef" },
      { label: "🐟 Fish", value: "fish" },
      { label: "🥚 Eggs", value: "eggs" },
      { label: "🍗 Chicken", value: "chicken" },
      { label: "🦃 Turkey ", value: "turkey " },
      { label: "🍳 Egg White", value: "eggWhite" },
      { label: "🥛 Greek Yogurt", value: "greekYogurt" },
      { label: "🧋 Protein supplements", value: "proteinSupplements" },
    ]);

    const carbsOptions = ref([
      { label: "🍚 Rice", value: "rice" },
      { label: "🌽 Corn", value: "corn" },
      { label: "🌾 Oats", value: "oats" },
      { label: "🍝 Pasta", value: "pasta" },
      { label: "🥖 Bread", value: "bread" },
      { label: "🍏 Apple", value: "apple" },
      { label: "🥔 Potato", value: "potato" },
      { label: "🍌 Banana", value: "banana" },
      { label: "🍇 Grapes", value: "grapes" },
      { label: "🍊 Orange", value: "orange" },
      { label: "🍍 Pineapple", value: "pineapple" },
      { label: "🍓 Strawberry", value: "strawberry" },
      { label: "🍠 Sweet Potato", value: "sweetPotato" },
    ]);

    const fatsOptions = ref([
      { label: "🥜 Nuts", value: "nuts" },
      { label: "🥑 Avocado", value: "avocado" },
      { label: "🐟 Fish Oil", value: "fishOil" },
      { label: "🫒 Olive Oil", value: "oliveOil" },
      { label: "🌻 Regular Oil", value: "regularOil" },
    ]);

    const vegetablesOptions = ref([
      { label: "🧅 Onion", value: "onion" },
      { label: "🍅 Tomato", value: "tomato" },
      { label: "🥕 Carrots", value: "carrots" },
      { label: "🥬 Lettuce", value: "lettuce" },
      { label: "🍃 Spinach", value: "spinach" },
      { label: "🥦 Broccoli", value: "broccoli" },
      { label: "🍠 Zucchini", value: "zucchini" },
      { label: "🍆 Eggplant", value: "eggplant" },
      { label: "🥒 Cucumber", value: "cucumber" },
      { label: "🫛 Green Beans", value: "greanBeans" },
      { label: "🫑 Sweet Pepper", value: "sweetPepper" },
    ]);

    // FUNCTIONS
    const onNext = () => {
      if (step.value < 9) {
        step.value++;
      } else if (step.value == 9) {
        console.log(data.value);
        window.location.href = "../html/meal-plan-results.html";
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
      step.value = mealPlanStep ? JSON.parse(mealPlanStep) : 1;
      localStorage.setItem("mealPlanStep", step.value);

      // INIT MEAL_PLAN_DATA
      data.value = mealPlanData ? JSON.parse(mealPlanData) : data.value;
      localStorage.setItem("mealPlanData", JSON.stringify(data.value));

      // INIT Calories base on url
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(currentUrl.split("?")[1]);
      const calories = urlParams.get("calories");

      if (calories) {
        data.value.calories = calories;
      }
    });

    const updateLocalStorage = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    watch(step, (newVal) => {
      updateLocalStorage("mealPlanStep", newVal);
      stepError.value = validateStep(newVal);
    });

    watch(
      data,
      (newVal) => {
        updateLocalStorage("mealPlanData", newVal);
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
          stepError.value = 4;
          macrosError.value = "Total percentage must be 100%!";
        } else if (parseInt(newMacros.proteins) < 5) {
          stepError.value = 4;
          macrosError.value = "Proteins must be minimum of 5%";
        } else if (parseInt(newMacros.carbs) < 5) {
          stepError.value = 4;
          macrosError.value = "Carbs must be minimum of 5%";
        } else if (
          parseInt(newMacros.fats) < 5 ||
          parseInt(newMacros.fats) > 40
        ) {
          stepError.value = 4;
          macrosError.value = "Fats must be between 5% and 40%";
        } else {
          stepError.value = 0;
          macrosError.value = "";
        }
      },
      { deep: true }
    );

    watch(
      () => data.value.calories,
      (newCalories) => {
        stepError.value = Number(newCalories) < 1200 ? 3 : 0;
      }
    );

    const validateStep = (stepValue) => {
      if (stepValue >= 5 && stepValue <= 8) {
        const propertyName = stepToPropertyName(stepValue);
        return data.value[propertyName]?.length < 2 ? stepValue : 0;
      }
      return 0;
    };

    const stepToPropertyName = (stepValue) => {
      switch (stepValue) {
        case 5:
          return "proteins";
        case 6:
          return "carbs";
        case 7:
          return "fats";
        case 8:
          return "vegetables";
        default:
          return "";
      }
    };

    watch(
      () => data.value.proteins,
      () => (stepError.value = validateStep(5))
    );
    watch(
      () => data.value.carbs,
      () => (stepError.value = validateStep(6))
    );
    watch(
      () => data.value.fats,
      () => (stepError.value = validateStep(7))
    );
    watch(
      () => data.value.vegetables,
      () => (stepError.value = validateStep(8))
    );

    return {
      data,
      step,
      onBack,
      onNext,
      stepError,
      macrosError,
      fatsOptions,
      speedOptions,
      carbsOptions,
      proteinsOptions,
      vegetablesOptions,
    };
  },
}).mount("#meal-plan-generator-app");
