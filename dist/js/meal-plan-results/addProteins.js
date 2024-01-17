import { PROTEEINS_SPLIT_RATIO, SPRINT_DAYS } from "./constants.js";
import proteinsBank from "../../data/proteins/index.js";
import { updateAvailableMacros } from "./common.js";

export const addProteins = (goal, userProteinsList, availableMacros) => {
  const proteinsLimit = availableMacros.value.pro;

  const proteinsTypes = {
    dynamic: [],
    static: [],
  };
  let staticProteinsPercentage = 0;

  userProteinsList.forEach((item) => {
    console.log(item);

    if (proteinsBank[item].type != "static") {
      proteinsTypes.dynamic.push({ [item]: proteinsBank[item] });
    } else {
      const itemPercentage = PROTEEINS_SPLIT_RATIO[goal][item];
      staticProteinsPercentage += itemPercentage;
      proteinsTypes.static.push({
        details: { ...proteinsBank[item] },
        percentage: itemPercentage,
        dailyProteinPortion: (proteinsLimit * itemPercentage).toFixed(1),
      });
    }
  });
  const dynamicProteinPercentage = 1 - staticProteinsPercentage;
  const dynamicProteinPortion =
    dynamicProteinPercentage / proteinsTypes.dynamic.length;

  //add the percentages to the dynamic protein list
  const newDynamicProteinList = proteinsTypes.dynamic.map((item) => ({
    details: proteinsBank[Object.keys(item)[0]],
    percentage: dynamicProteinPortion,
    dailyProteinPortion: (proteinsLimit * dynamicProteinPortion).toFixed(1),
  }));

  proteinsTypes.dynamic = newDynamicProteinList;

  const prossessProteinsType = (list) =>
    list.map((item) => {
      let rawWeight = 0;
      let cookedWeight = 0;
      console.log(item.details.label, item.details.isRaw);
      if (item.details.isRaw) {
        rawWeight =
          (item.dailyProteinPortion / item.details.nutrientFactsRaw.protein) *
          100;
      }
      cookedWeight =
        (item.dailyProteinPortion / item.details.nutrientFacts.protein) * 100;

      updateAvailableMacros(
        cookedWeight,
        item.details.nutrientFacts,
        availableMacros
      );

      return {
        value: item.details.value,
        label: item.details.label,
        rawWeight: parseInt(rawWeight.toFixed(0)) * SPRINT_DAYS,
        cookedWeight: parseInt(cookedWeight.toFixed(0)) * SPRINT_DAYS,
      };
    });

  const proccessedDynamicProteins = prossessProteinsType(proteinsTypes.dynamic);
  const proccessedStaticProteins = prossessProteinsType(proteinsTypes.static);

  const proteinsGroccery = [
    ...proccessedStaticProteins,
    ...proccessedDynamicProteins,
  ];

  return proteinsGroccery;
};
