// Importing necessary data and constants
import carbsBank from "../../data/carbs/index.js";
import fruitsBank from "../../data/fruits/index.js";
import vegetablesBank from "../../data/vegetables/index.js";
import { CARBS_SPLIT_RATIO, SPRINT_DAYS } from "./constants.js";

// Function to add carbs to the meal plan based on user inputs
export const addCarbs = (
  goal,
  macros,
  userCarbsList,
  userFruitsList,
  userVegetablesList,
  availableMacros
) => {
  // Calculate daily carbs macros based on the goal and user input
  const carbsMacrosPerDay = Object.fromEntries(
    Object.entries(CARBS_SPLIT_RATIO[goal]).map(([type, ratio]) => [
      type,
      (macros.carb.amount * ratio).toFixed(1),
    ])
  );

  // Function to divide total carbs equally among items in a list
  const divideCarbsEqually = (totalCarbs, itemList) => {
    return (totalCarbs / itemList.length).toFixed(1);
  };

  // Calculate carbs per item for vegetables, fruits, and main carbs
  const carbPerVegetableItem = divideCarbsEqually(
    carbsMacrosPerDay.vegis,
    userVegetablesList
  );
  const carbPerFruitItem = divideCarbsEqually(
    carbsMacrosPerDay.fruits,
    userFruitsList
  );
  const carbPerMainCarbItem = divideCarbsEqually(
    carbsMacrosPerDay.main,
    userCarbsList
  );

  const updateAvailableMacros = (itemWeight, itemInfo) => {
    const { carbs, protein, fat } = itemInfo;
    const fatToDecrease = ((itemWeight / 100) * fat).toFixed(0);
    const carbsToDecrease = ((itemWeight / 100) * carbs).toFixed(0);
    const proteinToDecrease = ((itemWeight / 100) * protein).toFixed(0);

    availableMacros.value.fat -= fatToDecrease;
    availableMacros.value.pro -= proteinToDecrease;
    availableMacros.value.carbs -= carbsToDecrease;
  };

  // Function to generate a grocery list for a specific carb type
  const generateCarbsGroceryList = (
    carbsBank,
    userCarbsList,
    carbsAmountToConvert
  ) =>
    userCarbsList.map((item) => {
      const itemWeight = Math.round(
        (carbsAmountToConvert / carbsBank[item].nutrientFacts.carbs) * 100
      );
      updateAvailableMacros(itemWeight, carbsBank[item].nutrientFacts);

      //ADD THE GROCCERY WEIGHT BASE ON SPRINT PERIOD
      return {
        [item]: itemWeight * SPRINT_DAYS,
      };
    });

  // Generate grocery lists for each type of carb
  const vegetableGrocery = generateCarbsGroceryList(
    vegetablesBank,
    userVegetablesList,
    carbPerVegetableItem
  );
  const fruitsGrocery = generateCarbsGroceryList(
    fruitsBank,
    userFruitsList,
    carbPerFruitItem
  );
  const mainCarbGrocery = generateCarbsGroceryList(
    carbsBank,
    userCarbsList,
    carbPerMainCarbItem
  );

  // Return the final carbs grocery list
  return {
    carbs: {
      main: mainCarbGrocery,
      fruits: fruitsGrocery,
      vegetables: vegetableGrocery,
    },
  };
};
