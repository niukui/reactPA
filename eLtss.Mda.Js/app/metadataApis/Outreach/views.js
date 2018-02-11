const views = {
  "list": {
    "Title":null,
    "ClassName":"react-full-workspace",
    "HeaderHeight":38,
    "SearchPanel":{
      "Height":111,
      "FieldRows": [
        {
          "Items":[
            {
              "Name": "PersonID",
              "DisplayName": "Participant's ID:",
              "Type":"TextBox",
              "ClassName":"row stacked"

            },
            {
              "Name": "FirstName",
              "DisplayName": "First Name:",
              "Type":"TextBox",
              "ClassName":"row stacked"

            },
            {
              "Name": "LastName",
              "DisplayName": "Last Name:",
              "Type":"TextBox",
              "ClassName":"row stacked"
            }, 
            {
              "Name": "ProgramType",
              "DisplayName": "Program Type:",
              "Type": "Dropdown",
              "DataSource": {
                "LookupCategory": "programtypes"
              },
              "ValueType": "string",
              "ClassName":"row stacked"
            }, 
            {
              "Name": "Status",
              "DisplayName": "Status:",
              "Type":"Dropdown",
              "DataSource": 
              {
                "Options": "StatusListItems"
              },
              "ValueType": "string",
              "ClassName":"row stacked"
            },{
              "Name": "checkedOutTo",
              "DisplayName": "Checked out to:",
              "Type":"Dropdown",
              "DataSource": 
              {
                "Options": "StaffListItems"
              },
              "ClassName":"row stacked"
            }
          ]
        }
      ]
    },
    "Buttons":[],
    "Items": [
      {
        "Name": "PersonID",
        "DisplayName": "Participant's ID",
        "DataPath": "ClientIdentifier",
        "Width":90,
        "Fixed":true,
        "FlexGrow": 1 
      },
      {
        "Name": "FirstName",
        "DisplayName": "First Name",
        "DataPath": "PersonName.FirstName",
        "Width":70,
        "Fixed":true,
        "FlexGrow": 1
      },
      {
        "Name": "LastName",
        "DisplayName": "Last Name",
        "DataPath": "PersonName.LastName",
        "Width":70,
        "Fixed":true,
        "FlexGrow": 1
      }, 
      {
        "Name": "DateOfBirth",
        "DisplayName": "Date of Birth",
        "DataPath": "DateOfBirth",
        "ValueType": "DateTimeOffset",
        "Width":76,
        "Fixed":false
      }, 
      {
        "Name": "ProgramType",
        "DisplayName": "Program Type",
        "DataPath": "ProgramType.Name",
        "ValueType": "string",
        "Width":55,
        "FlexGrow": 1
      },       
      {
        "Name": "PlacementType",
        "DisplayName": "Placement Type",
        "DataPath": "PlacementType.Name",
        "ValueType": "string",
        "Width":55,
        "FlexGrow": 1
      }, 
      {
        "Name": "EnrollmentDate",
        "DisplayName": "Enrollment Date",
        "DataPath": "EnrollmentDate",
        "ValueType": "DateTimeOffset",
        "Width":76
      }, 
      {
        "Name": "TerminationDate",
        "DisplayName": "Termination Date",
        "DataPath": "TerminationDate",
        "ValueType": "DateTimeOffset",
        "Width":76
      }, 
      {
        "Name": "FirstAttemptDate",
        "DisplayName": "1st Attempt Date",
        "DataPath": "FirstAttempt.ContactDate",
        "ValueType": "DateTimeOffset",
        "Width":76
      }, {
        "Name": "SecondAttemptDate",
        "DisplayName": "2nd Attempt Date",
        "DataPath": "SecondAttempt.ContactDate",
        "ValueType": "DateTimeOffset",
        "Width":76
      }, {
        "Name": "InitialScreeningDate",
        "DisplayName": "Initial Screening Date",
        "DataPath": "InitialScreeningDate",
        "ValueType": "DateTimeOffset",
        "Width":76
      }, {
        "Name": "InitialVisitDate",
        "DisplayName": "Initial Visit Date",
        "DataPath": "InitialVisitDate",
        "ValueType": "DateTimeOffset",
        "Width":76
      }, {
        "Name": "UtrLetterDate",
        "DisplayName": "UTR Letter Date",
        "DataPath": "UtrLetterDate",
        "ValueType": "DateTimeOffset",
        "Width":76,
      }, {
        "Name": "WelcomeLetterDate",
        "DisplayName": "Welcome Letter Date",
        "DataPath": "WelcomeLetterDate",
        "ValueType": "DateTimeOffset",
        "Width":76,
      }, {
        "Name": "RemovedDate",
        "DataPath": "RemovedDate",
        "DisplayName": "Date Removed",
        "ValueType": "DateTimeOffset",
        "Width":76,
      },{
        "Name": "CheckedOutTo",
        "DisplayName": "Checked out to",
        "Width":110,
        "DataPath": "CurrentCheckedInfo.CheckedOutTo",
        "FlexGrow": 1
      },{
        "Name": "Status",
        "DisplayName": "Status",
        "Width":76,
        "DataPath": "WorkflowStatus.DisplayName",
      },
       {
        "Name": "Actions",
        "DisplayName": "Actions",
        "Width":80,
        "Actions":[{
          "Caption":"Summary",
          "Path":"summary",
          "IsPureLink":true,
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
      "customPopupName":"customPopup",
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
        },
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