import {take, call, put, fork} from 'redux-saga/effects';
import requestApi from 'utils/requestApi';
import * as constants from '../../constants';
import * as actions from '../../actions';
import {HOST, DEFAULT_MODULE, combineUrlByQuery} from 'config';
import {browserHistory} from 'react-router';
import path from 'path';
import lodash from 'lodash';
import {calculateSectionsStatus} from 'services/completionStatusService';
import toastr from "utils/toastr";
import {ISP_WORKFLOW_STATUS} from 'utils/constants';
import getMetadataFromCache from 'services/metadataServices';
import * as customLoadServices from 'services/customLoadServices';
import {getAccessControlFromCache} from 'services/accessControlServices';

export function * loadSummary(action) {
  const dataId = action.dataId;
  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;
  const metadata = yield call(getMetadataFromCache, moduleName);

  const query = {
    dataId,
    clientId: action.clientId
  }
  const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.LoadAction, query);
  try {
    const data = yield call(requestApi, requestURL, {credentials: 'include'});

    if (metadata.Options.LoadPreProcess) {
      customLoadServices[metadata.Options.LoadPreProcess](dataId, data, metadata, actions);
    }

    yield put(actions.summaryLoaded(data.DataObject, metadata));
    yield put(actions.initComponentsRefState(data.DataObject[metadata.Name], metadata));
    if (metadata.Options.LoadPostProcess) {
      yield call(customLoadServices[metadata.Options.LoadPostProcess], dataId, data, metadata, actions, constants);
    }

  } catch (err) {
    console.log(err);
    console.log("loadSummary");
    toastr.error(err);
  }
}

export function * preProcessEvent(action) {
  const dataId = action.dataId;
  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;
  const metadata = yield call(getMetadataFromCache, moduleName);
  let actionName = 'Pre' + action.eventName
  const query = {
    dataId:action.dataId
  }
  const requestURL = combineUrlByQuery(metadata.Options.Prefix, actionName, query);
  try {
    const data = yield call(requestApi, requestURL, {credentials: 'include'});
    yield put(actions.preEventProcessed(data.DataObject, action.eventName));
  } catch (err) {
    toastr.error(err);
  }
}

export function * processEvent(action) {
  const dataId = action.dataId;
  const eventName = action.eventName;
  const workflowData = action.workflowData;
  const printHTML = action.printHTML;

  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;

  const metadata = yield call(getMetadataFromCache, moduleName);
  const query = {
    dataId,
    eventName
  }
  const requestURL = combineUrlByQuery(metadata.Options.Prefix, metadata.Options.ProcessEventAction, query);

  try {
    let formData = new FormData();
    formData.append('workflowData', JSON.stringify(workflowData || {}));
    formData.append('printHTML', JSON.stringify(printHTML || {}))
    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.loadSummary(query.dataId, action.clientId, moduleName))
  } catch (err) {
    toastr.error(err);
  }
}

export function * addFormNote(action) {
 
  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;
  const metadata = yield call(getMetadataFromCache, moduleName);
  const requestURL = combineUrlByQuery(metadata.Options.FormNotePrefix, metadata.Options.FormNotesActionName);

  try {
    let formData = new FormData();
    formData.append("dataId", action.dataId);
    formData.append("clientId", action.clientId);
    formData.append("accessableOuId", action.accessOuId);
    formData.append("content", action.content);
    formData.append("isCreatedBySc", action.isCreatedBySc);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.formNoteAdded(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

export function * deleteFormNote(action) {

  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;
  const metadata = yield call(getMetadataFromCache, moduleName);
  const requestURL = combineUrlByQuery(metadata.Options.FormNotePrefix, metadata.Options.DeleteFormNoteAction);

  try {
    let formData = new FormData();
    formData.append("dataId", action.dataId);
    formData.append("formNoteId", action.formNoteId);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    yield put(actions.formNoteDeleted(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

export function * uploadAttachment(action) {

  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;
  const metadata = yield call(getMetadataFromCache, moduleName);
  const requestURL = combineUrlByQuery(metadata.Options.UploadAttachmentUrl, "");

  try {

    let uploadModel = {
      "ClientId": action.clientId,
      "AttachedDocumentId": action.dataId,
      "AttachmentTypeId": action.category.Id,
      "Comments": action.comment
    };

    let formData = new FormData();
    formData.append("attachment", action.files[0]);
    formData.append("uploadModelJson", JSON.stringify(uploadModel));

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });

    yield put(actions.attachmentUploaded(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

export function * deleteAttachment(action) {
  let moduleName = action.moduleName
    ? action.moduleName
    : DEFAULT_MODULE;
  const metadata = yield call(getMetadataFromCache, moduleName);
  const requestURL = combineUrlByQuery(metadata.Options.DeleteAttachmentUrl, "");
  try {
    let attachmentId = action.attachmentId;
    let dataId = action.dataId;
    let clientId = action.clientId;

    let formData = new FormData();
    formData.append("clientAttachmentId", attachmentId);
    formData.append("clientId", clientId);
    formData.append("id", dataId);

    const result = yield call(requestApi, requestURL, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });

    yield put(actions.attachmentDeleted(result.DataObject));
  } catch (err) {
    toastr.error(err);
  }
}

