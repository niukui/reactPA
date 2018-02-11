import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {SUPPORT_TYPE_IDS} from 'utils/constants'

const initialState = fromJS({pocId: '', pocPart3: [], playGroundSharedPlanning: {},sharePlanningIndex: null});
 
function pocPart3ManageReducer(state = initialState, action) {

  switch (action.type) {
    case constants.LOAD_POC_PART3_SUCCESS:
      return state
        .set('dataId', action.dataId)
        .set('clientId', action.clientId)
        .set('pocPart3', action.pocPart3 || [])
        .set('capCategorys', action.capCategorys)
        .set('caps', action.caps)
        .set('prioritys', action.prioritys)
        .set('problems', action.problems)
        .set('problemOtherId', action.problemOtherId)
        .set('goals', action.goals)
        .set('goalOtherId', action.goalOtherId)
        .set('interventions', action.interventions)
        .set('interventionOtherId', action.interventionOtherId)
        .set('owners', action.owners)
        .set('haveDateCloseds', action.haveDateCloseds)
        .set('haveDateClosedTbdId', action.haveDateClosedTbdId)
        .set('securityContext', action.securityContext)
        .set('underEditing', false);

    case constants.CHANGE_PLAYGROUND_SHARED_PLANNING:
      { return state.set('playGroundSharedPlanning', Object.assign({},action.sharedPlanning));
      }

      case constants.EDIT_PLAYGROUND_SHARED_PLANNING:
      { return state.set('playGroundSharedPlanning', Object.assign({},action.sharedPlanning))
        .set('sharePlanningIndex', action.index)
        .set('underEditing', true)
        .set('errors',{});
      }

    case constants.CHANGE_SHARED_PLANNING_FORM:
      {
        let sharedPlanning = state.get('playGroundSharedPlanning');
        lodash.set(sharedPlanning, action.name, action.value);
        return state.set('playGroundSharedPlanning', Object.assign({}, sharedPlanning));
      }

    case constants.ADD_SHARED_PLANNING_FORM:
      {
        let sharedPlanning = state.get('playGroundSharedPlanning');
        let shareList = state.get('pocPart3');
        let arr = [];
        shareList.push(sharedPlanning);
        if (!lodash.isEmpty(shareList)) {
          arr = shareList.concat(arr)
        }        
        return state.set('pocPart3', shareList).set("playGroundSharedPlanning", 
        {
          CAP: {},
          Priority: {},
          ProblemDatas: [
            {
              Problem: {},
              Other: "",
              GoalDatas: [
                {
                  Goal: {},
                  Other: "",
                  TargetDate: null,
                  Note: "",
                  InterventionDatas: [
                    {
                      Intervention: {},
                      Other: "",
                      Owners: []
                    }
                  ]
                }
              ]
            }
          ],
          DateInitiated: null,
          DateNextReview: null,
          HaveDateClosed: false,
          DateClosed: null
        }
      );
      }

    case constants.SAVE_SHARED_PLANNING_FORM:
    {
      let shareList = state.get('pocPart3');
      let playGroundSharedPlanning = state.get('playGroundSharedPlanning');
      let index = state.get('sharePlanningIndex');
      if(index >= 0){
        shareList.splice(index, 1 , Object.assign({}, playGroundSharedPlanning));
        return state.set('pocPart3', shareList).set("playGroundSharedPlanning", 
        {
          CAP: {},
          Priority: {},
          ProblemDatas: [
            {
              Problem: {},
              Other: "",
              GoalDatas: [
                {
                  Goal: {},
                  Other: "",
                  TargetDate: null,
                  Note: "",
                  InterventionDatas: [
                    {
                      Intervention: {},
                      Other: "",
                      Owners: []
                    }
                  ]
                }
              ]
            }
          ],
          DateInitiated: null,
          DateNextReview: null,
          HaveDateClosed: false,
          DateClosed: null
        }
      ).set('underEditing', false);
      }     
    }

    case constants.UPDATE_SHARED_PLANNING_DELETE:
    {
      let shareList = state.get('pocPart3');
      let index = state.get('sharePlanningIndex');
      if(index >= 0){
        shareList.splice(index, 1);
        return state.set('pocPart3', shareList).set('underEditing', false);
      }
    }

    case constants.SWITCH_TO_EDIT_MODE:
      return state.set('underEditing', true).set('errors',{});

    case constants.SWITCH_TO_CREATE_MODE:
      return state.set('underEditing', false).set('playGroundSharedPlanning', 
      {
        CAP: {},
        Priority: {},
        ProblemDatas: [
          {
            Problem: {},
            Other: "",
            GoalDatas: [
              {
                Goal: {},
                Other: "",
                TargetDate: null,
                Note: "",
                InterventionDatas: [
                  {
                    Intervention: {},
                    Other: "",
                    Owners: []
                  }
                ]
              }
            ]
          }
        ],
        DateInitiated: null,
        DateNextReview: null,
        HaveDateClosed: false,
        DateClosed: null
      }
    ).set('sharePlanningIndex', '');

    case constants.DELETE_POC_PART3_ITEM_SUCCESS:
      {
        return state.set('pocPart3', Object.assign([], action.part3s));
      }

    case constants.SAVE_SHARED_PLANNING_SUCCESS:
      {
        let sharedPlannings = Object.assign([], state.get('pocPart3'));
        const index = lodash.indexOf(sharedPlannings, lodash.find(sharedPlannings, {
          Id: action.sharedPlanning && action.sharedPlanning.Id
        }));
        if (index >= 0) {
          sharedPlannings.splice(index, 1, action.sharedPlanning);
        } else {
          sharedPlannings = action.sharedPlannings || [];
        }
        return state
          .set('pocPart3', [...sharedPlannings])
          .set('playGroundSharedPlanning', {
            Cap: {},
            Priority: {},
            ProblemDatas: [
              {
                Problem: {},
                Other: "",
                GoalDatas: [
                  {
                    Goal: {},
                    Other: "",
                    TargetDate: null,
                    Note: "",
                    InterventionDatas: [
                      {
                        Intervention: {},
                        Other: "",
                        Owners: []
                      }
                    ]
                  }
                ]
              }
            ],
            DateInitiated: null,
            DateNextReview: null,
            HaveDateClosed: false,
            DateClosed: null
          })
          .set('underEditing', false);
      }

    case constants.SHARED_PLANNING_START_DELETING:
      return state
        .set('sharePlanningIndex', action.index);

    case constants.SHARED_PLANNING_DELETING_CONFIRMED:
    let shareList = state.get('pocPart3');
    let index = state.get('sharePlanningIndex');
    if(index >= 0){
      shareList.splice(index, 1);
      return state.set('pocPart3', shareList).set('underEditing', false);
    }

    case constants.DELETE_POC_PART3_ITEM: 
    {
      let shareList = state.get('pocPart3');
      let index = state.get('sharePlanningIndex');
      if(index >= 0){
        shareList.splice(index, 1);
        return state.set('pocPart3', shareList).set('underEditing', false).set('sharePlanningIndex', '');
      }
    }

    case constants.FORM_VALIDATED:
      return state.set('errors', action.errors);

    default:
      return state;
  }
}

export default pocPart3ManageReducer;
