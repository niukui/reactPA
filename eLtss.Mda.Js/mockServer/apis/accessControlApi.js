import lodash from "lodash";
import accessControlIpc from './accessControls/accessControlIpc';
import accessControlIsp from './accessControls/accessControlIsp';
import accessControlOutreach from './accessControls/accessControlOutreach';
import accessControlPlanForSupport from './accessControls/accessControlPlanForSupport';
import accessControlPOC from './accessControls/accessControlPOC';
import accessControlSp from './accessControls/accessControlSp';
import accessControlVistChecklist from './accessControls/accessControlVisitChecklist';


const accessControl = [].concat(accessControlIpc, accessControlIsp, accessControlOutreach, accessControlPlanForSupport,accessControlPOC,accessControlSp,accessControlVistChecklist);

// export default function getAccessPolicies() {   let result =
// Object.assign([], accessControl.AccessPolicies);   return {"DataObject":
// result}; }

export default function getAccessPoliciesByModule(moduleName) {
  let accessModel = accessControl[0];
  accessControl.map((obj) => {
    if (obj.Name == moduleName) {
      accessModel = obj;
    }
  });
  let result = Object.assign([], accessModel.AccessPolicies);
  return {"DataObject": result};
}