import * as constants from './constants';
import { fromJS } from 'immutable';
import lodash from 'lodash';

const initialState = fromJS({ clientId: '', data: [] });

function listPageReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_LIST_SUCCESS:
      return state
        .set('clientId', action.clientId)
        .set('data', action.data)
        .set('listModel', action.listModel)
        .set('metadata', action.metadata);
    case constants.ON_SEARCH_SUCCESS:
      return state
        .set('clientId', action.clientId)
        .set('data', action.data)
        .set('metadata', action.metadata);
    default:
      return state;
  }
}

export default listPageReducer;
