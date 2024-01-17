export const updateAvailableMacros = (
  itemWeight,
  itemInfo,
  availableMacros
) => {
  const { carbs, protein, fat } = itemInfo;
  const fatToDecrease = ((itemWeight / 100) * fat).toFixed(0);
  const carbsToDecrease = ((itemWeight / 100) * carbs).toFixed(0);
  const proteinToDecrease = ((itemWeight / 100) * protein).toFixed(0);

  availableMacros.value.fat -= fatToDecrease;
  availableMacros.value.pro -= proteinToDecrease;
  availableMacros.value.carbs -= carbsToDecrease;
};
