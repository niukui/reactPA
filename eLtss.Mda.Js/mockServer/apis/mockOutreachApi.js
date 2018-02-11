import lookupApi from "./lookupApi";
import lodash from 'lodash';
import FakeOutreachListStore from './FakeOutreachListStore'

const Outreach = {
  "Redirect": null,
  "Message": null,
  "Partial": null,
  "Data": null,
  "DataObject": {
    "CurrentIdentity": {
      "IdentityName": "FEI\\xianwei.wang",
      "OrganizationUnitId": "organizationunits/67592700-2c90-4d98-a423-40f8e86bfcbc",
      "OrganizationUnitName": "CSB OU 2",
      "UserRoleSetId": "userrolesets/81995d92-e933-4463-a476-ea3c4e8b31b5",
      "UserRoleSetName": "SC",
      "OnBehalfOfPersonId": "staffs/c6b7aa90-fb78-470e-9dc6-d1dabcedce99",
      "Attributes": ["cae6b4a8-4ba4-457f-abe9-594d19aa8c28"],
      "OnBehalfOfPersonName": "Provider ISP Approver",
      "OnBehalfEmail": null,
      "AssignedUserRoles": [
        'roles/csbscenrollmentapprover', 'roles/providerispapprover'
      ],
      "Permissions": [
        "OutreachList",
        "OutreachCreate",
        "OutreachEdit",
        "OutreachView",
        "OutreachDelete",
        "OutreachAttemptEdit",
        "OutreachInitialScreeningEdit",
        "OutreachInitialVisitEdit",
        "CMOUAssignment",
        "CCAssignment"
      ]
    },
    "WorkflowStatus": {
      "Name": "InProgress",
      "DisplayName": "In Progress"
    },
    "Checkintimestamp": "2017-07-12T04:00:00.000Z",
     "Checkouttimestamp": "2017-07-12T04:00:00.000Z",
    "Checkedinbystaff": {
      "Name": "Tim",
      "DisplayName": "Tim"
    }
  }
}
const OutreachInitialVisit = {
  "Redirect": null,
  "Message": null,
  "Partial": null,
  "Data": null,
  "DataObject": {
    "CurrentIdentity": {
      "IdentityName": "FEI\\xianwei.wang",
      "OrganizationUnitId": "organizationunits/67592700-2c90-4d98-a423-40f8e86bfcbc",
      "OrganizationUnitName": "CSB OU 2",
      "UserRoleSetId": "userrolesets/81995d92-e933-4463-a476-ea3c4e8b31b5",
      "UserRoleSetName": "SC",
      "OnBehalfOfPersonId": "staffs/c6b7aa90-fb78-470e-9dc6-d1dabcedce99",
      "Attributes": ["cae6b4a8-4ba4-457f-abe9-594d19aa8c28"],
      "OnBehalfOfPersonName": "Provider ISP Approver",
      "OnBehalfEmail": null,
      "AssignedUserRoles": [
        'roles/csbscenrollmentapprover', 'roles/providerispapprover'
      ],
      "Permissions": [
        "OutreachList",
        "OutreachCreate",
        "OutreachEdit",
        "OutreachView",
        "OutreachDelete",
        "OutreachAttemptEdit",
        "OutreachInitialScreeningEdit",
        "OutreachInitialVisitEdit",
        "CMOUAssignment",
        "CCAssignment"
      ]
    },
    "WorkflowStatus": {
      "Name": "InProgress",
      "DisplayName": "In Progress"
    },
    "OutreachInitialVisit": {
      "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      },
      "InitialVisit": {
        "Comments": "test1"
      }
    }
  }
}

const OutreachAttempt = {
  "DataObject": {
    "WorkflowStatus": {
      "Name": "InProgress",
      "DisplayName": "In Progress"
    },
    "OutreachAttempt": {
      "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      },
      "FirstAttempt": {
        "ContactStatus": true,
        "ContactDate": "/Date(1442995200000)/",
        "Dateofoutreach": "/Date(1892995200000)/",
        "ReasonFailed": "Reason is something wrong",
        "Comments": "Comments for outreach"
      }
    }
  }
}

let ListItems = [];

const dataList = new FakeOutreachListStore(500);

export function getOutreachAttempt() {
  let outreachAttempt = Object.assign({}, OutreachAttempt);
  return outreachAttempt;
}

export function getOutreachInitialVisit() {
  const outreachInitialVisit = Object.assign({}, OutreachInitialVisit);

  return outreachInitialVisit;

}

export function getOutreach(clientId, dataId) {
  let outreach = Object.assign({}, Outreach);
  let data = ListItems.find(x => x.Id === dataId);
  if (!data) {
    data = dataList.getObjectAt(0);
  }
  lodash.set(outreach, "DataObject.Outreach", data);
  lodash.set(outreach, "DataObject.WorkflowStatus", data.WorkflowStatus);
  lodash.set(outreach, "DataObject.CurrentIdentity.OnBehalfOfPersonId", lodash.get(data,"CurrentCheckedInfo.CheckedBy.UserId"));

  return outreach;
}

export function GetListModel() {
  return Object.assign({}, {
    StatusListItems: dataList.getStatusList(),
    StaffListItems: dataList.getStaffList()
  });
}

export function getAllListData() {
  if (ListItems.length === 0) {
    ListItems = dataList.getAll();
  }
  return Object.assign([], ListItems);
}

export function processEvent(dataId, eventName, comments) {
  let outreach = Object.assign({}, Outreach);
  let data = ListItems.find(x => x.Id === dataId);
  if (!data) {
    data = dataList.getObjectAt(0);
  }

  if (eventName === "FirstCheckIn") {
    lodash.set(data, "WorkflowStatus", {
      "Name": "InProgress",
      "DisplayName": "In Progress"
    });
    lodash.set(data, "NextAvailableEvents", [
      {
        "Name": "RemovedFromOutreachQueue",
        "DisplayName": "Remove from Outreach queue"
      }
    ]);

    lodash.set(outreach, "Message", "First check in success!");
  }
  if (eventName === "RemovedFromOutreachQueue") {
    lodash.set(data, "WorkflowStatus", {
      "Name": "Completed",
      "DisplayName": "Completed"
    });
    lodash.set(data, "NextAvailableEvents", []);
    lodash.set(outreach, "Message", "Remove from Outreach Queue success!");
  }

  lodash.set(outreach, "ResultFlag", 1);

  lodash.set(outreach, "DataObject.Outreach", data);
  lodash.set(outreach, "DataObject.WorkflowStatus", data.WorkflowStatus);
  return outreach;
}

export function getListData(firstName, lastName, programType, status, checkedin) {

  if (ListItems.length === 0) {
    ListItems = dataList.getAll();
  }
  let results = Object.assign([], ListItems);

  if (firstName) {
    results = results.filter(x => x.PersonName !== null && x.PersonName.FirstName.startsWith(firstName));
  }

  if (lastName) {
    results = results.filter(x => x.PersonName !== null && x.PersonName.LastName.startsWith(lastName));
  }

  if (status) {
    results = results.filter(x => x.WorkflowStatus !== null && x.WorkflowStatus.Name === status);
  }

  if (programType) {
    results = results.filter(x => x.ProgramType !== null && x.ProgramType.Id === programType);
  }

  if (checkedin) {
    if (checkedin === "N/A") {
      results = results.filter(x => x.CurrentCheckedInfo === null);
    } else {
      results = results.filter(x => x.CurrentCheckedInfo !== null && x.CurrentCheckedInfo.CheckedBy != null && x.CurrentCheckedInfo.CheckedBy.UserId === checkedin);
    }

  }
  let outreach = Object.assign({}, Outreach);

  lodash.set(outreach, "DataObject.ListItems", results);
  const startIndex = results.length === 0
    ? "0"
    : "1";
  lodash.set(outreach, "Message", "Showing " + startIndex + " to " + results.length + " of " + results.length + " entries.");
  lodash.set(outreach, "ResultFlag", 1);

  return outreach;
}
export function getListDataByClient(clientId) {

  if (ListItems.length === 0) {
    ListItems = dataList.getAll();
  }
  let results = [];

  results.push(ListItems[0]);

  let outreach = Object.assign({}, Outreach);

  lodash.set(outreach, "DataObject.ListItems", results);
  const startIndex = results.length === 0
    ? "0"
    : "1";
  lodash.set(outreach, "Message", `Showing${startIndex} to ${results.length} of ${results.length} entries.`);
  lodash.set(outreach, "ResultFlag", 1);

  return outreach;
}

export function createIpc(clientId, sectionJson) {
  var section = JSON.parse(sectionJson);
  let result = lodash.set(Outreach.DataObject.Outreach, 'OverviewInformation', section);
  var output = {
    DataObject: result.Id
  }
  return output;
}

export function saveSectionObject(path, sectionJson, completionStatusJson) {
  let section = JSON.parse(sectionJson);
  let result = lodash.set(Outreach.DataObject.Outreach, path, section);
  return result;
}

export function addGeneralEvent(dataId, sectionJson) {
  let newGeneralEvent = JSON.parse(sectionJson);
  let generalEvents = Outreach.DataObject.Outreach.GeneralEvents;
  newGeneralEvent.Id = (generalEvents.length + 1).toString();
  generalEvents.push(newGeneralEvent);

  return Object.assign({}, {DataObject: newGeneralEvent});
}

export function editGeneralEvent(dataId, sectionJson) {
  let existingGeneralEvent = JSON.parse(sectionJson);
  let generalEvents = Outreach.DataObject.Outreach.GeneralEvents;

  generalEvents = lodash.map(generalEvents, (s) => {
    return s.Id === existingGeneralEvent.Id
      ? existingGeneralEvent
      : s;
  });

  return Object.assign({}, {DataObject: existingGeneralEvent});
}

export function deleteGeneralEvent(dataId, generalEventId) {
  let generalEvents = Outreach.DataObject.Outreach.GeneralEvents;
  lodash.remove(generalEvents, {Id: generalEventId});
  return Object.assign({}, {DataObject: generalEventId});
}
