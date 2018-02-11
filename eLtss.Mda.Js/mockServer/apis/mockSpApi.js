import lookupApi from "./lookupApi";
import {set, lodash, find, remove, map} from 'lodash';

const SupportsPackage = {
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
        "SupportsPackageEdit",
        "SupportsPackagePublish",
        "SupportsPackageExpire",
        "SupportsPackageServiceEdit"
      ]
    },
    "WorkflowStatus": {
      "Name": "Pending",
      "DisplayName": "Pending"
    },
    "DropDownDataSource": {      
      "ServiceSelectList": [
        {
          "Selected": false,
          "Text": "Private Duty Nursing, Registered Nurse (T1002)",
          "Value": "lxservices/41db7887-e5da-4d13-a512-62ad23413ab6"
        }, {
          "Selected": false,
          "Text": "Private Duty Nursing, Licensed Practical Nurse",
          "Value": "lxservices/ed2eaa3f-759f-4fed-86e7-413199bb0013"
        }
      ]
    },
    "SupportsPackage": {
      "Id": "SupportsPackages2/1234567",
      "OverviewInformation": {
        "Name": "Mock up service package",
        "Area": {
          "Id": "lookupitems/supportspackagearea/373c7463-0235-4ce8-ac9c-f4dded529e15",
          "UniqueAttribute": {
            "Guid": "373c7463-0235-4ce8-ac9c-f4dded529e15",
            "Description": "ROS"
          }
        },
        "LivingSetting": {
          "Id": "lookupitems/supportspackagelivingsetting/e57df22e-6738-4189-bebf-92b1ea00cedf",
          "UniqueAttribute": {
            "Guid": "e57df22e-6738-4189-bebf-92b1ea00cedf",
            "Description": "Sponsored"
          }
        }
      },
      "SpServices": [
        {
          "Id": "spservices/c6172a01-1b79-40e3-b1f9-77acbdd302b5",
          "ServiceDefinitionId": "lxservices/41db7887-e5da-4d13-a512-62ad23413ab6",
          "Name": "Group Day (in center)",
          "ServiceDetails": [
            {
              "Level": "1",
              "MaxHourPerWeek": "0.0",
              "Rate": "0.00"
            }, {
              "Level": "2",
              "MaxHourPerWeek": "0.0",
              "Rate": "0.00"
            }, {
              "Level": "3",
              "MaxHourPerWeek": "10.0",
              "Rate": "155.00"
            }, {
              "Level": "4",
              "MaxHourPerWeek": "10.0",
              "Rate": "155.00"
            }, {
              "Level": "5",
              "MaxHourPerWeek": "10.0",
              "Rate": "202.90"
            }, {
              "Level": "6",
              "MaxHourPerWeek": "10.0",
              "Rate": "202.90"
            }, {
              "Level": "7",
              "MaxHourPerWeek": "10.0",
              "Rate": "202.90"
            }
          ]
        }, {
          "Id": "spservices/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "ServiceDefinitionId": "lxservices/41db7887-e5da-4d13-a512-62ad23413ab6",
          "Name": "Community Access (1:1)",
          "ServiceDetails": [
            {
              "Level": "1",
              "MaxHourPerWeek": "0.0",
              "Rate": "0.00"
            }, {
              "Level": "2",
              "MaxHourPerWeek": "0.0",
              "Rate": "0.00"
            }, {
              "Level": "3",
              "MaxHourPerWeek": "10.0",
              "Rate": "155.00"
            }, {
              "Level": "4",
              "MaxHourPerWeek": "2.0",
              "Rate": "58.00"
            }, {
              "Level": "5",
              "MaxHourPerWeek": "2.0",
              "Rate": "58.00"
            }, {
              "Level": "6",
              "MaxHourPerWeek": "5.0",
              "Rate": "146.20"
            }, {
              "Level": "7",
              "MaxHourPerWeek": "5.0",
              "Rate": "146.20"
            }
          ]
        }
      ],
    "WorkflowStatus": {
      "Name": "Pending",
      "DisplayName": "Pending"
    }
    }
  }
}

export function getSupportsPackage() {
  return Object.assign({}, SupportsPackage);
}

export function saveSectionObject(path, sectionJson, completionStatusJson) {
  let section = JSON.parse(sectionJson);
  let result = set(SupportsPackage.DataObject.SupportsPackage, path, section);
  return result;
}

export function createOrUpdateService(serviceJson) {
  let newSpService = JSON.parse(serviceJson);
  let spServices = SupportsPackage.DataObject.SupportsPackage.SpServices;
  if (newSpService.Id) {
    spServices = map(spServices, (s) => {
      return s.Id === newSpService.Id
        ? newSpService
        : s;
    });
  } else {
    newSpService.Id = (spServices.length + 1).toString();
    spServices.push(newSpService);
  }
  return Object.assign({}, {DataObject: spServices});
}

export function removeService(serviceId) {
  let spServices = SupportsPackage.DataObject.SupportsPackage.SpServices;
  remove(spServices, {Id: serviceId});
  return Object.assign({}, {DataObject: spServices});
}
