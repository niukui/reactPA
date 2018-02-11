import {get, set} from 'lodash';
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import * as customAclRules from 'services/customAclRules';

const DefaultEnableAcl = true;

export const getAccessList = (securityContext, resourceList, resourceName) => {
  const defaultLevel = getAccess(securityContext, resourceName);
  let subAccessLevels = {};
  resourceList.map((sectionName) => {
    const subAccessLevel = getAccess(securityContext, `${resourceName}.${sectionName}`);
    set(subAccessLevels, sectionName, subAccessLevel || defaultLevel);
  });
  return subAccessLevels;
};

export const getAccess = (securityContext, sectionName) => {
  let aclObject = getAclObject(securityContext.AccessModel, securityContext.CurrentIdentity, sectionName);
  return getAccessLevel(aclObject, sectionName, securityContext);
};

export const canAccess = (securityContext, resourceName, enableAcl = DefaultEnableAcl) => {
  if (!DefaultEnableAcl) {
    return true;
  }
  const aclObject = getAclObject(securityContext.AccessModel, securityContext.CurrentIdentity, resourceName);
  const accessLevel = getAccessLevel(aclObject, resourceName, securityContext);
  return accessLevel && (accessLevel.indexOf('Write') >= 0 || accessLevel.indexOf('Delete') >= 0 || accessLevel.indexOf('Read') >= 0);
};

export const canManage = (securityContext, resourceName, enableAcl = DefaultEnableAcl) => {
  if(!DefaultEnableAcl)
  {
    return true;
  }
  const aclObject = getAclObject(securityContext.AccessModel, securityContext.CurrentIdentity, resourceName);
  const accessLevel = getAccessLevel(aclObject, resourceName, securityContext);
  return checkEditLevel(accessLevel);
};

export const canAdd = (securityContext, resourceName, enableAcl = DefaultEnableAcl) => {
  if (!DefaultEnableAcl) {
    return true;
  }
  const aclObject = getAclObject(securityContext.AccessModel, securityContext.CurrentIdentity, resourceName);
  const accessLevel = getAccessLevel(aclObject, resourceName, securityContext);
  return accessLevel && (accessLevel.indexOf('Create') >= 0);
};

export const canEdit = (securityContext, resourceName, enableAcl = DefaultEnableAcl) => {
  if(!DefaultEnableAcl)
  {
    return true;
  }
  const aclObject = getAclObject(securityContext.AccessModel, securityContext.CurrentIdentity, resourceName);
  const accessLevel = getAccessLevel(aclObject, resourceName, securityContext);
  return accessLevel && (accessLevel.indexOf('Write') >= 0);
};

export const canDelete = (securityContext, resourceName, enableAcl = DefaultEnableAcl) => {
  if (!DefaultEnableAcl) {
    return true;
  }
  const aclObject = getAclObject(securityContext.AccessModel, securityContext.CurrentIdentity, resourceName);
  const accessLevel = getAccessLevel(aclObject, resourceName, securityContext);
  return accessLevel && (accessLevel.indexOf('Delete') >= 0);
};

export const checkAccess = (accessModel, currentIdentity, parentSectionName, sectionName, workflowStatus = ISP_WORKFLOW_STATUS.pendingScInput) => {
  let aclObject = getAclObject(accessModel, currentIdentity, sectionName);
  if (!aclObject) {
    return false;
  }
  let accessLevel = getAccessLevel(aclObject, sectionName, securityContext);
  if (accessLevel === "") {
    aclObject = getAclObject(accessModel, currentIdentity, parentSectionName);
    accessLevel = getAccessLevel(aclObject, parentSectionName, securityContext);
  }
  return checkEditLevel(accessLevel);
};

export const checkEditLevel = (accessLevel) => {
  if (accessLevel && (accessLevel.indexOf('Write') >= 0 || accessLevel.indexOf('Delete') >= 0)) {
    return true;
  }
  return false;
};

export const getAclObject = (accessModel, currentIdentity, resourceName) => {
  if (!accessModel || !accessModel.AccessPolicies) {
    return null;
  }

  const accessPolicies = accessModel.AccessPolicies || [];
  if (!accessPolicies) {
    return null;
  }
  if (!currentIdentity || !currentIdentity.Permissions) {
    return null;
  }
  let policies = [];
  currentIdentity
    .Permissions
    .map((permission) => {
      accessPolicies.map((policy) => {
        if (policy && policy.Permission === permission) 
          policies.push(policy);
        }
      );
    });
  if (policies) {
    let aclObject = [];
    policies.map((policy) => {
      if (policy && policy.Resource && policy.Resource === resourceName) {
        aclObject.push(policy);
      }
    });
    return aclObject;
  }
  return null;
};

export const getAccessLevel = (aclObject, sectionName, securityContext) => {
  var workflowStatus = securityContext.WorkflowStatus && securityContext.WorkflowStatus.Name;
  if (!aclObject || (aclObject.length === 1 && !aclObject[0])) {
    return null;
  }
  let accessLevels = [];
  aclObject.map((policy) => {
    if (policy && policy.Policy && policy.Policy.Status && (policy.Policy.Status.includes(workflowStatus) || policy.Policy.Status.includes('*'))) {
      let validPolicy = true;
      if (policy.CustomRules) {
        validPolicy = checkCustomRules(policy.CustomRules, securityContext);
      }
      if (validPolicy === true) {
        policy
          .Policy
          .AccessLevels
          .map((level) => {
            if (level) {
              accessLevels.push(level);
            }
          });
      }
    }
  });
  if (accessLevels && accessLevels.length > 0 && accessLevels[0]) {
    return accessLevels.join();
  }
  return '';
};

export const checkCustomRules = (customRules, securityContext) => {
  if (customRules && customRules.length > 0 && customRules[0]) {
    const results = customRules.map((customRule) => {
      let result = execCustomRule(customRule, securityContext);
      if (!result) {
        return false;
      }
    });
    if (results.includes(false)) {
      return false;
    }
  }
  return true;
};

export const execCustomRule = (customRule, securityContext) => {
  const customRuleFunc = new Function('customAclRules', 'securityContext', `try{ 
    return customAclRules.${customRule}.call(this,securityContext); 
  }catch(err)
  {
    return false;
  }`);
  return customRuleFunc(customAclRules, securityContext);
};

export const RULE_ATTRIBUTES = {
  csb: '9de2f010-bc0d-40d7-8c04-e38dfc10c6dc',
  provider: 'cae6b4a8-4ba4-457f-abe9-594d19aa8c28',
  superUser:'49907b31-68e3-4f69-9b89-566a82e82df7'
};


