const views = {
  "list": {
    "Title": "Visit Checklist",
    "ClassName": "workspace",
    "HeaderHeight": 33.98,
    "Buttons": [
      {
        "Caption": "Add Visit Checklist",
        "Path": "Create",
        "Parameters": [
          {
            "Name": "sectionName",
            "Type": "string",
            "Value": "OverviewInformation"
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
        "Name": "CreatedDate",
        "DisplayName": "Created Date",
        "DataPath": "CreatedDate",
        "ValueType": "DateTimeOffset",
        "Width":160,
        "FlexGrow": 1
      }, {
        "Name": "CreatedBy",
        "DisplayName": "Created By",
        "DataPath": "CreatedBy",
        "ValueType": "string",
        "Width":160,
        "FlexGrow": 1
      }, {
        "Name": "VisitDate",
        "DisplayName": "Visit Date",
        "DataPath": "VisitDate",
        "ValueType": "DateTimeOffset",
        "Width":160,
      }, {
        "Name": "VisitType",
        "DisplayName": "Visit Type",
        "DataPath": "VisitType",
        "ValueType": "string",
        "Width":160,
      }, {
        "Name": "VisitSetting",
        "DisplayName": "Visit Setting",
        "DataPath": "VisitSetting",
        "ValueType": "string",
        "Width":160,
        "FlexGrow": 1
      }, {
        "Name": "Status",
        "DisplayName": "Status",
        "DataPath": "WorkflowStatus.DisplayName",
        "Width":160,
      }, {
        "Name": "CompletedDate",
        "DisplayName": "Date Complete",
        "DataPath": "CompletedDate",
        "ValueType": "DateTimeOffset",
        "Width":160
      }, {
        "Name": "Actions",
        "DisplayName": "Actions",
        "Width": 80,
        "Actions": [
          {
            "Caption": "Summary",
            "Path": "summary",
            "Parameters": [
              {
                "Name": "dataId",
                "Type": "dataItem",
                "Value": "Id"
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
        ]
      }
    ]
  },
  "workflowPopups": {
    "Complete": {
      "NeedConfirmation": false,
      "Title": "Complete Checklist",
      "Message": "Are you sure to complete the Visit Checklist? You cannot undo it once you comple" +
          "ted a Visit Checklist.",
      "Items": [
        {
          "Name": "Reason",
          "DisplayName": "Complete Reason",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": true,
          "ReadOnly": false,
          "Order": 0
        }, {
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
    "Discard": {
      "NeedConfirmation": false,
      "Title": "Discard Checklist",
      "Message": "Are you sure to Discard the Visit Checklist? You cannot undo it once you discard" +
          "ed a Visit Checklist.",
      "Items": [
        {
          "Name": "Reason",
          "DisplayName": "Discard Reason",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclcompletechecklistreasons"
          },
          "IsRequired": true,
          "ReadOnly": false,
          "Order": 0
        }, {
          "Name": "Comment",
          "DisplayName": "Comment",
          "Type": "String",
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