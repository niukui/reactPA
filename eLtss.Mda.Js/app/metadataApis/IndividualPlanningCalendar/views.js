const views = {
  "list": {
    "Title":null,
    "ClassName":"full-workspace",
    "Buttons":[
      {
        "Caption":"Create New",
        "Path":"create",
        "Parameters":[
          {
            "Name":"sectionName",
            "Type":"string",
            "Value":"OverviewInformation",
          },{
            "Name":"clientId",
            "Type":"context",
            "Value":"clientId",
          },{
            "Name":"moduleName",
            "Type":"context",
            "Value":"moduleName"
          }
        ]
      },
      {
        "Caption":"Summary",
        "Path":"create",
        "Parameters":[
          {
            "Name":"sectionName",
            "Type":"string",
            "Value":"OverviewInformation",
          },{
            "Name":"clientId",
            "Type":"context",
            "Value":"clientId",
          },{
            "Name":"moduleName",
            "Type":"context",
            "Value":"moduleName"
          }
        ]
      }
    ],
    "Items": [
      {
        "Name": "CreateDate",
        "DisplayName": "Create Date",
        "DataPath": "Stamp.CreatedTimeStamp",
        "ValueType": "DateTimeOffset"
      }, {
        "Name": "CreateBy",
        "DisplayName": "Create By",
        "DataPath": "Stamp.CreatedOnBehalfOf.FullName"
      }, {
        "Name": "LastModifiedDate",
        "DisplayName": "Last Modified Date",
        "DataPath": "Stamp.LastModifiedTimeStamp",
        "ValueType": "DateTimeOffset"
      }, {
        "Name": "LastModifiedBy",
        "DisplayName": "Last Modified By",
        "DataPath": "Stamp.LastModifiedOnBehalfOf.FullName"
      }, {
        "Name": "Status",
        "DisplayName": "Status",
        "DataPath": "WorkflowStatus.DisplayName"
      }, {
        "Name": "Actions",
        "DisplayName": "Actions",
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
              "Type":"context",
              "Value":"clientId",
            },{
              "Name":"moduleName",
              "Type":"context",
              "Value":"moduleName"
            }
          ]
        },{
          "Caption":"Edit",
          "Path":"SectionEdit",
          "Parameters":[
            {
              "Name":"dataId",
              "Type":"dataItem",
              "Value":"Id",
            },{
              "Name":"moduleName",
              "Type":"context",
              "Value":"moduleName"
            },
            {
            "Name":"path",
            "Type":"string",
            "Value":"OverviewInformation",
          }
          ]
        }]
      }
    ]
  }
};

export default views;