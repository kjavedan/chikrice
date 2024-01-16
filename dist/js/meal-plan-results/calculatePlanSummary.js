export const calculatePlanSummary = (goal, calories, speed, macros) => {
  const caloriesList = {
    slow: 200,
    moderate: 400,
    fast: 600,
  };

  let processedCalories;
  // CALC CALORIES
  if (goal === "loseWeight") {
    processedCalories = Number(calories) - caloriesList[speed];
  } else {
    processedCalories = Number(calories) + caloriesList[speed];
  }

  // CALC MACROS
  const { proteins: proRatio, carbs: carbRatio, fats: fatRatio } = macros;

  const proCalories = calcMacrosCalorie(proRatio, processedCalories);
  const carbCalories = calcMacrosCalorie(carbRatio, processedCalories);
  const fatCalories = calcMacrosCalorie(fatRatio, processedCalories);

  const proAmount = calcMacrosAmount("pro", proCalories);
  const carbAmount = calcMacrosAmount("carb", carbCalories);
  const fatAmount = calcMacrosAmount("fat", fatCalories);

  return {
    calories: processedCalories,
    macros: {
      pro: { amount: proAmount, calories: proCalories },
      fat: { amount: fatAmount, calories: fatCalories },
      carb: { amount: carbAmount, calories: carbCalories },
    },
  };
};

const calcMacrosCalorie = (ratio, totalCalories) => {
  return (Number(ratio) / 100) * totalCalories;
};

const calcMacrosAmount = (name, calorie) => {
  const res = name === "fat" ? calorie / 9 : calorie / 4;
  return Number(res.toFixed(1));
};
