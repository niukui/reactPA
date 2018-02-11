import {HOST} from 'config';
import requestApi from 'utils/requestApi';
import {selectListItemsForDropdown} from 'utils/dropdownTransformer';
import {forIn} from 'lodash';

let lookupItems = {};
let dropdownOptions = {};

export function findNamesByAttributes(category, ruleAttributes) {
    return findLookupItemsByCategory(category).then((result) => {
        const resultFilter = result.filter(item => item.RuleAttributes.find(x => (ruleAttributes && ruleAttributes.includes(x.Guid)) || !ruleAttributes));
        return selectListItemsForDropdown(resultFilter, "Id", "Name");
    });
}

export function findNamesByCategory(category) {
    return findLookupItemsByCategory(category).then((result) => {
        return selectListItemsForDropdown(result, "Id", "Name");
    });
}

export function findLookupItemsByAttribute(category, ruleAttribute) {
    return findLookupItemsByCategory(category).then((result) => {
        const resultFilter = result.filter(item => item.RuleAttributes.find(x => ruleAttribute === x.Guid));
        return resultFilter;
    });
}

export function findLookupItemsByCategory(category) {
    return new Promise((resolve, reject) => {
        if (lookupItems[category]) {
            resolve(lookupItems[category]);
        } else {
            const requestURL = `${HOST}/Lookup/FindByCategory?category=${category}`;
            requestApi(requestURL, {credentials: 'include'}).then((result) => {
                lookupItems[category] = result.DataObject;
                resolve(lookupItems[category]);
            }).catch((err) => {
                reject(err);
            });
        }
    });
}
