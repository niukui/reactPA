export const LOAD_ISP_PART3 = 'isp/part3manage/LOAD_ISP_PART3';
export const LOAD_ISP_PART3_SUCCESS = 'isp/part3manage/LOAD_ISP_PART3_SUCCESS';
export const LOAD_ISP_PART3_ERROR = 'isp/part3manage/LOAD_ISP_PART3_ERROR';

export const CREATE_SHARED_PLANNING = 'isp/part3manage/CREATE_SHARED_PLANNING';
export const UPDATE_SHARED_PLANNING = 'isp/part3manage/UPDATE_SHARED_PLANNING';
export const SAVE_SHARED_PLANNING_SUCCESS = 'isp/part3manage/SAVE_SHARED_PLANNING_SUCCESS';
export const SAVE_SHARED_PLANNING_ERROR = 'isp/part3manage/SAVE_SHARED_PLANNING_ERROR';

export const CHANGE_SHARED_PLANNING_FORM = 'isp/part3manage/CHANGE_SHARED_PLANNING_FORM';

export const DELETE_ISP_PART3_ITEM = 'isp/part3manage/DELETE_ISP_PART3_ITEM';
export const DELETE_ISP_PART3_ITEM_SUCCESS = 'isp/part3manage/DELETE_ISP_PART3_ITEM_SUCCESS';
export const DELETE_ISP_PART3_ITEM_ERROR = 'isp/part3manage/DELETE_ISP_PART3_ITEM_ERROR';
export const CANCEL_SHARED_PLANNING_EDIT = 'isp/part3manage/CANCEL_SHARED_PLANNING_EDIT';

export const CHANGE_PLAYGROUND_SHARED_PLANNING = 'isp/part3manage/CHANGE_PLAYGROUND_SHARED_PLANNING';
export const SWITCH_TO_EDIT_MODE = 'isp/part3manage/SWITCH_TO_EDIT_MODE';
export const SWITCH_TO_CREATE_MODE = 'isp/part3manage/SWITCH_TO_CREATE_MODE';

export const SHARED_PLANNING_START_DELETING = 'isp/part3manage/SHARED_PLANNING_START_DELETING';
export const SHARED_PLANNING_DELETING_CONFIRMED = 'isp/part3manage/SHARED_PLANNING_DELETING_CONFIRMED';

export const LOAD_SHARED_PLANNING_AUDIT_TRIALS = 'isp/part3manage/LOAD_SHARED_PLANNING_AUDIT_TRIALS';
export const LOAD_SHARED_PLANNING_AUDIT_TRIALS_SUCCESS = 'isp/part3manage/LOAD_SHARED_PLANNING_AUDIT_TRIALS_SUCCESS';

export const FORM_VALIDATED = 'isp/part3manage/FORM_VALIDATED';

export const SHARED_PLANNING_CHANGE_HISTORY_ACTIONS = [
    "AddSharedPlanning",
    "EditSharedPlanning",
    "DiscardSharedPlanning",
    "RemoveSharedPlanning",
    "CompleteSharedPlanning",
    "AttachSharedPlanningProvider",
    "UnAttachSharedPlanningProvider",
    "UnAttachSharedPlanningProviderByOcrApproval"
];

export const sharedPlanningStatus = {
    InProgress: "In Progress",
    Discarded: "Discarded",
    Completed: "Completed"
};
