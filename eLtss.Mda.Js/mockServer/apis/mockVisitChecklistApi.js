import lookupApi from "./lookupApi";
import lodash from 'lodash';
import FakeVisitChecklistStore from './FakeVisitChecklistStore';
import faker from 'faker';

const VisitChecklist = {
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
      "Permissions": ["VisitChecklistEdit", "VisitChecklistCreate", "VisitChecklistComplete", "VisitChecklistDiscard"]
    },
    "VisitChecklist": {
      "Id": "visitChecklist/dfe1c622-407f-47be-9b29-b130ada99d96",
      "ClientId": "clients/ba7c62ad-6901-4bb9-89c8-5283a18bd342",
      "ParticipantName": "John Doe",
      "VisitDate": "2017-07-01T15:32:46.062Z",
      "VisitType": {
        "Id": "lookupitems/vclvisittypes/b9b1ccc8-5453-4a0e-98f6-e0c70caf5e1b",
        "UniqueAttribute": {
          "Guid": "b9b1ccc8-5453-4a0e-98f6-e0c70caf5e1b",
          "Description": "Initial"
        }
      },
      "VisitSetting": {
        "Id": "lookupitems/vclvisitsettings/46fa2b0f-7086-4c29-ae92-b21c4519ce6a",
        "UniqueAttribute": {
          "Guid": "46fa2b0f-7086-4c29-ae92-b21c4519ce6a",
          "Description": "Community"
        }
      },
      "ReceivedHandbook": {
        "Id": "lookupitems/vclyesnonas/425ecd7b-1c2f-4780-98cb-5e528ad18d02",
        "UniqueAttribute": {
          "Guid": "425ecd7b-1c2f-4780-98cb-5e528ad18d02",
          "Description": "No"
        }
      },
      "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      },
      "NextAvailableEvents": [
        {
          "Name": "Completed",
          "DisplayName": "Completed"
        }, {
          "Name": "Discarded",
          "DisplayName": "Discarded"
        }
      ]
    }
  }
}

let ListItems = [];

const dataList = new FakeVisitChecklistStore(10);

export function getSummaryInfo(clientId, dataId) {
  return {DataObject: VisitChecklist.DataObject};
}

export function getListData(clientId) {

  if (ListItems.length === 0) {
    ListItems = dataList.getAll();
  }
  let results = ListItems;
  let visitChecklist = Object.assign({}, VisitChecklist);

  lodash.set(visitChecklist, "DataObject.ListItems", results);
  const startIndex = results.length === 0
    ? "0"
    : "1";
  lodash.set(visitChecklist, "Message", `Showing${startIndex} to ${results.length} of ${results.length} entries.`);
  lodash.set(visitChecklist, "ResultFlag", 1);

  return visitChecklist;
}

export function saveSectionObject(dataId, path, sectionJson) {
  let section = JSON.parse(sectionJson);
  let result = Object.assign(VisitChecklist.DataObject.VisitChecklist, section);
  return {DataObject: VisitChecklist.DataObject};
}

export function create(sectionJson) {
  var section = JSON.parse(sectionJson);
  Object.assign(VisitChecklist.DataObject.VisitChecklist, section);

  var output = {
    DataObject: VisitChecklist.DataObject.VisitChecklist.Id
  }
  return output;
}
