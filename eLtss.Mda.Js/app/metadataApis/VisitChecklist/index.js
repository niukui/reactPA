import options from './options';
import rules from './rules';
import views from './views';

const metadata = {
  "Name": "VisitChecklist",
  "LookupPrefix": "vcl",
  "Title": "Visit Checklist Summary",
  "DisplayName": "Visit Checklist",
  "LeftActions": [
    {
      "Caption": "Back to List",
      "Path": "list",
      "Parameters": [
        {
          "Name": "moduleName",
          "Type": "context",
          "Value": "moduleName"
        }, {
          "Name": "clientId",
          "Type": "context",
          "Value": "clientId"
        } 
      ]
    }
  ],
  "Sections": [
    {
      "Level": 0,
      "Name": "OverviewInformation",
      "DisplayName": "Overview",
      "MultiEntry": false,
      "CompleteRequired": true,
      "Order": 10,
      "Sections": [],
      "EditLink": "SectionEdit",
      "LinkText": "Edit",
      "Items": [
        {
          "Name": "ParticipantName",
          "DataPath": "ParticipantName",
          "DisplayName": "Participant Name:",
          "Type": "String",
          "ValueType": "string",
          "IsRequired": true,
          "ReadOnly": true,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "VisitDate",
          "DataPath": "VisitDate",
          "DisplayName": "Visit Date:",
          "Type": "DatePicker",
          "ValueType": "DateTimeOffset?",
          "IsRequired": true,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "VisitType",
          "DataPath": "VisitType",
          "DisplayName": "Visit Type:",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "IsRequired": true,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "VisitSetting",
          "DataPath": "VisitSetting",
          "DisplayName": "Visit Setting:",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "IsRequired": true,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "VisitSettingNote",
          "DataPath": "VisitSettingNote",
          "Description": "Homelike Environment Assessment needs to be completed ",
          "Type": "Description",
          "Display": false,
          "Styles": {
            "fontStyle": "italic",
            "fontSize": 12
          },
          "Order": 0
        }
      ]
    }, {
      "Level": 0,
      "Name": "VisitChecklistDetails",
      "DisplayName": "Visit Checklist Details",
      "MultiEntry": false,
      "CompleteRequired": false,
      "Order": 10,
      "Sections": [],
      "EditLink": "SectionEdit",
      "LinkText": "Edit",
      "Items": [
        {
          "Name": "ReceivedHandbook",
          "DataPath": "ReceivedHandbook",
          "DisplayName": "1. Participant/Representative received a copy of the Participant Handbook.",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ReviewedRights",
          "DataPath": "ReviewedRights",
          "DisplayName": "2. Participant rights and responsibilities reviewed with Participant/Representat" +
              "ive.",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ReviewedAppealRights",
          "DataPath": "ReviewedAppealRights",
          "DisplayName": "3. Participant’s right to appeal reviewed with Participant/Representative Grieva" +
              "nce and Appeals process reviewed with Participant/Representative",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "MakingInformedDecisions",
          "DataPath": "MakingInformedDecisions",
          "DisplayName": "4. Participant Provided information on	Making informed decisions including expla" +
              "nation of their  right to live in the least restrictive, most integrated environ" +
              "ment",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ParticipateRight",
          "DataPath": "ParticipateRight",
          "DisplayName": "5. Participant Provided information on Right to participate in the care and serv" +
              "ice planning process",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ChooseRight",
          "DataPath": "ChooseRight",
          "DisplayName": "6. Participant Provided information on	Right to choose their Service Coordinator",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ChangeRight",
          "DataPath": "ChangeRight",
          "DisplayName": "7. Participant Provided information on	Right to change their Service Coordinator" +
              " and how to initiate the process",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ParticipantProviders",
          "DataPath": "ParticipantProviders",
          "DisplayName": "8. Participant provided right to choose Providers",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ReceivedAssistance",
          "DataPath": "ReceivedAssistance",
          "DisplayName": "9. Participant given resources and received assistance in developing home emerge" +
              "ncy plans (FEMA brochure, PEMA ReadyPA)",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "AssessmentCompleted",
          "DataPath": "AssessmentCompleted",
          "DisplayName": "10. Home-Like Environmental assessment completed",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ReviewedResources",
          "DataPath": "ReviewedResources",
          "DisplayName": "11. Community Resources, including housing, employment, and education if applica" +
              "ble, reviewed with participant and incorporated into PSCP (www. AuntBertha.com)",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "IsEmployed",
          "DataPath": "IsEmployed",
          "DisplayName": "12. Participant is employed part-time or full-time",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "IsInterested",
          "DataPath": "IsInterested",
          "DisplayName": "13. Participant is interested in pursuing employment opportunities",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "DiscussedDirectives",
          "DataPath": "DiscussedDirectives",
          "DisplayName": "14. Advanced Directives discussed with Participant (e.g. PA Advance Directives, " +
              "Living Will)",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ReviewedPcsp",
          "DataPath": "ReviewedPcsp",
          "DisplayName": "15. PCSP reviewed and signed by Participant or Representative.",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "serviceDelivery",
          "DataPath": "serviceDelivery",
          "Type": "Description",
          "Description":"16. Choice of service delivery for personal care/attendant service reviewed with Participant.",
          "Styles":{'fontStyle':"normal",'color':"#333"}
        },{
          "Name": "TraditionalAgencyModel",
          "DataPath": "TraditionalAgencyModel",
          "DisplayName": "A. Traditional Agency Model for personal care/attendant services",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "Styles":{"marginLeft":"1.8em"},
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "AttendantServices",
          "DataPath": "AttendantServices",
          "Type": "Description",
          "Description":"B. Self-Directed Attendant services including:",
          "Styles":{"fontStyle":"normal","color":"#333","marginLeft":"1.8em"}
        },{
          "Name": "InformingAndEducating",
          "DataPath": "InformingAndEducating",
          "DisplayName": "a.  Informing and educating about option to self-direct their personal care/atte" +
          "ndant service including verifying that participants electing this option underst" +
          "and their roles and responsibilities",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "Styles":{"marginLeft":"3em"},
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }
        , {
          "Name": "FinancialManagement",
          "DataPath": "FinancialManagement",
          "Type": "Description",
          "Description":"b. Referring interested participant to available resources for further information about and/or facilitating participation in option for self-direction combines financial management and information about assistance in support of consumer direction",
          "Styles":{"fontStyle":"normal","color":"#333","marginLeft":"3em"}
        },{
          "Name": "FMSAgency",
          "DataPath": "FMSAgency",
          "DisplayName": "ⅰ. FMSAgency - advising that FMS will discuss: Hiring and training of the personal care/attendant care worker",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "Styles":{"marginLeft":"4.2em"},
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }
        ,{
          "Name": "AssistingToAssess",
          "DataPath": "AssistingToAssess",
          "DisplayName": "ⅱ. Assisting to assess his/her training needs and authorizing training based on that assessment as appropriate",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "Styles":{"marginLeft":"4.2em"},
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }
        ,{
          "Name": "AssistingAsNeeded",
          "DataPath": "AssistingAsNeeded",
          "DisplayName": "ⅲ. Assisting as needed in finding a replacement worker to provide services when the member reports that te self-directed attendant is unavailable",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "Styles":{"marginLeft":"4.2em"},
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ServiceMyWayLabel",
          "DataPath": "ServiceMyWayLabel",
          "Type": "Description",
          "Description":"C. Service My Way: ",
          "Styles":{"fontStyle":"normal","color":"#333","marginLeft":"1.8em"}
        },{
          "Name": "ServiceMyWay",
          "DataPath": "ServiceMyWay",
          "DisplayName": " The Budget Authority model of service, which provides Part" +
          "icipants with a range of opportunities for Participant Self-Direction under whic" +
          "h Participants have the opportunity to hire and manage staff that perform person" +
          "al assistance type services, manage a flexible spending plan, and purchase allow" +
          "able goods and services through their spending plan.",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "Styles":{"marginLeft":"3em"},
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        },{
          "Name": "ReceivedCopyOfPcsp",
          "DataPath": "ReceivedCopyOfPcsp",
          "DisplayName": "17. Participant received a copy of PCSP",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "SharedWithPcpt",
          "DataPath": "SharedWithPcpt",
          "DisplayName": "18. PCSP shared with PCPT as authorized by the Participant",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "SafeEnvironment",
          "DataPath": "SafeEnvironment",
          "DisplayName": "19. HCBS Participant is in appropriate level of care and is safe in this environ" +
              "ment",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ProvidedPlan",
          "DataPath": "ProvidedPlan",
          "DisplayName": "20. If Dual Eligible, SC advised the Participant of the benefit of enrolling in a Medicare Part D plan " +
              "with zero co-pay and provided assistance in selecting a Medicare Part D plan",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "DailyDecisionMaking",
          "DataPath": "DailyDecisionMaking",
          "DisplayName": "21. Daily Decision Making-How do you manage your finances/pay your bills? ",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclassistancetypes"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ShortAndLongRangePlanning",
          "DataPath": "ShortAndLongRangePlanning",
          "DisplayName": "22. Short and Long Range Planning- How do you make appointments or schedule tran" +
              "sportation?",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclassistancetypes"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "RoleAsEmployer",
          "DataPath": "RoleAsEmployer",
          "DisplayName": "23. Do you know how to “be a boss”– find and hire people to work for you, train " +
              "your workers, and schedule when you want the work done?",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclassistancetypes"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "RoleAsEmployee",
          "DataPath": "RoleAsEmployee",
          "DisplayName": "24. If your attendant has not been showing up to do your care, do you understand" +
              " that it is your decision to fire the attendant? ",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclassistancetypes"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "NursingFacility",
          "DataPath": "NursingFacility",
          "Description": "Nursing Facility ONLY",
          "Type": "Description",
          "Display": false,
          "Styles": {
            "fontStyle": "normal",
            "fontSize": 14,
            "fontWeight":"bold"
          },
          "Order": 0
        }, {
          "Name": "ServicesAssociatedWithCare",
          "DataPath": "ServicesAssociatedWithCare",
          "DisplayName": "19. Covered services which are associated with care in a nursing facility",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ResponsibilityAndAware",
          "DataPath": "ResponsibilityAndAware",
          "DisplayName": "20. Patient Liability responsibility determined and participant aware",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "NursingFacilityEnvironment",
          "DataPath": "NursingFacilityEnvironment",
          "DisplayName": "21. Participant is in appropriate level of care and is safe in this environment." +
              " If no, explain below",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "UnsafeEnvironmentComments",
          "DisplayName": "please comment",
          "Description": null,
          "Type": "Textarea",
          "ValueType": "string",
          "IsRequired": false,
          "CompleteRequired": false,
          "Display": false,
          "ReadOnly": false,
          "Order": 0,
          "DataPath": "UnsafeEnvironmentComments"
        }, {
          "Name": "ResidentReview",
          "DataPath": "ResidentReview",
          "DisplayName": "22. Participant has a completed Preadmission Screening and Resident Review(PASRR).(Copy on file)",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "MdsSectionDate",
          "DataPath": "MdsSectionDate",
          "DisplayName": "Date Completed",
          "Description": "Date Completed",
          "Type": "DatePicker",
          "ValueType": "DateTimeOffset?",
          "Display": true,
          "CompleteRequired": true,
          "Validations": [
            {
              "Type": "max",
              "Expression": "today",
              "Message": "Date cannot be future."
            }
          ],
          "Order": 6
        }, {
          "Name": "MdsSection",
          "DataPath": "MdsSection",
          "DisplayName": "23. MDS Section Q reviewed and confirmed with participant",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "CommunitytransitioningInfo",
          "DataPath": "CommunitytransitioningInfo",
          "DisplayName": "24. Participant/Representative has requested more information on transitioning t" +
              "o the Community",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "HasDiagnosis",
          "DataPath": "HasDiagnosis",
          "DisplayName": "Participant has a diagnosis that precludes participant from signing document",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "ServicePlansubmitted",
          "DataPath": "ServicePlansubmitted",
          "DisplayName": "Authorizations completed and Service Plan submitted to Provider",
          "Type": "RadioButtonList",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "vclyesnonas"
          },
          "IsRequired": false,
          "ReadOnly": false,
          "CompleteRequired": false,
          "Order": 0
        }, {
          "Name": "Comments",
          "DisplayName": "Comments",
          "Description": null,
          "Type": "Textarea",
          "ValueType": "string",
          "IsRequired": false,
          "CompleteRequired": false,
          "Display": true,
          "ReadOnly": false,
          "Order": 0,
          "DataPath": "Comments"
        }
      ]
    }, {
      "Level": 0,
      "Name": "CareManagerSignatures",
      "DisplayName": "Signatures",
      "Description": "I attest that I have addressed and reviewed the areas identified within this che" +
          "cklist with the participant or representative during the participant's comprehen" +
          "sive needs assessment.",
      "MultiEntry": true,
      "CompleteRequired": true,
      "Display": true,
      "Order": 30,
      "Sections": [],
      "EditLink": "SectionEdit",
      "Items": [
        {
          "Name": "PrintName",
          "DisplayName": "Print Name",
          "Description": "Print Name",
          "Type": "TextBox",
          "ValueType": "string",
          "IsRequired": true,
          "Order": 4
        }, {
          "Name": "Signature",
          "DisplayName": "Signature",
          "Description": "Signature",
          "Type": "SignaturePad",
          "ContentType": "String",
          "Display": true,
          "IsSignature": true,
          "IsRequired": true,
          "Order": 3
        }, {
          "Name": "SignDate",
          "DisplayName": "Date Signed",
          "Description": "Date Signed",
          "Type": "DatePicker",
          "ValueType": "DateTimeOffset?",
          "Display": false,
          "IsRequired": true,
          "CompleteRequired": true,
          "Validations": [
            {
              "Type": "max",
              "Expression": "today",
              "Message": "Date cannot be future."
            }
          ],
          "Order": 6
        }
      ]
    }
  ]
};

export default function VisitChecklist() {
  return new Promise((resolve, reject) => {
    metadata.Options = Object.assign({}, options);
    metadata.views = Object.assign({}, views);
    metadata.Rules = Object.assign([], rules);
    resolve(Object.assign({}, metadata));
  });
}