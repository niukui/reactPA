import {
  LOAD_ISP_OVERVIEW,
  LOAD_ISP_OVERVIEW_SUCCESS,
  CHANGE_ISP_OVERVIEW_FORM,
  CHANGE_ISP_OVERVIEW_FORM_SUCCESS,
  SAVE_ISP_OVERVIEW,
  SAVE_ISP_OVERVIEW_SUCCESS
} from './constants';

export function loadOverview(dataId, metadata) {
  return {type: LOAD_ISP_OVERVIEW, dataId, metadata};
}

export function ispOverviewLoaded(data) {
  return {type: LOAD_ISP_OVERVIEW_SUCCESS, data};
}

export function onChangeForm(event) {
  return {type: CHANGE_ISP_OVERVIEW_FORM, event};
}

export function overviewFormChanged(changedValueSet) {
  return {type: CHANGE_ISP_OVERVIEW_FORM_SUCCESS, changedValueSet};
}

export function saveOverview(entityData, metadata) {
  return {type: SAVE_ISP_OVERVIEW, entityData, metadata};
}

export function ispOverviewSaved(entityData,metadata) {
  return {type: SAVE_ISP_OVERVIEW_SUCCESS, entityData,metadata};
}
