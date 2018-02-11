import lookupApi from "./lookupApi";
import lodash from 'lodash';

const IndividualPlanningCalendar = {
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
      "Permissions": ["IndividualPlanningCalendarList", 
      "IndividualPlanningCalendarCreate", 
      "IndividualPlanningCalendarEdit", 
      "IndividualPlanningCalendarView", 
      "IndividualPlanningCalendarDelete"]
    },
    "WorkflowStatus": {
      "Name": "InProgress",
      "DisplayName": "In Progress"
    },
    "DropDownDataSource": {
    "SupportsPackageAreaSelectList": [
        {
          "Selected": false,
          "Text": "ROS",
          "Value": "lookupitems/supportspackagearea/373c7463-0235-4ce8-ac9c-f4dded529e15"
        }, {
          "Selected": false,
          "Text": "NOVA",
          "Value": "lookupitems/supportspackagearea/be0826d3-acb4-4b21-ba96-b872b96db071"
        }
      ],
      "SupportsPackageLivingSettingSelectList": [
        {
          "Selected": false,
          "Text": "Sponsored",
          "Value": "lookupitems/supportspackagelivingsetting/e57df22e-6738-4189-bebf-92b1ea00cedf"
        }, {
          "Selected": false,
          "Text": "Group Home",
          "Value": "lookupitems/supportspackagelivingsetting/85672bfa-3189-4f0b-99b0-07206eb1712c"
        }, {
          "Selected": false,
          "Text": "Living Alone",
          "Value": "lookupitems/supportspackagelivingsetting/30b0ff30-a9b3-4991-98d4-0048f453f011"
        }, {
          "Selected": false,
          "Text": "Supported Living",
          "Value": "lookupitems/supportspackagelivingsetting/8970198c-a896-46b5-8e8b-d7656a2de5ff"
        }
      ],
      "SupportsPackageServiceSelectList": [
        {
          "Selected": false,
          "Text": "Supported Employment, Group -  2 or Fewer Members per Staff",
          "Value": "lxservices/c6749e3f-9d16-45b4-b05f-5ae032228d41",
          "MaxHourPerWeek": "10.0",
          "Rate": "5.00"
        }, {
          "Selected": false,
          "Text": "Community Coaching",
          "Value": "lxservices/909cec90-4ea3-44b4-b5db-0755f238f34c",
          "MaxHourPerWeek": "20.0",
          "Rate": "10.00"
        }, {
          "Selected": false,
          "Text": "Center-Based Crisis Supports",
          "Value": "lxservices/972fb049-0773-4df1-8697-ba7c0a036f3b",
          "MaxHourPerWeek": "30.0",
          "Rate": "15.00"     
        }
      ],
      "LxServiceSelectList": [
        {
          "Selected": false,
          "Text": "Supported Employment, Group",
          "Value": "lxservices/0c1ec84f-759a-47f1-9d76-998b6dbc4119"
        }, {
          "Selected": false,
          "Text": "Community-Based Crisis Supports",
          "Value": "lxservices/963ccbad-0843-4f44-83ea-372296ebfeef"
        }, {
          "Selected": false,
          "Text": "Supported Employment, Group - 2 or Fewer Members per Staff",
          "Value": "lxservices/c6749e3f-9d16-45b4-b05f-5ae032228d41"
        }, {
          "Selected": false,
          "Text": "Community Coaching",
          "Value": "lxservices/909cec90-4ea3-44b4-b5db-0755f238f34c"
        }, {
          "Selected": false,
          "Text": "Center-Based Crisis Supports",
          "Value": "lxservices/972fb049-0773-4df1-8697-ba7c0a036f3b"
        }
      ]
    },
    "IndividualPlanningCalendar": {
      "Id": "IndividualPlanningCalendar/400db3c7-9851-43b8-a8fd-e1e9be6fc507",
      "ClientId":"clients/asdfasdf",
      "OverviewInformation": {
        "Name": "Sample Individual Planning Calendar",
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
        },
        "Level": 2,
        "ClientPreferredName": "David",
        "SupportsPackageId": "supportspackages/afc31c52-7c95-422d-9380-5f6df22f569e"
      },
      "GeneralEvents": [
        {
          "Id": "generalevents/c6172a01-1b79-40e3-b1f9-77acbdd302b5",
          "Name": "General event 1",
          "EventType": {
            "Id": "lookupitems/ipceventtypes/d7845b80-df0a-45fb-a1ac-b290ac195273",
            "UniqueAttribute": {
              "Description": "Standards Supports Package Service",
              "Guid": "d7845b80-df0a-45fb-a1ac-b290ac195273"
            }
          },
          "SpServiceId": "spservices/b5bd1d22-c4b3-437c-9e51-37e0802a4b2d",
          "ServiceDefinitionId": "lxservices/c6749e3f-9d16-45b4-b05f-5ae032228d41",
          "FrequencyType": {
            "Id": "lookupitems/ipcfrequencytypes/340d5c0c-366a-4efc-b6c3-365d7f905015",
            "UniqueAttribute": {
              "Description": "Daily",
              "Guid": "340d5c0c-366a-4efc-b6c3-365d7f905015"
            }
          },
          "FrequencyWeekDays": [
            {
              "Id": "lookupitems/ipcfrequencyweekdays/20d9a992-1c0d-42f4-82d9-32ef67c41dc3",
              "Abbreviation": "0",
              "Name": "Sunday",
              "UniqueAttribute": {
                "Description": "Sunday",
                "Guid": "20d9a992-1c0d-42f4-82d9-32ef67c41dc3"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/784a88d5-4304-4719-bf19-43d30a9907bf",
              "Abbreviation": "1",
              "Name": "Monday",
              "Description": "Monday",
              "UniqueAttribute": {
                "Description": "Monday",
                "Guid": "784a88d5-4304-4719-bf19-43d30a9907bf"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/272b2b63-c93a-4291-9745-68c064a94527",
              "Abbreviation": "2",
              "Name": "Tuesday",
              "Description": "Tuesday",
              "UniqueAttribute": {
                "Description": "Tuesday",
                "Guid": "272b2b63-c93a-4291-9745-68c064a94527"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/ab1a3144-e2dd-4221-9d7f-5945ce4caaf8",
              "Abbreviation": "3",
              "Name": "Wednesday",
              "Description": "Wednesday",
              "UniqueAttribute": {
                "Description": "Wednesday",
                "Guid": "ab1a3144-e2dd-4221-9d7f-5945ce4caaf8"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/82cd6d4d-cfba-460b-8582-1160da44abbc",
              "Abbreviation": "4",
              "Name": "Thursday",
              "Description": "Thursday",
              "UniqueAttribute": {
                "Description": "Thursday",
                "Guid": "82cd6d4d-cfba-460b-8582-1160da44abbc"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/6a1b7433-dd89-4fed-a9ee-5b958a3d7dce",
              "Abbreviation": "5",
              "Name": "Friday",
              "Description": "Friday",
              "UniqueAttribute": {
                "Description": "Friday",
                "Guid": "6a1b7433-dd89-4fed-a9ee-5b958a3d7dce"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/8a6c6d30-8fa0-4c1b-98ae-6227e5cc7cbd",
              "Abbreviation": "6",
              "Name": "Saturday",
              "Description": "Saturday",
              "UniqueAttribute": {
                "Description": "Saturday",
                "Guid": "8a6c6d30-8fa0-4c1b-98ae-6227e5cc7cbd"
              }
            }
          ],
          "StartTime": {
            "Hours": 2,
            "Minutes": 30
          },
          "EndTime": {
            "Hours": 6,
            "Minutes": 30
          },
          "DailySupport": false,
          "TotalAuthorizedHours": 2
        }, {
          "Id": "generalevents/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "Name": "General event 2",
          "EventType": {
            "Id": "lookupitems/ipceventtypes/d7845b80-df0a-45fb-a1ac-b290ac195273",
            "UniqueAttribute": {
              "Description": "Standards Supports Package Service",
              "Guid": "d7845b80-df0a-45fb-a1ac-b290ac195273"
            }
          },
          "SpServiceId": "spservices/8a6c6d30-8fa0-4c1b-98ae-6227e5cc7cbd",
          "ServiceDefinitionId": "lxservices/972fb049-0773-4df1-8697-ba7c0a036f3b",
          "FrequencyType": {
            "Id": "lookupitems/ipcfrequencytypes/fe31eb1d-9694-4f6d-8a72-d6f0bd5a5d9a",
            "UniqueAttribute": {
              "Description": "Business Week",
              "Guid": "fe31eb1d-9694-4f6d-8a72-d6f0bd5a5d9a"
            }
          },
          "FrequencyWeekDays": [
            {
              "Id": "lookupitems/ipcfrequencyweekdays/784a88d5-4304-4719-bf19-43d30a9907bf",
              "Abbreviation": "1",
              "Name": "Monday",
              "Description": "Monday",
              "UniqueAttribute": {
                "Description": "Monday",
                "Guid": "784a88d5-4304-4719-bf19-43d30a9907bf"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/272b2b63-c93a-4291-9745-68c064a94527",
              "Abbreviation": "2",
              "Name": "Tuesday",
              "Description": "Tuesday",
              "UniqueAttribute": {
                "Description": "Tuesday",
                "Guid": "272b2b63-c93a-4291-9745-68c064a94527"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/ab1a3144-e2dd-4221-9d7f-5945ce4caaf8",
              "Abbreviation": "3",
              "Name": "Wednesday",
              "Description": "Wednesday",
              "UniqueAttribute": {
                "Description": "Wednesday",
                "Guid": "ab1a3144-e2dd-4221-9d7f-5945ce4caaf8"
              }
            }, {
              "Id": "lookupitems/ipcfrequencyweekdays/6a1b7433-dd89-4fed-a9ee-5b958a3d7dce",
              "Abbreviation": "5",
              "Name": "Friday",
              "Description": "Friday",
              "UniqueAttribute": {
                "Description": "Friday",
                "Guid": "6a1b7433-dd89-4fed-a9ee-5b958a3d7dce"
              }
            }
          ],
          "StartTime": {
            "Hours": 8,
            "Minutes": 0
          },
          "EndTime": {
            "Hours": 9,
            "Minutes": 30
          },
          "DailySupport": false,
          "TotalAuthorizedHours": 12
        }
      ],
      "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      }
    }
  }
}

const ListItems =[
  {
     "Id":"IndividualPlanningCalendar/400db3c7-9851-43b8-a8fd-e1e9be6fc507", 
     "ClientId":"clients/asdfasdf",
     "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      },  
     "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System dssgfdf dfgsd dfgsdf test long string in on cell",
          "FullNameFormal": "System dssgfdf dfgsd dfgsdf test long string in on cell"
        },
        "CreatedTimeStamp": "\/Date(1472156494141)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System dssgfdf dfgsd dfgsdf test long string in on cell",
          "FullNameFormal": "System dssgfdf dfgsd dfgsdf test long string in on cell"
        },
        "LastModifiedTimeStamp": "\/Date(1472156494141)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System System dssgfdf dfgsd dfgsdf test long string in on cell",
          "FullNameFormal": "System"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "Systdem System <br/>dssgfdf dfgsd dfgsdf test long string in on cell",
          "FullNameFormal": "System"
        }
      }
  },
  {
     "Id":"IndividualPlanningCalendar/400db3c7-9851-43b8-a8fd-e1e9be6fc507", 
     "ClientId":"clients/asdfasdf",
     "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      },  
     "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "CreatedTimeStamp": "\/Date(1472156494141)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "LastModifiedTimeStamp": "\/Date(1472156494141)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        }
      }
  },
  {
     "Id":"IndividualPlanningCalendar/400db3c7-9851-43b8-a8fd-e1e9be6fc507", 
     "ClientId":"clients/asdfasdf",
     "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      },  
     "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "CreatedTimeStamp": "\/Date(1472156494141)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "LastModifiedTimeStamp": "\/Date(1472156494141)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        }
      }
  },
  {
     "Id":"IndividualPlanningCalendar/400db3c7-9851-43b8-a8fd-e1e9be6fc507", 
     "ClientId":"clients/asdfasdf",
     "WorkflowStatus": {
        "Name": "InProgress",
        "DisplayName": "In Progress"
      },  
     "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "CreatedTimeStamp": "\/Date(1472156494141)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "LastModifiedTimeStamp": "\/Date(1472156494141)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "",
          "FullName": "System",
          "FullNameFormal": "System"
        }
      }
  }
]


export function initiateIpcModel(){
  return IndividualPlanningCalendar;
}

export function getIndividualPlanningCalendar() {
  return Object.assign({}, IndividualPlanningCalendar);
}

export function getGetListData(clientId) {
  return Object.assign([], ListItems);
}

export function createIpc(clientId, sectionJson){
   var section = JSON.parse(sectionJson);
   let result = lodash.set(IndividualPlanningCalendar.DataObject.IndividualPlanningCalendar, 'OverviewInformation', section);
   var output = {
     DataObject:result.Id
   }
   return output;
}

export function saveSectionObject(path, sectionJson, completionStatusJson) {
  let section = JSON.parse(sectionJson);
  let result = lodash.set(IndividualPlanningCalendar.DataObject.IndividualPlanningCalendar, path, section);
  return result;
}

export function addGeneralEvent(dataId, sectionJson) {
  let newGeneralEvent = JSON.parse(sectionJson);
  let generalEvents = IndividualPlanningCalendar.DataObject.IndividualPlanningCalendar.GeneralEvents;
  newGeneralEvent.Id = (generalEvents.length + 1).toString();
  generalEvents.push(newGeneralEvent);

  return Object.assign({}, {DataObject: newGeneralEvent});
}

export function editGeneralEvent(dataId, sectionJson) {
  let existingGeneralEvent = JSON.parse(sectionJson);
  let generalEvents = IndividualPlanningCalendar.DataObject.IndividualPlanningCalendar.GeneralEvents;

  generalEvents = lodash.map(generalEvents, (s) => {
    return s.Id === existingGeneralEvent.Id
      ? existingGeneralEvent
      : s;
  });

  return Object.assign({}, {DataObject: existingGeneralEvent});
}

export function deleteGeneralEvent(dataId, generalEventId) {
  let generalEvents = IndividualPlanningCalendar.DataObject.IndividualPlanningCalendar.GeneralEvents;
  lodash.remove(generalEvents, {Id: generalEventId});
  return Object.assign({}, {DataObject: generalEventId});
}
