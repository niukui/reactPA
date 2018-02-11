import moment from 'moment';
import {ISP_WORKFLOW_STATUS,PART_V_WORKFLOW_STATUS} from 'utils/constants';
import lodash from "lodash";

export function EditableUntil30DaysAfterEndDate(securityContext) {
  try {
    if (!securityContext.EffectiveDateRange.EndDate || 
    securityContext.WorkflowStatus.Name === ISP_WORKFLOW_STATUS.pendingScInput ||
    securityContext.WorkflowStatus.Name === PART_V_WORKFLOW_STATUS.inProgress) {
      return true;
    }
    const endDate = new moment(securityContext.EffectiveDateRange.EndDate).add(30, 'day');
    return endDate.isSameOrAfter(moment(), "day");
  } catch (err) {
    return true;
  }
}

export function LockAgreementWhenModifySharedPlanningAfterIspCompleted(securityContext) {
  try {
    const hasProviderAddedAfterIspCompleted = lodash.some(securityContext.AssignedProviders, item => {
      return item.IsAddedAfterIspCompleted === true;
    });
    return !hasProviderAddedAfterIspCompleted;
  } catch (err) {
    return false;
  }
}

export function OnlyCheckedOutStaffCanEdit(securityContext) {
  try {
    const loginStaffId = lodash.get(securityContext,"CurrentIdentity.OnBehalfOfPersonId");
    const checkedOutStaffId = lodash.get(securityContext.ModuleData,"CurrentCheckedInfo.CheckedBy.UserId");
    if (checkedOutStaffId === null || checkedOutStaffId !== loginStaffId) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

export function InProgressOrNewCannotAddToOutreachQueue(securityContext){
  try{
    if(securityContext.ModuleData.length>0){
      let outReachData=lodash.find(securityContext.ModuleData,function(item){
          return item.WorkflowStatus.Name==="New"|| item.WorkflowStatus.Name==="InProgress"
        })
      if(outReachData==null||undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }catch(err){
    return false;
  }
}