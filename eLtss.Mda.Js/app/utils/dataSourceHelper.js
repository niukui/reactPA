import {findNamesByCategory, findLookupItemsByCategory} from 'services/lookupServices';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';

export default function extractDataOptions(itemDataSourceDefinition, dropdownDataSource, itemName, filterRuleAttributes) {
  /*  "DataSource": { // in the order of the following
      "Options": "SupportsPackageAreaSelectList",
      "LookupCategory": "supportspackageareas",
      "LookupPrefix": "ipc"
    }

    options are text/value pairs that are transformed dataSource list
  */
  let options = [],
    dataSource = [];
  if (itemDataSourceDefinition && itemDataSourceDefinition.Options) {
    Object.assign(dataSource, dropdownDataSource[itemDataSourceDefinition.Options]);
    if (dataSource && dataSource[0] && dataSource[0].Id) {
      options = selectListItemsForDropdown(dataSource, 'Id', 'Name');/* by convention Id and Name should exist */
    } else {/* by default list has Value/Text pair */
      options = selectListItemsForDropdown(dataSource);
    }
  } else {
    let lookupCategory = itemDataSourceDefinition.LookupCategory;
    if (lookupCategory) {
      lookupCategory = lookupCategory.toLowerCase();
    } else if (itemDataSourceDefinition.LookupPrefix) {
      lookupCategory = `${itemDataSourceDefinition
        .LookupPrefix}${itemName}s`
        .toLowerCase();
    };
    options = findNamesByCategory(lookupCategory, filterRuleAttributes || []);
    dataSource = findLookupItemsByCategory(lookupCategory);
  }
  return {options, dataSource};
}