import {takeLatest, takeEvery} from 'redux-saga';
import {take, call, put, fork} from 'redux-saga/effects';
import lodash from 'lodash';
import getMetadataFromCache from 'services/metadataServices';
import requestApi from 'utils/requestApi';
import * as constants from './constants';
import {sectionSaved, sectionLoaded, initComponentsRefState,providerSearchCriteriaDataLoaded,providersSearched} from './actions';
import toastr from "utils/toastr";
import {browserHistory} from 'react-router';
import {DEFAULT_MODULE, getRoutePrefix, combineUrlByQuery} from 'config';
import path from "path";
import {calculateSectionsStatus} from 'services/completionStatusService';
import {AUDIT_TRAIL} from 'utils/constants';
import * as customLoadServices from 'services/customLoadServices';
import { HOST } from 'config';

const findSectionByName = (metadata, sectionPath) => {
  var sectionNames = sectionPath.split(".");
  if (sectionNames.length == 1) {
    return lodash.find(metadata.Sections, {Name: sectionNames[0]});
  } else if (sectionNames.length == 2) {
    const level1Section = lodash.find(metadata.Sections, {Name: sectionNames[0]});
    return lodash.find(level1Section.Sections, {Name: sectionNames[1]});
  } else 
    return null;
  }

const extractSectionDataFromFlattenObjectBasedOnMetadata = (action) => {
  const {data, metadata, sectionPath} = action;
  let result = {};
  const section = findSectionByName(metadata, sectionPath);
  if (section) {
    lodash
      .forEach(section.Items, function (item) {
        if (item.DataPath) {
          lodash.set(result, item.DataPath, lodash.get(data, item.DataPath));
        } else {
          result[item.Name] = data[item.Name];
        }
      });
  }
  return result;
}

export function * saveSection(action) {
  try {
    const metadata = action.metadata;
    const query = {
      dataId: action.dataId,
      clientId: action.clientId,
      parentDataId: action.parentDataId,
      sectionPath: action.sectionPath
    }
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.PostAction, query);

    let formData = new FormData();

    const moduleData = lodash.get(action.data, action.metadata.Name);

    let sectionObject = lodash.get(moduleData
      ? moduleData
      : action.data, action.sectionPath);
    if (lodash.isEmpty(sectionObject)) {
      if(!Array.isArray(sectionObject)){
        sectionObject = extractSectionDataFromFlattenObjectBasedOnMetadata(action);
      }
    }
    let completionStatus = {};
    const changesHistory = lodash.get(action.data, AUDIT_TRAIL.CHANGES_HISTORY);

    if (action.sectionPath.startsWith('PlanForSupport.')) {
      completionStatus = calculateSectionsStatus(action.data, action.metadata, true);
    } else {
      completionStatus = calculateSectionsStatus(action.data, action.metadata);
    }
    const workflowStatus = action.data.WorkflowStatus && action.data.WorkflowStatus.Name;

    formData.append("workflowStatus", workflowStatus || null);
    formData.append("sectionJson", JSON.stringify(sectionObject) || null);
    formData.append("completionStatusJson", JSON.stringify(completionStatus) || null);
    formData.append("changesHistory", JSON.stringify(changesHistory) || null);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });

    yield put(sectionSaved(action.dataId, action.clientId, action.data, action.sectionPath, action.redirectTo, action.metadata));

  } catch (err) {
    console.log(err);
    console.log("saveSection");
    toastr.error(err);
  }
}

export function * saveSectionSuccess(action) {
  const moduleName = action.metadata.ModuleName || action.metadata.Name;
  const prefix = getRoutePrefix(action.metadata.Options.Prefix);

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
      currentSection: action.sectionPath
    };
    yield call(browserHistory.push, {
      pathname: path.resolve(prefix, 'summary'),
      query
    });
  }
}

export function * loadSection(action) {

  try {
    let moduleName = action.moduleName
      ? action.moduleName
      : DEFAULT_MODULE;
    const metadata = yield call(getMetadataFromCache, moduleName);
    const query = {
      dataId: action.dataId,
      clientId: action.clientId
    }
    const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.LoadAction, query);
    let data = yield call(requestApi, requestURL, {credentials: 'include'});

    if (metadata.Options.LoadPreProcess) {
      customLoadServices[metadata.Options.LoadPreProcess](action.dataId, data, metadata);
    }
    
    yield put(sectionLoaded(data.DataObject, data.DataObject.CurrentIdentity, metadata, {}));
    yield put(initComponentsRefState(action.path, data.DataObject[metadata && metadata.Name], metadata));
  } catch (err) {
    console.log(err);
    console.log("loadSection");
    toastr.error(err);
  }
}
export function * loadProviderSearchCriteriaData(action) {
  const requestURL = `${HOST}/ProviderCommonSearch/FindProviderCriteriaData`;
  try {

    let formData = new FormData();
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });

    yield put(providerSearchCriteriaDataLoaded(result));

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
    let criteriaData=action.searchCriteria;
    criteriaData.AtypicalProvider=action.searchCriteria.AtypicalProvider && action.searchCriteria.AtypicalProvider.Id;
    criteriaData.ServiceProviderTypeId=action.searchCriteria.ServiceProviderTypeId && action.searchCriteria.ServiceProviderTypeId.Id;
    criteriaData.ProviderSpecialtyCodeId=action.searchCriteria.ProviderSpecialtyCodeId && action.searchCriteria.ProviderSpecialtyCodeId.Id;
    criteriaData.Par=action.searchCriteria.Par && action.searchCriteria.Par.Id;
    formData.append('searchCriteriaJson',JSON.stringify(criteriaData)||null)
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      body: formData
    });

    yield put(providersSearched(result.data));

  } catch (err) {
    console.log(err);
    console.log("searchProviders");
    toastr.error(err);
  }
}

export function * continueButton(action) {
  const moduleName = action.metadata.ModuleName || action.metadata.Name;
  const prefix = getRoutePrefix(action.metadata.Options.Prefix);

    const query = {
      dataId: action.dataId,
      clientId: action.clientId,
      moduleName: moduleName,
      currentSection: action.sectionPath + action.Incomplete
    };
    yield call(browserHistory.push, {
      pathname: path.resolve(prefix, 'summary'),
      query
    });

}

export function * sections() {
  yield takeEvery(constants.SAVE_SECTION, saveSection);
  yield takeEvery(constants.SAVE_SECTION_SUCCESS, saveSectionSuccess);
  yield takeEvery(constants.LOAD_SECTION, loadSection);
  yield takeEvery(constants.LOAD_PROVIDER_SEARCH_CRITERIA_DATA, loadProviderSearchCriteriaData);
  yield takeEvery(constants.SEARCH_PROVIDERS,searchProviders)
  yield takeEvery(constants.CONTINUE_BUTTON_SECTION, continueButton);
}

export default[sections];
