import * as constants from './constants';
import {fromJS} from 'immutable';
import lodash from "lodash";
import {initComponentsState, combineComponentsState} from 'services/componentsServices';
import {COMPLETION_STATUSES} from 'services/completionStatusService';

const initialState = fromJS({ispPart5Summary: {}});
const changeToEvents = (activities) => {
  let events = [];
  activities.map((activity) => {
    const title = activity.SupportName + '\n Outcomes:' + activity
      .DesiredOutcomes
      .map(x => x.LineNumber)
      .join();
    activity
      .FrequencyWeekDays
      .map((weekDay) => {
        let startDate = new Date(2000, 1, 1);
        let endDate = new Date(2000, 1, 1);
        if (weekDay.Abbreviation) {
          startDate.setDate(weekDay.Abbreviation - 1);
          endDate.setDate(weekDay.Abbreviation - 1);
        }

        if (activity.DailySupport) {
          events.push({title: title, start: startDate, end: endDate, tag: activity, allDay:true});
        } else {
          startDate.setHours(activity.StartTime.Hours);
          startDate.setMinutes(activity.StartTime.Minutes);
          endDate.setHours(activity.EndTime.Hours);
          endDate.setMinutes(activity.EndTime.Minutes);
          events.push({title: title, start: startDate, end: endDate, tag: activity});
        }
      });
  });
  return events;
};
const getAuthorizedHoursPerDay = (activities) => {
  let hoursPerDay = {};
  activities.map((x) => {
    x
      .FrequencyWeekDays
      .map((y) => {
        let dayName = y.Name;
        if (!dayName && y.UniqueAttribute && y.UniqueAttribute.Description) {
          dayName = y.UniqueAttribute.Description;
        }
        let dayHours = lodash.get(hoursPerDay, y.Name) || 0;
        const totalHour = Number(x.TotalAuthorizedHours) || 0;
        dayHours = Number(dayHours) + Number(totalHour);
        lodash.set(hoursPerDay, dayName, dayHours);
      });
  });
  return hoursPerDay;
};

const getAuthorizedHoursPerWeek = (activities) => {
  const hours = activities.map((x) => {
    const totalHour = x.TotalAuthorizedHours || 0;
    return totalHour * x.FrequencyWeekDays.length;
  });
  const totalHours = hours.reduce((a, b) => {
    return Number(a) + Number(b);
  }, 0);
  return totalHours;
};

function ispPat5Reducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_ISP_PART5_SUMMARY_SUCCESS:
      {
        let activities = [];
        activities = action.ispPart5Summary.PlanForSupport && action.ispPart5Summary.PlanForSupport.GeneralScheduleSupports;
        activities = activities || [];

        const Comment = action.ispPart5Summary.PlanForSupport && action.ispPart5Summary.PlanForSupport.GeneralScheduleSupportComment;
        let generalScheduleSupport = state.get('generalScheduleSupport') || {
          AuthorizedHoursPerDay: {}
        };
        lodash.set(generalScheduleSupport, "Comment", Comment);
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerWeek", getAuthorizedHoursPerWeek(activities));
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerDay", getAuthorizedHoursPerDay(activities));
        return state.set('ispPart5Summary', Object.assign({}, action.ispPart5Summary))
          .set('generalEvents', changeToEvents(activities))
          .set('generalScheduleSupport', Object.assign({}, generalScheduleSupport));
      }
    case constants.ADD_GENERAL_SCHEDULE_SUPPORT_SUCCESS:
      {
        let activities = [];
        let ispPart5Summary = state.get('ispPart5Summary');
        activities = ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.GeneralScheduleSupports || [];
        activities.push(action.activity);
        let generalScheduleSupport = state.get('generalScheduleSupport') || {
          AuthorizedHoursPerDay: {}
        };
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerWeek", getAuthorizedHoursPerWeek(activities));
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerDay", getAuthorizedHoursPerDay(activities));

        return state
          .set('generalEvents', changeToEvents(activities))
          .set('generalScheduleSupport', Object.assign({}, generalScheduleSupport))
          .set('ispPart5Summary', lodash.set(ispPart5Summary, "PlanForSupport.CompletionStatus.GeneralScheduleSupports", COMPLETION_STATUSES.Complete));
      }
    case constants.EDIT_GENERAL_SCHEDULE_SUPPORT_SUCCESS:
      {
        let activities = [];
        const ispPart5Summary = state.get('ispPart5Summary');
        activities = ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.GeneralScheduleSupports || [];
        const index = activities.findIndex(x => x.Id === action.activity.Id);
        if (index >= 0) {
          activities.splice(index, 1, action.activity);
        }
        let generalScheduleSupport = state.get('generalScheduleSupport') || {
          AuthorizedHoursPerDay: {}
        };
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerWeek", getAuthorizedHoursPerWeek(activities));
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerDay", getAuthorizedHoursPerDay(activities));
        return state
          .set('generalEvents', changeToEvents(activities))
          .set('generalScheduleSupport', Object.assign({}, generalScheduleSupport));
      }
    case constants.DELETE_GENERAL_SCHEDULE_SUPPORT_SUCCESS:
      {
        let activities = [];
        let ispPart5Summary = state.get('ispPart5Summary');
        activities = ispPart5Summary.PlanForSupport && ispPart5Summary.PlanForSupport.GeneralScheduleSupports || [];
        const index = activities.findIndex(x => x.Id === action.generalScheduleSupportId);
        if (index >= 0) {
          activities.splice(index, 1);
        }
        let generalScheduleSupport = state.get('generalScheduleSupport') || {
          AuthorizedHoursPerDay: {}
        };
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerWeek", getAuthorizedHoursPerWeek(activities));
        lodash.set(generalScheduleSupport, "AuthorizedHoursPerDay", getAuthorizedHoursPerDay(activities));
        return state
          .set('generalEvents', changeToEvents(activities))
          .set('generalScheduleSupport', Object.assign({}, generalScheduleSupport))
          .set('ispPart5Summary', lodash.set(ispPart5Summary, "PlanForSupport.CompletionStatus.GeneralScheduleSupports", ispPart5Summary.PlanForSupport.GeneralScheduleSupports.length > 0
            ? COMPLETION_STATUSES.Complete
            : COMPLETION_STATUSES.NotStarted));
      }
    case constants.EDIT_GENERAL_SCHEDULE_SUPPORT_COMMENT_SUCCESS:
      {
        const Comment = action.comment;
        let generalScheduleSupport = state.get('generalScheduleSupport') || {};
        lodash.set(generalScheduleSupport, "Comment", Comment);
        return state.set('generalScheduleSupport', Object.assign({}, generalScheduleSupport));
      }
    case constants.INIT_COMPONENTS_REF_STATE:
      {
        let componentsState = initComponentsState(action.metadata, 'PlanForSupport');
        let combinedComponentsState = combineComponentsState(componentsState, {"PlanForSupport": action.ispPart5});

        return state.set('componentsState', Object.assign(combinedComponentsState));
      }

    default:
      return state;
  }
}

export default ispPat5Reducer;
