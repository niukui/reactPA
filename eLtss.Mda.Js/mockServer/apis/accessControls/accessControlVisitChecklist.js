import lodash from "lodash";

const accessControlVisitChecklist = [
  {
    'Id': 'VisitChecklist/accesspolicy',
    'Name': 'VisitChecklist',
    'FormDescriptor': 'VisitChecklist',
    'AccessPolicies': [
      {
        "Permission": "VisitChecklistList",
        "Resource": "List",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "VisitChecklistCreate",
        "Resource": "VisitChecklist.Create",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "VisitChecklistSummary",
        "Resource": "List",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "VisitChecklistEdit",
        "Resource": "OverviewInformation",
        "Policy": {
          "Status": [
            "InProgress", "In Progress"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "VisitChecklistEdit",
        "Resource": "VisitChecklistDetails",
        "Policy": {
          "Status": [
            "InProgress", "In Progress"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "VisitChecklistEdit",
        "Resource": "CareManagerSignatures",
        "Policy": {
          "Status": [
            "InProgress", "In Progress"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "VisitChecklistComplete",
        "Resource": "Complete",
        "Policy": {
            "Status": [
                "InProgress",
                "In Progress"
            ],
            "AccessLevels": [ "Write" ]
        }
      }, {
        "Permission": "VisitChecklistDiscard",
        "Resource": "Discard",
        "Policy": {
            "Status": [
                "InProgress",
                "In Progress",
                "Completed"
            ],
            "AccessLevels": [ "Write" ]
        }
    }
    ]
  }
];


export default accessControlVisitChecklist;