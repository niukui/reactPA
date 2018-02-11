import * as constants from '../../constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {initComponentsState, combineComponentsState} from 'services/componentsServices';

const initialState = fromJS({dataId: '', data: {}, metadata: {}});

function supportsPackageReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SAVE_BUDGETS_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'SupportsPackage.Services.SpBudgets', action.budgets);
        return state.set('data', Object.assign({}, data));
      }
    case constants.SAVE_SERVICE_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'SupportsPackage.Services.SpServices', action.services);
        return state.set('data', Object.assign({}, data));
      }

    case constants.DELETE_SERVICE_SUCCESS:
      {
        let data = state.get('data');
        lodash.set(data, 'SupportsPackage.Services.SpServices', action.services);
        return state.set('data', Object.assign({}, data));
      }
    default:
      return state;
  }
}

export default supportsPackageReducer;