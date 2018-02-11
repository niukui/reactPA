import lookupIsp from './lookups/lookupIsp';
import lookupSpIpc from './lookups/lookupSpIpc';
import lookupOutreach from './lookups/lookupOutreach';
import lookupPoc from './lookups/lookupPoc';

const allLookups = Object.assign({}, lookupIsp, lookupSpIpc, lookupOutreach, lookupPoc);

export function FindByCategory(category) {
  const result = Object.assign([], allLookups[category]);
  return {"DataObject": result};
}