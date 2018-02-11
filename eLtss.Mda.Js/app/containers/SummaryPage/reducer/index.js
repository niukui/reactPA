import {combineReducers} from 'redux-immutable';
import generalReducer from "./General";
import ipcReducer from "./IndividualPlanningCalendar";
import ispReducer from "./IndividualSupportPlan";
import pocReducer from "./PlanOfCare";
import supportsPackageReducer from "./SupportsPackage";

export default (inputState,action) => {
  if(action.type.startsWith("generalEvent"))
  {
    return ipcReducer(inputState,action);
  }
  else if(action.type.startsWith("supportsPackage"))
  {
    return supportsPackageReducer(inputState,action);
  }
  else if(action.type.startsWith("isp"))
  {
    return ispReducer(inputState,action);
  }
  // else if(action.type.startsWith("poc"))
  // {
  //   return pocReducer(inputState,action);
  // }
  else
  {
    return generalReducer(inputState,action);
  }
};