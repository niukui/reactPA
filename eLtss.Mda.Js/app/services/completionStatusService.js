import lodash from 'lodash';
import {findCompleteRequiredItems} from 'services/completeRequiredServices';
import {ISP_WORKFLOW_STATUS, PART_V_WORKFLOW_STATUS, ISP_SIGNER_TYPE_IDS, LIFE_AREA_IDS, POC_SIGNER_TYPE_IDS} from 'utils/constants';
import * as constants from 'containers/SectionEditPage/constants';

export const COMPLETION_STATUSES = {
  Attention: 'attention',
  Complete: 'complete',
  InProgress: 'in-progress',
  NotEditable: 'not-editable',
  NotStarted: 'not-started',
  Ready: 'ready',
  Submitted: 'submitted',
  None: 'none'
};

const checkItem = (item, data) => {
  let result = -1;
  if (!item) {
    result = -1;
  } else if (!item.IsRequired && !item.CompleteRequired) {
    result = -1;
  } else {
    const value = lodash.get(data, item.Name);
    if (item.ValueType === "bool") {
      result = (value !== undefined && value !== null)
        ? 1
        : 0;
    } else if (item.Type === "CheckboxList") {
      result = (value !== undefined && value !== null && value.length > 0 && value[0])
        ? 1
        : 0;
    } else {
      result = (value !== undefined && value !== null && value !== "")
        ? 1
        : 0;
    }
  }

  return result;
};

const checkSection = (section, data) => {
  let result = -1;
  if (!section) {
    result = -1;
  } else if (!section.CompleteRequired) {
    result = -1;
  } else if (section.MultiEntry) {
    if (section.Name === 'AgreementSignatures') {
      let assignedProviders = lodash.get(data, "AssignedProviders");
      result = getPart4SignatureStatus(data, assignedProviders, true);
      //console.log(`${section.Name} = ${result}`);
      return result;
    }
    if (data && data.length > 0) {
      result = 1;
    } else {
      result = 0;
    }
  } else {
    let sectionsItems = [];
    if (section.CompleteRequiredRule) {
      const names = findCompleteRequiredItems(data, section.CompleteRequiredRule);
      sectionsItems = section
        .Items
        .concat(section.Sections)
        .filter(si => names.indexOf(si.Name) >= 0);
    } else {
      sectionsItems = section
        .Items
        .concat(section.Sections)
        .filter(si => si.CompleteRequired);
    }

    let totalCompleteRequired = 0;
    let totalFinished = 0;
    for (let sectionItem of sectionsItems) {
      let result = checkSectionItem(sectionItem, data);
      totalCompleteRequired = totalCompleteRequired + 1;
      totalFinished = totalFinished + result;
    }
    result = totalCompleteRequired === 0
      ? -1
      : totalFinished / totalCompleteRequired;
  }

  //console.log(`${section.Name} = ${result}`);
  return result;
};

const checkSectionItem = (sectionItem, data) => {
  if (sectionItem.Items) {
    return checkSection(sectionItem, lodash.get(data, sectionItem.Name));
  } else {
    return checkItem(sectionItem, data);
  }
};

const hasValue = (data) => {
  const existingValues = lodash
    .values(data)
    .filter(value => (value != null && (!Array.isArray(value) || (Array.isArray(value) && value.length > 0))));
  return existingValues.length > 0;
};

const getStatus = (result, currentValue) => {
  let status = COMPLETION_STATUSES.NotStarted;

  if (result == -1) {
    status = COMPLETION_STATUSES.None;
  } else if (result === 0) {
    if (hasValue(currentValue)) {
      status = COMPLETION_STATUSES.InProgress;
    } else {
      status = COMPLETION_STATUSES.NotStarted;
    }
  } else if (result === 1) {
    status = COMPLETION_STATUSES.Complete;
  } else {
    if (!hasValue(currentValue)) {
      status = COMPLETION_STATUSES.NotStarted;
    } else {
      status = COMPLETION_STATUSES.InProgress;
    }
  }
  return status;
};

const calculateSectionStatus = (fieldNamePrefix, section, data) => {
  let name = section.Name;
  let status;

  if (name === 'SharedPlannings') {
    let sharedPlannings = lodash.get(data, "SharedPlannings");
    status = getSharedPlanningStatus(sharedPlannings);
    return status;
  }
  if (name === 'AgreementSignatures') {
    let signatures = lodash.get(data, "Agreement.AgreementSignatures");
    let assignedProviders = lodash.get(data, "AssignedProviders");
    status = getPart4SignatureStatus(signatures, assignedProviders);
    return status;
  }

  if (name === 'GeneralScheduleSupports') {
    let generalScheduleSupports = lodash.get(data, "PlanForSupport.GeneralScheduleSupports");
    status = getPart5GeneralScheduleSupportStatus(generalScheduleSupports);
    return status;
  }
  if (name === 'Signatures') {
    let signatures = lodash.get(data, "PlanForSupport.Signatures");
    status = getPart5SignatureStatus(signatures);
    return status;
  }
  if (name === 'ServiceAndOutcomes') {
    return getPart5ServiceAndOutcomeStatus(lodash.get(data, "PlanForSupport"));
  }

  const currentFieldNamePrefix = fieldNamePrefix
    ? fieldNamePrefix + "." + name
    : name;
  const currentValue = lodash.get(data, currentFieldNamePrefix);
  const result = checkSection(section, currentValue);

  status = getStatus(result, currentValue);
  return status;
};

export const getPart5ServiceAndOutcomeStatus = (planForSupport) => {
  if (!planForSupport) {
    return COMPLETION_STATUSES.NotStarted;
  }
  if (!planForSupport.LxServiceId && !planForSupport.EffectiveDate && (!planForSupport.ServiceOutcomes || planForSupport.ServiceOutcomes.length === 0)) {
    return COMPLETION_STATUSES.NotStarted;
  } else {
    if (planForSupport.LxServiceId && planForSupport.EffectiveDate && planForSupport.ServiceOutcomes && planForSupport.ServiceOutcomes.length > 0) {
      let everyOutcomeHasActivities = true;
      lodash.forEach(planForSupport.ServiceOutcomes, (outcome) => {
        if (!outcome.SupportActivities || outcome.SupportActivities.length === 0) {
          everyOutcomeHasActivities = false;
        }
      });
      if (everyOutcomeHasActivities) {
        return COMPLETION_STATUSES.Complete;
      } else {
        return COMPLETION_STATUSES.InProgress;
      }
    }
    return COMPLETION_STATUSES.InProgress;
  }
};

export const getSharedPlanningStatus = (sharedPlannings) => {
    if(sharedPlannings && sharedPlannings.length > 0){
      let goals = 0;
      lodash.forEach(sharedPlannings, (i)=>{
        if(i.ProblemDatas && i.ProblemDatas.length > 0 ){
          lodash.forEach(i.ProblemDatas, (j)=>{
            if(j.GoalDatas && j.GoalDatas.length > 0){
              goals  = goals + j.GoalDatas.length;
            }
          });          
        }      
      });
      return goals >=3 ? COMPLETION_STATUSES.Complete
                       : COMPLETION_STATUSES.InProgress;
    } 
  return COMPLETION_STATUSES.InProgress;
};

const getPart4SignatureStatus = (signatures, assignedProviders, numberValue = false) => {
  let result = COMPLETION_STATUSES.NotStarted;
  let value = 0;
  if (signatures && signatures.length > 0) {

    let providerSignedIds = [];
    lodash.forEach(signatures, (i) => {
      if (i.SignerType.Id.toLowerCase() === POC_SIGNER_TYPE_IDS.provider && i.SignatureProvider) {
        providerSignedIds.push(i.SignatureProvider.OwnerOrganizationUnitId);
      }
    });

    let AreAllProvidersSigned = true;
    lodash.forEach(assignedProviders, (i) => {
      if (providerSignedIds.lastIndexOf(i.OwnerOrganizationUnitId) == -1) {
        if (!i.IsAddedAfterScComplete) {
          AreAllProvidersSigned = false;
        }
      }
    });
    let individualOrSubstituteDecisionMakerSigned = signatures.find(x => x.SignerType.Id.toLowerCase() === POC_SIGNER_TYPE_IDS.person || x.SignerType.Id.toLowerCase() === POC_SIGNER_TYPE_IDS.substituteDecisionMaker);
    let supportCoordinatorSigned = signatures.find(x => x.SignerType.Id.toLowerCase() === POC_SIGNER_TYPE_IDS.scCm);

    const complete = AreAllProvidersSigned && !!individualOrSubstituteDecisionMakerSigned && !!supportCoordinatorSigned;

    if (!complete) {
      result = COMPLETION_STATUSES.InProgress;
      value = 0;
    } else {
      result = COMPLETION_STATUSES.Complete;
      value = 1;
    }
  } else {
    result = COMPLETION_STATUSES.NotStarted;
    value = 0;
  }
  return numberValue
    ? value
    : result;
};

const getPart5SignatureStatus = (signatures) => {
  if (signatures && signatures.length > 0) {
    let providerSigned = signatures.find(x => x.SignerType.Id.toLowerCase() === POC_SIGNER_TYPE_IDS.provider);
    let individualOrSubstituteDecisionMakerSigned = signatures.find(x => x.SignerType.Id.toLowerCase() === POC_SIGNER_TYPE_IDS.person || x.SignerType.Id.toLowerCase() === POC_SIGNER_TYPE_IDS.substituteDecisionMaker);
    const complete = !!providerSigned && !!individualOrSubstituteDecisionMakerSigned;

    if (!complete) {
      return COMPLETION_STATUSES.InProgress;
    }
    return COMPLETION_STATUSES.Complete;
  } else {
    return COMPLETION_STATUSES.NotStarted;
  }
};

const getPart5GeneralScheduleSupportStatus = (GeneralScheduleSupports) => {
  if (GeneralScheduleSupports && GeneralScheduleSupports.length > 0) {
    return COMPLETION_STATUSES.Complete;
  } else {
    return COMPLETION_STATUSES.NotStarted;
  }
};

export const calculateSectionsStatus = (data, metadata, forPart5 = false) => {
  let completionStatus = {};
  if (forPart5) {
    //const part5 = lodash.find(metadata.Sections, {'Name': 'PlanForSupport'});
    // let overallStatus = calculateSectionStatus('', part5, data, forPart5);
    // completionStatus.OverallStatus = overallStatus;
    lodash.forEach(metadata.Sections, (section) => { 
      let status = calculateSectionStatus('', section, data);
      lodash.set(completionStatus, section.Name, status);
    });
  } else {
    lodash.forEach(metadata.Sections, (section) => { 
      if (section.Name === 'PlanForSupport') {
        return;
      }
      let status = calculateSectionStatus('', section, data);                 

      if(data.ProgramType &&(data.ProgramType.Name == constants.POC_PROGRAM_TYPE_CWD ||  data.ProgramType.Name == constants.POC_PROGRAM_TYPE_LTSS))
      {
          if(section.Name == constants.POC_SECTION_ESSENTIAL_INFORMATION || section.Name == constants.POC_SECTION_SHARED_PLANNING || section.Name == constants.POC_SECTION_AGREEMENT)
        {
          lodash.set(completionStatus, section.Name, {'OverallStatus': status});
        }else{
          lodash.set(completionStatus, section.Name, {'OverallStatus': 'none'});
        }

      }else{
        lodash.set(completionStatus, section.Name, {'OverallStatus': status});
      }

      if (section.Sections.length > 0) {
        if(data.ProgramType&&(data.ProgramType.Name == constants.POC_PROGRAM_TYPE_CWD ||  data.ProgramType.Name == constants.POC_PROGRAM_TYPE_LTSS) && (section.Name == constants.POC_SECTION_PERSONAL_PROFILE))
        {
          lodash.forEach(section.Sections, (subSection) => {
            let status2 = calculateSectionStatus(section.Name, subSection, data);
            lodash.set(completionStatus, section.Name + '.' + subSection.Name, "none");
          });
        }else if(data.ProgramType&&(data.ProgramType.Name == constants.POC_PROGRAM_TYPE_CWD ||  data.ProgramType.Name == constants.POC_PROGRAM_TYPE_LTSS) && (section.Name == constants.POC_SECTION_AGREEMENT)){
          lodash.forEach(section.Sections, (subSection) => {
            let status2 = calculateSectionStatus(section.Name, subSection, data);
            if(subSection.Name == "AgreementSignatures"){ 
                lodash.set(
                  lodash.set(completionStatus, section.Name, {"OverallStatus":status2})
                  , section.Name + '.' + subSection.Name, status2)
            }else{
              lodash.set(completionStatus, section.Name + '.' + subSection.Name, "none");
            }
          });
        }
        else{
          lodash.forEach(section.Sections, (subSection) => {
            let status2 = calculateSectionStatus(section.Name, subSection, data);
            lodash.set(completionStatus, section.Name + '.' + subSection.Name, status2);
          });
        }
      }
      if (section.Name === 'Agreement' && lodash.get(completionStatus, 'Agreement.OverallStatus') === COMPLETION_STATUSES.Complete) {
        const agreementStatus = lodash.get(completionStatus, section.Name);
        let overallCompleted = true;
        lodash.forEach(section.Sections, (s, key) => {
          const sectionStatus = lodash.get(completionStatus, 'Agreement.' + s.Name);
          if (sectionStatus && (sectionStatus === COMPLETION_STATUSES.InProgress)) {
            overallCompleted = false;
          }
        });
        if (!overallCompleted) {
          lodash.set(completionStatus, section.Name + '.OverallStatus', COMPLETION_STATUSES.InProgress);
        }
      }
    });
    // update part IV overall status if (completionStatus.Agreement.OverallStatus
    // === COMPLETION_STATUSES.Complete) {}

  }
  return completionStatus;
};

export const getSectionStatus = (fieldNamePrefix, section, data) => {
  if (typeof section === 'string') { // get status by section name
    if (section === 'PlanForSupport') {
      return calculatePart5OverallStatus(data);
    } else {
      return lodash.get(data, `CompletionStatus.${section}`);
    }
  }
  
  const level = section.EditLevel || section.Level;
  if (level === 0) {
    return lodash.get(data, `CompletionStatus.${section.Name}.OverallStatus`);
  } else if (level === 1) {
    return lodash.get(data, `CompletionStatus.${fieldNamePrefix}.${section.Name}`);
  }
};

export const calculatePart5OverallStatus = (planForSupportList) => {
 
  if (!planForSupportList || planForSupportList.length === 0) {
    return COMPLETION_STATUSES.NotStarted;
  }

  const notCompleteStatus = [PART_V_WORKFLOW_STATUS.inProgress, PART_V_WORKFLOW_STATUS.pendingScReview, PART_V_WORKFLOW_STATUS.pendingProviderReview];

  let result = lodash.find(planForSupportList, x => notCompleteStatus.includes(x.WorkflowStatus.Name));
  if (result) {
    return COMPLETION_STATUSES.InProgress;
  }

  let completed = lodash.find(planForSupportList, x => x.WorkflowStatus.Name === PART_V_WORKFLOW_STATUS.partVCompleted || x.WorkflowStatus.Name === PART_V_WORKFLOW_STATUS.allPartVsCompletedForTheProvider || x.WorkflowStatus.Name === PART_V_WORKFLOW_STATUS.approved);
  if (completed) {
    return COMPLETION_STATUSES.Complete;
  }

  return COMPLETION_STATUSES.NotStarted;
};