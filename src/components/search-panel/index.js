export const getSearchParams = (searchColumns = []) => {
  const filterList = [];
  searchColumns.forEach((item) => {
    if (item.component === "radio" && item.value?.length > 0) {
      filterList.push({
        field: item.prop,
        target: item.target || item.prop,
        operator: item.operator,
        value: item.options.find((opt) => opt.value === item.value[0])
          .realValue,
      });
    }
    if (item.component === "input" && item.value?.length > 0) {
      filterList.push({
        field: item.prop,
        target: item.target || item.prop,
        operator: item.operator,
        value: item.value,
      });
    }
  });
  return filterList;
};
