const views = {
  "list": {
    "Title":"Plan of Care",
    "ClassName":"workspace",
    "HeaderHeight":32.98,
    "Buttons": [
      {
        "Caption": "Create New",
        "Path": "Create",
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
        "Name": "CreatedTimeStamp",
        "DisplayName": "Create Date",
        "DataPath": "Stamp.CreatedTimeStamp",
        "ValueType": "DateTimeOffset",
        "Width":100
      },{
        "Name": "Status",
        "DisplayName": "Status",
        "DataPath": "WorkflowStatus.DisplayName",
        "ValueType": "string",
        "Width":160
      },{
        "Name": "SignaturesCompleteDateFormatted",
        "DisplayName": "Signatures Complete Date",
        "DataPath": "SignaturesCompleteDateFormatted",
        "ValueType": "string",
        "Width":160
      },{
        "Name": "LastSubmittedDate",
        "DisplayName": "Last Submitted Date",
        "DataPath": "LatestScCompleteDate",
        "ValueType": "DateTimeOffset",
        "Width":140
      },{
        "Name": "Setting",
        "DisplayName": "Setting",
        "DataPath": "Setting.Name",
        "ValueType": "string",
        "Width":100,
        "FlexGrow": 1
      },{
        "Name": "ProgramType",
        "DisplayName": "Program Type",
        "DataPath": "ProgramType.Name",
        "ValueType": "string",
        "Width":90,
        "FlexGrow": 1
      }, {
        "Name": "PlanOfCareType",
        "DisplayName": "POC Type",
        "DataPath": "PlanOfCareType.Name",
        "ValueType": "string",
        "Width":90,
        "FlexGrow": 1
      }, {
        "Name": "EffectiveDate",
        "DisplayName": "Effective Date",
        "DataPath": "EffectiveDateRange.StartDate",
        "ValueType": "DateTimeOffset",
        "Width":100
      }, {
        "Name": "EndDate",
        "DisplayName": "End Date",
        "DataPath": "EffectiveDateRange.EndDate",
        "ValueType": "End Date",
        "ValueType": "DateTimeOffset",
        "Width":100
      }, {
        "Name": "Actions",
        "DisplayName": "Actions",
        "Width":90,
        "Actions":[{
          "Caption":"Summary",
          "Path":"summary",
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
    "ScComplete": {
      "NeedConfirmation": false,
      "NeedPrintHTML":true
    },
    "Discard": {
      "NeedConfirmation": true,
      "Title": "Discard Plan of Care",
      "Message": "Are you sure you want to discard the Plan of Care? You cannot undo it once you discarded " +
          "the Plan of Care.",
      "Items": [
        {
          "Name": "Comment",
          "DisplayName": "Comment",
          "Type": "String",
          "ValueType": "string",
          "IsRequired": false,
          "CompleteRequired": false,
          "Order": 0
        }
      ]
    },
    "ScReOpen": {
      "NeedConfirmation": true,
      "Title": "Reopen Plan of Care",
      "Message": "Are you sure you want to reopen the Plan of Care?",
      "Items": [
        {
          "Name": "ReopenPlanOfCareType",
          "DataPath": "ReopenPlanOfCareType",
          "DisplayName": "POC Type:",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "planofcaretypes"
          },
          "IsRequired": true,
          "CompleteRequired": false,
          "Order": 0       
        },
        {
          "Name": "ReopenPlanOfCareWarning",
          "DisplayName": "This action will remove all signatures. Are you sure you want to continue?",              
          "Type": "Info",
          "Display": false  
        }
        // {
        //   "Name": "Comment",
        //   "DisplayName": "Comment",
        //   "Type": "String",
        //   "ValueType": "string",
        //   "IsRequired": false,
        //   "CompleteRequired": false,
        //   "Order": 0
        // }
      ]
    }
  }
};

export default views;