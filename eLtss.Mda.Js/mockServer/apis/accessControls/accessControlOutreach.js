
const accessControlOutreach = [
  {
    "Name": "Outreach",
    "FormDescriptor": "Outreach",
    "AccessPolicies": [
      {
        "Permission": "CCAssignment",
        "Resource": "Assignment.CCAssignment",
        "Policy": {
          "Status": [
            "New", "InProgress"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "CMOUAssignment",
        "Resource": "Assignment.CMOUAssignment",
        "Policy": {
          "Status": [
            "New", "InProgress"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "OutreachAttemptEdit",
        "Resource": "OutreachAttempts.FirstAttempt",
        "Policy": {
          "Status": [
            "New", "InProgress"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["OnlyCheckedOutStaffCanEdit"]
      }, {
        "Permission": "OutreachAttemptEdit",
        "Resource": "OutreachAttempts.SecondAttempt",
        "Policy": {
          "Status": [
            "New", "InProgress"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["OnlyCheckedOutStaffCanEdit"]
      }, {
        "Permission": "OutreachCheckInOut",
        "Resource": "CheckIn",
        "Policy": {
          "Status": [
            "New", "InProgress"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "OutreachCheckInOut",
        "Resource": "CheckOut",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "RemoveFromOutreachQueue",
        "Resource": "RemovedFromOutreachQueue",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "OutreachInitialScreeningEdit",
        "Resource": "InitialScreening",
        "Policy": {
          "Status": [
            "New", "InProgress"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "OutreachInitialVisitEdit",
        "Resource": "InitialVisit",
        "Policy": {
          "Status": [
            "New", "InProgress"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["OnlyCheckedOutStaffCanEdit"]
      }, {
        "Permission": "OutreachView",
        "Resource": "Outreach",
        "Policy": {
          "Status": [
            "New", "InProgress", "Completed"
          ],
          "AccessLevels": ["Read"]
        }
      }
    ]
  }
];



export default accessControlOutreach;