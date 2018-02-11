
const accessControlIpc = [
   {
    'Id': 'ipc/accesspolicy',
    'Name': 'IndividualPlanningCalendar',
    'FormDescriptor': 'IPC',
    'AccessPolicies': [
      {
        "Permission": "IndividualPlanningCalendarEdit",
        "Resource": "OverviewInformation",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualPlanningCalendarEdit",
        "Resource": "GeneralEvents",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualPlanningCalendarView",
        "Resource": "OverviewInformation",
        "Policy": {
          "Status": [
            "InProgress", "Locked", "Discarded"
          ],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "IndividualPlanningCalendarView",
        "Resource": "GeneralEvents",
        "Policy": {
          "Status": [
            "InProgress", "Locked", "Discarded"
          ],
          "AccessLevels": ["Read"]
        }
      }
    ]
  }
];


export default accessControlIpc;