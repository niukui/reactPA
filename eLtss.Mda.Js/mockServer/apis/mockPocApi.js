import lookupApi from "./lookupApi";
import lodash from 'lodash';

const PlanOfCare = {
  "Redirect": null,
  "Message": null,
  "Partial": null,
  "Data": null,
  "DataObject": {
    "AttachedDocumentId": "PlanOfCares2/5ff3da32-adcd-4ce1-8e00-15f810c50a8a",
    "Attachments": [],
    "NewRevisedIspTypes": [
      {
        "Selected": false,
        "Text": "Change Request - Revision",
        "Value": "lookupitems/PlanOfCaretypes/23502646-A882-4241-9482-541EB8387AF1"
      }, {
        "Selected": false,
        "Text": "Annual ISP - recertification",
        "Value": "lookupitems/PlanOfCaretypes/8C932293-EF35-4E70-8DA8-540E6C4927C4"
      }
    ],
    "IspAttachmentUploadModel": {
      "ClientId": "clients/88383187-18a4-4a76-adf0-3aa0b8734b19",
      "AttachedDocumentId": "PlanOfCares2/5ff3da32-adcd-4ce1-8e00-15f810c50a8a",
      "AttachmentTypeId": null,
      "Comments": null,
      "AttachmentTypeSelectList": [
        {
          "Selected": false,
          "Text": "Assisted Technology Plan",
          "Value": "lookupitems/clientattachmenttypes/b02f4abd-4673-44eb-bcb6-ab2e05f0b2da"
        }, {
          "Selected": false,
          "Text": "Environmental Modification",
          "Value": "lookupitems/clientattachmenttypes/75a4c41b-1e9b-4e65-ab4e-87207a678a02"
        }, {
          "Selected": false,
          "Text": "ISP Part I : Essential Information",
          "Value": "lookupitems/clientattachmenttypes/ebf5b506-5b30-4e75-8b4a-b79494c9625f"
        }, {
          "Selected": false,
          "Text": "ISP Part II : Personal Profile",
          "Value": "lookupitems/clientattachmenttypes/840412c9-f824-460a-98cf-cbf32a546fea"
        }, {
          "Selected": false,
          "Text": "ISP Part III : Shared Planning",
          "Value": "lookupitems/clientattachmenttypes/c577c491-2a70-4294-81b0-4458c1979e29"
        }, {
          "Selected": false,
          "Text": "ISP Part IV : Agreement",
          "Value": "lookupitems/clientattachmenttypes/5a8c376c-670f-42f1-8cbf-b7ef6988a8a8"
        }, {
          "Selected": false,
          "Text": "ISP Part V : Plan for Supports",
          "Value": "lookupitems/clientattachmenttypes/db0d98b5-6932-4b54-bc33-43b8dee07118"
        }, {
          "Selected": false,
          "Text": "Nurse Plan",
          "Value": "lookupitems/clientattachmenttypes/3ad72e74-5aad-4015-8199-f0f6a27075a7"
        }, {
          "Selected": false,
          "Text": "Therapeutic Consultation",
          "Value": "lookupitems/clientattachmenttypes/1266a4e6-c590-4f12-879b-20f5a558f43c"
        }, {
          "Selected": false,
          "Text": "Other",
          "Value": "lookupitems/clientattachmenttypes/-3"
        }
      ]
    },
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
      "Permissions": [
        "PlanOfCareEdit",
        "PlanOfCareProviderAdd",
        "PlanOfCareProviderDelete",
        "PlanOfCareEssentialInformationView",
        "PlanOfCarePersonalProfileView",
        "PlanOfCarePersonalProfileEdit",
        "PlanOfCareSharedPlanningsView",
        "PlanOfCareSharedPlanningsEdit",
        "PlanOfCarePartDoesMyPlanMatchEdit",
        "PlanOfCarePartTeamQuestionsEdit",
        "PlanOfCarePartContributorsEdit",
        "PlanOfCarePartPersonCenteredDatesEdit",
        "PlanOfCareAddPlanForSupport",
        "PlanOfCareAgreementSignaturesEdit",
        "PlanOfCareAgreementView",
        "PlanOfCareEssentialInformationEdit",
        "PlanOfCarePart2Edit",
        "PlanOfCarePart3Edit",
        "PlanOfCareAttachmentUpload",
        "PlanOfCareFormNoteEdit",
        "PlanOfCareFormNoteView",
        "PlanOfCareFormNoteCreate",
        "PlanOfCareServicesEdit",
        "PlanOfCareServicesView"
      ]
    },
    "ClientId": "clients/88383187-18a4-4a76-adf0-3aa0b8734b19",
    "PlanOfCare": {
      "Parameters": {
        "PreferredName": "Test Person"
      },
      "EssentialInformation": {
        "ContactInformation": {
          "LastName": "KkRK",
          "MiddleName": null,
          "FirstName": "TPRRI",
          "PreferredName": "PreName",
          "SocialSecurityNumber": "112748639",
          "DateOfBirth": "1959-06-18T00:00:00-04:00",
          "Gender": {
            "Id": "lookupitems/genders/-1",
            "UniqueAttribute": {
              "Guid": "d1705689-f7a0-479b-bc8c-ab68ceede6bc",
              "Description": "Female"
            }
          },
          "Address": {
            "AddressLine1": "8805 E Taylor Ruon Parkway",
            "AddressLine2": null,
            "AddressLine3": null,
            "City": "ALEXANDRIA",
            "StateProvince": {
              "Id": "lookupitems/stateprovincetypes/-46",
              "UniqueAttribute": {
                "Guid": "e4b14b84-07ca-4bdb-a7f1-07068cb44abf",
                "Description": "Virginia"
              }
            },
            "Country": null,
            "PostalCode": "22301",
            "County": {
              "Id": "lookupitems/counties/-96",
              "Name": "City of Alexandria"
            }
          },
          "HomePhone": "4433193080",
          "CellPhone": "4434102573",
          "Email": "test@Gmail.com",
          "MedicaidNumber": "810112212019"
        },
        "WaiverCosts": {
          "AnnualServicesTotal": "$0.00"
        },
        "Eligibility": {
          "DateSISCompleted": "2009-01-01T00:00:00-05:00",
          "Tier": 2,
          "SupportLevel": 2
        }
      },
      "PersonalProfile": null,
      "SharedPlannings": [
        {
          "Id": "sharedplannings/45671e94-394d-4152-be79-42b82939a437",
          "LifeArea": {
            "Id": "lookupitems/lifeareas/f480d795-8de8-48d2-88be-3e923c281c24",
            "Category": null,
            "ParentId": null,
            "Abbreviation": null,
            "Name": "Transportation and Travel",
            "Description": "Transportation and Travel",
            "SortOrder": null,
            "Inactive": false,
            "UniqueAttribute": null,
            "RuleAttributes": [],
            "Stamp": null
          },
          "LineNumber": 1,
          "DesiredOutcome": "Can swimming in seaside.",
          "WhenNoLongerNeedSupport": "Winter",
          "SupportType": {
            "Id": "lookupitems/supporttypes/2ef09c7c-7e59-4c6c-9a2c-4a7647a5311e",
            "Category": null,
            "ParentId": null,
            "Abbreviation": null,
            "Name": "Relationship-based",
            "Description": "Relationship-based",
            "SortOrder": null,
            "Inactive": false,
            "UniqueAttribute": null,
            "RuleAttributes": [],
            "Stamp": null
          },
          "SupportProviderName": null,
          "AttachedProviders": [],
          "AttachedProviderIds": [],
          "StartDate": "/Date(1442995200000)/",
          "EndDate": "/Date(1442995200000)/"
        }, {
          "Id": "sharedplannings/def71e94-394d-4152-be79-42b82939a456",
          "LifeArea": {
            "Id": "lookupitems/lifeareas/120877bc-5479-4e94-9b9f-ed5621ddc4ae",
            "Category": "lifeareas",
            "ParentId": null,
            "Abbreviation": null,
            "Name": "Home",
            "Description": "Home",
            "SortOrder": null,
            "Inactive": false,
            "UniqueAttribute": null,
            "RuleAttributes": [],
            "Stamp": null
          },
          "LineNumber": 2,
          "DesiredOutcome": "Can run on earth.",
          "WhenNoLongerNeedSupport": "Good enough",
          "SupportType": {
            "Id": "lookupitems/supporttypes/0ef63270-bd1d-4e67-a3e2-621cd76714e6",
            "Category": null,
            "ParentId": null,
            "Abbreviation": null,
            "Name": "Eligibility-based",
            "Description": "Eligibility-based",
            "SortOrder": null,
            "Inactive": false,
            "UniqueAttribute": null,
            "RuleAttributes": [],
            "Stamp": null
          },
          "SupportProviderName": "provider",
          "AttachedProviders": [
            {}
          ],
          "AttachedProviderIds": [
            "providerprofiles/deb7adca-2712-4b04-b3d8-072b6db5bab7", "providerprofiles/37b8230d-f82c-4069-9eb5-e81759e111fb"
          ],
          "StartDate": "/Date(1442995200000)/",
          "EndDate": "/Date(1442995200000)/"
        }, {
          "LifeArea": {
            "Id": "lookupitems/lifeareas/aa77fb8f-0d65-4e4d-b0ca-5d15a9ae3dca",
            "Name": "Work and Alternates to Work"
          },
          "LineNumber": 3,
          "DesiredOutcome": "1",
          "WhenNoLongerNeedSupport": "1",
          "SupportType": {
            "Id": "lookupitems/supporttypes/2ef09c7c-7e59-4c6c-9a2c-4a7647a5311e",
            "Name": "Relationship-based"
          },
          "SupportProviderName": "",
          "AttachedProviderIds": [],
          "StartDate": null,
          "EndDate": null,
          "IsEligibilityBased": false,
          "OverallStatus": "in-progress",
          "Id": "Sun Feb 05 2017 12:54:25 GMT-0500 (Eastern Standard Time)"
        }, {
          "LifeArea": {
            "Id": "lookupitems/lifeareas/99154801-2813-424a-bbe1-ea27a30faba3",
            "Name": "Learning & Other Pursuits"
          },
          "LineNumber": 4,
          "DesiredOutcome": "2",
          "WhenNoLongerNeedSupport": "2",
          "SupportType": {
            "Id": "lookupitems/supporttypes/2ef09c7c-7e59-4c6c-9a2c-4a7647a5311e",
            "Name": "Relationship-based"
          },
          "SupportProviderName": "",
          "AttachedProviderIds": [],
          "StartDate": null,
          "EndDate": null,
          "IsEligibilityBased": false,
          "OverallStatus": "in-progress",
          "Id": "Sun Feb 05 2017 12:54:38 GMT-0500 (Eastern Standard Time)"
        }, {
          "LifeArea": {
            "Id": "lookupitems/lifeareas/376ccad9-bc56-4615-a7d4-64d729999382",
            "Name": "Community & Interests"
          },
          "LineNumber": 5,
          "DesiredOutcome": "3",
          "WhenNoLongerNeedSupport": "3",
          "SupportType": {
            "Id": "lookupitems/supporttypes/2ef09c7c-7e59-4c6c-9a2c-4a7647a5311e",
            "Name": "Relationship-based"
          },
          "SupportProviderName": "",
          "AttachedProviderIds": [],
          "StartDate": null,
          "EndDate": null,
          "IsEligibilityBased": false,
          "OverallStatus": "in-progress",
          "Id": "Sun Feb 05 2017 12:55:34 GMT-0500 (Eastern Standard Time)"
        }, {
          "LifeArea": {
            "Id": "lookupitems/lifeareas/1b704295-b2c8-4b45-a526-352d4c4774b2",
            "Name": "Relationships"
          },
          "LineNumber": 6,
          "DesiredOutcome": "4",
          "WhenNoLongerNeedSupport": "4",
          "SupportType": {
            "Id": "lookupitems/supporttypes/2ef09c7c-7e59-4c6c-9a2c-4a7647a5311e",
            "Name": "Relationship-based"
          },
          "SupportProviderName": "",
          "AttachedProviderIds": [],
          "StartDate": null,
          "EndDate": null,
          "IsEligibilityBased": false,
          "OverallStatus": "in-progress",
          "Id": "Sun Feb 05 2017 12:55:50 GMT-0500 (Eastern Standard Time)"
        }
      ],
      "Id": "PlanOfCares2/5ff3da32-adcd-4ce1-8e00-15f810c50a8a",
      "OriginalPlanOfCareId": null,
      "ClientId": "clients/62d2ff55-79e7-41aa-821a-ad43376d84de",
      "ProgramType": {
        "Id": "lookupitems/programtypes/636457bf-c646-4588-94f9-c37843efb908",
        "Category": "programtypes",
        "ParentId": null,
        "Abbreviation": "Community Living",
        "Name": "Community Living",
        "Description": "Community Living",
        "SortOrder": 100,
        "Inactive": false,
        "UniqueAttribute": {
          "Guid": "636457bf-c646-4588-94f9-c37843efb908",
          "Description": "Community Living"
        },
        "RuleAttributes": [],
        "Stamp": null
      },
      "Setting": {
        "Id": "lookupitems/planofcaresettings/dd9ebf2c-2497-449a-a3de-764b5b043d86",
        "Category": "planofcaresettings",
        "ParentId": null,
        "Abbreviation": null,
        "Name": "Nursing Facility",
        "Description": "Nursing Facility",
        "SortOrder": 110,
        "Inactive": false,
        "UniqueAttribute": {
          "Guid": "dd9ebf2c-2497-449a-a3de-764b5b043d86",
          "Description": "Nursing Facility"
        },
        "RuleAttributes": []
      },
      "PlanOfCareType": {
        "Id": "lookupitems/planofcaretypes/dbfd53e8-18db-4ac4-9a03-95432f61c962",
        "Category": "planofcaretypes",
        "ParentId": null,
        "Abbreviation": null,
        "Name": "Initial",
        "Description": "Initial",
        "SortOrder": 100,
        "Inactive": false,
        "UniqueAttribute": {
          "Guid": "dbfd53e8-18db-4ac4-9a03-95432f61c962",
          "Description": "Initial"
        },
        "RuleAttributes": []
      },
      "EffectiveDateRange": {
        "StartDate": "2017-07-12T04:00:00.000Z",
        "EndDate": "2018-07-11T04:00:00.000Z"
      },
      "Comments": "fsfsda dfs fsa f",
      "AssignedProviders": [
        {
          "Id": "providerprofiles/deb7adca-2712-4b04-b3d8-072b6db5bab7",
          "OwnerOrganizationUnitId": "organizationunits/67592700-2c90-4d98-a423-40f8e86bfcbc",
          "Name": "ADVANCED HOME CARE INC",
          "Npi": "1457707713",
          "Address": {
            "AddressLine1": "ANGIE FISHEL",
            "AddressLine2": "525 AMHERST STREET SUITE 100",
            "City": "WINCHESTER",
            "PostalCode": "226013881",
            "StateProvince": {
              "Id": "lookupitems/stateprovincetypes/-46",
              "Category": "stateprovincetypes",
              "ParentId": null,
              "Abbreviation": "VA",
              "Name": "Virginia",
              "Description": "Region 3 - Philadelphia",
              "SortOrder": 154,
              "Inactive": false,
              "UniqueAttribute": {
                "Guid": "e4b14b84-07ca-4bdb-a7f1-07068cb44abf",
                "Description": "Virginia"
              },
              "RuleAttributes": [],
              "Stamp": null
            },
            "Country": {
              "Id": null,
              "Category": null,
              "ParentId": null,
              "Abbreviation": null,
              "Name": null,
              "Description": null,
              "SortOrder": null,
              "Inactive": false,
              "UniqueAttribute": null,
              "RuleAttributes": [],
              "Stamp": null
            },
            "FullAddress": "ANGIE FISHEL, 525 AMHERST STREET SUITE 100, WINCHESTER, VA 226013881"
          },
          "Disabled": false
        }, {
          "Id": "providerprofiles/34a3430d-aca7-4e69-a6bc-2624fa3ac973",
          "OwnerOrganizationUnitId": "organizationunits/0e5688b7-7a41-4f86-b717-8390d65cad2f",
          "Name": "HOPE IN HOME CARE, LLC",
          "Npi": "1982770780",
          "Address": {
            "AddressLine1": "749 J CLYDE MORRIS BLVD, SUIT A",
            "AddressLine2": null,
            "City": "NEWPORT NEWS",
            "PostalCode": "236011598",
            "StateProvince": {
              "Id": "lookupitems/stateprovincetypes/-46",
              "Category": "stateprovincetypes",
              "ParentId": null,
              "Abbreviation": "VA",
              "Name": "Virginia",
              "Description": "Region 3 - Philadelphia",
              "SortOrder": 154,
              "Inactive": false,
              "UniqueAttribute": {
                "Guid": "e4b14b84-07ca-4bdb-a7f1-07068cb44abf",
                "Description": "Virginia"
              },
              "RuleAttributes": [],
              "Stamp": null
            },
            "Country": {
              "Id": null,
              "Category": null,
              "ParentId": null,
              "Abbreviation": null,
              "Name": null,
              "Description": null,
              "SortOrder": null,
              "Inactive": false,
              "UniqueAttribute": null,
              "RuleAttributes": [],
              "Stamp": null
            },
            "FullAddress": "749 J CLYDE MORRIS BLVD, SUIT A, NEWPORT NEWS, VA 236011598"
          },
          "Disabled": false
        }, {
          "Id": "providerprofiles/9377c6e8-97cf-42fe-a067-aa751029879e",
          "OwnerOrganizationUnitId": "organizationunits/9377c6e8-97cf-42fe-a067-aa751029879e",
          "Name": "POINDEXTERS RESIDNTL FCLTY VERSION 2 LLC",
          "Npi": "0158649910",
          "Address": {
            "AddressLine1": "1102 POINDEXTER LANE",
            "AddressLine2": null,
            "City": "BEDFORD",
            "PostalCode": "245235864",
            "StateProvince": {
              "Id": "lookupitems/stateprovincetypes/-46",
              "Category": "stateprovincetypes",
              "ParentId": null,
              "Abbreviation": "VA",
              "Name": "Virginia",
              "Description": "Region 3 - Philadelphia",
              "SortOrder": 154,
              "Inactive": false,
              "UniqueAttribute": {
                "Guid": "e4b14b84-07ca-4bdb-a7f1-07068cb44abf",
                "Description": "Virginia"
              },
              "RuleAttributes": [],
              "Stamp": null
            },
            "Country": {
              "Id": null,
              "Category": null,
              "ParentId": null,
              "Abbreviation": null,
              "Name": null,
              "Description": null,
              "SortOrder": null,
              "Inactive": false,
              "UniqueAttribute": null,
              "RuleAttributes": [],
              "Stamp": null
            },
            "FullAddress": "1102 POINDEXTER LANE, BEDFORD, VA 245235864"
          },
          "Disabled": false
        }, {
          "Id": "providerprofiles/37b8230d-f82c-4069-9eb5-e81759e111fb",
          "OwnerOrganizationUnitId": "organizationunits/37b8230d-f82c-4069-9eb5-e81759e111fb",
          "Name": "REGION TEN CMMNTY SVCS BRD",
          "Npi": "1942270699",
          "Address": {
            "AddressLine1": "500 OLD LYNCHBURG RD",
            "AddressLine2": null,
            "City": "CHARLOTTESVILLE",
            "PostalCode": "229036500",
            "StateProvince": {
              "Id": "lookupitems/stateprovincetypes/-46",
              "Category": "stateprovincetypes",
              "ParentId": null,
              "Abbreviation": "VA",
              "Name": "Virginia",
              "Description": "Region 3 - Philadelphia",
              "SortOrder": 154,
              "Inactive": false,
              "UniqueAttribute": {
                "Guid": "e4b14b84-07ca-4bdb-a7f1-07068cb44abf",
                "Description": "Virginia"
              },
              "RuleAttributes": [],
              "Stamp": null
            },
            "Country": {
              "Id": null,
              "Category": null,
              "ParentId": null,
              "Abbreviation": null,
              "Name": null,
              "Description": null,
              "SortOrder": null,
              "Inactive": false,
              "UniqueAttribute": null,
              "RuleAttributes": [],
              "Stamp": null
            },
            "FullAddress": "500 OLD LYNCHBURG RD, CHARLOTTESVILLE, VA 229036500"
          },
          "Disabled": false
        }
      ],
      "PsychologicalEvaluation": {
        "Id": null,
        "Category": null,
        "ParentId": null,
        "Abbreviation": null,
        "Name": null,
        "Description": null,
        "SortOrder": null,
        "Inactive": false,
        "UniqueAttribute": null,
        "RuleAttributes": [],
        "Stamp": null
      },
      "PsychologicalEvaluationDate": null,
      "PhysicalEvaluation": {
        "Id": null,
        "Category": null,
        "ParentId": null,
        "Abbreviation": null,
        "Name": null,
        "Description": null,
        "SortOrder": null,
        "Inactive": false,
        "UniqueAttribute": null,
        "RuleAttributes": [],
        "Stamp": null
      },
      "PhysicalEvaluationDate": null,
      "DevelopmentalEvaluation": {
        "Id": null,
        "Category": null,
        "ParentId": null,
        "Abbreviation": null,
        "Name": null,
        "Description": null,
        "SortOrder": null,
        "Inactive": false,
        "UniqueAttribute": null,
        "RuleAttributes": [],
        "Stamp": null
      },
      "DevelopmentalEvaluationDate": null,
      "SsaDisabilityDetermination": {
        "Id": null,
        "Category": null,
        "ParentId": null,
        "Abbreviation": null,
        "Name": null,
        "Description": null,
        "SortOrder": null,
        "Inactive": false,
        "UniqueAttribute": null,
        "RuleAttributes": [],
        "Stamp": null
      },
      "IspClientInformationSnapshot": {
        "ClientInformation": {
          "ClientId": "clients/62d2ff55-79e7-41aa-821a-ad43376d84de",
          "ClientName": {
            "FirstName": "ANAJOAQUINA",
            "MiddleName": "S",
            "LastName": "ROY",
            "Suffix": null,
            "FullName": "ANAJOAQUINA ROY"
          },
          "PreferredName": null,
          "DateOfBirth": "\/Date(687412800000)\/",
          "MedicaidNumber": "095020012014",
          "HomePhone": null,
          "CellPhone": null,
          "Email": null,
          "Address": {
            "AddressLine1": "C/O LAURENA MORISSET",
            "AddressLine2": "5509 VAUGHAN LN",
            "City": "WILLIAMSBURG",
            "PostalCode": "231882921",
            "StateProvince": {
              "Id": "lookupitems/stateprovincetypes/-46",
              "Category": "stateprovincetypes",
              "ParentId": null,
              "Abbreviation": "VA",
              "Name": "Virginia",
              "Description": "Region 3 - Philadelphia",
              "SortOrder": 154,
              "Inactive": false,
              "UniqueAttribute": {
                "Guid": "e4b14b84-07ca-4bdb-a7f1-07068cb44abf",
                "Description": "Virginia"
              },
              "RuleAttributes": [],
              "Stamp": null
            },
            "Country": {
              "Id": null,
              "Category": null,
              "ParentId": null,
              "Abbreviation": null,
              "Name": null,
              "Description": null,
              "SortOrder": null,
              "Inactive": false,
              "UniqueAttribute": null,
              "RuleAttributes": [],
              "Stamp": null
            },
            "FullAddress": "C/O LAURENA MORISSET, 5509 VAUGHAN LN, WILLIAMSBURG, VA 231882921"
          },
          "CurrentSupportCoordinatorName": null
        }
      },
      "FormNotes": [],

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
      },
      "Status": "Completed",
      "IsActive": false,
      "ClientHasAssignedSlotForCurrentProgramType": true,
      "IsRevised": false,
      "PlanForSupportList": [
        {
          "Id": "planforsupports/dd587268-6362-417c-b1a0-edfa879dbd64",
          "ProviderName": "CSB OU",
          "Npi": "0123456789",
          "WorkflowStatus": {
            "DisplayName": "In Progress",
            "Name": "InProgress"
          },
          "Active": "Inactive",
          "ServiceName": "Service Name",
          "OutcomeNumber": 2,
          "Stamp": {
            "CreatedBy": {
              "UserId": "staffs/systemadministrator",
              "FirstName": "System",
              "LastName": "Administrator"
            },
            "CreatedOnBehalfOf": {
              "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
              "FirstName": "SC 1 for",
              "LastName": "CSB OU"
            },
            "CreatedTimestamp": "\/Date(1472156494141)\/",
            "LastModifiedBy": {
              "UserId": "staffs/systemadministrator",
              "FirstName": "System",
              "LastName": "Administrator"
            },
            "LastModifiedOnBehalfOf": {
              "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
              "FirstName": "SC 1 for",
              "LastName": "CSB OU"
            },
            "LastModifiedTimestamp": "\/Date(1472156494141)\/"
          }
        }
      ],
      "WorkflowStatus": {
        "Name": "PendingScInput",
        "DisplayName": "Pending Support Coordinator Input"
      },
      "WorkflowStatusLastModifiedTimestamp": "2017-02-07T16:26:32.7924347-05:00",
      "WorkflowStatusLastModifiedBy": {
        "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
        "FirstName": "DBHDS",
        "LastName": "SuperUser"
      },
      "WorkflowComments": null
    },
    "YesNoList": [
      {
        "Selected": false,
        "Text": "Yes",
        "Value": "lookupitems/yesnooptions/08ABEA15-247A-4A68-8582-86726A74B565"
      }, {
        "Selected": false,
        "Text": "No",
        "Value": "lookupitems/yesnooptions/734E4D88-04AC-4583-9570-00F9239D5C72"
      }
    ],
    "LifeAreas": [
      {
        "Selected": false,
        "Text": "Work and Alternates to Work",
        "Value": "lookupitems/lifeareas/aa77fb8f-0d65-4e4d-b0ca-5d15a9ae3dca"
      }, {
        "Selected": false,
        "Text": "Learning & Other Pursuits",
        "Value": "lookupitems/lifeareas/99154801-2813-424a-bbe1-ea27a30faba3"
      }, {
        "Selected": false,
        "Text": "Community & Interests",
        "Value": "lookupitems/lifeareas/376ccad9-bc56-4615-a7d4-64d729999382"
      }, {
        "Selected": false,
        "Text": "Relationships",
        "Value": "lookupitems/lifeareas/1b704295-b2c8-4b45-a526-352d4c4774b2"
      }, {
        "Selected": false,
        "Text": "Home",
        "Value": "lookupitems/lifeareas/120877bc-5479-4e94-9b9f-ed5621ddc4ae"
      }, {
        "Selected": false,
        "Text": "Transportation and Travel",
        "Value": "lookupitems/lifeareas/f480d795-8de8-48d2-88be-3e923c281c24"
      }, {
        "Selected": false,
        "Text": "Money",
        "Value": "lookupitems/lifeareas/4a484d31-6c51-46d0-aabb-d5c031283aa6"
      }, {
        "Selected": false,
        "Text": "Health & Safety",
        "Value": "lookupitems/lifeareas/380fad1e-a6b5-49c9-b4bb-b6e6ac302187"
      }, {
        "Selected": false,
        "Text": "Wellness",
        "Value": "lookupitems/lifeareas/556ffcd0-19d4-46ee-a5e1-f39b98edf247"
      }

    ],
    "SupportTypes": [
      {
        "Selected": false,
        "Text": "Relationship-based",
        "Value": "lookupitems/supporttypes/2ef09c7c-7e59-4c6c-9a2c-4a7647a5311e"
      }, {
        "Selected": false,
        "Text": "Community-based",
        "Value": "lookupitems/supporttypes/b4cfb065-b4cf-431d-8a2f-afecbb817784"
      }, {
        "Selected": false,
        "Text": "Eligibility-based",
        "Value": "lookupitems/supporttypes/0ef63270-bd1d-4e67-a3e2-621cd76714e6"
      }
    ],

    "ReDeterminationId": null
  },
  "ResultFlag": 1
};
const auditTrails = {
  "DomainAuditTrails": [
    {
      "Id": "domainaudittrails/99190862-be2c-47ac-a38a-d72b040de024",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "Create",
      "DomainMethodDisplayName": "Create",
      "DomainMethodArguments": [
        {
          "ArgumentName": "clientId",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "clients/b4a53aed-8b0f-40f4-b5be-94f36490ac28",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "programType",
          "TypeAssemblyQualifiedName": "eLtss.Common.Lookups.LookupIdentifier, eLtss.Common, Version=3.1.0.1, Culture=ne" +
              "utral, PublicKeyToken=null",
          "Value": "Community Living",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "ispType",
          "TypeAssemblyQualifiedName": "eLtss.Common.Lookups.LookupIdentifier, eLtss.Common, Version=3.1.0.1, Culture=ne" +
              "utral, PublicKeyToken=null",
          "Value": "Enrollment - new ISP or initial",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "effectiveDate",
          "TypeAssemblyQualifiedName": "eLtss.Common.ValueObjects.DateTimeOffsetRange, eLtss.Common, Version=3.1.0.1, Cu" +
              "lture=neutral, PublicKeyToken=null",
          "Value": "{\r\n  \"StartDateTime\": \"2017-04-03T00:00:00-04:00\",\r\n  \"EndDateTime\": " +
              "\"2018-04-02T00:00:00-04:00\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }
      ],
      "CurrentDateTime": "\/Date(1490016530319)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490016531209)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490016531209)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/ec99fb4c-3392-4456-a96c-3651d17d0627",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ProviderAdded",
      "DomainMethodDisplayName": "Provider Added",
      "DomainMethodArguments": [
        {
          "ArgumentName": "providerName",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
            "561934e089",
          "Value": "TestProviderOU9",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490016550850)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490016550975)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490016550975)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/7949a901-a26e-4228-84ef-8cdbcd7265c6",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"LastName\": \"Gossman\",\r\n  \"MiddleName\": \"\",\r\n  \"FirstName\":" +
              " \"Sarah\",\r\n  \"PreferredName\": \"Sara\",\r\n  \"SocialSecurityNumber\": \"7" +
              "41025896\",\r\n  \"DateOfBirth\": \"1987-12-12T00:00:00-05:00\",\r\n  \"Gender\"" +
              ": {\r\n    \"Id\": \"lookupitems/genders/-1\",\r\n    \"Category\": \"genders\"," +
              "\r\n    \"ParentId\": null,\r\n    \"Abbreviation\": \"F\",\r\n    \"Name\": \"F" +
              "emale\",\r\n    \"Description\": \"Female\",\r\n    \"SortOrder\": 101,\r\n    " +
              "\"Inactive\": false,\r\n    \"UniqueAttribute\": {\r\n      \"Guid\": \"d1705689" +
              "-f7a0-479b-bc8c-ab68ceede6bc\",\r\n      \"Description\": \"Female\"\r\n    },\r" +
              "\n    \"RuleAttributes\": []\r\n  },\r\n  \"Address\": {\r\n    \"AddressLine1\"" +
              ": null,\r\n    \"AddressLine2\": null,\r\n    \"City\": null,\r\n    \"PostalCod" +
              "e\": null,\r\n    \"StateProvince\": {\r\n      \"Id\": null,\r\n      \"Categor" +
              "y\": null,\r\n      \"ParentId\": null,\r\n      \"Abbreviation\": null,\r\n    " +
              "  \"Name\": null,\r\n      \"Description\": null,\r\n      \"SortOrder\": null," +
              "\r\n      \"Inactive\": false,\r\n      \"UniqueAttribute\": null,\r\n      \"Ru" +
              "leAttributes\": []\r\n    },\r\n    \"Country\": null,\r\n    \"FullAddress\": " +
              "\"\",\r\n    \"County\": {\r\n      \"Id\": null,\r\n      \"Name\": null\r\n   " +
              " }\r\n  },\r\n  \"HomePhone\": null,\r\n  \"CellPhone\": null,\r\n  \"Email\": n" +
              "ull,\r\n  \"MedicaidNumber\": null,\r\n  \"SupportCoordinatorCaseManager\": \"CM" +
              "  Provider\",\r\n  \"CsbBhaAdmissionDate\": \"2017-03-20T04:00:00Z\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "ContactInformation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"ContactInformation_CsbBhaAdmissionDate\":{\"FromValue\":\"\",\"DisplayField\"" +
              ":\"CSB/BHA Admission Date\",\"ToValue\":\"03/20/2017\"},\"SectionDisplayName\":" +
              "\"Contact Information\"}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490016565632)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490016565694)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490016565694)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/b0402da3-7f4c-4970-bdbc-e05c176e20a2",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"IndividualHasTheFollowing\": [\r\n    {\r\n      \"Id\": \"lookupitems/" +
              "ispindividualhasthefollowings/9a154801-2813-424a-bbe1-ea27a30faba4\",\r\n      " +
              "\"UniqueAttribute\": {\r\n        \"Guid\": \"9a154801-2813-424a-bbe1-ea27a30fab" +
              "a4\",\r\n        \"Description\": \"Authorized Representative\"\r\n      }\r\n  " +
              "  }\r\n  ],\r\n  \"IndividualHasPowerOfAttorney\": false,\r\n  \"SubstituteDecis" +
              "ionMaker\": {\r\n    \"Value\": false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"A" +
              "uthorizedRepresentative\": [\r\n    {\r\n      \"Id\": \"lookupitems/ispauthoriz" +
              "edrepresentatives/37ce4853-4317-4043-b4a5-6d1a81fc3cc3\",\r\n      \"UniqueAttri" +
              "bute\": {\r\n        \"Guid\": \"37ce4853-4317-4043-b4a5-6d1a81fc3cc3\",\r\n    " +
              "    \"Description\": \"Service Planning\"\r\n      }\r\n    }\r\n  ]\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "Representation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"Representation_IndividualHasTheFollowing\":{\"FromValue\":\"\",\"DisplayField" +
              "\":\"Individual has the following\",\"ToValue\":\"Authorized Representative\"}," +
              "\"SectionDisplayName\":\"Representation\",\"Representation_IndividualHasPowerOfA" +
              "ttorney\":{\"DisplayField\":\"Individual has a power of attorney\",\"ToValue\":" +
              "\"no\"},\"Representation_SubstituteDecisionMaker\":{\"DisplayField\":\"Are there" +
              " any concerns with having or needing a substitute-decision maker? \",\"ToValue\"" +
              ":{\"Value\":false,\"Specify\":\"\"}},\"Representation_AuthorizedRepresentative\"" +
              ":{\"FromValue\":\"\",\"DisplayField\":\"Decisions that the representative is aut" +
              "horized to make (check all that apply)\",\"ToValue\":\"Service Planning\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490016578991)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490016579038)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490016579038)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/a711146a-9f5b-4820-8a97-70348a190f4b",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "[\r\n  {\r\n    \"FirstName\": \"tesygj\",\r\n    \"LastName\": \"jj\",\r\n    " +
              "\"MiddleName\": null,\r\n    \"Phone\": \"6657890765\",\r\n    \"Fax\": null,\r" +
              "\n    \"Email\": null,\r\n    \"ContactType\": {\r\n      \"Id\": \"lookupitems/" +
              "ispcontacttypes/c59d82d3-96c7-4e3b-ba0c-4419162331d3\",\r\n      \"UniqueAttribu" +
              "te\": {\r\n        \"Guid\": \"c59d82d3-96c7-4e3b-ba0c-4419162331d3\",\r\n      " +
              "  \"Description\": \"Friend\"\r\n      }\r\n    },\r\n    \"ContactTypeOtherSpec" +
              "ify\": null,\r\n    \"Address\": null,\r\n    \"EmergencyContactRelationship\": " +
              "[\r\n      {\r\n        \"Id\": \"lookupitems/ispemergencycontactrelationships/c" +
              "c68e4d9-43ee-4ede-a93d-93c22685b749\",\r\n        \"UniqueAttribute\": {\r\n    " +
              "      \"Guid\": \"cc68e4d9-43ee-4ede-a93d-93c22685b749\",\r\n          \"Descrip" +
              "tion\": \"Conservator\"\r\n        }\r\n      }\r\n    ],\r\n    \"EmergencyCont" +
              "actRelationshipOtherSpecify\": null\r\n  }\r\n]",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "EmergencyContacts",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"EmergencyContacts\":{\"FromValue\":[],\"DisplayField\":\"Emergency Contacts\"" +
              ",\"ToValue\":[{\"First Name:\":\"tesygj\",\"Last Name:\":\"jj\",\"Middle Name:\"" +
              ":null,\"Phone:\":\"6657890765\",\"Fax:\":null,\"Email:\":null,\"Contact Type\":" +
              "\"Friend\",\"Please specify contact type\":null,\"Address\":\"\",\"Relationship:" +
              "\":\"Conservator\",\"Please specify relationship\":null}]},\"SectionDisplayName" +
              "\":\"Emergency Contacts\"}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490019965592)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490019965670)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490019965670)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/53ff07e9-23fa-480c-a202-7ab952069b94",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "[\r\n  {\r\n    \"FirstName\": \"test\",\r\n    \"LastName\": \"jgjg\",\r\n    " +
              "\"Phone\": \"7865432190\",\r\n    \"Fax\": null,\r\n    \"Email\": null,\r\n    " +
              "\"Address\": null,\r\n    \"Specialty\": {\r\n      \"Id\": \"lookupitems/ispspe" +
              "cialtys/284fb9fe-48d9-4026-8bb0-47094c4e9ff2\",\r\n      \"UniqueAttribute\": {" +
              "\r\n        \"Description\": \"Psychiatrist\",\r\n        \"Guid\": \"284fb9fe-4" +
              "8d9-4026-8bb0-47094c4e9ff2\"\r\n      }\r\n    },\r\n    \"SpecialtyOtherSpecify" +
              "\": null\r\n  }\r\n]",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "HealthcareContacts",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"HealthcareContacts\":{\"DisplayField\":\"Healthcare Contacts\",\"ToValue\":[{" +
              "\"First Name:\":\"test\",\"Last Name:\":\"jgjg\",\"Phone:\":\"7865432190\",\"Fax" +
              ":\":null,\"Email:\":null,\"Address:\":null,\"Specialty:\":\"Psychiatrist\",\"Ple" +
              "ase specify specialty:\":null}]},\"SectionDisplayName\":\"Healthcare Contacts\"}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490019985358)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490019985405)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490019985405)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/7180cfd1-72c1-44ea-a9f3-666568393c22",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"HaveNaturalSupports\": false,\r\n  \"FriendsAndCommunityContactsList\":" +
              " [\r\n    {\r\n      \"Name\": \"jm\",\r\n      \"Relationship\": \"hfg\",\r\n  " +
              "    \"PhoneNumber\": \"6543218907\"\r\n    }\r\n  ]\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "FriendsAndCommunityContacts",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"FriendsAndCommunityContacts_HaveNaturalSupports\":{\"DisplayField\":\"Does Sa" +
              "ra have natural supports?\",\"ToValue\":\"no\"},\"SectionDisplayName\":\"Friends" +
              " and Community Contacts\",\"FriendsAndCommunityContacts_FriendsAndCommunityConta" +
              "ctsList\":{\"DisplayField\":\"Friends and Community Contacts\",\"ToValue\":[{\"N" +
              "ame:\":\"jm\",\"Relationship:\":\"hfg\",\"Phone Number:\":\"6543218907\"}]}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020005342)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020005405)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020005405)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/27f082b0-535b-4c32-aeb5-b02c3c602659",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"DateSISCompleted\": null,\r\n  \"Tier\": null,\r\n  \"SupportLevel\": n" +
              "ull,\r\n  \"DiagnosisDD\": false,\r\n  \"ExaminerName\": \"test\",\r\n  \"SSADis" +
              "ability\": false\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "Eligibility",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"Eligibility_DiagnosisDD\":{\"DisplayField\":\"Diagnosis of DD:\",\"ToValue\":" +
              "\"no\"},\"SectionDisplayName\":\"Eligibility\",\"Eligibility_ExaminerName\":{\"D" +
              "isplayField\":\"Examiner Name:\",\"ToValue\":\"test\"},\"Eligibility_SSADisabili" +
              "ty\":{\"DisplayField\":\"SSA Disability Determination Completed:\",\"ToValue\":" +
              "\"no\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020021921)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020021999)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020021999)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/18ae32eb-9e87-4a94-b075-49cc31a36126",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"PersonRequiresSupportWithActivitiesOfDailyLiving\": {\r\n    \"Value\":" +
              " false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"PersonHasConsumerDirectedOrAgenc" +
              "yDirectedPersonalService\": false,\r\n  \"PersonExperiencesDifficultyBeingOrient" +
              "edTo\": {\r\n    \"Value\": false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"Perso" +
              "nNeedsSupportForBehavioralConcerns\": {\r\n    \"Value\": false,\r\n    \"Specif" +
              "y\": \"\"\r\n  },\r\n  \"PersonHasLimitedRangeOfMotion\": {\r\n    \"Value\": fa" +
              "lse,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"PersonNeedsAssistanceWithTakingMedi" +
              "cations\": {\r\n    \"Value\": false,\r\n    \"Specify\": \"\"\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "SelfDirectedAndAgencyDirectedPersonalAssistance",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"SelfDirectedAndAgencyDirectedPersonalAssistance_PersonRequiresSupportWithActi" +
              "vitiesOfDailyLiving\":{\"DisplayField\":\"Person requires support with activitie" +
              "s of daily living?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"SectionDi" +
              "splayName\":\"Self-Directed and Agency-Directed Personal Assistance, Respite, an" +
              "d Companion Supports\",\"SelfDirectedAndAgencyDirectedPersonalAssistance_PersonH" +
              "asConsumerDirectedOrAgencyDirectedPersonalService\":{\"DisplayField\":\"Person h" +
              "as consumer-directed or agency-directed Personal Assistance, Respite, or Compani" +
              "on services?\",\"ToValue\":\"no\"},\"SelfDirectedAndAgencyDirectedPersonalAssist" +
              "ance_PersonExperiencesDifficultyBeingOrientedTo\":{\"DisplayField\":\"Person exp" +
              "eriences difficulty being oriented to place, time, location?\",\"ToValue\":{\"Va" +
              "lue\":false,\"Specify\":\"\"}},\"SelfDirectedAndAgencyDirectedPersonalAssistance" +
              "_PersonNeedsSupportForBehavioralConcerns\":{\"DisplayField\":\"Person needs supp" +
              "ort for behavioral concerns?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}}," +
              "\"SelfDirectedAndAgencyDirectedPersonalAssistance_PersonHasLimitedRangeOfMotion" +
              "\":{\"DisplayField\":\"Person has limited range of motion?\",\"ToValue\":{\"Valu" +
              "e\":false,\"Specify\":\"\"}},\"SelfDirectedAndAgencyDirectedPersonalAssistance_P" +
              "ersonNeedsAssistanceWithTakingMedications\":{\"DisplayField\":\"Person needs ass" +
              "istance with taking medications?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"" +
              "}}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020042562)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020042655)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020042655)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/b2db107a-2b7e-4981-bbc0-b38ebe0856f2",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"ActiveMedicalAndBehavioralSupportNeeds\": {\r\n    \"NeedsIdentified\":" +
              " {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    }\r\n  },\r\n  " +
              "\"BehavioralCrisisSupports\": {\r\n    \"BehavioralSupportPlan\": {\r\n      \"V" +
              "alue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"CrisisSupportPlan\"" +
              ": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    }\r\n  },\r\n  " +
              "\"Medications\": {\r\n    \"MedicationsRequired\": false,\r\n    \"Medication\":" +
              " null,\r\n    \"IsThereAnAdvancedDirective\": {\r\n      \"Value\": false,\r\n  " +
              "    \"Specify\": \"\"\r\n    },\r\n    \"ObtainedPsychotropicMedication\": {\r\n" +
              "      \"Id\": \"lookupitems/ispobtainedpsychotropicmedications/3c52e788-a1fd-418" +
              "b-861e-899a94ad8e30\",\r\n      \"UniqueAttribute\": {\r\n        \"Guid\": \"3c" +
              "52e788-a1fd-418b-861e-899a94ad8e30\",\r\n        \"Description\": \"No\"\r\n    " +
              "  }\r\n    }\r\n  },\r\n  \"PhysicalConditions\": {\r\n    \"ChronicConditions\"" +
              ": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"Con" +
              "cernsHistory\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    }" +
              ",\r\n    \"CurrentConditions\": {\r\n      \"Value\": false,\r\n      \"Specify" +
              "\": \"\"\r\n    },\r\n    \"Limitations\": {\r\n      \"Value\": false,\r\n     " +
              " \"Specify\": \"\"\r\n    },\r\n    \"SeriousHospitalizations\": {\r\n      \"Va" +
              "lue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"CommunicableDiseases" +
              "\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"F" +
              "amilyIllnessConditions\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"" +
              "\"\r\n    },\r\n    \"SeriousIllness\": {\r\n      \"Value\": false,\r\n      \"" +
              "Specify\": \"\"\r\n    },\r\n    \"AlcoholUse\": {\r\n      \"Value\": false,\r" +
              "\n      \"Specify\": \"\"\r\n    },\r\n    \"TreatmentHistory\": {\r\n      \"Va" +
              "lue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"PhysicalIssues\": {" +
              "\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"Protoc" +
              "olsOrRequirements\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n" +
              "    },\r\n    \"DietNeeds\": {\r\n      \"Value\": false,\r\n      \"Specify\": " +
              "\"\"\r\n    }\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "HealthInformation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"HealthInformation_ActiveMedicalAndBehavioralSupportNeeds_NeedsIdentified\":{" +
              "\"DisplayField\":\"Active health or behavioral support needs identified on the A" +
              "nnual Support Needs Risk Assessment or elsewhere? \",\"ToValue\":{\"Value\":fals" +
              "e,\"Specify\":\"\"}},\"SectionDisplayName\":\"Health Information\",\"HealthInfor" +
              "mation_BehavioralCrisisSupports_BehavioralSupportPlan\":{\"DisplayField\":\"Is t" +
              "here a behavioral supports plan?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"" +
              "}},\"HealthInformation_BehavioralCrisisSupports_CrisisSupportPlan\":{\"DisplayFi" +
              "eld\":\"Is there a crisis supports plan?\",\"ToValue\":{\"Value\":false,\"Specif" +
              "y\":\"\"}},\"HealthInformation_Medications_MedicationsRequired\":{\"DisplayField" +
              "\":\"Medications Required?\",\"ToValue\":\"no\"},\"HealthInformation_Medications" +
              "_Medication\":{\"DisplayField\":\"Medication\",\"ToValue\":null},\"HealthInforma" +
              "tion_Medications_IsThereAnAdvancedDirective\":{\"DisplayField\":\"Is there an ad" +
              "vanced directive?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"HealthInfo" +
              "rmation_Medications_ObtainedPsychotropicMedication\":{\"FromValue\":\"\",\"Displ" +
              "ayField\":\"Consent obtained for psychotropic medications?\",\"ToValue\":\"No\"}" +
              ",\"HealthInformation_PhysicalConditions_ChronicConditions\":{\"DisplayField\":\"" +
              "Chronic health conditions? \",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"" +
              "HealthInformation_PhysicalConditions_ConcernsHistory\":{\"DisplayField\":\"Histo" +
              "ry of health concerns? \",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"Heal" +
              "thInformation_PhysicalConditions_CurrentConditions\":{\"DisplayField\":\"Current" +
              " health conditions?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"HealthIn" +
              "formation_PhysicalConditions_Limitations\":{\"DisplayField\":\"Current health-re" +
              "lated limitations or restrictions?\",\"ToValue\":{\"Value\":false,\"Specify\":\"" +
              "\"}},\"HealthInformation_PhysicalConditions_SeriousHospitalizations\":{\"Display" +
              "Field\":\"Serious hospitalizations in past year?\",\"ToValue\":{\"Value\":false," +
              "\"Specify\":\"\"}},\"HealthInformation_PhysicalConditions_CommunicableDiseases\"" +
              ":{\"DisplayField\":\"Communicable diseases?\",\"ToValue\":{\"Value\":false,\"Spe" +
              "cify\":\"\"}},\"HealthInformation_PhysicalConditions_FamilyIllnessConditions\":{" +
              "\"DisplayField\":\"Serious illness or conditions among family?\",\"ToValue\":{\"" +
              "Value\":false,\"Specify\":\"\"}},\"HealthInformation_PhysicalConditions_SeriousI" +
              "llness\":{\"DisplayField\":\"Serious illness or conditions among housemates\",\"" +
              "ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"HealthInformation_PhysicalCondit" +
              "ions_AlcoholUse\":{\"DisplayField\":\"Any alcohol use?\",\"ToValue\":{\"Value\":" +
              "false,\"Specify\":\"\"}},\"HealthInformation_PhysicalConditions_TreatmentHistory" +
              "\":{\"DisplayField\":\"History of treatment related to alcohol/drugs/medication " +
              "use?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"HealthInformation_Physi" +
              "calConditions_PhysicalIssues\":{\"DisplayField\":\"Issues with physical intimacy" +
              ", pregnancy, or child rearing?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}}" +
              ",\"HealthInformation_PhysicalConditions_ProtocolsOrRequirements\":{\"DisplayFiel" +
              "d\":\"Restrictive protocols or monitoring requirements?\",\"ToValue\":{\"Value\"" +
              ":false,\"Specify\":\"\"}},\"HealthInformation_PhysicalConditions_DietNeeds\":{\"" +
              "DisplayField\":\"Special diet or nutritional needs?\",\"ToValue\":{\"Value\":fal" +
              "se,\"Specify\":\"\"}}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020135077)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020139656)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020139656)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/ce6cfb2e-595e-4dd9-8c20-2d50ee5b93fe",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"ActiveMedicalAndBehavioralSupportNeeds\": {\r\n    \"NeedsIdentified\":" +
              " {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    }\r\n  },\r\n  " +
              "\"BehavioralCrisisSupports\": {\r\n    \"BehavioralSupportPlan\": {\r\n      \"V" +
              "alue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"CrisisSupportPlan\"" +
              ": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    }\r\n  },\r\n  " +
              "\"Medications\": {\r\n    \"MedicationsRequired\": false,\r\n    \"Medication\":" +
              " null,\r\n    \"IsThereAnAdvancedDirective\": {\r\n      \"Value\": false,\r\n  " +
              "    \"Specify\": \"\"\r\n    },\r\n    \"ObtainedPsychotropicMedication\": {\r\n" +
              "      \"Id\": \"lookupitems/ispobtainedpsychotropicmedications/3c52e788-a1fd-418" +
              "b-861e-899a94ad8e30\",\r\n      \"UniqueAttribute\": {\r\n        \"Guid\": \"3c" +
              "52e788-a1fd-418b-861e-899a94ad8e30\",\r\n        \"Description\": \"No\"\r\n    " +
              "  }\r\n    }\r\n  },\r\n  \"PhysicalConditions\": {\r\n    \"ChronicConditions\"" +
              ": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"Con" +
              "cernsHistory\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    }" +
              ",\r\n    \"CurrentConditions\": {\r\n      \"Value\": false,\r\n      \"Specify" +
              "\": \"\"\r\n    },\r\n    \"Limitations\": {\r\n      \"Value\": false,\r\n     " +
              " \"Specify\": \"\"\r\n    },\r\n    \"SeriousHospitalizations\": {\r\n      \"Va" +
              "lue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"CommunicableDiseases" +
              "\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"F" +
              "amilyIllnessConditions\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"" +
              "\"\r\n    },\r\n    \"SeriousIllness\": {\r\n      \"Value\": false,\r\n      \"" +
              "Specify\": \"\"\r\n    },\r\n    \"AlcoholUse\": {\r\n      \"Value\": false,\r" +
              "\n      \"Specify\": \"\"\r\n    },\r\n    \"TreatmentHistory\": {\r\n      \"Va" +
              "lue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"PhysicalIssues\": {" +
              "\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"Protoc" +
              "olsOrRequirements\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n" +
              "    },\r\n    \"DietNeeds\": {\r\n      \"Value\": false,\r\n      \"Specify\": " +
              "\"\"\r\n    }\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "HealthInformation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "null",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020158234)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020158265)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020158265)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/2e022097-df84-4f46-bba2-8796de769994",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"FamilyHistoryDescribe\": \"teshvbj\",\r\n  \"TraumaHistory\": {\r\n    " +
              "\"Value\": false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"LivingArrangementsSumm" +
              "ary\": \"nvbn\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "SocialDevelopmentalBehavioralFamilyHistory",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"SocialDevelopmentalBehavioralFamilyHistory_FamilyHistoryDescribe\":{\"Display" +
              "Field\":\"Describe my relevant social, developmental, behavioral, and family his" +
              "tory:\",\"ToValue\":\"teshvbj\"},\"SectionDisplayName\":\"Social Developmental B" +
              "ehavioral Family History\",\"SocialDevelopmentalBehavioralFamilyHistory_TraumaHi" +
              "story\":{\"DisplayField\":\"History of abuse, neglect, sexual or domestic violen" +
              "ce, or trauma including psychological trauma?\",\"ToValue\":{\"Value\":false,\"S" +
              "pecify\":\"\"}},\"SocialDevelopmentalBehavioralFamilyHistory_LivingArrangementsS" +
              "ummary\":{\"DisplayField\":\"Provide a summary of my current and past living arr" +
              "angements:\",\"ToValue\":\"nvbn\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020177812)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020177890)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020177890)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/b24ea529-6d65-420f-87ea-416c417f230d",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"CommunicationSupport\": \"jjg\",\r\n  \"EquipmentSupport\": \"gf\",\r\n" +
              "  \"Maintained\": \"ghfh\",\r\n  \"BackupPlan\": \"hfh\",\r\n  \"EnvironmentalMo" +
              "difications\": \"hgfh\",\r\n  \"ProfessionalEvaluation\": {\r\n    \"Value\": fa" +
              "lse,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"LegalIssues\": {\r\n    \"Value\": " +
              "false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"LegalAdviceNeeded\": {\r\n    \"V" +
              "alue\": false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"ServiceSupport\": {\r\n  " +
              "  \"Value\": false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"VotingSupport\": {\r" +
              "\n    \"Value\": false,\r\n    \"Specify\": \"\"\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "CommunicationAssistiveTechnologyAndModifications",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"CommunicationAssistiveTechnologyAndModifications_CommunicationSupport\":{\"Di" +
              "splayField\":\"Describe supports needed for communication:\",\"ToValue\":\"jjg\"" +
              "},\"SectionDisplayName\":\"Communication, Assistive Technology, and Modification" +
              "s\",\"CommunicationAssistiveTechnologyAndModifications_EquipmentSupport\":{\"Dis" +
              "playField\":\"Describe any adaptive equipment or assistive technology supports u" +
              "sed:\",\"ToValue\":\"gf\"},\"CommunicationAssistiveTechnologyAndModifications_Ma" +
              "intained\":{\"DisplayField\":\"Describe how is equipment maintained and who is r" +
              "esponsible:\",\"ToValue\":\"ghfh\"},\"CommunicationAssistiveTechnologyAndModific" +
              "ations_BackupPlan\":{\"DisplayField\":\"Describe the back-up plan for power outa" +
              "ges if equipment is used:\",\"ToValue\":\"hfh\"},\"CommunicationAssistiveTechnol" +
              "ogyAndModifications_EnvironmentalModifications\":{\"DisplayField\":\"Describe an" +
              "y environmental modifications used:\",\"ToValue\":\"hgfh\"},\"CommunicationAssis" +
              "tiveTechnologyAndModifications_ProfessionalEvaluation\":{\"DisplayField\":\"Woul" +
              "d a professional evaluation related to adaptive equipment, assistive technology " +
              "or other modifications be beneficial?\",\"ToValue\":{\"Value\":false,\"Specify\"" +
              ":\"\"}},\"CommunicationAssistiveTechnologyAndModifications_LegalIssues\":{\"Disp" +
              "layField\":\"Any current legal issues or problems?\",\"ToValue\":{\"Value\":fals" +
              "e,\"Specify\":\"\"}},\"CommunicationAssistiveTechnologyAndModifications_LegalAdv" +
              "iceNeeded\":{\"DisplayField\":\"Any legal advice needed?\",\"ToValue\":{\"Value" +
              "\":false,\"Specify\":\"\"}},\"CommunicationAssistiveTechnologyAndModifications_S" +
              "erviceSupport\":{\"DisplayField\":\"Any concerns with accessing needed services " +
              "or supports?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}},\"CommunicationAs" +
              "sistiveTechnologyAndModifications_VotingSupport\":{\"DisplayField\":\"Any suppor" +
              "t needed with voting?\",\"ToValue\":{\"Value\":false,\"Specify\":\"\"}}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020200937)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020200984)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020200984)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/cdcdc279-92ca-4cfe-b328-57de0e07a053",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"HighestEducationLevel\": {\r\n    \"Id\": \"lookupitems/isphighesteduca" +
              "tionlevels/aed3cc82-8b73-4819-97ac-d1c19d72e10c\",\r\n    \"UniqueAttribute\": {" +
              "\r\n      \"Guid\": \"aed3cc82-8b73-4819-97ac-d1c19d72e10c\",\r\n      \"Descrip" +
              "tion\": \"High School\"\r\n    }\r\n  },\r\n  \"EducationalHistory\": \"hvghv\"" +
              "\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "Education",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"Education_HighestEducationLevel\":{\"FromValue\":\"\",\"DisplayField\":\"High" +
              "est level of education completed:\",\"ToValue\":\"High School\"},\"SectionDispla" +
              "yName\":\"Education\",\"Education_EducationalHistory\":{\"DisplayField\":\"Descr" +
              "ibe my educational history:\",\"ToValue\":\"hvghv\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020214219)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020214281)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020214281)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/744e3948-839c-483d-bdf6-3fb084efae29",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"EmploymentSubSection\": {\r\n    \"Employed\": false,\r\n    \"WorkDesi" +
              "re\": false,\r\n    \"NotInterestedInWorkReason\": false,\r\n    \"EmploymentBar" +
              "riers\": [\r\n      {\r\n        \"Id\": \"lookupitems/ispemploymentbarrierss/01" +
              "56bb75-a3db-47f5-8ace-cd616f6ab5c9\",\r\n        \"UniqueAttribute\": {\r\n     " +
              "     \"Guid\": \"0156bb75-a3db-47f5-8ace-cd616f6ab5c9\",\r\n          \"Descript" +
              "ion\": \"Transportation\"\r\n        }\r\n      }\r\n    ],\r\n    \"EmploymentS" +
              "upportsNecessary\": \"kjhkjh\"\r\n  },\r\n  \"AlternatesToWork\": {\r\n    \"Vol" +
              "unteered\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r" +
              "\n    \"CurrentVolunteer\": {\r\n      \"Value\": false,\r\n      \"Specify\": " +
              "\"\"\r\n    },\r\n    \"InvolvedInCommunityEngagementActivities \": false,\r\n  " +
              "  \"CommunityEngagementDesire\": false,\r\n    \"CommunityEngagementBarriers\": " +
              "[\r\n      {\r\n        \"Id\": \"lookupitems/ispcommunityengagementbarrierss/8d" +
              "0acf16-8d05-4475-8477-4d21228bd914\",\r\n        \"UniqueAttribute\": {\r\n     " +
              "     \"Guid\": \"8d0acf16-8d05-4475-8477-4d21228bd914\",\r\n          \"Descript" +
              "ion\": \"Lack of awareness\"\r\n        }\r\n      }\r\n    ],\r\n    \"Communit" +
              "yEngagementSupportsNecessary\": \"mnmn\"\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "Employment",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"Employment_EmploymentSubSection_Employed\":{\"DisplayField\":\"Has Sara ever " +
              "been employed?\",\"ToValue\":\"no\"},\"SectionDisplayName\":\"Employment\",\"Emp" +
              "loyment_EmploymentSubSection_WorkDesire\":{\"DisplayField\":\"Following a conver" +
              "sation about employment, does the person indicate a desire to work?\",\"ToValue" +
              "\":\"no\"},\"Employment_EmploymentSubSection_NotInterestedInWorkReason\":{\"Disp" +
              "layField\":\"Individual is not interested in work due to childhood or retirement" +
              " age?\",\"ToValue\":\"no\"},\"Employment_EmploymentSubSection_EmploymentBarriers" +
              "\":{\"FromValue\":\"\",\"DisplayField\":\"Indicate all of the current barriers t" +
              "o employment:\",\"ToValue\":\"Transportation\"},\"Employment_EmploymentSubSectio" +
              "n_EmploymentSupportsNecessary\":{\"DisplayField\":\"Describe the supports necess" +
              "ary to address barriers and achieve employment. If the person does not indicate " +
              "a desire to work, describe how the person has been or will be educated about emp" +
              "loyment, including but not limited to exploring employment opportunities availab" +
              "le in their community:\",\"ToValue\":\"kjhkjh\"},\"Employment_AlternatesToWork_V" +
              "olunteered\":{\"DisplayField\":\"Has Sara ever volunteered?\",\"ToValue\":{\"Val" +
              "ue\":false,\"Specify\":\"\"}},\"Employment_AlternatesToWork_CurrentVolunteer\":{" +
              "\"DisplayField\":\"Does Sara currently volunteer?\",\"ToValue\":{\"Value\":false" +
              ",\"Specify\":\"\"}},\"Employment_AlternatesToWork_InvolvedInCommunityEngagementA" +
              "ctivities \":{\"DisplayField\":\"Is Sara involved in activities of community eng" +
              "agement?\",\"ToValue\":\"no\"},\"Employment_AlternatesToWork_CommunityEngagement" +
              "Desire\":{\"DisplayField\":\"Following a conversation about community engagement" +
              "/coaching does the person indicate a desire to be engaged in the community?\",\"" +
              "ToValue\":\"no\"},\"Employment_AlternatesToWork_CommunityEngagementBarriers\":{" +
              "\"FromValue\":\"\",\"DisplayField\":\"Indicate all of the current barriers to CE" +
              "/CC:\",\"ToValue\":\"Lack of awareness\"},\"Employment_AlternatesToWork_Communit" +
              "yEngagementSupportsNecessary\":{\"DisplayField\":\"Describe the supports necessa" +
              "ry to address barriers and achieve community engagement. If the person does not " +
              "indicate a desire to engage with the community, describe how the person has been" +
              " or will be educated about community engagement including but not limited to exp" +
              "loring opportunities available in their community:\",\"ToValue\":\"mnmn\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020244797)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020244859)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020244859)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/d4b266ce-0397-4bc2-89f1-c393d3f94658",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"Volunteered\": false,\r\n  \"VolunteerHistory\": null\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "VolunteerParticipation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"VolunteerParticipation_Volunteered\":{\"DisplayField\":\"Has Sara ever volunt" +
              "eered?\",\"ToValue\":\"no\"},\"SectionDisplayName\":\"Volunteer Participation\"," +
              "\"VolunteerParticipation_VolunteerHistory\":{\"DisplayField\":\"Volunteer Partic" +
              "ipation History\",\"ToValue\":null}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020255080)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020255127)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020255127)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/57b49e0f-d483-40b7-a0ac-308d9e6b70ac",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"ProviderUnShowupSteps\": \"jjg\",\r\n  \"ActivityCanceledSteps\": \"hjg" +
              "\",\r\n  \"NaturalDisaster\": \"jgkh\",\r\n  \"FuturePlan\": \"lk;lk\",\r\n  \"I" +
              "nclusiveSupport\": \"mbnmj\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "EmergencyPlans",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"EmergencyPlans_ProviderUnShowupSteps\":{\"DisplayField\":\"Describe steps to " +
              "take if a provider doesn’t show-up:\",\"ToValue\":\"jjg\"},\"SectionDisplayName" +
              "\":\"Back-up and Emergency Plans\",\"EmergencyPlans_ActivityCanceledSteps\":{\"D" +
              "isplayField\":\"Describe steps to take if the day program/work or other activity" +
              " is canceled, closes, or you have to leave or some other reason:\",\"ToValue\":" +
              "\"hjg\"},\"EmergencyPlans_NaturalDisaster\":{\"DisplayField\":\"Describe steps t" +
              "o take when a natural disaster occurs:\",\"ToValue\":\"jgkh\"},\"EmergencyPlans_" +
              "FuturePlan\":{\"DisplayField\":\"Describe plan for future living arrangements:\"" +
              ",\"ToValue\":\"lk;lk\"},\"EmergencyPlans_InclusiveSupport\":{\"DisplayField\":\"" +
              "Describe supports needed to transition to more inclusive settings:\",\"ToValue\"" +
              ":\"mbnmj\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020281370)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020281449)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020281449)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/85ab0cfc-0b45-488e-801a-240c4428d304",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"CurrentLivingSituation\": {\r\n    \"Id\": \"lookupitems/livingsituatio" +
              "nonwaivertypes/b243734d-2870-453b-a15f-b4223aa483f4\",\r\n    \"Category\": \"li" +
              "vingsituationonwaivertypes\",\r\n    \"ParentId\": null,\r\n    \"Abbreviation\"" +
              ": \"Supported Living/apartment\",\r\n    \"Name\": \"Supported Living/apartment" +
              "\",\r\n    \"Description\": \"Supported Living/apartment\",\r\n    \"SortOrder\"" +
              ": 107,\r\n    \"Inactive\": false,\r\n    \"UniqueAttribute\": {\r\n      \"Guid" +
              "\": \"b243734d-2870-453b-a15f-b4223aa483f4\",\r\n      \"Description\": \"Suppor" +
              "ted Living/apartment\"\r\n    },\r\n    \"RuleAttributes\": []\r\n  },\r\n  \"Pr" +
              "imaryEmployment\": [\r\n    {\r\n      \"Id\": \"lookupitems/ispprimaryemploymen" +
              "ts/15596fce-00e1-45d6-9789-dd20f4c8ca94\",\r\n      \"UniqueAttribute\": {\r\n  " +
              "      \"Description\": \"Community Engagement\",\r\n        \"Guid\": \"15596fce" +
              "-00e1-45d6-9789-dd20f4c8ca94\"\r\n      }\r\n    }\r\n  ],\r\n  \"HousingChoice" +
              "\": [\r\n    {\r\n      \"Id\": \"lookupitems/isphousingchoices/8e3db20f-6809-48" +
              "6a-908c-8a1501fd1fc4\",\r\n      \"UniqueAttribute\": {\r\n        \"Description" +
              "\": \"Housing Choice Vouchers\",\r\n        \"Guid\": \"8e3db20f-6809-486a-908c-" +
              "8a1501fd1fc4\"\r\n      }\r\n    }\r\n  ],\r\n  \"IntegratedWaiver\": [\r\n    {" +
              "\r\n      \"Id\": \"lookupitems/ispintegratedwaivers/ac1f885b-91da-4f46-8526-988" +
              "a1da29baf\",\r\n      \"UniqueAttribute\": {\r\n        \"Description\": \"In-ho" +
              "me Support Services\",\r\n        \"Guid\": \"ac1f885b-91da-4f46-8526-988a1da29b" +
              "af\"\r\n      }\r\n    }\r\n  ],\r\n  \"ResourcesNeededForMoreIntegratedOption\"" +
              ": {\r\n    \"Value\": false,\r\n    \"Specify\": \"\"\r\n  },\r\n  \"NeededAvail" +
              "able\": false\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "ReviewOfMostIntegratedSettings",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"ReviewOfMostIntegratedSettings_PrimaryEmployment\":{\"FromValue\":\"\",\"Disp" +
              "layField\":\"Current primary employment or day setting\",\"ToValue\":\"Community" +
              " Engagement\"},\"SectionDisplayName\":\"Review of Most Integrated Settings\",\"R" +
              "eviewOfMostIntegratedSettings_HousingChoice\":{\"FromValue\":\"\",\"DisplayField" +
              "\":\"Has the individual and/or substitute decision maker identified an interest " +
              "in pursuing one or more of these integrated housing options?\",\"ToValue\":\"Hou" +
              "sing Choice Vouchers\"},\"ReviewOfMostIntegratedSettings_IntegratedWaiver\":{\"F" +
              "romValue\":\"\",\"DisplayField\":\"Has the individual and/or substitute decision" +
              " maker identified an interest in pursuing one or more of these integrated waiver" +
              " service options?\",\"ToValue\":\"In-home Support Services\"},\"ReviewOfMostInte" +
              "gratedSettings_ResourcesNeededForMoreIntegratedOption\":{\"DisplayField\":\"Are " +
              "any resources needed to obtain more integrated options? \",\"ToValue\":{\"Value" +
              "\":false,\"Specify\":\"\"}},\"ReviewOfMostIntegratedSettings_NeededAvailable\":{" +
              "\"DisplayField\":\"Are supports or services needed that are not available?\",\"T" +
              "oValue\":\"no\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020327651)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020327729)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020327729)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/b158d194-4baa-4826-a060-7d2ce94643b1",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangePersonalProfile",
      "DomainMethodDisplayName": "Change Personal Profile",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"PlanningProcess\": \"jghjg\",\r\n  \"AnnualPlanning\": \"hjgfjhf\",\r\n" +
              "  \"DateTimeLocationForMeeting\": \"ujhgjh\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "Meeting",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"Meeting_PlanningProcess\":{\"DisplayField\":\"How I am best supported to dire" +
              "ct my planning process:\",\"ToValue\":\"jghjg\"},\"SectionDisplayName\":\"Sara’s" +
              " Meeting\",\"Meeting_AnnualPlanning\":{\"DisplayField\":\"My preferences for ann" +
              "ual planning:\",\"ToValue\":\"hjgfjhf\"},\"Meeting_DateTimeLocationForMeeting\":" +
              "{\"DisplayField\":\"My preferred date, time, and location for my meeting:\",\"To" +
              "Value\":\"ujhgjh\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020341229)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020341338)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020341338)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/d28c58fd-42c2-4be6-a6b8-c9121df1bf3b",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangePersonalProfile",
      "DomainMethodDisplayName": "Change Personal Profile",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "[\r\n  {\r\n    \"GreatThings\": \"hvbjh\"\r\n  }\r\n]",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "TalentsContributions",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"TalentsContributions\":{\"DisplayField\":\"Sara’s Talents \u0026 Contribution" +
              "s\",\"ToValue\":[{\"List great things about Sara\":\"hvbjh\"}]},\"SectionDisplay" +
              "Name\":\"Sara’s Talents \u0026 Contributions\"}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020360979)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020361026)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020361026)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/7392eb4d-a270-4c73-8636-db76623ed4d5",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangePersonalProfile",
      "DomainMethodDisplayName": "Change Personal Profile",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"GreatThings\": \"bmn,mn\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "LifeToday",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"LifeToday_GreatThings\":{\"DisplayField\":\"Briefly describe how Sara current" +
              "ly lives \",\"ToValue\":\"bmn,mn\"},\"SectionDisplayName\":\"Sara’s Life Today\"" +
              "}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020370120)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020370166)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020370166)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/c674cb8a-e53e-4f2a-bb84-3a8bf6b4dc6c",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangePersonalProfile",
      "DomainMethodDisplayName": "Change Personal Profile",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"DescribeLifeVision\": \"mnmnm\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "LifeWants",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"LifeWants_DescribeLifeVision\":{\"DisplayField\":\"Describe Sara’s vision of " +
              "the life he or she wants\",\"ToValue\":\"mnmnm\"},\"SectionDisplayName\":\"The L" +
              "ife Sara Wants\"}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020380463)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020380541)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020380541)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/50a345c4-e63d-4632-b825-d531f1a1336a",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangePersonalProfile",
      "DomainMethodDisplayName": "Change Personal Profile",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"WorkAlternates\": {\r\n    \"WorkingNow\": \"nbnvb\",\r\n    \"NotWorki" +
              "ng\": \"gdgd\",\r\n    \"ImportantTo\": \"hfh\",\r\n    \"OthersNeedToKnow\": \"" +
              "yfhf\"\r\n  },\r\n  \"LearningOtherPursuits\": {\r\n    \"WorkingNow\": \"hgvj\"" +
              ",\r\n    \"NotWorking\": \"jkhnj\",\r\n    \"ImportantTo\": \"knkn\",\r\n    \"O" +
              "thersNeedToKnow\": \"mnmn\"\r\n  },\r\n  \"CommunityInterests\": {\r\n    \"Work" +
              "ingNow\": \"mknm\",\r\n    \"NotWorking\": \"mn bmn \",\r\n    \"ImportantTo\": " +
              "\"mnjmn\",\r\n    \"OthersNeedToKnow\": \"mknkmn\"\r\n  },\r\n  \"Relationships" +
              "\": {\r\n    \"WorkingNow\": \"mn,\",\r\n    \"NotWorking\": \"khjkhn\",\r\n    " +
              "\"ImportantTo\": \"mnm\",\r\n    \"OthersNeedToKnow\": \"nkmnkn\"\r\n  },\r\n  " +
              "\"Home\": {\r\n    \"WorkingNow\": \"bjnjhj\",\r\n    \"NotWorking\": \"kjkjk\"," +
              "\r\n    \"ImportantTo\": \"jhj\",\r\n    \"OthersNeedToKnow\": \"jnjb\"\r\n  }," +
              "\r\n  \"TransportationTravel\": {\r\n    \"WorkingNow\": \"jnjmn\",\r\n    \"Not" +
              "Working\": \"khkh\",\r\n    \"ImportantTo\": \"kjk\",\r\n    \"OthersNeedToKnow" +
              "\": \"kmnkmn\"\r\n  },\r\n  \"Money\": {\r\n    \"WorkingNow\": \"kjjjjjjjjjjjjj" +
              "\",\r\n    \"NotWorking\": \"mn,mn\",\r\n    \"ImportantTo\": \"lklkl\",\r\n    " +
              "\"OthersNeedToKnow\": \"kknj\"\r\n  },\r\n  \"HealthSafety\": {\r\n    \"Working" +
              "Now\": \"kjkj\",\r\n    \"NotWorking\": \"kjkj\",\r\n    \"ImportantTo\": \"kjkj" +
              "\",\r\n    \"OthersNeedToKnow\": \"kjkj\"\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "GetLifeWants",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"GetLifeWants_WorkAlternates_WorkingNow\":{\"DisplayField\":\"What’s Working N" +
              "ow\",\"ToValue\":\"nbnvb\"},\"SectionDisplayName\":\"Getting the Life Sara Wants" +
              "\",\"GetLifeWants_WorkAlternates_NotWorking\":{\"DisplayField\":\"What’s Not Wor" +
              "king\",\"ToValue\":\"gdgd\"},\"GetLifeWants_WorkAlternates_ImportantTo\":{\"Disp" +
              "layField\":\"Important TO Sara\",\"ToValue\":\"hfh\"},\"GetLifeWants_WorkAlterna" +
              "tes_OthersNeedToKnow\":{\"DisplayField\":\"What others need to know and do to su" +
              "pport Sara (includes important FOR)\",\"ToValue\":\"yfhf\"},\"GetLifeWants_Learn" +
              "ingOtherPursuits_WorkingNow\":{\"DisplayField\":\"What’s Working Now\",\"ToValue" +
              "\":\"hgvj\"},\"GetLifeWants_LearningOtherPursuits_NotWorking\":{\"DisplayField\"" +
              ":\"What’s Not Working\",\"ToValue\":\"jkhnj\"},\"GetLifeWants_LearningOtherPursu" +
              "its_ImportantTo\":{\"DisplayField\":\"Important TO Sara\",\"ToValue\":\"knkn\"}," +
              "\"GetLifeWants_LearningOtherPursuits_OthersNeedToKnow\":{\"DisplayField\":\"What" +
              " others need to know and do to support Sara (includes important FOR)\",\"ToValue" +
              "\":\"mnmn\"},\"GetLifeWants_CommunityInterests_WorkingNow\":{\"DisplayField\":\"" +
              "What’s Working Now\",\"ToValue\":\"mknm\"},\"GetLifeWants_CommunityInterests_Not" +
              "Working\":{\"DisplayField\":\"What’s Not Working\",\"ToValue\":\"mn bmn \"},\"Ge" +
              "tLifeWants_CommunityInterests_ImportantTo\":{\"DisplayField\":\"Important TO Sar" +
              "a\",\"ToValue\":\"mnjmn\"},\"GetLifeWants_CommunityInterests_OthersNeedToKnow\":" +
              "{\"DisplayField\":\"What others need to know and do to support Sara (includes im" +
              "portant FOR)\",\"ToValue\":\"mknkmn\"},\"GetLifeWants_Relationships_WorkingNow\"" +
              ":{\"DisplayField\":\"What’s Working Now\",\"ToValue\":\"mn,\"},\"GetLifeWants_Re" +
              "lationships_NotWorking\":{\"DisplayField\":\"What’s Not Working\",\"ToValue\":\"" +
              "khjkhn\"},\"GetLifeWants_Relationships_ImportantTo\":{\"DisplayField\":\"Importa" +
              "nt TO Sara\",\"ToValue\":\"mnm\"},\"GetLifeWants_Relationships_OthersNeedToKnow" +
              "\":{\"DisplayField\":\"What others need to know and do to support Sara (includes" +
              " important FOR)\",\"ToValue\":\"nkmnkn\"},\"GetLifeWants_Home_WorkingNow\":{\"Di" +
              "splayField\":\"What’s Working Now\",\"ToValue\":\"bjnjhj\"},\"GetLifeWants_Home_" +
              "NotWorking\":{\"DisplayField\":\"What’s Not Working\",\"ToValue\":\"kjkjk\"},\"G" +
              "etLifeWants_Home_ImportantTo\":{\"DisplayField\":\"Important TO Sara\",\"ToValue" +
              "\":\"jhj\"},\"GetLifeWants_Home_OthersNeedToKnow\":{\"DisplayField\":\"What othe" +
              "rs need to know and do to support Sara (includes important FOR)\",\"ToValue\":\"" +
              "jnjb\"},\"GetLifeWants_TransportationTravel_WorkingNow\":{\"DisplayField\":\"Wha" +
              "t’s Working Now\",\"ToValue\":\"jnjmn\"},\"GetLifeWants_TransportationTravel_Not" +
              "Working\":{\"DisplayField\":\"What’s Not Working\",\"ToValue\":\"khkh\"},\"GetLi" +
              "feWants_TransportationTravel_ImportantTo\":{\"DisplayField\":\"Important TO Sara" +
              "\",\"ToValue\":\"kjk\"},\"GetLifeWants_TransportationTravel_OthersNeedToKnow\":{" +
              "\"DisplayField\":\"What others need to know and do to support Sara (includes imp" +
              "ortant FOR)\",\"ToValue\":\"kmnkmn\"},\"GetLifeWants_Money_WorkingNow\":{\"Displ" +
              "ayField\":\"What’s Working Now\",\"ToValue\":\"kjjjjjjjjjjjjj\"},\"GetLifeWants_" +
              "Money_NotWorking\":{\"DisplayField\":\"What’s Not Working\",\"ToValue\":\"mn,mn" +
              "\"},\"GetLifeWants_Money_ImportantTo\":{\"DisplayField\":\"Important TO Sara\"," +
              "\"ToValue\":\"lklkl\"},\"GetLifeWants_Money_OthersNeedToKnow\":{\"DisplayField\"" +
              ":\"What others need to know and do to support Sara (includes important FOR)\",\"" +
              "ToValue\":\"kknj\"},\"GetLifeWants_HealthSafety_WorkingNow\":{\"DisplayField\":" +
              "\"What’s Working Now\",\"ToValue\":\"kjkj\"},\"GetLifeWants_HealthSafety_NotWork" +
              "ing\":{\"DisplayField\":\"What’s Not Working\",\"ToValue\":\"kjkj\"},\"GetLifeWa" +
              "nts_HealthSafety_ImportantTo\":{\"DisplayField\":\"Important TO Sara\",\"ToValue" +
              "\":\"kjkj\"},\"GetLifeWants_HealthSafety_OthersNeedToKnow\":{\"DisplayField\":\"" +
              "What others need to know and do to support Sara (includes important FOR)\",\"ToV" +
              "alue\":\"kjkj\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490020465697)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490020465853)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490020465853)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/1f26cad5-ada4-4073-b48f-3e02ab09dd30",
          "FirstName": "DBHDS",
          "LastName": "SuperUser",
          "FullName": "DBHDS SuperUser",
          "FullNameFormal": "SuperUser, DBHDS"
        }
      }
    }, {
      "Id": "domainaudittrails/e063e3e8-22e0-4bcf-85a4-12af67bd6d7e",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"ContactInformation\": {\r\n    \"LastName\": \"Gossman\",\r\n    \"Midd" +
              "leName\": \"\",\r\n    \"FirstName\": \"Sarah\",\r\n    \"PreferredName\": \"Sar" +
              "a\",\r\n    \"SocialSecurityNumber\": \"741025896\",\r\n    \"DateOfBirth\": \"1" +
              "987-12-12T00:00:00-05:00\",\r\n    \"Gender\": {\r\n      \"Id\": \"lookupitems/" +
              "genders/-1\",\r\n      \"Category\": \"genders\",\r\n      \"ParentId\": null,\r" +
              "\n      \"Abbreviation\": \"F\",\r\n      \"Name\": \"Female\",\r\n      \"Descr" +
              "iption\": \"Female\",\r\n      \"SortOrder\": 101,\r\n      \"Inactive\": false," +
              "\r\n      \"UniqueAttribute\": {\r\n        \"Guid\": \"d1705689-f7a0-479b-bc8c-" +
              "ab68ceede6bc\",\r\n        \"Description\": \"Female\"\r\n      },\r\n      \"Ru" +
              "leAttributes\": []\r\n    },\r\n    \"Address\": {\r\n      \"AddressLine1\": nu" +
              "ll,\r\n      \"AddressLine2\": null,\r\n      \"City\": null,\r\n      \"PostalC" +
              "ode\": null,\r\n      \"StateProvince\": {\r\n        \"Id\": null,\r\n        " +
              "\"Category\": null,\r\n        \"ParentId\": null,\r\n        \"Abbreviation\": " +
              "null,\r\n        \"Name\": null,\r\n        \"Description\": null,\r\n        \"" +
              "SortOrder\": null,\r\n        \"Inactive\": false,\r\n        \"UniqueAttribute" +
              "\": null,\r\n        \"RuleAttributes\": []\r\n      },\r\n      \"Country\": nu" +
              "ll,\r\n      \"FullAddress\": \"\",\r\n      \"County\": {\r\n        \"Id\": nu" +
              "ll,\r\n        \"Name\": null\r\n      }\r\n    },\r\n    \"HomePhone\": null,\r" +
              "\n    \"CellPhone\": null,\r\n    \"Email\": null,\r\n    \"MedicaidNumber\": nu" +
              "ll,\r\n    \"SupportCoordinatorCaseManager\": \"CM  Provider\",\r\n    \"CsbBhaA" +
              "dmissionDate\": \"2017-03-20T04:00:00Z\"\r\n  },\r\n  \"Representation\": {\r\n " +
              "   \"IndividualHasTheFollowing\": [\r\n      {\r\n        \"Id\": \"lookupitems/" +
              "ispindividualhasthefollowings/9a154801-2813-424a-bbe1-ea27a30faba4\",\r\n       " +
              " \"UniqueAttribute\": {\r\n          \"Guid\": \"9a154801-2813-424a-bbe1-ea27a30" +
              "faba4\",\r\n          \"Description\": \"Authorized Representative\"\r\n        " +
              "}\r\n      }\r\n    ],\r\n    \"IndividualHasPowerOfAttorney\": false,\r\n    \"" +
              "SubstituteDecisionMaker\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"" +
              "\"\r\n    },\r\n    \"AuthorizedRepresentative\": [\r\n      {\r\n        \"Id\"" +
              ": \"lookupitems/ispauthorizedrepresentatives/37ce4853-4317-4043-b4a5-6d1a81fc3cc" +
              "3\",\r\n        \"UniqueAttribute\": {\r\n          \"Guid\": \"37ce4853-4317-40" +
              "43-b4a5-6d1a81fc3cc3\",\r\n          \"Description\": \"Service Planning\"\r\n  " +
              "      }\r\n      }\r\n    ]\r\n  },\r\n  \"EmergencyContacts\": [\r\n    {\r\n  " +
              "    \"FirstName\": \"tesygj\",\r\n      \"LastName\": \"jj\",\r\n      \"MiddleN" +
              "ame\": null,\r\n      \"Phone\": \"6657890765\",\r\n      \"Fax\": null,\r\n    " +
              "  \"Email\": null,\r\n      \"ContactType\": {\r\n        \"Id\": \"lookupitems/" +
              "ispcontacttypes/c59d82d3-96c7-4e3b-ba0c-4419162331d3\",\r\n        \"UniqueAttri" +
              "bute\": {\r\n          \"Guid\": \"c59d82d3-96c7-4e3b-ba0c-4419162331d3\",\r\n  " +
              "        \"Description\": \"Friend\"\r\n        }\r\n      },\r\n      \"ContactT" +
              "ypeOtherSpecify\": null,\r\n      \"Address\": null,\r\n      \"EmergencyContact" +
              "Relationship\": [\r\n        {\r\n          \"Id\": \"lookupitems/ispemergencyco" +
              "ntactrelationships/cc68e4d9-43ee-4ede-a93d-93c22685b749\",\r\n          \"Unique" +
              "Attribute\": {\r\n            \"Guid\": \"cc68e4d9-43ee-4ede-a93d-93c22685b749\"" +
              ",\r\n            \"Description\": \"Conservator\"\r\n          }\r\n        }\r" +
              "\n      ],\r\n      \"EmergencyContactRelationshipOtherSpecify\": null\r\n    }" +
              "\r\n  ],\r\n  \"HealthcareContacts\": [\r\n    {\r\n      \"FirstName\": \"test" +
              "\",\r\n      \"LastName\": \"jgjg\",\r\n      \"Phone\": \"7865432190\",\r\n    " +
              "  \"Fax\": null,\r\n      \"Email\": null,\r\n      \"Address\": null,\r\n      " +
              "\"Specialty\": {\r\n        \"Id\": \"lookupitems/ispspecialtys/284fb9fe-48d9-40" +
              "26-8bb0-47094c4e9ff2\",\r\n        \"UniqueAttribute\": {\r\n          \"Descrip" +
              "tion\": \"Psychiatrist\",\r\n          \"Guid\": \"284fb9fe-48d9-4026-8bb0-47094" +
              "c4e9ff2\"\r\n        }\r\n      },\r\n      \"SpecialtyOtherSpecify\": null\r\n " +
              "   }\r\n  ],\r\n  \"FriendsAndCommunityContacts\": {\r\n    \"HaveNaturalSupport" +
              "s\": false,\r\n    \"FriendsAndCommunityContactsList\": [\r\n      {\r\n        " +
              "\"Name\": \"jm\",\r\n        \"Relationship\": \"hfg\",\r\n        \"PhoneNumber" +
              "\": \"6543218907\"\r\n      }\r\n    ]\r\n  },\r\n  \"Eligibility\": {\r\n    \"" +
              "DateSISCompleted\": null,\r\n    \"Tier\": null,\r\n    \"SupportLevel\": null," +
              "\r\n    \"DiagnosisDD\": false,\r\n    \"ExaminerName\": \"test\",\r\n    \"SSAD" +
              "isability\": false\r\n  },\r\n  \"SelfDirectedAndAgencyDirectedPersonalAssistanc" +
              "e\": {\r\n    \"PersonRequiresSupportWithActivitiesOfDailyLiving\": {\r\n      " +
              "\"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"PersonHasConsume" +
              "rDirectedOrAgencyDirectedPersonalService\": false,\r\n    \"PersonExperiencesDif" +
              "ficultyBeingOrientedTo\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"" +
              "\"\r\n    },\r\n    \"PersonNeedsSupportForBehavioralConcerns\": {\r\n      \"Va" +
              "lue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"PersonHasLimitedRang" +
              "eOfMotion\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r" +
              "\n    \"PersonNeedsAssistanceWithTakingMedications\": {\r\n      \"Value\": fals" +
              "e,\r\n      \"Specify\": \"\"\r\n    }\r\n  },\r\n  \"HealthInformation\": {\r\n" +
              "    \"ActiveMedicalAndBehavioralSupportNeeds\": {\r\n      \"NeedsIdentified\": " +
              "{\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      }\r\n    }," +
              "\r\n    \"BehavioralCrisisSupports\": {\r\n      \"BehavioralSupportPlan\": {\r" +
              "\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      },\r\n      \"" +
              "CrisisSupportPlan\": {\r\n        \"Value\": false,\r\n        \"Specify\": \"\"" +
              "\r\n      }\r\n    },\r\n    \"Medications\": {\r\n      \"MedicationsRequired\"" +
              ": false,\r\n      \"Medication\": null,\r\n      \"IsThereAnAdvancedDirective\":" +
              " {\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      },\r\n    " +
              "  \"ObtainedPsychotropicMedication\": {\r\n        \"Id\": \"lookupitems/ispobta" +
              "inedpsychotropicmedications/3c52e788-a1fd-418b-861e-899a94ad8e30\",\r\n        " +
              "\"UniqueAttribute\": {\r\n          \"Guid\": \"3c52e788-a1fd-418b-861e-899a94ad" +
              "8e30\",\r\n          \"Description\": \"No\"\r\n        }\r\n      }\r\n    },\r" +
              "\n    \"PhysicalConditions\": {\r\n      \"ChronicConditions\": {\r\n        \"V" +
              "alue\": false,\r\n        \"Specify\": \"\"\r\n      },\r\n      \"ConcernsHisto" +
              "ry\": {\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      },\r" +
              "\n      \"CurrentConditions\": {\r\n        \"Value\": false,\r\n        \"Speci" +
              "fy\": \"\"\r\n      },\r\n      \"Limitations\": {\r\n        \"Value\": false," +
              "\r\n        \"Specify\": \"\"\r\n      },\r\n      \"SeriousHospitalizations\": " +
              "{\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      },\r\n     " +
              " \"CommunicableDiseases\": {\r\n        \"Value\": false,\r\n        \"Specify\"" +
              ": \"\"\r\n      },\r\n      \"FamilyIllnessConditions\": {\r\n        \"Value\":" +
              " false,\r\n        \"Specify\": \"\"\r\n      },\r\n      \"SeriousIllness\": {" +
              "\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      },\r\n      " +
              "\"AlcoholUse\": {\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n " +
              "     },\r\n      \"TreatmentHistory\": {\r\n        \"Value\": false,\r\n       " +
              " \"Specify\": \"\"\r\n      },\r\n      \"PhysicalIssues\": {\r\n        \"Value" +
              "\": false,\r\n        \"Specify\": \"\"\r\n      },\r\n      \"ProtocolsOrRequir" +
              "ements\": {\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      }" +
              ",\r\n      \"DietNeeds\": {\r\n        \"Value\": false,\r\n        \"Specify\":" +
              " \"\"\r\n      }\r\n    }\r\n  },\r\n  \"SocialDevelopmentalBehavioralFamilyHist" +
              "ory\": {\r\n    \"FamilyHistoryDescribe\": \"teshvbj\",\r\n    \"TraumaHistory\"" +
              ": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"Liv" +
              "ingArrangementsSummary\": \"nvbn\"\r\n  },\r\n  \"CommunicationAssistiveTechnolo" +
              "gyAndModifications\": {\r\n    \"CommunicationSupport\": \"jjg\",\r\n    \"Equip" +
              "mentSupport\": \"gf\",\r\n    \"Maintained\": \"ghfh\",\r\n    \"BackupPlan\": " +
              "\"hfh\",\r\n    \"EnvironmentalModifications\": \"hgfh\",\r\n    \"ProfessionalE" +
              "valuation\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r" +
              "\n    \"LegalIssues\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r" +
              "\n    },\r\n    \"LegalAdviceNeeded\": {\r\n      \"Value\": false,\r\n      \"S" +
              "pecify\": \"\"\r\n    },\r\n    \"ServiceSupport\": {\r\n      \"Value\": false," +
              "\r\n      \"Specify\": \"\"\r\n    },\r\n    \"VotingSupport\": {\r\n      \"Val" +
              "ue\": false,\r\n      \"Specify\": \"\"\r\n    }\r\n  },\r\n  \"Education\": {\r" +
              "\n    \"HighestEducationLevel\": {\r\n      \"Id\": \"lookupitems/isphighesteduc" +
              "ationlevels/aed3cc82-8b73-4819-97ac-d1c19d72e10c\",\r\n      \"UniqueAttribute\"" +
              ": {\r\n        \"Guid\": \"aed3cc82-8b73-4819-97ac-d1c19d72e10c\",\r\n        \"" +
              "Description\": \"High School\"\r\n      }\r\n    },\r\n    \"EducationalHistory" +
              "\": \"hvghv\"\r\n  },\r\n  \"Employment\": {\r\n    \"EmploymentSubSection\": {" +
              "\r\n      \"Employed\": false,\r\n      \"WorkDesire\": false,\r\n      \"NotInt" +
              "erestedInWorkReason\": false,\r\n      \"EmploymentBarriers\": [\r\n        {\r" +
              "\n          \"Id\": \"lookupitems/ispemploymentbarrierss/0156bb75-a3db-47f5-8ace" +
              "-cd616f6ab5c9\",\r\n          \"UniqueAttribute\": {\r\n            \"Guid\": \"" +
              "0156bb75-a3db-47f5-8ace-cd616f6ab5c9\",\r\n            \"Description\": \"Transp" +
              "ortation\"\r\n          }\r\n        }\r\n      ],\r\n      \"EmploymentSupports" +
              "Necessary\": \"kjhkjh\"\r\n    },\r\n    \"AlternatesToWork\": {\r\n      \"Volu" +
              "nteered\": {\r\n        \"Value\": false,\r\n        \"Specify\": \"\"\r\n      " +
              "},\r\n      \"CurrentVolunteer\": {\r\n        \"Value\": false,\r\n        \"Sp" +
              "ecify\": \"\"\r\n      },\r\n      \"InvolvedInCommunityEngagementActivities \":" +
              " false,\r\n      \"CommunityEngagementDesire\": false,\r\n      \"CommunityEngag" +
              "ementBarriers\": [\r\n        {\r\n          \"Id\": \"lookupitems/ispcommunitye" +
              "ngagementbarrierss/8d0acf16-8d05-4475-8477-4d21228bd914\",\r\n          \"Unique" +
              "Attribute\": {\r\n            \"Guid\": \"8d0acf16-8d05-4475-8477-4d21228bd914\"" +
              ",\r\n            \"Description\": \"Lack of awareness\"\r\n          }\r\n      " +
              "  }\r\n      ],\r\n      \"CommunityEngagementSupportsNecessary\": \"mnmn\"\r\n " +
              "   }\r\n  },\r\n  \"VolunteerParticipation\": {\r\n    \"Volunteered\": false,\r" +
              "\n    \"VolunteerHistory\": null\r\n  },\r\n  \"EmergencyPlans\": {\r\n    \"Pro" +
              "viderUnShowupSteps\": \"jjg\",\r\n    \"ActivityCanceledSteps\": \"hjg\",\r\n   " +
              " \"NaturalDisaster\": \"jgkh\",\r\n    \"FuturePlan\": \"lk;lk\",\r\n    \"Inclu" +
              "siveSupport\": \"mbnmj\"\r\n  },\r\n  \"ReviewOfMostIntegratedSettings\": {\r\n " +
              "   \"CurrentLivingSituation\": {\r\n      \"Id\": \"lookupitems/livingsituationo" +
              "nwaivertypes/b243734d-2870-453b-a15f-b4223aa483f4\",\r\n      \"Category\": \"li" +
              "vingsituationonwaivertypes\",\r\n      \"ParentId\": null,\r\n      \"Abbreviati" +
              "on\": \"Supported Living/apartment\",\r\n      \"Name\": \"Supported Living/apar" +
              "tment\",\r\n      \"Description\": \"Supported Living/apartment\",\r\n      \"So" +
              "rtOrder\": 107,\r\n      \"Inactive\": false,\r\n      \"UniqueAttribute\": {\r" +
              "\n        \"Guid\": \"b243734d-2870-453b-a15f-b4223aa483f4\",\r\n        \"Descr" +
              "iption\": \"Supported Living/apartment\"\r\n      },\r\n      \"RuleAttributes\"" +
              ": []\r\n    },\r\n    \"PrimaryEmployment\": [\r\n      {\r\n        \"Id\": \"l" +
              "ookupitems/ispprimaryemployments/15596fce-00e1-45d6-9789-dd20f4c8ca94\",\r\n    " +
              "    \"UniqueAttribute\": {\r\n          \"Description\": \"Community Engagement" +
              "\",\r\n          \"Guid\": \"15596fce-00e1-45d6-9789-dd20f4c8ca94\"\r\n        }" +
              "\r\n      }\r\n    ],\r\n    \"HousingChoice\": [\r\n      {\r\n        \"Id\": " +
              "\"lookupitems/isphousingchoices/8e3db20f-6809-486a-908c-8a1501fd1fc4\",\r\n     " +
              "   \"UniqueAttribute\": {\r\n          \"Description\": \"Housing Choice Voucher" +
              "s\",\r\n          \"Guid\": \"8e3db20f-6809-486a-908c-8a1501fd1fc4\"\r\n        " +
              "}\r\n      }\r\n    ],\r\n    \"IntegratedWaiver\": [\r\n      {\r\n        \"Id" +
              "\": \"lookupitems/ispintegratedwaivers/ac1f885b-91da-4f46-8526-988a1da29baf\",\r" +
              "\n        \"UniqueAttribute\": {\r\n          \"Description\": \"In-home Support" +
              " Services\",\r\n          \"Guid\": \"ac1f885b-91da-4f46-8526-988a1da29baf\"\r\n" +
              "        }\r\n      }\r\n    ],\r\n    \"ResourcesNeededForMoreIntegratedOption\"" +
              ": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"Nee" +
              "dedAvailable\": false\r\n  },\r\n  \"WaiverCosts\": {\r\n    \"AnnualServicesTot" +
              "al\": \"$0.00\"\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": null,
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": null,
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490022464883)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490022465008)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490022465008)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        }
      }
    }, {
      "Id": "domainaudittrails/cf85c3ca-4e42-410b-92bc-e7084bbfca8e",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ScComplete",
      "DomainMethodDisplayName": "ISP completed by SC",
      "DomainMethodArguments": [
        {
          "ArgumentName": "comment",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
            "561934e089",
          "Value": "undefined",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }
      ],
      "CurrentDateTime": "\/Date(1490022464946)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490022465321)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490022465321)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        }
      }
    }, {
      "Id": "domainaudittrails/c272dbc6-82e7-459c-ace1-10ae5eaad223",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"LastName\": \"Gossman\",\r\n  \"MiddleName\": \"\",\r\n  \"FirstName\":" +
              " \"Sarah\",\r\n  \"PreferredName\": \"Sara\",\r\n  \"SocialSecurityNumber\": \"7" +
              "41025896\",\r\n  \"DateOfBirth\": \"1987-12-12T00:00:00-05:00\",\r\n  \"Gender\"" +
              ": {\r\n    \"Id\": \"lookupitems/genders/-1\",\r\n    \"Category\": \"genders\"," +
              "\r\n    \"ParentId\": null,\r\n    \"Abbreviation\": \"F\",\r\n    \"Name\": \"F" +
              "emale\",\r\n    \"Description\": \"Female\",\r\n    \"SortOrder\": 101,\r\n    " +
              "\"Inactive\": false,\r\n    \"UniqueAttribute\": {\r\n      \"Guid\": \"d1705689" +
              "-f7a0-479b-bc8c-ab68ceede6bc\",\r\n      \"Description\": \"Female\"\r\n    },\r" +
              "\n    \"RuleAttributes\": []\r\n  },\r\n  \"Address\": {\r\n    \"AddressLine1\"" +
              ": null,\r\n    \"AddressLine2\": null,\r\n    \"City\": null,\r\n    \"PostalCod" +
              "e\": null,\r\n    \"StateProvince\": {\r\n      \"Id\": null,\r\n      \"Categor" +
              "y\": null,\r\n      \"ParentId\": null,\r\n      \"Abbreviation\": null,\r\n    " +
              "  \"Name\": null,\r\n      \"Description\": null,\r\n      \"SortOrder\": null," +
              "\r\n      \"Inactive\": false,\r\n      \"UniqueAttribute\": null,\r\n      \"Ru" +
              "leAttributes\": []\r\n    },\r\n    \"Country\": null,\r\n    \"FullAddress\": " +
              "\"\",\r\n    \"County\": {\r\n      \"Id\": null,\r\n      \"Name\": null\r\n   " +
              " }\r\n  },\r\n  \"HomePhone\": null,\r\n  \"CellPhone\": null,\r\n  \"Email\": n" +
              "ull,\r\n  \"MedicaidNumber\": null,\r\n  \"SupportCoordinatorCaseManager\": \"CM" +
              "  Provider\",\r\n  \"CsbBhaAdmissionDate\": \"2017-03-31T04:00:00Z\"\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "ContactInformation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"ContactInformation_CsbBhaAdmissionDate\":{\"FromValue\":\"03/20/2017\",\"Disp" +
              "layField\":\"CSB/BHA Admission Date\",\"ToValue\":\"03/31/2017\"},\"SectionDispl" +
              "ayName\":\"Contact Information\"}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490022496618)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490022496759)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490022496759)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        }
      }
    }, {
      "Id": "domainaudittrails/8b42c8e1-b170-40da-8f80-8b54114ba16b",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"IndividualHasTheFollowing\": [\r\n    {\r\n      \"Id\": \"lookupitems/" +
              "ispindividualhasthefollowings/ab77fb8f-0d65-4e4d-b0ca-5d15a9ae3dc1\",\r\n      " +
              "\"UniqueAttribute\": {\r\n        \"Guid\": \"ab77fb8f-0d65-4e4d-b0ca-5d15a9ae3d" +
              "c1\",\r\n        \"Description\": \"Legal Guardian\"\r\n      }\r\n    },\r\n   " +
              " {\r\n      \"Id\": \"lookupitems/ispindividualhasthefollowings/9a154801-2813-42" +
              "4a-bbe1-ea27a30faba4\",\r\n      \"UniqueAttribute\": {\r\n        \"Guid\": \"9" +
              "a154801-2813-424a-bbe1-ea27a30faba4\",\r\n        \"Description\": \"Authorized " +
              "Representative\"\r\n      }\r\n    },\r\n    {\r\n      \"Id\": \"lookupitems/is" +
              "pindividualhasthefollowings/276ccad9-bc56-4615-a7d4-64d729999384\",\r\n      \"U" +
              "niqueAttribute\": {\r\n        \"Guid\": \"276ccad9-bc56-4615-a7d4-64d729999384" +
              "\",\r\n        \"Description\": \"None\"\r\n      }\r\n    }\r\n  ],\r\n  \"Indi" +
              "vidualHasPowerOfAttorney\": true,\r\n  \"SubstituteDecisionMaker\": {\r\n    \"V" +
              "alue\": true,\r\n    \"Specify\": \"Test\"\r\n  },\r\n  \"AuthorizedRepresentati" +
              "ve\": [\r\n    {\r\n      \"Id\": \"lookupitems/ispauthorizedrepresentatives/260" +
              "c126f-4aba-48e1-9c12-8f9b2193c030\",\r\n      \"UniqueAttribute\": {\r\n        " +
              "\"Guid\": \"260c126f-4aba-48e1-9c12-8f9b2193c030\",\r\n        \"Description\": " +
              "\"Medical\"\r\n      }\r\n    },\r\n    {\r\n      \"Id\": \"lookupitems/ispauth" +
              "orizedrepresentatives/8216989c-7156-4372-8ef2-de4cded31954\",\r\n      \"UniqueA" +
              "ttribute\": {\r\n        \"Guid\": \"8216989c-7156-4372-8ef2-de4cded31954\",\r\n" +
              "        \"Description\": \"Financial\"\r\n      }\r\n    },\r\n    {\r\n      \"" +
              "Id\": \"lookupitems/ispauthorizedrepresentatives/abd66c0e-bb75-4fbb-96c2-338fc3b" +
              "a0647\",\r\n      \"UniqueAttribute\": {\r\n        \"Guid\": \"abd66c0e-bb75-4f" +
              "bb-96c2-338fc3ba0647\",\r\n        \"Description\": \"Housing\"\r\n      }\r\n  " +
              "  },\r\n    {\r\n      \"Id\": \"lookupitems/ispauthorizedrepresentatives/37ce48" +
              "53-4317-4043-b4a5-6d1a81fc3cc3\",\r\n      \"UniqueAttribute\": {\r\n        \"G" +
              "uid\": \"37ce4853-4317-4043-b4a5-6d1a81fc3cc3\",\r\n        \"Description\": \"S" +
              "ervice Planning\"\r\n      }\r\n    }\r\n  ]\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "Representation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"Representation_IndividualHasTheFollowing\":{\"FromValue\":\"Authorized Repres" +
              "entative\",\"DisplayField\":\"Individual has the following\",\"ToValue\":\"Legal" +
              " Guardian, Authorized Representative, None\"},\"SectionDisplayName\":\"Represent" +
              "ation\",\"Representation_IndividualHasPowerOfAttorney\":{\"FromValue\":\"no\",\"" +
              "DisplayField\":\"Individual has a power of attorney\",\"ToValue\":\"yes\"},\"Rep" +
              "resentation_SubstituteDecisionMaker\":{\"FromValue\":{\"Value\":false,\"Specify" +
              "\":\"\"},\"DisplayField\":\"Are there any concerns with having or needing a subs" +
              "titute-decision maker? \",\"ToValue\":{\"Value\":true,\"Specify\":\"Test\"}},\"R" +
              "epresentation_AuthorizedRepresentative\":{\"FromValue\":\"Service Planning\",\"D" +
              "isplayField\":\"Decisions that the representative is authorized to make (check a" +
              "ll that apply)\",\"ToValue\":\"Medical, Financial, Housing, Service Planning\"}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490022523774)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490022523821)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490022523821)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        }
      }
    }, {
      "Id": "domainaudittrails/a18920ea-e82f-49fa-9a12-68c05e409d97",
      "DocumentId": "PlanOfCares/04afb5b0-553d-468f-8f36-c19f726a633c",
      "AttachedModelDescriptor": {
        "Guid": "e27c3c05-9119-4c03-8221-d96d28566667",
        "Description": "Individual Support Plan"
      },
      "DomainMethodName": "ChangeEssentialInformation",
      "DomainMethodDisplayName": "Change Essential Information",
      "DomainMethodArguments": [
        {
          "ArgumentName": "value",
          "TypeAssemblyQualifiedName": "System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\r\n  \"ActiveMedicalAndBehavioralSupportNeeds\": {\r\n    \"NeedsIdentified\":" +
              " {\r\n      \"Value\": true,\r\n      \"Specify\": \"teste\"\r\n    }\r\n  },\r" +
              "\n  \"BehavioralCrisisSupports\": {\r\n    \"BehavioralSupportPlan\": {\r\n     " +
              " \"Value\": true,\r\n      \"Specify\": \"testtttt\"\r\n    },\r\n    \"CrisisSu" +
              "pportPlan\": {\r\n      \"Value\": true,\r\n      \"Specify\": \"setsetttttttt\"" +
              "\r\n    }\r\n  },\r\n  \"Medications\": {\r\n    \"MedicationsRequired\": false," +
              "\r\n    \"Medication\": null,\r\n    \"IsThereAnAdvancedDirective\": {\r\n      " +
              "\"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"ObtainedPsychotr" +
              "opicMedication\": {\r\n      \"Id\": \"lookupitems/ispobtainedpsychotropicmedica" +
              "tions/3c52e788-a1fd-418b-861e-899a94ad8e30\",\r\n      \"UniqueAttribute\": {\r" +
              "\n        \"Guid\": \"3c52e788-a1fd-418b-861e-899a94ad8e30\",\r\n        \"Descr" +
              "iption\": \"No\"\r\n      }\r\n    }\r\n  },\r\n  \"PhysicalConditions\": {\r\n " +
              "   \"ChronicConditions\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"" +
              "\"\r\n    },\r\n    \"ConcernsHistory\": {\r\n      \"Value\": false,\r\n      " +
              "\"Specify\": \"\"\r\n    },\r\n    \"CurrentConditions\": {\r\n      \"Value\": " +
              "false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"Limitations\": {\r\n      " +
              "\"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"SeriousHospitali" +
              "zations\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n" +
              "    \"CommunicableDiseases\": {\r\n      \"Value\": false,\r\n      \"Specify\":" +
              " \"\"\r\n    },\r\n    \"FamilyIllnessConditions\": {\r\n      \"Value\": false," +
              "\r\n      \"Specify\": \"\"\r\n    },\r\n    \"SeriousIllness\": {\r\n      \"Va" +
              "lue\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"AlcoholUse\": {\r\n " +
              "     \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n    \"TreatmentHi" +
              "story\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r\n    },\r\n  " +
              "  \"PhysicalIssues\": {\r\n      \"Value\": false,\r\n      \"Specify\": \"\"\r" +
              "\n    },\r\n    \"ProtocolsOrRequirements\": {\r\n      \"Value\": false,\r\n   " +
              "   \"Specify\": \"\"\r\n    },\r\n    \"DietNeeds\": {\r\n      \"Value\": false" +
              ",\r\n      \"Specify\": \"\"\r\n    }\r\n  }\r\n}",
          "ArgumentDisplayName": null,
          "IsIgnoreDisplay": true
        }, {
          "ArgumentName": "path",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "HealthInformation",
          "ArgumentDisplayName": "Section Name",
          "IsIgnoreDisplay": false
        }, {
          "ArgumentName": "changesHistory",
          "TypeAssemblyQualifiedName": "System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c" +
              "561934e089",
          "Value": "{\"HealthInformation_ActiveMedicalAndBehavioralSupportNeeds_NeedsIdentified\":{" +
              "\"FromValue\":{\"Value\":false,\"Specify\":\"\"},\"DisplayField\":\"Active healt" +
              "h or behavioral support needs identified on the Annual Support Needs Risk Assess" +
              "ment or elsewhere? \",\"ToValue\":{\"Value\":true,\"Specify\":\"teste\"}},\"Sect" +
              "ionDisplayName\":\"Health Information\",\"HealthInformation_BehavioralCrisisSupp" +
              "orts_BehavioralSupportPlan\":{\"FromValue\":{\"Value\":false,\"Specify\":\"\"}," +
              "\"DisplayField\":\"Is there a behavioral supports plan?\",\"ToValue\":{\"Value\"" +
              ":true,\"Specify\":\"testtttt\"}},\"HealthInformation_BehavioralCrisisSupports_Cr" +
              "isisSupportPlan\":{\"FromValue\":{\"Value\":false,\"Specify\":\"\"},\"DisplayFie" +
              "ld\":\"Is there a crisis supports plan?\",\"ToValue\":{\"Value\":true,\"Specify" +
              "\":\"setsetttttttt\"}}}",
          "ArgumentDisplayName": "Changes Details",
          "IsIgnoreDisplay": false
        }
      ],
      "CurrentDateTime": "\/Date(1490022660040)\/",
      "Stamp": {
        "CreatedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "CreatedTimeStamp": "\/Date(1490022660181)\/",
        "LastModifiedBy": {
          "UserId": "staffs/systemadministrator",
          "FirstName": "System",
          "LastName": "Administrator",
          "FullName": "System Administrator",
          "FullNameFormal": "Administrator, System"
        },
        "LastModifiedTimeStamp": "\/Date(1490022660181)\/",
        "CreatedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        },
        "LastModifiedOnBehalfOf": {
          "UserId": "staffs/db78e4ae-5414-4250-99a5-a93363bef5e5",
          "FirstName": "SC 1 for",
          "LastName": "CSB OU",
          "FullName": "SC 1 for CSB OU",
          "FullNameFormal": "CSB OU, SC 1 for"
        }
      }
    }
  ]
};
const lifeAreas = [
  {
    "Id": "lookupitems/lifeareas/aa77fb8f-0d65-4e4d-b0ca-5d15a9ae3dca",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Work and Alternates to Work",
    "Description": "Work and Alternates to Work",
    "SortOrder": 100,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "aa77fb8f-0d65-4e4d-b0ca-5d15a9ae3dca",
      "Description": "Work and Alternates to Work"
    },
    "RuleAttributes": []
  }, {
    "Id": "lookupitems/lifeareas/99154801-2813-424a-bbe1-ea27a30faba3",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Learning & Other Pursuits",
    "Description": "Learning & Other Pursuits",
    "SortOrder": 110,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "99154801-2813-424a-bbe1-ea27a30faba3",
      "Description": "Learning & Other Pursuits"
    },
    "RuleAttributes": []
  }, {
    "Id": "lookupitems/lifeareas/376ccad9-bc56-4615-a7d4-64d729999382",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Community & Interests",
    "Description": "Community & Interests",
    "SortOrder": 120,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "376ccad9-bc56-4615-a7d4-64d729999382",
      "Description": "Community & Interests"
    },
    "RuleAttributes": []
  }, {
    "Id": "lookupitems/lifeareas/1b704295-b2c8-4b45-a526-352d4c4774b2",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Relationships",
    "Description": "Relationships",
    "SortOrder": 130,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "1b704295-b2c8-4b45-a526-352d4c4774b2",
      "Description": "Relationships"
    },
    "RuleAttributes": []
  }, {
    "Id": "lookupitems/lifeareas/120877bc-5479-4e94-9b9f-ed5621ddc4ae",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Home",
    "Description": "Home",
    "SortOrder": 140,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "120877bc-5479-4e94-9b9f-ed5621ddc4ae",
      "Description": "Home"
    },
    "RuleAttributes": []
  }, {
    "Id": "lookupitems/lifeareas/f480d795-8de8-48d2-88be-3e923c281c24",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Transportation and Travel",
    "Description": "Transportation and Travel",
    "SortOrder": 150,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "f480d795-8de8-48d2-88be-3e923c281c24",
      "Description": "Transportation and Travel"
    },
    "RuleAttributes": []
  }, {
    "Id": "lookupitems/lifeareas/4a484d31-6c51-46d0-aabb-d5c031283aa6",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Money, Health & Safety",
    "Description": "Money, Health & Safety",
    "SortOrder": 160,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "4a484d31-6c51-46d0-aabb-d5c031283aa6",
      "Description": "Money, Health & Safety"
    },
    "RuleAttributes": []
  }, {
    "Id": "lookupitems/lifeareas/556FFCD0-19D4-46EE-A5E1-F39B98EDF247",
    "Category": "lifeareas",
    "ParentId": null,
    "Abbreviation": null,
    "Name": "Wellness",
    "Description": "Wellness",
    "SortOrder": 170,
    "Inactive": false,
    "UniqueAttribute": {
      "Guid": "556FFCD0-19D4-46EE-A5E1-F39B98EDF247",
      "Description": "Wellness"
    },
    "RuleAttributes": []
  }
];

const part5Summary = {
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
      "Permissions": [
        "PlanForSupportServiceAndOutcomesEdit",
        "PlanForSupportServiceGeneralScheduleSupportsEdit",
        "PlanForSupportSafetyRestrictionEdit",
        "PlanForSupportSafetyRestrictionSignaturesEdit",
        "PlanForSupportSignaturesEdit",
        "PlanForSupportEdit"
      ]
    },
    "PlanForSupport": {
      "Id": "part5s/-1",
      "PlanOfCareId": "PlanOfCares/99d39bd8-2a01-43f3-8ca6-a70e947d23b7",
      "SharedPlanningId": "SharedPlanningId",
      "ProviderId": "ProviderId",
      "LxServiceId": "servicedefinitions/-1",
      "ServiceName": "ServiceName",
      "EffectiveDate": "\/Date(-62135596800000)\/",
      "WorkflowStatus": {
        "DisplayName": "In Progress",
        "Name": "InProgress"
      },
      "GeneralScheduleSupportComment": "",
      "GeneralScheduleSupports": [
        {
          "Id": "GeneralSupportActivities/-1",
          "SupportName": "Morning Assistance",
          "DesiredOutcomes": [
            {
              "SharedPlanningId": "SharedPlannings/-1",
              "LineNumber": "1",
              "Outcome": "outcome01"
            }, {
              "SharedPlanningId": "SharedPlannings/-2",
              "LineNumber": "2",
              "Outcome": "outcome02"
            }
          ],
          "FrequencyType": {
            "Id": "lookupitems/ispfrequencytypes/aaf777c0-2bca-4cbc-8f36-4137556f5eca",
            "UniqueAttribute": {
              "Description": "Daily",
              "Guid": "aaf777c0-2bca-4cbc-8f36-4137556f5eca"
            }
          },
          "FrequencyWeekDays": [
            {
              "Id": "lookupitems/ispfrequencyweekdays/59b55f6b-8a8c-45a9-9ea1-2ec0445d4789",
              "Abbreviation": "0",
              "Name": "Sunday",
              "UniqueAttribute": {
                "Description": "Sunday",
                "Guid": "59b55f6b-8a8c-45a9-9ea1-2ec0445d4789"
              }
            }, {
              "Id": "lookupitems/ispfrequencyweekdays/26aa827f-999a-4dc8-9397-10ce12e23ede",
              "Name": "Monday",
              "Abbreviation": "1",
              "UniqueAttribute": {
                "Description": "Monday",
                "Guid": "26aa827f-999a-4dc8-9397-10ce12e23ede"
              }
            }, {
              "Id": "lookupitems/ispfrequencyweekdays/140a4891-cc02-4084-b8bc-c422e1eabd64",
              "Name": "Tuesday",
              "Abbreviation": "2",
              "UniqueAttribute": {
                "Description": "Tuesday",
                "Guid": "140a4891-cc02-4084-b8bc-c422e1eabd64"
              }
            }, {
              "Id": "lookupitems/ispfrequencyweekdays/6f469e08-0320-4ea9-97f1-66074aadec8c",
              "Name": "Wednesday",
              "Abbreviation": "3",
              "UniqueAttribute": {
                "Description": "Wednesday",
                "Guid": "6f469e08-0320-4ea9-97f1-66074aadec8c"
              }
            }, {
              "Id": "lookupitems/ispfrequencyweekdays/26fb390e-8ef2-4679-b40b-f353c422b064",
              "Name": "Thursday",
              "Abbreviation": "4",
              "UniqueAttribute": {
                "Description": "Thursday",
                "Guid": "26fb390e-8ef2-4679-b40b-f353c422b064"
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
          "TotalAuthorizedHours": 2
        }, {
          "Id": "GeneralSupportActivities/-2",
          "SupportName": "Home Support",
          "DesiredOutcomes": [
            {
              "SharedPlanningId": "SharedPlannings/-3",
              "LineNumber": "3",
              "Outcome": "outcome01"
            }, {
              "SharedPlanningId": "SharedPlannings/-4",
              "LineNumber": "4",
              "Outcome": "outcome04"
            }
          ],
          "FrequencyType": {
            "Id": "lookupitems/ispfrequencytypes/aaf777c0-2bca-4cbc-8f36-4137556f5eca",
            "UniqueAttribute": {
              "Description": "Daily",
              "Guid": "aaf777c0-2bca-4cbc-8f36-4137556f5eca"
            }
          },
          "FrequencyWeekDays": [
            {
              "Id": "lookupitems/ispfrequencyweekdays/6f469e08-0320-4ea9-97f1-66074aadec8c",
              "Name": "Wednesday",
              "Abbreviation": "3",
              "UniqueAttribute": {
                "Description": "Wednesday",
                "Guid": "6f469e08-0320-4ea9-97f1-66074aadec8c"
              }
            }, {
              "Id": "lookupitems/ispfrequencyweekdays/26fb390e-8ef2-4679-b40b-f353c422b064",
              "Name": "Thursday",
              "Abbreviation": "4",
              "UniqueAttribute": {
                "Description": "Thursday",
                "Guid": "26fb390e-8ef2-4679-b40b-f353c422b064"
              }
            }
          ],
          "StartTime": {
            "Hours": 8,
            "Minutes": 30
          },
          "EndTime": {
            "Hours": 10,
            "Minutes": 30
          },
          "TotalAuthorizedHours": 1
        }, {
          "Id": "GeneralSupportActivities/-3",
          "SupportName": "Daily Support",
          "DesiredOutcomes": [
            {
              "SharedPlanningId": "SharedPlannings/-3",
              "LineNumber": "3",
              "Outcome": "outcome03"
            }, {
              "SharedPlanningId": "SharedPlannings/-8",
              "LineNumber": "8",
              "Outcome": "outcome08"
            }
          ],
          "FrequencyType": {
            "Id": "lookupitems/ispfrequencytypes/aaf777c0-2bca-4cbc-8f36-4137556f5eca",
            "UniqueAttribute": {
              "Description": "Daily",
              "Guid": "aaf777c0-2bca-4cbc-8f36-4137556f5eca"
            }
          },
          "FrequencyWeekDays": [
            {
              "Id": "lookupitems/ispfrequencyweekdays/26aa827f-999a-4dc8-9397-10ce12e23ede",
              "Name": "Monday",
              "Abbreviation": "1",
              "UniqueAttribute": {
                "Description": "Monday",
                "Guid": "26aa827f-999a-4dc8-9397-10ce12e23ede"
              }
            }, {
              "Id": "lookupitems/ispfrequencyweekdays/140a4891-cc02-4084-b8bc-c422e1eabd64",
              "Name": "Tuesday",
              "Abbreviation": "2",
              "UniqueAttribute": {
                "Description": "Tuesday",
                "Guid": "140a4891-cc02-4084-b8bc-c422e1eabd64"
              }
            }
          ],
          "StartTime": {
            "Hours": 10,
            "Minutes": 30
          },
          "EndTime": {
            "Hours": 14,
            "Minutes": 30
          },
          "TotalAuthorizedHours": 1
        }
      ],
      "AuthorizedHoursPerWeek": 40,
      "AuthorizedPeriodicSupportHoursPerWeek": 35,
      "Signatures": [
        {
          "SignerType": {
            "Id": "lookupitems/signertypes/-1",
            "Category": "signertypes",
            "ParentId": null,
            "Abbreviation": "Abb",
            "Name": "Name",
            "Description": "Description",
            "SortOrder": 0,
            "Inactive": false,
            "UniqueAttribute": {
              "Guid": "99999-99999-99999-99999",
              "Description": "Description"
            },
            "RuleAttributes": [],
            "Stamp": null
          },
          "SignatureType": {
            "Id": "lookupitems/signaturetypes/-1",
            "Category": "signaturetypes",
            "ParentId": null,
            "Abbreviation": "Abb",
            "Name": "Name",
            "Description": "Description",
            "SortOrder": 0,
            "Inactive": false,
            "UniqueAttribute": {
              "Guid": "99999-99999-99999-99999",
              "Description": "Description"
            },
            "RuleAttributes": [],
            "Stamp": null
          },
          "RelationshipOrService": "RelationshipOrService",
          "PrintName": "PrintName",
          "SignedDate": "\/Date(-62135596800000)\/",
          "UniqueFileName": "49dc484f-d383-4543-bae1-6a2402d5066c"
        }
      ],
      "ServiceDefinitionId": "servicedefinitions/-1",
      "ProviderName": "Provider Name",
      "ServiceOutcomes": [
        {
          "Id": "DesiredOutcomes/-1",
          "IsCopiedFromParent": true,
          "SharedPlanningId": "sharedplannings/45671e94-394d-4152-be79-42b82939a437",
          "DesiredOutcome": "Can swimming in seaside.",
          "LineNumber": 1,
          "WhenNoLongerNeedSupport": "Winter",
          "LifeArea": {
            "Id": "lookupitems/lifeareas/f480d795-8de8-48d2-88be-3e923c281c24",
            "Category": null,
            "ParentId": null,
            "Abbreviation": null,
            "Name": "Transportation and Travel",
            "Description": "Transportation and Travel",
            "SortOrder": null,
            "Inactive": false,
            "UniqueAttribute": null,
            "RuleAttributes": [],
            "Stamp": null
          },
          "SupportActivities": [
            {
              "Id": "SupportActivities/-1",
              "SupportActivityName": "Support Activity # 1",
              "WhenNoLongerNeedSupport": "When No Longer Need Support",
              "WhatToRecord": "What To Record",
              "HowOften": "How Often",
              "ByWhen": "\/Date(-62135596800000)\/"
            }, {
              "Id": "SupportActivities/-2",
              "SupportActivityName": "Support Activity # 2",
              "WhenNoLongerNeedSupport": "When No Longer Need Support",
              "WhatToRecord": "What To Record",
              "HowOften": "How Often",
              "ByWhen": "\/Date(-62135599000000)\/"
            }
          ],
          "StartDate": "\/Date(1453995200000)\/",
          "EndDate": "\/Date(1442995200000)\/"
        }, {
          "Id": "DesiredOutcomes/-2",
          "SharedPlanningId": "sharedplannings/def71e94-394d-4152-be79-42b82939a456",
          "LineNumber": 2,
          "DesiredOutcome": "Can run on earth.",
          "WhenNoLongerNeedSupport": "Good enough 2",
          "LifeArea": {
            "Id": "lookupitems/lifeareas/f480d795-8de8-48d2-88be-3e923c281c24",
            "Category": null,
            "ParentId": null,
            "Abbreviation": null,
            "Name": "Transportation and Travel",
            "Description": "Transportation and Travel",
            "SortOrder": null,
            "Inactive": false,
            "UniqueAttribute": null,
            "RuleAttributes": [],
            "Stamp": null
          },
          "SupportActivities": [
            {
              "Id": "SupportActivities/-1",
              "SupportActivityName": "Support Activity # 1",
              "WhenNoLongerNeedSupport": "When No Longer Need Support",
              "WhatToRecord": "What To Record",
              "HowOften": "How Often",
              "ByWhen": "\/Date(-62135596800000)\/"
            }, {
              "Id": "SupportActivities/-2",
              "SupportActivityName": "Support Activity # 2",
              "WhenNoLongerNeedSupport": "When No Longer Need Support",
              "WhatToRecord": "What To Record",
              "HowOften": "How Often",
              "ByWhen": "\/Date(-62135599000000)\/"
            }
          ],
          "StartDate": "\/Date(1443999500000)\/",
          "EndDate": "\/Date(1443999500000)\/"
        }
      ],
      "ParentPlanForSupportId": "null"
    },
    "ParentPlanForSupportId": "null",
    "ClientId": "clients/62d2ff55-79e7-41aa-821a-ad43376d84de",
    "ServiceDefinitions": [
      {
        "Id": "servicedefinitions/-1",
        "Name": "Service Definition #1"
      }, {
        "Id": "servicedefinitions/-2",
        "Name": "Service Definition #2"
      }
    ],
    "LifeAreas": lifeAreas,
    "SharedPlannings": [
      {
        "Id": "sharedplannings/45671e94-394d-4152-be79-42b82939a437",
        "LifeArea": {
          "Id": "lookupitems/lifeareas/f480d795-8de8-48d2-88be-3e923c281c24",
          "Category": null,
          "ParentId": null,
          "Abbreviation": null,
          "Name": "Transportation and Travel",
          "Description": "Transportation and Travel",
          "SortOrder": null,
          "Inactive": false,
          "UniqueAttribute": null,
          "RuleAttributes": [],
          "Stamp": null
        },
        "LineNumber": 1,
        "DesiredOutcome": "Can swimming in seaside.",
        "WhenNoLongerNeedSupport": "Winter",
        "SupportType": {
          "Id": "lookupitems/supporttypes/2ef09c7c-7e59-4c6c-9a2c-4a7647a5311e",
          "Category": null,
          "ParentId": null,
          "Abbreviation": null,
          "Name": "Relationship-based",
          "Description": "Relationship-based",
          "SortOrder": null,
          "Inactive": false,
          "UniqueAttribute": null,
          "RuleAttributes": [],
          "Stamp": null
        },
        "SupportProviderName": null,
        "AttachedProviders": [],
        "AttachedProviderIds": [],
        "StartDate": "\/Date(1442995200000)\/",
        "EndDate": "\/Date(1442995200000)\/"
      }, {
        "Id": "sharedplannings/def71e94-394d-4152-be79-42b82939a456",
        "LifeArea": {
          "Id": "lookupitems/lifeareas/120877bc-5479-4e94-9b9f-ed5621ddc4ae",
          "Category": "lifeareas",
          "ParentId": null,
          "Abbreviation": null,
          "Name": "Home",
          "Description": "Home",
          "SortOrder": null,
          "Inactive": false,
          "UniqueAttribute": null,
          "RuleAttributes": [],
          "Stamp": null
        },
        "LineNumber": 2,
        "DesiredOutcome": "Can run on earth.",
        "WhenNoLongerNeedSupport": "Good enough 2",
        "SupportType": {
          "Id": "lookupitems/supporttypes/0ef63270-bd1d-4e67-a3e2-621cd76714e6",
          "Category": null,
          "ParentId": null,
          "Abbreviation": null,
          "Name": "Eligibility-based",
          "Description": "Eligibility-based",
          "SortOrder": null,
          "Inactive": false,
          "UniqueAttribute": null,
          "RuleAttributes": [],
          "Stamp": null
        },
        "SupportProviderName": "provider",
        "AttachedProviders": [
          {}
        ],
        "AttachedProviderIds": [
          "providerprofiles/deb7adca-2712-4b04-b3d8-072b6db5bab7", "providerprofiles/37b8230d-f82c-4069-9eb5-e81759e111fb"
        ],
        "StartDate": "\/Date(1443995200000)\/",
        "EndDate": "\/Date(1443995200000)\/"
      }
    ]
  }
};
const poclists = [
  {
    "Id": "PlanOfCares2/5ff3da32-adcd-4ce1-8e00-15f810c50a8a",
    "ClientId": "clients/62d2ff55-79e7-41aa-821a-ad43376d84de",
    "Setting": {
      "Id": "lookupitems/planofcaresettings/dd9ebf2c-2497-449a-a3de-764b5b043d86",
      "Category": "planofcaresettings",
      "ParentId": null,
      "Abbreviation": null,
      "Name": "Nursing Facility",
      "Description": "Nursing Facility",
      "SortOrder": 110,
      "Inactive": false,
      "UniqueAttribute": {
        "Guid": "dd9ebf2c-2497-449a-a3de-764b5b043d86",
        "Description": "Nursing Facility"
      },
      "RuleAttributes": []
    },
    "ProgramType": {
      "Id": "lookupitems/programtypes/636457bf-c646-4588-94f9-c37843efb908",
      "Category": "programtypes",
      "ParentId": null,
      "Abbreviation": "Community Living",
      "Name": "Community Living",
      "Description": "Community Living",
      "SortOrder": 100,
      "Inactive": false,
      "UniqueAttribute": {
        "Guid": "636457bf-c646-4588-94f9-c37843efb908",
        "Description": "Community Living"
      },
      "RuleAttributes": [],
      "Stamp": null
    },
    "PlanOfCareType": {
      "Id": "lookupitems/planofcaretypes/dbfd53e8-18db-4ac4-9a03-95432f61c962",
      "Category": "planofcaretypes",
      "ParentId": null,
      "Abbreviation": null,
      "Name": "Initial",
      "Description": "Initial",
      "SortOrder": 100,
      "Inactive": false,
      "UniqueAttribute": {
        "Guid": "dbfd53e8-18db-4ac4-9a03-95432f61c962",
        "Description": "Initial"
      },
      "RuleAttributes": []
    },
    "EffectiveDateRange": {
      "StartDate": "\/Date(1462995200000)\/",
      "EndDate": "\/Date(1488799900000)\/"
    },
    "AssignedOrganizationUnitIds": [],
    "Status": "PendingScInput",
    "WorkflowStatus": {
      "Name": "PendingScInput",
      "DisplayName": "Pending Support Coordinator Input"
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
];

export function ListInfo(clientId) {

  let results = poclists;

  let outreach = PlanOfCare;

  lodash.set(outreach, "DataObject.ListItems", results);
  const startIndex = results.length === 0
    ? "0"
    : "1";
  lodash.set(outreach, "Message", `Showing${startIndex} to ${results.length} of ${results.length} entries.`);
  lodash.set(outreach, "ResultFlag", 1);

  return outreach;

}
export function getPlanForSupportList() {
  return {DataObject: PlanOfCare.DataObject.PlanOfCare.PlanForSupportList};
}

export function editGeneralScheduleSupportComment(generalScheduleSupportComment) {
  let part5Object = Object.assign({}, part5Summary);
  part5Object.DataObject.PlanForSupport.GeneralScheduleSupportComment = generalScheduleSupportComment;
  return part5Object.DataObject;
}

export function addSharedPlanning(sharedPlanningJson, completionStatusJson) {
  let sharedPlanning = JSON.parse(sharedPlanningJson);
  sharedPlanning.Id = new Date() + "";
  const overallStatus = JSON.parse(completionStatusJson);
  let result = lodash.set(PlanOfCare.DataObject.PlanOfCare, 'CompletionStatus.SharedPlannings', overallStatus);

  return Object.assign({}, {
    "ResultFlag": 1,
    "DataObject": sharedPlanning
  });
}

export function editSharedPlanning(sharedPlanningJson, completionStatusJson) {
  let sharedPlanning = JSON.parse(sharedPlanningJson);
  const overallStatus = JSON.parse(completionStatusJson);
  let result = lodash.set(PlanOfCare.DataObject.PlanOfCare, 'CompletionStatus.SharedPlannings', overallStatus);
  return Object.assign({}, {
    "ResultFlag": 1,
    "DataObject": sharedPlanning
  });
}

export function deleteSharedPlanning(sharedPlanningJson, completionStatusJson) {
  let sharedPlanning = JSON.parse(sharedPlanningJson);
  const overallStatus = JSON.parse(completionStatusJson);
  let result = lodash.set(PlanOfCare.DataObject.PlanOfCare, 'CompletionStatus.SharedPlannings', overallStatus);
}

export function findDomainAuditTrailsByActions() {
  return Object.assign({}, auditTrails);
}

export function saveSectionObject(path, sectionJson, completionStatusJson) {
  let section = JSON.parse(sectionJson);
  const completionStatus = JSON.parse(completionStatusJson);
  let result = lodash.set(PlanOfCare.DataObject.PlanOfCare, path, section);
  result = lodash.set(PlanOfCare.DataObject.PlanOfCare, 'CompletionStatus', completionStatus);
  return result;
}

export function getPart5SummaryInfo() {
  return Object.assign({}, part5Summary);
}

export function createPlanForSupport() {
  return {
    "DataObject": {
      "Id": "planforsupports/" + Math.random(),
      "ProviderName": "CSB OU",
      "Npi": "0123456789",
      "WorkflowStatus": {
        "DisplayName": "In Progress",
        "Name": "InProgress"
      },
      "Active": "Inactive"
    }
  };
}

export function changePart5Section(path, sectionJson) {
  let result = lodash.set(part5Summary.DataObject, path, JSON.parse(sectionJson));
  return result;
}

export function addGeneralScheduleSupport(sectionJson, completionStatusJson) {
  let part5Object = Object.assign({}, part5Summary);
  let activity = JSON.parse(sectionJson);
  let completionStatus = JSON.parse(completionStatusJson);
  let result = lodash.set(part5Summary.DataObject.PlanForSupport, 'CompletionStatus', completionStatus);

  activity.Id = new Date() + "";
  part5Object
    .DataObject
    .PlanForSupport
    .GeneralScheduleSupports
    .push(activity);
  return Object.assign({}, {DataObject: activity.Id});
}

export function editGeneralScheduleSupport(sectionJson) {
  let part5Object = Object.assign({}, part5Summary);
  let activity = JSON.parse(sectionJson);
  let activities = part5Object.DataObject.PlanForSupport.GeneralScheduleSupports;
  const index = activities.findIndex(x => x.Id === activity.Id);
  if (index >= 0) {
    activities.splice(index, 1, activity);
  }
  return part5Object.DataObject;
}

export function deleteGeneralScheduleSupport(generalScheduleSupportId, completionStatusJson) {
  let part5Object = Object.assign({}, part5Summary);
  let activityId = generalScheduleSupportId;
  let activities = part5Object.DataObject.PlanForSupport.GeneralScheduleSupports;

  let completionStatus = JSON.parse(completionStatusJson);
  let result = lodash.set(part5Summary.DataObject.PlanForSupport, 'CompletionStatus', completionStatus);
  const index = activities.findIndex(x => x.Id === activityId);
  if (index >= 0) {
    activities.splice(index, 1);
  }
  return part5Object.DataObject;
}

export function getServiceOutcomesSection() {
  let sos = {
    DataObject: {
      'ServiceDefinitions': Object.assign([], part5Summary.DataObject.ServiceDefinitions),
      'SharedPlannings': Object.assign([], part5Summary.DataObject.SharedPlannings),
      'ServiceOutcomes': Object.assign([], part5Summary.DataObject.PlanForSupport.ServiceOutcomes),
      'ProviderName': part5Summary.DataObject.PlanForSupport.ProviderName,
      'ProviderId': part5Summary.DataObject.PlanForSupport.ProviderId,
      'LxServiceId': part5Summary.DataObject.PlanForSupport.LxServiceId,
      'EffectiveDate': part5Summary.DataObject.PlanForSupport.EffectiveDate,
      'ServiceName': find(part5Summary.DataObject.ServiceDefinitions, {'Id': part5Summary.DataObject.PlanForSupport.LxServiceId}).Name,
      'ClientId': part5Summary.DataObject.ClientId,
      'PlanOfCareId': part5Summary.DataObject.PlanForSupport.PlanOfCareId,
      'PlanForSupportId': part5Summary.DataObject.PlanForSupport.Id,
      'CurrentIdentity': Object.assign({}, part5Summary.DataObject.CurrentIdentity),
      'ParentPlanForSupportId': part5Summary.DataObject.PlanForSupport.ParentPlanForSupportId,
      'LifeAreas': Object.assign([], part5Summary.DataObject.LifeAreas),
      'WorkflowStatus': part5Summary.DataObject.PlanForSupport.WorkflowStatus || {}
    }
  };

  return sos;
}

export function changeServiceOutcomes(sectionJson) {
  let outcomes = JSON.parse(sectionJson);
  part5Summary.DataObject.PlanForSupport.ServiceName = find(part5Summary.DataObject.ServiceDefinitions, {'Id': part5Summary.DataObject.PlanForSupport.LxServiceId}).Name;
  part5Summary.DataObject.PlanForSupport.ServiceOutcomes = outcomes;
  let sos = {
    DataObject: {
      'ServiceDefinitions': Object.assign([], part5Summary.DataObject.ServiceDefinitions),
      'SharedPlannings': Object.assign([], part5Summary.DataObject.SharedPlannings),
      'ServiceOutcomes': Object.assign([], part5Summary.DataObject.PlanForSupport.ServiceOutcomes),
      'ProviderName': part5Summary.DataObject.PlanForSupport.ProviderName,
      'ProviderId': part5Summary.DataObject.PlanForSupport.ProviderId,
      'LxServiceId': part5Summary.DataObject.PlanForSupport.LxServiceId,
      'EffectiveDate': part5Summary.DataObject.PlanForSupport.EffectiveDate,
      'ServiceName': find(part5Summary.DataObject.ServiceDefinitions, {'Id': part5Summary.DataObject.PlanForSupport.LxServiceId}).Name,
      'ClientId': part5Summary.DataObject.ClientId,
      'PlanOfCareId': part5Summary.DataObject.PlanForSupport.PlanOfCareId,
      'PlanForSupportId': part5Summary.DataObject.PlanForSupport.Id,
      'CurrentIdentity': Object.assign({}, part5Summary.DataObject.CurrentIdentity),
      'WorkflowStatus': part5Summary.DataObject.PlanForSupport.WorkflowStatus || {}
    }
  };
  return sos;
}

export function getPlanOfCare() {
  return Object.assign({}, PlanOfCare);
}

export function gettestobject() {
  return Object.assign({}, PlanOfCare);
}

export function create(sectionJson) {
  var section = JSON.parse(sectionJson);
  Object.assign(PlanOfCare.DataObject.PlanOfCare, section);

  var output = {
    DataObject: PlanOfCare.DataObject.PlanOfCare.Id
  }
  return output;
}
