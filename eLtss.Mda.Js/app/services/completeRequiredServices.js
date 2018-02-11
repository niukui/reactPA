import lodash from 'lodash';
import * as completeRequiredRules from './completeRequiredRules';


export function findCompleteRequiredItems(data, rule) {
  return buildJavascriptFunction(rule)(completeRequiredRules, lodash, data) || [];
}

export function findDefaultCompleteRequiredSectionsItems(section) {
  return lodash.filter(section.Sections || [], {
    'CompleteRequired': true
  }).concat(lodash.filter(section.Items || [], {
    'CompleteRequired': true
  }));
}

export function buildJavascriptFunction(rule) {
  const func = new Function('completeRequiredRules', 'lodash', 'data', `try{ return completeRequiredRules.${rule}.call(this,lodash,data); }catch(err){return [];}`);
  return func;
}