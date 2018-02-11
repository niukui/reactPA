import { take, call, put, fork } from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from '../../constants';
import * as actions from '../../actions';
import { HOST, combineUrlByQuery, getRoutePrefix } from 'config';
import { browserHistory } from 'react-router';
import path from 'path';
import lodash from 'lodash';
import { calculateSectionsStatus } from 'services/completionStatusService';
import toastr from "utils/toastr";
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import getMetadataFromCache from 'services/metadataServices';


export function* addPlanForSupport(action) {
  try {

    const dataId = action.dataId;
    const clientId = action.clientId;
    const metadata = action.metadata;

    const query = {
      dataId,
      clientId: action.clientId
    }
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.CreatePlanForSupportAction, query);

    const plan = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include'
    });

    yield put(actions.planForSupportAdded(plan.DataObject));
    yield put(actions.toPlanForSupportSummaryPage(plan.DataObject, dataId, clientId, metadata ));
  } catch (err) {
    toastr.error(err);
  }
}

export function* redirectToPlanForSupportSummaryPage(action) {
  const parentDataId = action.parentDataId;
  const clientId = action.clientId;
  const dataId = action.plan.Id;
  const metadata = action.metadata;
  const query = {
    parentDataId,
    clientId,
    dataId,
    moduleName : "PlanForSupport"
  };
  const prefix = getRoutePrefix(action.metadata.Options.Prefix);

  yield call(browserHistory.push, {
    pathname: path.resolve(prefix, 'ispPart5Summary'),
    query
  });
}

export function* searchProviders(action) {
  const requestURL = `${HOST}/ProviderCommonSearch/SearchProviders`;
  const {
    ProviderName,
    NpiApi,
    TaxIdentifier,
    ProviderNumber,
    SourceInfo,
    ProviderType,
    ProviderSpecialtyCode,
    ServiceOffered
  } = action.searchCriteria;

  let searchCriteria = {
    ProviderName,
    ProviderNumber,
    TaxIdentifier,
    NationalProviderIdentification: NpiApi,
    ProviderSourceInfoId: SourceInfo
      ? SourceInfo.Id
      : '',
    ServiceProviderTypeId: ProviderType
      ? ProviderType.Id
      : '',
    ProviderSpecialtyCodeId: ProviderSpecialtyCode
      ? ProviderSpecialtyCode.Id
      : '',
    LxServiceId: ServiceOffered
      ? ServiceOffered.Id
      : ''
  };

  try {
    let formData = new FormData();
    formData.append("providerProfileSearchCriteriaJson", JSON.stringify(searchCriteria));

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.providerSearchResultLoaded(result.data));
  } catch (err) {
    toastr.error(err);
  }
}

export function* selectProvider(action) {
 
  const requestURL = `${HOST}/IndividualSupportPlans/IspProvider/AddProvider`;

  try {
    let data = lodash.cloneDeep(action.data);
    let metadata = action.metadata;

    let entityData=data[metadata.Name];

    let assignedProviders = lodash.get(data, `${metadata.Name}.AssignedProviders`);
    if(entityData.WorkflowStatus.Name!=ISP_WORKFLOW_STATUS.pendingScInput){
       assignedProviders.push({ Id: action.id, OwnerOrganizationUnitId: action.ownerOrganizationUnitId,IsAddedAfterScComplete:true});
    }
    else{
      assignedProviders.push({ Id: action.id, OwnerOrganizationUnitId: action.ownerOrganizationUnitId });
    }
    
    lodash.set(data, `${metadata.Name}.AssignedProviders`, assignedProviders);
    let status = calculateSectionsStatus(entityData, metadata);

    let formData = new FormData();
    formData.append("id", action.id);
    formData.append("providerId", action.providerId);
    formData.append("ownerOrganizationUnitId", action.ownerOrganizationUnitId);
    formData.append("clientId", action.clientId);
    formData.append("completionStatusJson", JSON.stringify(status) || null);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.ProviderAdded(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

export function* deleteProvider(action) {
  const requestURL = `${HOST}/IndividualSupportPlans/IspProvider/DeleteProvider`;

  try {
    let data = lodash.cloneDeep(action.data);
    let metadata = action.metadata;
    let assignedProviders = lodash.get(data,`${metadata.Name}.AssignedProviders`);

    let newAssignedProviders = assignedProviders.filter((provider) => provider.Id != action.providerId);
    lodash.set(data, `${metadata.Name}.AssignedProviders`, newAssignedProviders);
    let status = calculateSectionsStatus(data[metadata.Name], metadata);

    let formData = new FormData();
    formData.append("id", action.id);
    formData.append("providerId", action.providerId);
    formData.append("clientId", action.clientId);
    formData.append("completionStatusJson", JSON.stringify(status) || null);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.ProviderDeleted(result.DataObject,action.providerId));

    const planForSupportURL = `${HOST}/IndividualSupportPlans/IndividualSupportPlan/GetPlanForSupportList?ispId=${action.id}&clientId=${action.clientId}`;
    const planForSupports = yield call(requestApi, planForSupportURL, { credentials: 'include' });
    yield put(actions.planForSupportsLoaded(planForSupports.DataObject.PlanForSupportList));

    // if (metadata.AdditionalPrintSection) {
    //   let printMetadata = yield call(getMetadataFromCache, metadata.AdditionalPrintSection.Name);
    //   let printAccessModel = yield call(getAccessControlFromCache, metadata.AdditionalPrintSection.Name);
    //   yield put(actions.printLoaded(lodash.get(planForSupports.DataObject, metadata.AdditionalPrintSection.DataName), printMetadata, printAccessModel));
    // }
    
  } catch (err) {
    toastr.error(err);
  }
}



