import {takeLatest, takeEvery} from 'redux-saga';
import {take, call, put, fork} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from './constants';
import * as actions from './actions';
import toastr from "toastr";
import {HOST} from 'config';
import lodash from 'lodash';
import {browserHistory} from 'react-router';
import path from "path";
import {getRoutePrefix} from "config";
import {formatJsonDate} from 'utils/dateHelper';
import { addTemporaryProviderSuccess } from './actions';

const getEntityNameByDataId = (dataId) => {
    if (dataId.startsWith('planofcare')) {
        return 'PlanOfCare';
    }
}

export function * getPocPart5(action) {
    const dataId = action.dataId;
    const requestURL = `${HOST}${action
        .prefix}/GetInOutpatientServicesSection?dataId=${dataId}&clientId=${action.clientId}`;

    try {
        const response = yield call(requestApi, requestURL, { credentials: 'include' });
        const entityName = getEntityNameByDataId(dataId);
        const entityData = response.DataObject[entityName];
        const clientDefaultCounty = response.DataObject.ClientDefaultCounty;
        entityData.pocPart5 = {
            'InpatientServices': response.DataObject[entityName].InpatientServices,
            'OutpatientServices': response.DataObject[entityName].OutpatientServices
        }
        const frequencyIds = {
            'FrequencyDailyId': response.DataObject.FrequencyDailyId,
            'FrequencyWeeklyId': response.DataObject.FrequencyWeeklyId,
            'FrequencyMonthlyId': response.DataObject.FrequencyMonthlyId,
            'FrequencyQuarterlyId': response.DataObject.FrequencyQuarterlyId,
            'FrequencyAnnualId': response.DataObject.FrequencyAnnualId,
            'FrequencyBiWeeklyId': response.DataObject.FrequencyBiWeeklyId
        }
        const securityContext = {
            AccessModel: {},
            CurrentIdentity: response.DataObject.CurrentIdentity,
            WorkflowStatus: entityData.WorkflowStatus
        };
        yield put(actions.pocPart5Loaded(entityData.pocPart5,
            dataId,
            response.DataObject[entityName].ClientId,
            response.DataObject.TreatmentTypes,
            response.DataObject.FrequencyItems,
            response.DataObject.ServiceDefinitionItems,
            response.DataObject.ServiceDefinitions,
            response.DataObject.ServiceOutcomeItems,
            response.DataObject.InpatientId,
            response.DataObject.OutpatientId,
            frequencyIds,
            securityContext,
            clientDefaultCounty,
            response.DataObject.StateProvinceSelectList));
    } catch (err) {
        console.log(err);
        toastr.error(err);
    }
}

export function * saveServices(action) {
    const pocId = action.dataId;
    const requestURL = `${HOST}${action.prefix}/SaveInOutpatientServices?pocId=${pocId}`;
    try {
        let formData = new FormData();
        formData.append("inpatientServicesJson", JSON.stringify(action.pocPart5.InpatientServices));
        formData.append("outpatientServicesJson", JSON.stringify(action.pocPart5.OutpatientServices));
        const result = yield call(requestApi,
            requestURL,
            {
                method: 'POST',
                body: formData
            });

        yield put(actions.servicesSaved(action.dataId, action.clientId, action.redirectTo, action.prefix));
    } catch (err) {
        console.log(err);
        console.log("saveServices");
        toastr.error(err);
    }
}
export function * saveServicesSuccess(action) {
  const moduleName = getEntityNameByDataId(action.dataId);
  const prefix = getRoutePrefix(action.prefix);

  if (action.redirectTo) {
    yield call(browserHistory.push, {
      pathname: path.resolve(prefix, action.redirectTo.pathname),
      query: action.redirectTo.query,
      moduleName: moduleName
    });
  } else {
    const query = {
      dataId: action.dataId,
      clientId: action.clientId,
      moduleName: moduleName,
      currentSection: ''
    };
    yield call(browserHistory.push, {
      pathname: path.resolve(prefix, 'summary'),
      query
    });
  }
}

export function * loadProviderSearchCriteriaData(action) {
    const requestURL = `${HOST}/ProviderCommonSearch/FindProviderCriteriaData`;
    try {

        let formData = new FormData();
        const result = yield call(requestApi,
            requestURL,
            {
                method: 'POST',
                body: formData
            });

        yield put(actions.providerSearchCriteriaDataLoaded(result));

    } catch (err) {
        console.log(err);
        console.log("loadProviderSearchCriteriaData");
        toastr.error(err);
    }
}

export function * searchProviders(action) {
    const requestURL = `${HOST}/ProviderCommonSearch/SearchProviders`;
    try {

        let formData = new FormData();
        let criteriaData = Object.assign({}, action.searchCriteria);
        criteriaData.AtypicalProvider = action.searchCriteria.AtypicalProvider &&
            action.searchCriteria.AtypicalProvider.Id;
        criteriaData.ServiceProviderTypeId = action.searchCriteria.ServiceProviderTypeId &&
            action.searchCriteria.ServiceProviderTypeId.Id;
        criteriaData.ProviderSpecialtyCodeId = action.searchCriteria.ProviderSpecialtyCodeId &&
            action.searchCriteria.ProviderSpecialtyCodeId.Id;
        criteriaData.Par = action.searchCriteria.Par && action.searchCriteria.Par.Id;
        formData.append('searchCriteriaJson', JSON.stringify(criteriaData) || null)
        const result = yield call(requestApi,
            requestURL,
            {
                method: 'POST',
                body: formData
            });

        yield put(actions.providersSearched(result.data));

    } catch (err) {
        console.log(err);
        console.log("searchProviders");
        toastr.error(err);
    }
}

export function * addTemporaryProvider(action){
    const requestURL =  `${HOST}${action.prefix}/CreateTemporaryProvider`;
    try {
        
        let temporaryProvider = Object.assign({}, action.temporaryProvider);
        let formData = new FormData();
        formData.append('temporaryProviderJson', JSON.stringify(temporaryProvider) || null)
        const result = yield call(requestApi,
            requestURL,
            {
                method: 'POST',
                body: formData
            });
        yield put(actions.addTemporaryProviderSuccess(result.DataObject));
    } catch (err) {
        console.log(err);
        console.log("searchProviders");
        toastr.error(err);
    }
}


export function * pocPart5() {
    yield takeEvery(constants.LOAD_POC_Part5, getPocPart5);
    yield takeEvery(constants.SAVE_SERVICES, saveServices);
    yield takeEvery(constants.SAVE_SERVICES_SUCCESS, saveServicesSuccess);
    yield takeEvery(constants.LOAD_PROVIDER_SEARCH_CRITERIA_DATA, loadProviderSearchCriteriaData);
    yield takeEvery(constants.SEARCH_PROVIDERS,searchProviders);
    yield takeEvery(constants.ADD_TEMPORARY_PROVIDER,addTemporaryProvider)
}

export default[pocPart5];
