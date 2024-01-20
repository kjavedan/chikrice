// Importing necessary data and constants
import carbsBank from "../../data/carbs/index.js";
import fruitsBank from "../../data/fruits/index.js";
import vegetablesBank from "../../data/vegetables/index.js";
import { processWeight, updateAvailableMacros } from "./common.js";
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

  // Function to generate a grocery list for a specific carb type
  const generateCarbsGroceryList = (
    carbsBank,
    userCarbsList,
    carbsAmountToConvert
  ) =>
    userCarbsList.map((item) => {
      const itemDetails = carbsBank[item];
      let rawWeight = 0;
      let cookedWeight = 0;

      if (itemDetails?.isRaw) {
        rawWeight = Math.round(
          (carbsAmountToConvert / itemDetails.nutrientFactsRaw.carbs) * 100
        );
      }

      cookedWeight = Math.round(
        (carbsAmountToConvert / itemDetails.nutrientFacts.carbs) * 100
      );
      updateAvailableMacros(
        cookedWeight,
        itemDetails.nutrientFacts,
        availableMacros
      );

      //ADD THE GROCCERY WEIGHT BASE ON SPRINT PERIOD
      return {
        value: itemDetails.value,
        label: itemDetails.label,
        rawWeight: processWeight(rawWeight, itemDetails),
        cookedWeight: processWeight(cookedWeight, itemDetails),
        isRaw: itemDetails.isRaw,
        icon: itemDetails?.icon || "",
        foodBoxType: itemDetails.foodBoxType,
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
    main: mainCarbGrocery,
    fruits: fruitsGrocery,
    vegetables: vegetableGrocery,
  };
};
