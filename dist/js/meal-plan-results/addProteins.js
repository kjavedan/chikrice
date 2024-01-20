import { SPRINT_DAYS } from "./constants.js";
import proteinsBank from "../../data/proteins/index.js";
import { processWeight, updateAvailableMacros } from "./common.js";

export const addProteins = (goal, userProteinsList, availableMacros) => {
  const proteinsLimit = availableMacros.value.pro;

  // Calculate dynamic protein percentages based on priority
  const totalDynamicPriority = userProteinsList.reduce(
    (total, protein) => total + proteinsBank[protein].priority[goal],
    0
  );

  console.log("totalDynamicPriority", totalDynamicPriority);

  const proteinsWithPercentage = userProteinsList.map((protein) => ({
    details: proteinsBank[protein],
    percentage: proteinsBank[protein].priority[goal] / totalDynamicPriority,
  }));

  console.log(proteinsWithPercentage);
  // Process proteins
  const processedProteins = proteinsWithPercentage.map((item) => {
    const dailyProteinPortion =
      (proteinsLimit * item.percentage).toFixed(1) || 0;

    let rawWeight = 0;
    let cookedWeight = 0;

    if (item.details.isRaw) {
      rawWeight =
        (dailyProteinPortion / item.details.nutrientFactsRaw.protein) * 100;
    }
    cookedWeight =
      (dailyProteinPortion / item.details.nutrientFacts.protein) * 100;

    updateAvailableMacros(
      cookedWeight,
      item.details.nutrientFacts,
      availableMacros
    );

    return {
      value: item.details.value,
      label: item.details.label,
      rawWeight: processWeight(rawWeight, item.details),
      cookedWeight: processWeight(cookedWeight, item.details),
      isRaw: item.details.isRaw,
    };
  });

  return processedProteins;
};
