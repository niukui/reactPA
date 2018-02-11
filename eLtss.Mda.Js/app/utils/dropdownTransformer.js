export function selectListItemsForDropdown(items, valueFieldName, textFieldName) {
  if (!items) {
    return [];
  }
  if (valueFieldName && textFieldName) {
    return items && items.map((item) => ({value: item[valueFieldName], text: item[textFieldName]}));
  }
  if (valueFieldName) {
    return items && items.map((item) => ({value: item[valueFieldName], text: item.Text}));
  }
  if (textFieldName) {
    return items && items.map((item) => ({value: item.Value, text: item[textFieldName]}));
  }
  return items && items.map((item) => ({value: item.Value, text: item.Text}));
}

export function selectListItemsForMultiSelect(items, valueFieldName, labelFieldName) {
  if (!items) {
    return [];
  }
  return items && items.map((item) => ({value: item[valueFieldName], label: item[labelFieldName]}));
}