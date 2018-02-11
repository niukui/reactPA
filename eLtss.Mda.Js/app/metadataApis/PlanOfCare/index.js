import {ISP_SIGNATURE_TYPE_IDS, ISP_SIGNER_TYPE_IDS} from 'utils/constants'
import rules from './rules';
import options from './options';
import views from './views';
import moment from 'moment';
const metadata = {
  "Name": "PlanOfCare",
  "LookupPrefix": "planofcare",
  "Title": "Plan of Care",
  "DisplayName": "Plan of Care",
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
      "Name": "Overview",
      "DisplayName": "Service Detail Information",
      "EditLink": "SectionEdit",

      "CompleteRequired": false,
      "Order": 0,
      "Sections": [],
      "Items": [
        {
          "Name": "PlanOfCareType",
          "DataPath": "PlanOfCareType",
          "DisplayName": "POC Type:",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "planofcaretypes"
          },
          "IsRequired": true,
          "CompleteRequired": false,
          "Order": 10
        }, {
          "Name": "Setting",
          "DataPath": "Setting",
          "DisplayName": "Setting:",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "planofcaresettings"
          },
          "IsRequired": true,
          "CompleteRequired": false,
          "Order": 10
        }, {
          "Name": "ProgramType",
          "DataPath": "ProgramType",
          "DisplayName": "Program Type:",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "DataSource": {
            "LookupCategory": "programtypes"
          },
          "IsRequired": false,
          "ReadOnly": true,          
          "CompleteRequired": false,
          "Order": 15
        }, {
          "Name": "StartDate",
          "DataPath": "EffectiveDateRange.StartDate",
          "DisplayName": "Effective Date:",
          "Type": "DatePicker",
          "ValueType": "DateTimeOffset?",
          "ReadOnly": false,
          "IsRequired": true,
          "CompleteRequired": false,
          "Order": 20
        }, {
          "Name": "EndDate",
          "DataPath": "EffectiveDateRange.EndDate",
          "DisplayName": "End Date:",
          "Type": "DatePicker",
          "ValueType": "DateTimeOffset?",
          "ReadOnly": false,
          "IsRequired": true,
          "CompleteRequired": false,
          "Validations": [
            {
              "Type": "compare",
              "Expression": ">",
              "CompareTo": "EffectiveDateRange.StartDate",
              "Message": "End date must be after start date."
            }
          ],
          "Order": 30
        }, {
          "Name": "Comments",
          "DataPath": "Comments",
          "DisplayName": "Participant Story:",
          "Type": "Textarea",
          "ValueType": "string",
          "ReadOnly": false,
          "IsRequired": false,
          "CompleteRequired": false,
          "Order": 40
        }
      ]
    }, {
      "Level": 0,
      "Name": "EssentialInformation",
      "DisplayName": "Part I. Essential Information",
      "MultiEntry": false,
      "CompleteRequired": true,
      "Order": 10,
      "Sections": [
        {
          "Level": 1,
          "Name": "ContactInformation",
          "DisplayName": "Contact Information",
          "MultiEntry": false,
          "CompleteRequired": false,
          //"EditLink": "SectionEdit",
          "Order": 10,
          "Sections": [],
          "Items": [
            {
              "Name": "LastName",
              "DisplayName": "Legal Last Name:",
              "Description": "Legal Last Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "Validations": null,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Order": 0
            }, {
              "Name": "MiddleName",
              "DisplayName": "Legal Middle Name:",
              "Description": "Legal Middle Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Validations": null,
              "Order": 1
            }, {
              "Name": "FirstName",
              "DisplayName": "Legal First Name:",
              "Description": "Legal First Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Validations": null,
              "Order": 2
            }, {
              "Name": "PreferredName",
              "DisplayName": "Preferred Name:",
              "Description": "Preferred Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Validations": null,
              "Order": 3
            }, {
              "Name": "SocialSecurityNumber",
              "DisplayName": "Social Security Number:",
              "Description": "Social Security Number",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Mask": "***-**-",
              "Validations": null,
              "Order": 4
            }, {
              "Name": "DateOfBirth",
              "DisplayName": "Date of Birth:",
              "Description": "Date of Birth",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 5
            }, {
              "Name": "Gender",
              "DisplayName": "Gender:",
              "Description": "Gender",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Validations": null,
              "Order": 6
            }, {
              "Name": "Address",
              "DisplayName": "Address",
              "Description": "Address",
              "Type": "Address",
              "ValueType": "object",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Validations": null,
              "Order": 7
            }, {
              "Name": "HomePhone",
              "DisplayName": "Home Phone:",
              "Description": "Home Phone",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                  "Message": 'Please input a valid home phone number.'
                }
              ],
              "Order": 9
            }, {
              "Name": "CellPhone",
              "DisplayName": "Cell Phone:",
              "Description": "Cell Phone",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                  "Message": 'Please input a valid cell phone number.'
                }
              ],
              "Order": 10
            }, {
              "Name": "Email",
              "DisplayName": "Email:",
              "Description": "Email",
              "ReadOnly": true,
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^.+@.+\..+$',
                  "Message": 'Please input a valid email address.'
                }
              ],
              "CompleteRequired": false,
              "Validations": [],
              "Order": 11
            }, {
              "Name": "MedicaidNumber",
              "DisplayName": "Medicaid Number:",
              "Description": "Medicaid Number",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Mask": '********-',
              "Validations": null,
              "Order": 12
            }, {
              "Name": "ServiceCoordinatorCareCoordinator",
              "DisplayName": "Service Coordinator:",
              "Description": "Service Coordinator/Care Coordinator",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "ReadOnly": true,
              "Validations": null,
              "Order": 13
            }
          ]
        }, {
          "Level": 1,
          "Name": "Representation",
          "DisplayName": "Representation",
          "MultiEntry": false,
          "CompleteRequired": true,
          "EditLink": "SectionEdit",
          "Order": 20,
          "Sections": [],
          "Items": [
            {
              "Name": "IndividualHasTheFollowing",
              "DisplayName": "Individual has the following:",
              "Description": "Individual has the following",
              "Type": "CheckboxList",
              "ValueType": "LookupIdentifer",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "IndividualHasPowerOfAttorney",
              "DisplayName": "Individual has a power of attorney:",
              "Description": "Individual has a power of attorney",
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "ValidationExpression": null,
              "ValidationMessage": null,
              "Order": 1
            }, {
              "Name": "SubstituteDecisionMaker",
              "DisplayName": "Are there any concerns with having or needing a substitute-decision maker? ",
              "Description": "Are there any concerns with having or needing a substitute-decision maker? ",
              "AdditionalDisplayName": "If yes, describe:",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 2
            }, {
              "Name": "AuthorizedRepresentative",
              "DisplayName": "Decisions that the representative is authorized to make (check all that apply):",
              "Description": "Decisions that the representative is authorized to make (check all that apply)",
              "Type": "CheckboxList",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 3
            }
          ]
        }, {
          "Level": 1,
          "Name": "EmergencyContacts",
          "DisplayName": "Emergency Contacts",
          "MultiEntry": true,
          "CompleteRequired": true,
          "EditLink": "SectionEdit",
          "Order": 30,
          "Sections": [],
          "Items": [
            {
              "Name": "FirstName",
              "DisplayName": "First Name:",
              "Description": "First Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "LastName",
              "DisplayName": "Last Name:",
              "Description": "Last Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "MiddleName",
              "DisplayName": "Middle Name:",
              "Description": "Middle Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "Validations": null,
              "Order": 20
            }, {
              "Name": "Phone",
              "DisplayName": "Phone:",
              "Description": "Phone",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                  "Message": 'Please input a valid phone number.'
                }
              ],
              "Order": 30
            }, {
              "Name": "Fax",
              "DisplayName": "Fax:",
              "Description": "Fax",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                  "Message": 'Please input a valid fax number.'
                }
              ],
              "Order": 40
            }, {
              "Name": "Email",
              "DisplayName": "Email:",
              "Description": "Email",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^.+@.+\..+$',
                  "Message": 'Please input a valid email address.'
                }
              ],
              "Order": 50
            }, {
              "Name": "ContactType",
              "DisplayName": "Contact Type:",
              "Description": "Contact Type",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "Validations": null,
              "Order": 60
            }, {
              "Name": "ContactTypeOtherSpecify",
              "DisplayName": "Please specify contact type:",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Display": false,
              "HideColumn": true,
              "Validations": null,
              "Order": 61
            }, {
              "Name": "Address",
              "DisplayName": "Address",
              "Description": "Address",
              "Type": "Address",
              "ValueType": "Object",
              "IsRequired": false,
              "Validations": null,
              "Order": 70
            }, {
              "Name": "EmergencyContactRelationship",
              "DisplayName": "Relationship:",
              "Description": "Relationship",
              "Type": "CheckboxList",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "Validations": null,
              "Order": 80
            }, {
              "Name": "EmergencyContactRelationshipOtherSpecify",
              "DisplayName": "Please specify relationship:",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Display": false,
              "HideColumn": true,
              "Validations": null,
              "Order": 81
            }
          ]
        }, {
          "Level": 1,
          "Name": "HealthcareContacts",
          "DisplayName": "Healthcare Contacts",
          "MultiEntry": true,
          "EditLink": "SectionEdit",
          "MaxOccurs": 10,
          "CompleteRequired": true,
          "Order": 40,
          "Sections": [],
          "Items": [
            {
              "Name": "FirstName",
              "DisplayName": "First Name:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "LastName",
              "DisplayName": "Last Name:",

              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "Phone",
              "DisplayName": "Phone:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                  "Message": 'Please input a valid phone number.'
                }
              ],
              "Order": 20
            }, {
              "Name": "Fax",
              "DisplayName": "Fax:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                  "Message": 'Please input a valid fax number.'
                }
              ],
              "Order": 30
            }, {
              "Name": "Email",
              "DisplayName": "Email:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^.+@.+\..+$',
                  "Message": 'Please input a valid email address.'
                }
              ],
              "Order": 40
            }, {
              "Name": "Address",
              "DisplayName": "Address:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 50
            }, {
              "Name": "Specialty",
              "DisplayName": "Specialty:",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 60
            }, {
              "Name": "SpecialtyOtherSpecify",
              "DisplayName": "Please specify specialty:",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Display": false,
              "Validations": null,
              "Order": 61
            }
          ]
        }, {
          "Level": 1,
          "Name": "FriendsAndCommunityContacts",
          "DisplayName": "Friends and Community Contacts",
          "EditLink": "SectionEdit",
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 50,
          "Sections": [
            {
              "Level": 2,
              "Name": "FriendsAndCommunityContactsList",
              "DisplayName": "Friends and Community Contacts",
              "MultiEntry": true,
              "CompleteRequired": true,
              "Order": 0,
              "Sections": [],
              "Items": [
                {
                  "Name": "Name",
                  "DisplayName": "Name:",
                  "Description": "Name",
                  "Type": "TextBox",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Validations": null,
                  "Order": 0
                }, {
                  "Name": "Relationship",
                  "DisplayName": "Relationship:",
                  "Description": "Relationship",
                  "Type": "TextBox",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "PhoneNumber",
                  "DisplayName": "Phone Number:",
                  "Description": "Phone Number",
                  "Type": "TextBox",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Validations": [
                    {
                      "Type": 'regex',
                      "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                      "Message": 'Please input a valid phone number.'
                    }
                  ],
                  "Order": 20
                }
              ]
            }
          ],
          "Items": [
            {
              "Name": "HaveNaturalSupports",
              "DisplayName": "Does {{Parameters.PreferredName}} have natural supports?",
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "OtherAgencySupports",
          "DisplayName": "Other Agency Supports",
          "EditLink": "SectionEdit",
          "MultiEntry": true,
          "IsRequired": false,
          "CompleteRequired": false,
          "Display": true,
          "Order": 80,
          "Sections": [],
          "Items": [
            {
              "Name": "Agency",
              "DisplayName": "Agency:",
              "Description": "Agency",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "ContactName",
              "DisplayName": "Contact Name:",
              "Description": "Contact Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "PhoneNumber",
              "DisplayName": "Phone Number:",
              "Description": "Phone Number",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(\([0-9]{3}\)|[0-9]{3}-)([0-9]{3}|[0-9]{3}-)[0-9]{4}$',
                  "Message": 'Please input a valid phone number.'
                }
              ],
              "Order": 20
            }, {
              "Name": "DescribeSupports",
              "DisplayName": "Describe Supports:",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 30
            }, {
              "Name": "DescribeSchedule",
              "DisplayName": "Describe Schedule:",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 40
            }
          ]
        }, {
          "Level": 1,
          "Name": "SelfDirectedAndAgencyDirectedPersonalAssistance",
          "DisplayName": "Self-Directed and Agency-Directed Personal Assistance, Respite, and Companion Su" +
              "pports",
          "EditLink": "SectionEdit",
          "MultiEntry": false,
          "CompleteRequired": {
            "Type": "self"
          },
          "CompleteRequiredRule": "sectionSelfDirectedPersonalAssistanceCompleteRule1",
          "Order": 85,
          "Sections": [],
          "Items": [
            {
              "Name": "ParticipantHasConsumerDirectedOrAgencyDirectedPersonalService",
              "DisplayName": "Participant has consumer-directed or agency-directed Personal Assistance, Respit" +
                  "e, or Companion services?",
              "Description": "Participant has consumer-directed or agency-directed Personal Assistance, Respit" +
                  "e, or Companion services?",
              "AdditionalDisplayName": "",
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ContentType": "bool",
              "IsRequired": true,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "ParticipantServingAsEmployerOfRecordForConsumerDirectedServices",
              "DisplayName": "Participant serving as Common Law Employer (CLE) for consumer-directed services:",
              "Description": "Participant serving as Common Law Employer (CLE) for consumer-directed services:",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Validations": null,
              "Order": 1
            }, {
              "Name": "RelationshipToParticipant",
              "DisplayName": "Relationship to Participant",
              "Description": "Relationship to Participant",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Validations": null,
              "Order": 2
            }, {
              "Name": "ParticipantsProvidingPaidDirectSupport",
              "DisplayName": "Participant(s) providing paid direct support",
              "Description": "Participant(s) providing paid direct support",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Validations": null,
              "Order": 3
            }, {
              "Name": "RelationshipToParticipant2",
              "DisplayName": "Relationship to Participant",
              "Description": "Relationship to Participant",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Validations": null,
              "Order": 4
            }, {
              "Name": "NameOfUnpaidPrimaryCaregiver",
              "DisplayName": "Name of unpaid primary caregiver",
              "Description": "Name of unpaid primary caregiver",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "Display": false,
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 5
            }, {
              "Name": "TypeOfSupportProvidedByUnpaidPrimaryCaregiver",
              "DisplayName": "Describe the type of support provided by the unpaid primary caregiver",
              "Description": "Describe the type of support provided by the unpaid primary caregiver",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "Display": false,
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 6
            }, {
              "Name": "ParticipantRequiresSupportWithActivitiesOfDailyLiving",
              "DisplayName": "Participant requires support with activities of daily living?",
              "Description": "Participant requires support with activities of daily living?",
              "AdditionalDisplayName": "If yes, describe:",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 7
            }, {
              "Name": "ParticipantExperiencesDifficultyBeingOrientedTo",
              "DisplayName": "Participant experiences difficulty being oriented to place, time, location?",
              "Description": "Participant experiences difficulty being oriented to place, time, location?",
              "AdditionalDisplayName": "If yes, describe:",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 8
            }, {
              "Name": "ParticipantNeedsSupportForBehavioralConcerns",
              "DisplayName": "Participant needs support for behavioral concerns?",
              "Description": "Participant needs support for behavioral concerns?",
              "AdditionalDisplayName": "If yes, describe:",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 9
            }, {
              "Name": "ParticipantHasLimitedRangeOfMotion",
              "DisplayName": "Participant has limited range of motion?",
              "Description": "Participant has limited range of motion?",
              "AdditionalDisplayName": "If yes, describe:",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "ParticipantNeedsAssistanceWithTakingMedications",
              "DisplayName": "Participant needs assistance with taking medications?",
              "Description": "Participant needs assistance with taking medications?",
              "AdditionalDisplayName": "If yes, describe:",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 11
            }
          ]
        }, {
          "Level": 1,
          "Name": "HealthInformation",
          "EditLink": "SectionEdit",
          "DisplayName": "Health Information",

          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 90,
          "Sections": [
            {
              "Level": 2,
              "Name": "ActiveMedicalAndBehavioralSupportNeeds",
              "DisplayName": "Identified Health and Behavioral Support Needs",
              "Description": "All active needs related to health, mental health, or behavioral support needs, " +
                  "must be addressed in separate outcomes in the plan. When present, this includes " +
                  "the eight identified health risks: skin breakdown, aspiration pneumonia, f" +
                  "alls, urinary tract infections, dehydration, constipation and bowel obstruction," +
                  " sepsis, and seizures.",
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 0,
              "Sections": [],
              "Items": [
                {
                  "Name": "NeedsIdentified",
                  "DisplayName": "Active health or behavioral support needs identified on the Annual Support Needs" +
                    " Risk Assessment or elsewhere? ",
                  "AdditionalDisplayName": "If yes, list needs individually below:",
                  "IsRequired": true,
                  "CompleteRequired":true,
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "bool",
                  "Order": 0
                }
              ]
            }, {
              "Level": 2,
              "Name": "BehavioralCrisisSupports",
              "DisplayName": "Behavioral and Crisis Supports",
              "MultiEntry": false,
              "CompleteRequired": false,
              "Order": 10,
              "Sections": [],
              "Items": [
                {
                  "Name": "BehavioralSupportPlan",
                  "DisplayName": "Is there a behavioral supports plan?",
                  "Description": "Is there a behavioral supports plan?",
                  "AdditionalDisplayName": "Location of plan:",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 0
                }, {
                  "Name": "CrisisSupportPlan",
                  "DisplayName": "Is there a crisis supports plan?",
                  "Description": "Is there a crisis supports plan?",
                  "AdditionalDisplayName": "Location of plan:",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": false,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "DescribeSupports ",
                  "DisplayName": "Describe previous and current behavioral supports:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": false,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "SeriousIncidents",
              "DisplayName": "Serious Incidents",

              "MultiEntry": false,
              "Order": 20,
              "Sections": [],
              "Items": [
                {
                  "Name": "DescribeIncidents",
                  "DisplayName": "Describe serious incidents during the past year:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": false,
                  "Validations": null,
                  "Order": 0
                }
              ]
            }, {
              "Level": 2,
              "Name": "Medications",
              "DisplayName": "Medications",
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 30,
              "Sections": [
                {
                  "Level": 3,
                  "Name": "ListOfMedications",
                  "DisplayName": "List of Medications",
                  "Description": null,
                  "MultiEntry": true,
                  "CompleteRequired": true,
                  "Order": 0,
                  "Section": [],
                  "Items": [
                    {
                      "Name": "Name",
                      "DisplayName": "a.Name:",
                      "Description": "Name",
                      "Type": "Textbox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "Dose",
                      "DisplayName": "b.Dose:",
                      "Description": "Dose",
                      "Type": "Textbox",
                      "ValueType": "Number",
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "Unit",
                      "DisplayName": "c.Unit:",
                      "Description": "Unit",
                      "Type": "Dropdown",
                      "ValueType": "String",
                      "DataSource": {
                        "LookupCategory": "planofcareunittypes"
                      },
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "Route",
                      "DisplayName": "d.Route:",
                      "Description": "Route",
                      "Type": "Dropdown",
                      "ValueType": "String",
                      "DataSource": {
                        "LookupCategory": "planofcareroutetypes"
                      },
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "Frequency",
                      "DisplayName": "e.Frequency:",
                      "Description": "Frequency",
                      "Type": "Dropdown",
                      "ValueType": "String",
                      "DataSource": {
                        "LookupCategory": "planofcaremedicationfrequencytypes"
                      },
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "PRN",
                      "DisplayName": "f.PRN:",
                      "Description": "PRN",
                      "Type": "Dropdown",
                      "ValueType": "String",
                      "DataSource": {
                        "LookupCategory": "planofcareprntypes"
                      },
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "ATCorNDCcode",
                      "DisplayName": "g.ATC or NDC code:",
                      "Description": "ATCorNDCcode",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }

                  ]
                }
              ],
              "Items":[]
            },{
              "Level": 2,
              "Name": "Diagnoses",
              "DisplayName": "Diagnoses",
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 35,
              "Sections":[ 
                {
                  "Level": 3,
                  "Name": "OtherDiseaseDiagnoses",
                  "DisplayName": "Other Disease Diagnoses",
                  "Description": null,
                  "MultiEntry": true,
                  "CompleteRequired": true,
                  "Order": 0,
                  "Section": [],
                  "Items": [
                    {
                      "Name": "ICDCode",
                      "DisplayName": "ICD Code:",
                      "Description": "Name",
                      "Type": "Textbox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "Description",
                      "DisplayName": "Description:",
                      "Description": "Name",
                      "IsRequired": true,
                      "Type": "Textbox",
                      "ValueType": "String",
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "DiseaseCode",
                      "DisplayName": "Disease Code:",
                      "Description": "disease code",
                      "IsRequired": true,
                      "Type": "RadioButtonList",
                      "Style":'Vertical',
                      "ValueType": "LookupIdentifier",
                      "DataSource": {
                        "LookupCategory": "planofcarediseasediagnoses"
                      },
                      "Validations": null,
                      "Order": 0
                    }
                  ]
                }
              ],
              "Items":[]
              }, {
              "Level": 2,
              "Name": "PhysicalConditions",
              "DisplayName": "Physical and Health Conditions",
              "MultiEntry": false,
              "CompleteRequired": false,
              "Order": 40,
              "Sections": [],
              "Items": [
                {
                  "Name": "ChronicConditions",
                  "DisplayName": "Chronic health conditions? ",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Chronic health conditions? ",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 0
                }, {
                  "Name": "ConcernsHistory",
                  "DisplayName": "Health Concerns? ",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Health Concerns? ",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "cognitiveconcerns",
                  "DisplayName": "Any cognitive concerns? ",
                  "Description": "Health Concerns? ",
                  "AdditionalDisplayName": "If yes, provide a copy to relevant parties:",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "CurrentConditions",
                  "DisplayName": "Current health conditions?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Current health conditions?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "Limitations",
                  "DisplayName": "Current health-related limitations or restrictions?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Current health-related limitations or restrictions?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "SeriousHospitalizations",
                  "DisplayName": "Serious hospitalizations in past year?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Serious hospitalizations in past year?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }, {
                  "Name": "CommunicableDiseases",
                  "DisplayName": "Communicable diseases?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Communicable diseases?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 50
                }, {
                  "Name": "AlcoholUse",
                  "DisplayName": "Any alcohol use?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Any alcohol use?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 80
                }, {
                  "Name": "TreatmentHistory",
                  "DisplayName": "History of treatment related to alcohol/drugs/medication use?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "History of treatment related to alcohol/drugs/medication use?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 90
                }, {
                  "Name": "PhysicalIssues",
                  "DisplayName": "Issues with physical intimacy, pregnancy, or child rearing?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Issues with physical intimacy, pregnancy, or child rearing?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Display": false,
                  "Order": 100
                }, {
                  "Name": "ProtocolsOrRequirements",
                  "DisplayName": "Restrictive protocols or monitoring requirements?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Restrictive protocols or monitoring requirements? ",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Display": false,
                  "Order": 110
                }, {
                  "Name": "DietNeeds",
                  "DisplayName": "Special diet or nutritional needs?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Special diet or nutritional needs?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 120
                }
              ]
            }, {
              "Level": 2,
              "Name": "LastExamDates",
              "DisplayName": "Last Exam Dates",
              "MultiEntry": false,
              "Order": 50,
              "Sections": [],
              "Items": [
                {
                  "Name": "LastPhysicalExamDate",
                  "DisplayName": "Date of my last complete physical exam:",
                  "Description": "Date of my last complete physical exam:",
                  "Type": "DatePicker",
                  "ValueType": "DateTimeOffset",
                  "IsRequired": false,
                  "Validations": [
                    {
                      "Type": "max",
                      "Expression": "today",
                      "Message": "Date cannot be future."
                    }
                  ],
                  "Order": 0
                }, {
                  "Name": "PhysicalExamEstimatedOrApproximateDate",
                  "DisplayName": "Estimated/Approximate Date:",
                  "Description": "Estimated/Approximate Date:",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "Bool",
                  "IsRequired": false,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "PhysicalExamResult",
                  "DisplayName": "Examination Results (Physical Exam):",
                  "Description": "Examination Results (Physical Exam):",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": false,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "LastDentalExamDate",
                  "DisplayName": "Date of my last complete dental exam:",
                  "Description": "Date of my last complete dental exam:",
                  "Type": "DatePicker",
                  "ValueType": "DateTimeOffset",
                  "IsRequired": false,
                  "Validations": [
                    {
                      "Type": "max",
                      "Expression": "today",
                      "Message": "Date cannot be future."
                    }
                  ],
                  "Order": 30
                }, {
                  "Name": "DentalExamEstimatedOrApproximateDate",
                  "DisplayName": "Estimated/Approximate Date:",
                  "Description": "Estimated/Approximate Date:",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "Bool",
                  "IsRequired": false,
                  "Validations": null,
                  "Order": 40
                }, {
                  "Name": "DentalExamResult",
                  "DisplayName": "Examination Results (Dental  Exam):",
                  "Description": "Examination Results (Dental  Exam):",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": false,
                  "Validations": null,
                  "Order": 50
                }
              ]
            }, {
              "Level": 2,
              "Name": "Allergies",
              "DisplayName": "Allergies",

              "MultiEntry": false,
              "Order": 60,
              "Sections": [
                {
                  "Level": 2,
                  "Name": "Allergies",
                  "DisplayName": "Allergies",
                  "MultiEntry": true,
                  "Order": 0,
                  "Sections": [],
                  "Items": [
                    {
                      "Name": "Allergies",
                      "DisplayName": "Allergies",
                      "Description": "Allergies",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": false,
                      "Validations": null,
                      "Order": 0
                    }, {
                      "Name": "Reactions",
                      "DisplayName": "Reactions",
                      "Description": "Reactions",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": false,
                      "Validations": null,
                      "Order": 10
                    }
                  ]
                }
              ],
              "Items": []
            }
          ],
          "Items": [] 
        }, {
          "Level": 1,
          "Name": "CommunicationAssistiveTechnologyAndModifications",
          "DisplayName": "Communication, Assistive Technology, and Modifications",
          "EditLink": "SectionEdit",
          "MultiEntry": false,
          "CompleteRequired": true,
          "Display": true,
          "Order": 110,
          "Sections": [],
          "Items": [
            {
              "Name": "CommunicationSupport",
              "DisplayName": "Describe supports needed for communication:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "EquipmentSupport",
              "DisplayName": "Describe any adaptive equipment or assistive technology supports used:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 20
            }, {
              "Name": "Maintained",
              "DisplayName": "Describe how is equipment maintained and who is responsible:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 30
            }, {
              "Name": "BackupPlan",
              "DisplayName": "Describe the back-up plan for power outages if equipment is used:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 40
            }, {
              "Name": "EnvironmentalModifications",
              "DisplayName": "Describe any environmental modifications used:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 50
            }, {
              "Name": "ProfessionalEvaluation",
              "DisplayName": "Would a professional evaluation related to adaptive equipment, assistive technol" +
                  "ogy or other modifications be beneficial?",
              "AdditionalDisplayName": "If yes, describe:",
              "Description": "Would a professional evaluation related to adaptive equipment, assistive technol" +
                  "ogy or other modifications be beneficial?",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 60
            }, {
              "Name": "LegalIssues",
              "DisplayName": "Any current legal issues or problems?",
              "AdditionalDisplayName": "If yes, describe:",
              "Description": "Any current legal issues or problems?",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 70
            }, {
              "Name": "LegalAdviceNeeded",
              "DisplayName": "Any legal advice needed?",
              "AdditionalDisplayName": "If yes, describe:",
              "Description": "Any legal advice needed?",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 80
            }, {
              "Name": "ServiceSupport",
              "DisplayName": "Any concerns with accessing needed services or supports?",
              "AdditionalDisplayName": "If yes, describe:",
              "Description": "Any concerns with accessing needed services or supports?",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "ValidationExpression": null,
              "ValidationMessage": null,
              "Order": 90
            }, {
              "Name": "VotingSupport",
              "DisplayName": "Any support needed with voting?",
              "AdditionalDisplayName": "If yes, describe:",
              "Description": "Any support needed with voting?",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 100
            }
          ]
        }, {
          "Level": 1,
          "Name": "Education",
          "DisplayName": "Education",
          "MultiEntry": false,
          "EditLink": "SectionEdit",
          "CompleteRequired": true,
          "Display": true,
          "Order": 120,
          "Sections": [],
          "Items": [
            {
              "Name": "HighestEducationLevel",
              "DisplayName": "Highest level of education completed:",
              "Description": "Highest level of education completed:",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "EducationalHistory",
              "DisplayName": "Describe educational goals or needs:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 20
            }
          ]
        }, {
          "Level": 1,
          "Name": "Employment",
          "DisplayName": "Employment",
          "MultiEntry": false,
          "EditLink": "SectionEdit",
          "CompleteRequired": true,
          "Display": true,
          "Order": 130,
          "Sections": [
            {
              "Level": 2,
              "Name": "EmploymentSubSection",
              "DisplayName": "Employment Information",
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 0,
              "Sections": [],
              "Items": [
                {
                  "Name": "CurrentEmployment",
                  "DisplayName": "Current employment",
                  "Description": "Current employment",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 0
                },
                {
                  "Name": "SpecifyCurrentEmployment",
                  "DisplayName": "If yes, select",
                  "Description": "If yes, select",
                  "Type": "Dropdown",
                  "ValueType": "LookupIdentifier",
                  "IsRequired": true,
                  "DataSource": {
                    "LookupCategory": "planofcarecurrentemploymentypes"
                  },
                  "Display":false,
                  "HideColumn": true,
                  "Validations": null,
                  "ClassName":"row fieldset-container-three",
                  "Order": 1
                },
                {
                  "Name": "EmploymentInterest",
                  "DisplayName": "Is {{Parameters.PreferredName}} interested in employment or employment supports?",
                  "Description": "Is {{Parameters.PreferredName}} interested in employment or employment supports?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 10
                },
                {
                  "Name": "SpecifyInterestedEmployment",
                  "DisplayName": "If yes, select",
                  "Description": "If yes, select",
                  "Type": "CheckboxList",
                  "ValueType": "LookupIdentifier",
                  "IsRequired": true,
                  "DataSource": {
                    "LookupCategory": "planofcareinterestedemploymentypes"
                  },
                  "Display":false,
                  "HideColumn": true,
                  "Validations": null,
                  "ClassName":"row fieldset-container-three",
                  "Orientation": "Vertical",
                  "Order": 11
                },
                {
                  "Name": "SpecifyOtherInterestedEmployment",
                  "DisplayName": "Other:",
                  "Description": "(140 character max)",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Display": false,
                  "Validations": [
                    {
                      "Type": "max",
                      "Value": 140,
                      "Message": "140 character max"
                    }],
                  "ClassName":"row fieldset-container-three",
                  "Order": 12
                },
                {
                  "Name": "Employed",
                  "DisplayName": "Has {{Parameters.PreferredName}} ever been employed?",
                  "Description": "Has {{Parameters.PreferredName}} ever been employed?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "WorkDesire",
                  "DisplayName": "Following a conversation about employment, does the person indicate a desire to " +
                      "work?",
                  "Description": "Following a conversation about employment, does the person indicate a desire to " +
                      "work?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "NotInterestedInWorkReason",
                  "DisplayName": "Individual is not interested in work due to childhood or retirement age?",
                  "Description": "Individual is not interested in work due to childhood or retirement age?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": false,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 40
                }, {
                  "Name": "EmploymentBarriers",
                  "DisplayName": "Indicate all of the current barriers to employment:",
                  "Description": "Check all that apply:",
                  "Type": "CheckboxList",
                  "Style": "Vertical",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 50
                }, {
                  "Name": "EmploymentBarriersOtherDescribe",
                  "DisplayName": "Please describe:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Display": false,
                  "Validations": null,
                  "Order": 60
                }, {
                  "Name": "EmploymentSupportsNecessary",
                  "DisplayName": "Describe the supports necessary to address barriers and achieve employment. If t" +
                      "he person does not indicate a desire to work, describe how the person has been o" +
                      "r will be educated about employment, including but not limited to exploring empl" +
                      "oyment opportunities available in their community:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 70
                }
              ]
            }, {
              "Level": 2,
              "Name": "AlternatesToWork",
              "DisplayName": "Alternates to work",
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 1,
              "Sections": [],
              "Items": [
                {
                  "Name": "Volunteered",
                  "DisplayName": "Has {{Parameters.PreferredName}} ever volunteered?",
                  "Description": "Has {{Parameters.PreferredName}} ever volunteered?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 0
                }, {
                  "Name": "CurrentVolunteer",
                  "DisplayName": "Does {{Parameters.PreferredName}} currently volunteer?",
                  "Description": "Does {{Parameters.PreferredName}} currently volunteer?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "InvolvedInCommunityEngagementActivities ",
                  "DisplayName": "Is {{Parameters.PreferredName}} involved in activities of community engagement?",
                  "Description": "Is {{Parameters.PreferredName}} involved in activities of community engagement?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "CommunityEngagementDesire",
                  "DisplayName": "Following a conversation about community engagement/coaching does the person ind" +
                      "icate a desire to be engaged in the community?",
                  "Description": "Following a conversation about community engagement/coaching does the person ind" +
                      "icate a desire to be engaged in the community?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "CommunityEngagementBarriers",
                  "DisplayName": "Indicate all of the current barriers to CE/CC:",
                  "Description": "Check all that apply:",
                  "Type": "CheckboxList",
                  "Style": "Vertical",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 40
                }, {
                  "Name": "CommunityEngagementBarriersOtherDescribe",
                  "DisplayName": "Please describe:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Display": false,
                  "Validations": null,
                  "Order": 50
                }, {
                  "Name": "CommunityEngagementSupportsNecessary",
                  "DisplayName": "Describe the supports necessary to address barriers and achieve community engage" +
                      "ment. If the person does not indicate a desire to engage with the community, des" +
                      "cribe how the person has been or will be educated about community engagement inc" +
                      "luding but not limited to exploring opportunities available in their community:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 60
                },
                {
                  "Name": "ReferralToEmploymentProgramCompleted",
                  "DisplayName": "Referral to OVR or OLTL Employment Program completed",
                  "Description": "Referral to OVR or OLTL Employment Program completed",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": null,
                  "Order": 70
                },
                {
                  "Name": "SpecifyProgramCompletedDate",
                  "DisplayName": "If yes, select",
                  "Description": "If yes, select",
                  "Type": "DatePicker",
                  "ValueType": "DateTimeOffset?",
                  "IsRequired": true,
                  "Display":false,
                  "Validations": null,
                  "ClassName":"row fieldset-container-three",
                  "Order": 71
                },
                {
                  "Name": "EmploymentPlanningGoals",
                  "DisplayName": "Employment Planning Goals",
                  "Description": "Employment Planning Goals",
                  "Type": "Dropdown",
                  "ValueType": "LookupIdentifier",
                  "IsRequired": true,
                  "DataSource": {
                    "LookupCategory": "planofcareemploymentplanninggoals"
                  },
                  "Validations": null,
                  "Order": 80
                },
                {
                  "Name": "ParticipantEmploymentStatus",
                  "DisplayName": "Participant Employment Status",
                  "Description": "Participant Employment Status",
                  "Type": "Dropdown",
                  "ValueType": "LookupIdentifier",
                  "IsRequired": true,
                  "DataSource": {
                    "LookupCategory": "planofcareparticipantemploymentstatus"
                  },
                  "Validations": null,
                  "Order": 90
                },
              ]
            }
          ],
          "Items": []
        }, {
          "Level": 1,
          "Name": "EmergencyPlans",
          "DisplayName": "Back-up and Emergency Plans",
          "MultiEntry": false,
          "EditLink": "SectionEdit",
          "CompleteRequired": true,
          "Display": true,
          "Order": 150,
          "Sections": [],
          "Items": [
            {
              "Name": "ProviderUnShowupSteps",
              "DisplayName": "Describe steps to take if a provider doesn’t show-up:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "ActivityCanceledSteps",
              "DisplayName": "Describe steps to take if the day program/work or other activity is canceled, cl" +
                  "oses, or you have to leave or some other reason:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "NaturalDisaster",
              "DisplayName": "Describe steps to take when a natural disaster occurs:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 20
            }, {
              "Name": "FuturePlan",
              "DisplayName": "Describe plan for future living arrangements:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 30
            }, {
              "Name": "InclusiveSupport",
              "DisplayName": "Describe supports needed to transition to more inclusive settings:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": null,
              "Order": 40
            }, {
              "Name": "TollFreeNumber",
              "DisplayName": "Toll Free Number: 855-235-5115",              
              "Type": "Info"          
            }
          ]
        }, {
          "Level": 1,
          "Name": "AdditionalComments",
          "DisplayName": "Additional Comments",
          "MultiEntry": false,
          "EditLink": "SectionEdit",
          "CompleteRequired": false,
          "Display": true,
          "Order": 170,
          "Sections": [],
          "Items": [
            {
              "Name": "AdditionalComment",
              "DisplayName": "Additional Comments:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
              "Validations": null,
              "Order": 0
            }
          ]
        }
      ],
      "Items": []
    }, {
      "Level": 0,
      "Name": "PersonalProfile",
      "DisplayName": "Part II. Personal Profile",
      "MultiEntry": false,
      "CompleteRequired": false,
      "Order": 20,
      "Sections": [
        {
          "Level": 1,
          "Name": "Meeting",
          "DisplayName": "{{Parameters.PreferredName}}’s Meeting",
          "MultiEntry": false,
          "EditLink": "SectionEdit",
          "CompleteRequired": false,
          "Order": 10,
          "Sections": [],
          "Items": [
            {
              "Name": "PlanningProcess",
              "DisplayName": "How I am best supported to direct my planning process:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "AnnualPlanning",
              "DisplayName": "My preferences for planning:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 10
            }, {
              "Name": "DateTimeLocationForMeeting",
              "DisplayName": "My preferred date, time, and location for my meeting:",

              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 20
            }
          ]
        }, {
          "Level": 1,
          "Name": "TalentsContributions",
          "EditLink": "SectionEdit",
          "DisplayName": "{{Parameters.PreferredName}}’s Strengths",
          "MultiEntry": true,
          "CompleteRequired": false,
          "Order": 20,
          "Sections": [],
          "Items": [
            {
              "Name": "GreatThings",
              "DisplayName": "List great things about {{Parameters.PreferredName}}",
              "Type": "Textarea",
              "CompleteRequired": true,
              "ValueType": "string",
              "IsRequired": true,
              "Validations": null,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "LifeToday",
          "EditLink": "SectionEdit",
          "DisplayName": "{{Parameters.PreferredName}}’s Life Today",
          "MultiEntry": false,
          "CompleteRequired": false,
          "Order": 30,
          "Sections": [],
          "Items": [
            {
              "Name": "GreatThings",
              "DisplayName": "Briefly describe how {{Parameters.PreferredName}} currently lives: ",
              "Description": "e.g. type of setting, alone, with others",
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "LifeWants",
          "DisplayName": "The Life {{Parameters.PreferredName}} Wants",
          "MultiEntry": false,
          "EditLink": "SectionEdit",
          "CompleteRequired": false,
          "Order": 40,
          "Sections": [],
          "Items": [
            {
              "Name": "DescribeLifeVision",
              "DisplayName": "Describe {{Parameters.PreferredName}}’s vision of the life he or she wants:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "GetLifeWants",
          "DisplayName": "Getting the Life {{Parameters.PreferredName}} Wants",
          "MultiEntry": false,
          "CompleteRequired": false,
          "EditLink": "SectionEdit",
          "Order": 50,
          "Sections": [
            {
              "Level": 2,
              "Name": "WorkAlternates",
              "DisplayName": "Work and Alternates to Work",
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 1,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}:",
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "LearningOtherPursuits",
              "DisplayName": "Learning & Other Pursuits",

              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 20,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}} :",
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",

                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "CommunityInterests",
              "DisplayName": "Community & Interests",

              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 30,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",

                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "Relationships",
              "DisplayName": "Relationships",

              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 40,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",

                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "Home",
              "DisplayName": "Home",

              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 50,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",

                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "TransportationTravel",
              "DisplayName": "Transportation and Travel",

              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 60,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",

                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "Money",
              "DisplayName": "Money",

              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 70,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",

                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "HealthSafety",
              "DisplayName": "Health & Safety:",

              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 80,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working:",

                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}:",

                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR):",

                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 40
                }
              ]
            }
          ],
          "Items": []
        }
      ],
      "Items": []
    }, {
      "Level": 0,
      "Name": "SharedPlannings",
      "DisplayName": "Part III. Shared Planning",
      "Order": 30,
      "BusinessComponent": "PocSharedPlanning",
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "Agreement",
      "DisplayName": "Part IV. Agreements",
      "MultiEntry": false,
      "CompleteRequired": true,
      "Order": 40,
      "Sections": [
        {
          "Level": 1,
          "Name": "ServicesSatisfactionSurvey",
          "EditLink": "SectionEdit",
          "DisplayName": "Participant Experience Survey",
          "MultiEntry": false,
          "CompleteRequired": false,
          "Display": true,
          "Order": 10,
          "Sections": [],
          "Items": [
            {
              "Name": "MyPlanMatchQ1",
              "DisplayName": "Do you know what services you receive?",
              "Type": "RadioButtonWithSpecify",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "Order": 0,
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "SpecifyOnNo": true 
            },
              {
               "Name": "ServicesReceived",
               "DisplayName": "Please select the services you receive:",
               "Type": "CheckboxList",
               "ValueType": "LookupIdentifer",
               "DataSource": {
                 "LookupCategory": "planofcareservicesreceived"
               },
               "IsRequired": true,
               "CompleteRequired": false,  
               "Validations": null,
               "Display": false,
               "ClassName":"row fieldset-container-three",
               "Orientation": "Vertical",
               "Order": 1
             }, 
            {
              "Name": "MyPlanMatchQ2",
              "DisplayName": "I am treated respectfully when staff is performing services.",
              "Description": "I am treated respectfully when staff is performing services.",              
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "Order": 10,                   
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "Type": "RadioButtonWithSpecify",
              "SpecifyOnNo": true             

            }, {
              "Name": "MyPlanMatchQ3",
              "DisplayName": "I determine when and where I receive my services.",
              "Type": "RadioButtonWithSpecify",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "Order": 20,
              "SpecifyOnNo": true 
            }, {
              "Name": "MyPlanMatchQ4",
              "DisplayName": "I am satisfied with the services I receive.",
              "Type": "RadioButtonWithSpecify",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "Order": 30,
              "SpecifyOnNo": true 
            }, {
              "Name": "MyPlanMatchQ5",
              "DisplayName": "I receive my services as scheduled consistently.",
              "Type": "RadioButtonWithSpecify",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "Order": 40,
              "SpecifyOnNo": true 
            }, {
              "Name": "MyPlanMatchQ6",
              "DisplayName": "My services help me to remain in the community.",
              "Type": "RadioButtonWithSpecify",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "Order": 50,
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "SpecifyOnNo": true 
            }, {
              "Name": "MyPlanMatchQ7",
              "DisplayName": "I know who to call if I have an issue with the staff providing my services.",
              "Type": "RadioButtonWithSpecify",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "Order": 60,
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "SpecifyOnNo": true 
            }, {
              "Name": "MyPlanMatchQ8",
              "DisplayName": "I participated in developing my PCSP.",
              "Type": "RadioButtonWithSpecify",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Validations": null,
              "Order": 70,
              "AdditionalDisplayName": "Action taken to address Participant's concern:",
              "SpecifyOnNo": true 
            }, {
              "Name": "SatisfactionSurveyNotes",
              "DisplayName": "Notes:",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "Validations": null,
              "Display": true,
              "Order": 80
            }
          ]

        }, {
          "Level": 1,
          "Name": "AgreementSignatures",
          "DisplayName": "Signatures",
          "Description": "This Plan of Care was developed based on an assessment with the Participant and " +
              "planning team. We discussed the proposed services to be delivered, alternative s" +
              "ervices, risks or benefits, and reasons for choosing each option. Outcomes and a" +
              "ctivities that are not accomplished by the target dates will be reviewed along w" +
              "ith the reasons for lack of progress providing the Participant an opportunity to" +
              " make an informed choice of how to proceed.",
          "MultiEntry": true,
          "CompleteRequired": true,
          "EditLink": "SectionEdit",
          "Display": true,
          "Order": 30,
          "Sections": [],
          "Popup":
            {
              "Title":"Incomplete Section Notice",
              "Message":"Part I.Essential Information and Part III.Shared Planning sections must be completed before you are able to save a signature.",
              "IndicatorPath":"PlanOfCare.IsShowUncompletedPopupForSignature",
            },
            "Incomplete": ".EssentialInformation.SharedPlannings",
          "Items": [
            {
              "Name": "SignerType",
              "DisplayName": "Signer Type:",
              "Description": "Signer Type",
              "Type": "AttributeFilterDropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "Validations": null,
              "Order": 0
            },  {
              "Name": "SignatureType",
              "DisplayName": "Signature Type:",
              "Description": "Signature Type",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "Validations": null,
              "Order": 2
            }, {
              "Name": "Base64Data",
              "DisplayName": "Signature",
              "Description": "Signature",
              "Type": "SignaturePad",
              "ContentType": "String",
              "Display": false,
              "IsSignature": true,
              "IsRequired": true,
              "Validations": null,
              "Order": 3
            }, {
              "Name": "PrintName",
              "DisplayName": "Print Name:",
              "Description": "Print Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Validations": null,
              "Order": 4
            }, {
              "Name": "RelationshipOrService",
              "DisplayName": "Relationship/Service:",
              "Description": "Relationship/Service",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Validations": null,
              "Order": 5
            }, {
              "Name": "SignedDate",
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
            },{
              "Name": "Reason",
              "DisplayName": "Reason:",
              "Description": "Reason",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "DataSource": {
                "LookupCategory": "planofcareunabletosignreasontypes"
              },
              "IsRequired": true,
              "Validations": null,
              "Display": false,
              "CompleteRequired": true,
              "Order": 7
            }, {
              "Name": "Id",
              "DisplayName": "Id",
              "Description": "Id",
              "Type": "String",
              "ValueType": "string",
              "IsRequired": false,
              "Display": false,
              "Validations": null,
              "Order": 8,
              "HideColumn": true
            }, {
              "Name": "OnBehalfOfOuId",
              "DisplayName": "OrganizationUnit Id",
              "Description": "OrganizationUnit Id",
              "Type": "String",
              "ValueType": "string",
              "IsRequired": false,
              "Display": false,
              "Validations": null,
              "Order": 9,
              "HideColumn": true
            }, {
              "Name": "OnBehalfOfOuName",
              "DisplayName": "OrganizationUnit Name",
              "Description": "OrganizationUnit Name",
              "Type": "String",
              "ValueType": "string",
              "IsRequired": false,
              "Display": false,
              "Validations": null,
              "Order": 10,
              "HideColumn": true
            }, {
              "Name": "StaffName",
              "DisplayName": "Staff User",
              "Description": "Staff User",
              "Type": "String",
              "ValueType": "string",
              "IsRequired": false,
              "Display": false,
              "Validations": null,
              "Order": 11,
              "HideColumn": false
            }
          ]
        }, {
          "Level": 1,
          "Name": "PlanOfCareReviewDates",
          "DisplayName": "Plan of Care Review Dates",
          "EditLink": "SectionEdit",
          "MultiEntry": true,
          "CompleteRequired": false,
          "Display": true,
          "Order": 50,
          "Sections": [],
          "CustomCalculateFunctions":[{"Triggers":['EncounterDate','ReviewType'],'Functions':['calculateReviewDate']}],
          "Items": [
            {
              "Name": "ReviewNumber",
              "DisplayName": "Line Number",
              "Description": "Line Number",
              "Type": "OrderNumber",
              "ValueType": "string",
              "IsRequired": false,
              "Display": false,
              "Validations": null,
              "Order": 0,
              "HideColumn": false
            },
            {
              "Name": "ReviewDate",
              "DisplayName": "Date Recorded:",
              "Description": "Date Recorded",              
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "ReadOnly": true,
              "Value": new Date(),    
              "IsRequired" : true,      
              "Order": 10
            },            
            {
              "Name": "ReviewType",
              "DisplayName": "Review Type:",
              "Type": "AttributeFilterDropdown",
              "FilterSource": "Setting.UniqueAttribute.Guid",
              "ValueType": "LookupIdentifier",
              "DataSource": {
                
                "LookupCategory": "planofcarereviewtypes"
              },              
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 20
            },
            {
              "Name": "EncounterDate",
              "DisplayName": "Encounter Date:",
              "Description": "Encounter Date",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset",
              "IsRequired": true,              
              "CompleteRequired": true,
              "Validations": [
                {
                  "Type": "max",
                  "Expression": "today",
                  "Message": "No future dates allowed.",
                  
                }
              ],
              "Order": 30
            },
            {
              "Name": "EncounterDateWarning",
              "DisplayName": "Warning: The Encounter Date is not the same as the Service Coordinator Signature Date.",              
              "Type": "Info",
              "Order": 40,
              "ClassName": "text-warning",
              "Display": false,
              "HideColumn":true,
            },
            {
              "Name": "ExpectedNextReviewDate",
              "DisplayName": "Expected Next Review Date:",
              "Description": "Expected Next Review Date",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "ReadOnly": true,    
              "Order": 50
            },  
            {
              "Name": "ReviewComment",
              "DisplayName": "Comments / Notes:",
              "Type": "Textarea",
              "CompleteRequired": false,
              "ValueType": "string",
              "IsRequired": false,
              "Validations": null,
              "Order": 60
            }
          ]
        }
      ],
      "Items": []
    }, {
      "Level": 0,
      "Name": "Services",
      "DisplayName": "Part V. Services",
      "EditLink": "SectionEdit",
      "BusinessComponent": "PocServices",
      "MultiEntry": true,
      "CompleteRequired": false,
      "IsRequired": false,
      "Sections": [],
      "Order": 50,
      "Items": []
    }, {
      "Level": 0,
      "Name": "Snapshot",
      "DisplayName": "Plan of Care Snapshots",
      "BusinessComponent": "Snapshot",
      "CompleteRequired": false,
      "Order": 60,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "Attachment",
      "DisplayName": "Attachment",
      "BusinessComponent": "Attachment",
      "CompleteRequired": false,
      "Order": 70,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "FormNotes",
      "DisplayName": "Approach",
      "BusinessComponent": "FormNotes",
      "CompleteRequired": false,
      "Order": 80,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "AuditTrail",
      "DisplayName": "Changes History",
      "BusinessComponent": "AuditTrail",
      "CompleteRequired": false,
      "Order": 90,
      "Sections": [],
      "Items": []
    }
  ]
};

export default function PlanOfCare() {
  return new Promise((resolve, reject) => {
    metadata.Options = Object.assign({}, options);
    metadata.Rules = Object.assign([], rules);
    metadata.views = Object.assign({}, views);
    resolve(Object.assign({}, metadata));
  });
}