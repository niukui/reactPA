const views = {
  "list": {
    "Title": "Outreach",
    "ClassName": "workspace",
    "HeaderHeight":33.98,
    "Buttons": [
      {
        "Caption": "Add to Outreach Queue",
        "Path": "Create",
        "IsModalConfirmButton":true,
        "Parameters": [
          {
            "Name": "sectionName",
            "Type": "string",
            "Value": "Overview"
          }, {
            "Name": "clientId",
            "Type": "context",
            "Value": "clientId"
          }, {
            "Name": "moduleName",
            "Type": "context",
            "Value": "moduleName"
          }
        ]
      }
    ],
    "Items": [
      {
        "Name": "ProgramType",
        "DisplayName": "Program Type",
        "DataPath": "ProgramType.Name",
        "ValueType": "string",
        "Width":90
      },   
       {
        "Name": "PlacementType",
        "DisplayName": "Placement Type",
        "DataPath": "PlacementType.Name",
        "ValueType": "string",
        "Width":90,
      },      
      {
        "Name": "EnrollmentDate",
        "DisplayName": "Enrollment Date",
        "DataPath": "EnrollmentDate",
        "ValueType": "DateTimeOffset",
        "Width":90
      }, 
      {
        "Name": "TerminationDate",
        "DisplayName": "Termination Date",
        "DataPath": "TerminationDate",
        "ValueType": "DateTimeOffset",
        "Width":90
      }, 
      {
        "Name": "FirstAttemptDate",
        "DisplayName": "1st Attempt Date",
        "DataPath": "FirstAttempt.ContactDate",
        "ValueType": "DateTimeOffset",
        "Width":90
      }, {
        "Name": "SecondAttemptDate",
        "DisplayName": "2nd Attempt Date",
        "DataPath": "SecondAttempt.ContactDate",
        "ValueType": "DateTimeOffset",
        "Width":100
      }, {
        "Name": "InitialScreeningDate",
        "DisplayName": "Initial Screening Date",
        "DataPath": "InitialScreeningDate",
        "ValueType": "DateTimeOffset",
        "Width":90
      }, {
        "Name": "InitialVisitDate",
        "DisplayName": "Initial Visit Date",
        "DataPath": "InitialVisitDate",
        "ValueType": "DateTimeOffset",
        "Width":90
      }, {
        "Name": "UtrLetterDate",
        "DisplayName": "UTR Letter Date",
        "DataPath": "UtrLetterDate",
        "ValueType": "DateTimeOffset",
        "Width":90,
      }, {
        "Name": "WelcomeLetterDate",
        "DisplayName": "Welcome Letter Date",
        "DataPath": "WelcomeLetterDate",
        "ValueType": "DateTimeOffset",
        "Width":90,
      }, {
        "Name": "RemovedDate",
        "DataPath": "RemovedDate",
        "DisplayName": "Removed Date",
        "ValueType": "DateTimeOffset",
        "Width":90,
      },{
        "Name": "CheckedOutTo",
        "DisplayName": "Checked out to",
        "Width":110,
        "DataPath": "CurrentCheckedInfo.CheckedOutTo",
        "FlexGrow": 1
      },{
        "Name": "Status",
        "DisplayName": "Status",
        "Width":90,
        "FlexGrow": 1,
        "DataPath": "WorkflowStatus.DisplayName",
      },
       {
        "Name": "Actions",
        "DisplayName": "Actions",
        "Width":90,
        "Actions":[{
          "Caption":"Summary",
          "Path":"summary",
          "Type":"react",
          "Parameters":[
            {
              "Name":"dataId",
              "Type":"dataItem",
              "Value":"Id",
            },{
              "Name":"clientId",
              "Type":"dataItem",
              "Value":"ClientId",
            },{
              "Name":"moduleName",
              "Type":"context",
              "Value":"moduleName"
            }
          ]
        }]
      }
    ]
  },
  "workflowPopups": {
    "RemovedFromOutreachQueue": {
      "NeedConfirmation": true,
      "Title": "Complete Outreach",
      "Message": "Are you sure to complete the Outreach? You cannot undo it once you completed an Outreach.",
      "Items": [
          {
              "Name": "CompleteReason",
              "DisplayName": "Complete Reason:",
              "Type": "Dropdown",
              "ValueType": "object",
              "DataSource": {
                  "Options": "RemovedReasonSelectList"
              },
              "IsRequired": true,
              "ReadOnly": false,
              "Order": 0
          },
          {
              "Name": "OtherSpecify",
              "DisplayName": "If other, specify:",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 1
          }
      ]
    },
    "CheckOut": {
      "NeedConfirmation": true,
      "Title": "Check Out",      
      "Items": [
        {
          "Name": "Comment",
          "DisplayName": "Comment:",
          "Type": "Textarea",
          "ValueType": "string",
          "IsRequired": false,
          "CompleteRequired": false,
          "Order": 0
        }
      ]
    },
    "CheckIn": {
      "NeedConfirmation": true,
      "Title": "Check In",      
      "Items": [
        {
          "Name": "Comment",
          "DisplayName": "Comment:",
          "Type": "Textarea",
          "ValueType": "string",
          "IsRequired": false,
          "CompleteRequired": false,
          "Order": 0
        }
      ]
    }
  }
};

export default views;