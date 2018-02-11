import {ISP_SIGNATURE_TYPE_IDS, ISP_SIGNER_TYPE_IDS} from 'utils/constants'
import rules from './rules';
import options from './options';
import views from './view';

const metadata = {
  "Id": "mdas1",
  "Name": "IndividualSupportPlan",
  "FormDescriptor": "ISP",
  "LookupPrefix": "isp",
  "Title": "Individual Support Plan",
   "LeftActions": [
    {
      "Caption": "Back to List",
      "Path": "List",
      "Type": "razor",
      "Parameters": [
       {
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
      "DisplayName": "Overview",
      "BusinessComponent": "Overview",
      "Order": 5,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "Providers",
      "DisplayName": "Providers",
      "BusinessComponent":"ProvidersSection",
      "Order": 8,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "EssentialInformation",
      "DisplayName": "Part I. Essential Information",
      "Description": null,
      "MultiEntry": false,
      "CompleteRequired": true,
      "Order": 10,
      "Sections": [
        {
          "Level": 1,
          "Name": "ContactInformation",
          "DisplayName": "Contact Information",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 10,
          "Sections": [],
          "Items": [
            {
              "Name": "LastName",
              "DisplayName": "Legal Last Name",
              "Description": "Legal Last Name",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 0
            }, {
              "Name": "MiddleName",
              "DisplayName": "Legal Middle Name",
              "Description": "Legal Middle Name",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 1
            }, {
              "Name": "FirstName",
              "DisplayName": "Legal First Name",
              "Description": "Legal First Name",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 2
            }, {
              "Name": "PreferredName",
              "DisplayName": "Preferred Name",
              "Description": "Preferred Name",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 3
            }, {
              "Name": "SocialSecurityNumber",
              "DisplayName": "Social Security Number",
              "Description": "Social Security Number",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Mask": "***-**-",
              "Order": 4
            }, {
              "Name": "DateOfBirth",
              "DisplayName": "Date of Birth",
              "Description": "Date of Birth",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 5
            }, {
              "Name": "Gender",
              "DisplayName": "Gender",
              "Description": "Gender",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 6
            }, {
              "Name": "Address",
              "DisplayName": "Address",
              "Description": "Address",
              "Type": "Address",
              "ValueType": "object",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 7
            }, {
              "Name": "CsbBhaAdmissionDate",
              "DisplayName": "CSB/BHA Admission Date",
              "Description": "CSB/BHA Admission Date",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "ReadOnly": false,
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 8
            }, {
              "Name": "HomePhone",
              "DisplayName": "Home Phone",
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
              "DisplayName": "Cell Phone",
              "Description": "Cell Phone",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
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
              "DisplayName": "Email",
              "Description": "Email",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": [
                {
                  "Type": 'regex',
                  "Expression": '^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}' +
                    '\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
                  "Message": 'Please input a valid email address.'
                }
              ],
              "Order": 11
            }, {
              "Name": "MedicaidNumber",
              "DisplayName": "Medicaid Number",
              "Description": "Medicaid Number",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Mask": '********-',
              "Order": 12
            }, {
              "Name": "SupportCoordinatorCaseManager",
              "DisplayName": "Support Coordinator/Case Manager",
              "Description": "Support Coordinator/Case Manager",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 13
            }
          ]
        }, {
          "Level": 1,
          "Name": "Representation",
          "DisplayName": "Representation",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 20,
          "Sections": [],
          "Items": [
            {
              "Name": "IndividualHasTheFollowing",
              "DisplayName": "Individual has the following",
              "Description": "Individual has the following",
              "Type": "CheckboxList",
              "ValueType": "LookupIdentifer",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 0
            }, {
              "Name": "IndividualHasPowerOfAttorney",
              "DisplayName": "Individual has a power of attorney",
              "Description": "Individual has a power of attorney",
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "ValidationMessage": null,
              "Order": 1
            }, {
              "Name": "SubstituteDecisionMaker",
              "DisplayName": "Are there any concerns with having or needing a substitute-decision maker? ",
              "Description": "Are there any concerns with having or needing a substitute-decision maker? ",
              "AdditionalDisplayName": "If yes, describe",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 2
            }, {
              "Name": "AuthorizedRepresentative",
              "DisplayName": "Decisions that the representative is authorized to make (check all that apply)",
              "Description": "Decisions that the representative is authorized to make (check all that apply)",
              "Type": "CheckboxList",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 3
            }
          ]
        }, {
          "Level": 1,
          "Name": "EmergencyContacts",
          "DisplayName": "Emergency Contacts",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": true,
          "CompleteRequired": true,
          "Order": 30,
          "Sections": [],
          "Items": [
            {
              "Name": "FirstName",
              "DisplayName": "First Name:",
              "Description": "First Name:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Order": 0
            }, {
              "Name": "LastName",
              "DisplayName": "Last Name:",
              "Description": "Last Name:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Order": 1
            }, {
              "Name": "MiddleName",
              "DisplayName": "Middle Name:",
              "Description": "Middle Name:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "Order": 3
            }, {
              "Name": "Phone",
              "DisplayName": "Phone:",
              "Description": "Phone:",
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
              "Order": 4
            }, {
              "Name": "Fax",
              "DisplayName": "Fax:",
              "Description": "Fax:",
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
              "Order": 5
            }, {
              "Name": "Email",
              "DisplayName": "Email:",
              "Description": "Email:",
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
              "Order": 6
            }, {
              "Name": "ContactType",
              "DisplayName": "Contact Type",
              "Description": "Contact Type",
              "Type": "Dropdown",
              "DataSource": {
                "LookupCategory": "ispcontacttypes"
              },
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "Order": 7
            }, {
              "Name": "ContactTypeOtherSpecify",
              "DisplayName": "Please specify contact type",
              "Description": null,
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Display": false,
              "Order": 8
            }, {
              "Name": "Address",
              "DisplayName": "Address",
              "Description": "Address",
              "Type": "Address",
              "ValueType": "Object",
              "IsRequired": false,
              "Order": 9
            }, {
              "Name": "EmergencyContactRelationship",
              "DisplayName": "Relationship:",
              "Description": "Relationship:",
              "Type": "CheckboxList",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "Order": 10
            }, {
              "Name": "EmergencyContactRelationshipOtherSpecify",
              "DisplayName": "Please specify relationship",
              "Description": null,
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Display": false,
              "Order": 81
            }
          ]
        }, {
          "Level": 1,
          "Name": "HealthcareContacts",
          "DisplayName": "Healthcare Contacts",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": true,
          "MaxOccurs": 10,
          "CompleteRequired": true,
          "Order": 40,
          "Sections": [],
          "Items": [
            {
              "Name": "FirstName",
              "DisplayName": "First Name:",
              "Description": null,
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Order": 0
            }, {
              "Name": "LastName",
              "DisplayName": "Last Name:",
              "Description": null,
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Order": 10
            }, {
              "Name": "Phone",
              "DisplayName": "Phone:",
              "Description": null,
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
              "Description": null,
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
              "Description": null,
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
              "Description": null,
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,

              "Order": 50
            }, {
              "Name": "Specialty",
              "DisplayName": "Specialty:",
              "Description": null,
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 60
            }, {
              "Name": "SpecialtyOtherSpecify",
              "DisplayName": "Please specify specialty:",
              "Description": null,
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Display": false,
              "Order": 61
            }
          ]
        }, {
          "Level": 1,
          "Name": "FriendsAndCommunityContacts",
          "DisplayName": "Friends and Community Contacts",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 50,
          "Sections": [
            {
              "Level": 2,
              "Name": "FriendsAndCommunityContactsList",
              "DisplayName": "Friends and Community Contacts",
              "Description": null,
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
                  "Order": 0
                }, {
                  "Name": "Relationship",
                  "DisplayName": "Relationship:",
                  "Description": "Relationship",
                  "Type": "TextBox",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": false,
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
              "Description": null,
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "Eligibility",
          "DisplayName": "Eligibility",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 60,
          "Sections": [],
          "Items": [
            {
              "Name": "DiagnosisDD",
              "DisplayName": "Diagnosis of DD:",
              "Description": "Diagnosis of DD",
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 0
            }, {
              "Name": "DateSISCompleted",
              "DisplayName": "Date current SIS completed:",
              "Description": "Date current SIS completed",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 10
            }, {
              "Name": "DatePsychological",
              "DisplayName": "Date of psychological (necessary for a diagnosis of ID):",
              "Description": "Date of psychological (necessary for a diagnosis of ID)",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 20
            }, {
              "Name": "SupportLevel",
              "DisplayName": "Support Level:",
              "Description": "Support Level",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 30
            }, {
              "Name": "DiagnosticDescription",
              "DisplayName": "Diagnostic Description:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 40
            }, {
              "Name": "Tier",
              "DisplayName": "Tier:",
              "Description": "Tier",
              "Type": "TextBox",
              "ValueType": "string",
              "ReadOnly": true,
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 50
            }, {
              "Name": "ExaminerName",
              "DisplayName": "Examiner Name:",
              "Description": "Examiner Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 60
            }, {
              "Name": "SSADisability",
              "DisplayName": "SSA Disability Determination Completed:",
              "Description": "SSA Disability Determination Completed",
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 70
            }
          ]
        }, {
          "Level": 1,
          "Name": "WaiverCosts",
          "DisplayName": "Waiver Costs",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": false,
          "Display": false,
          "Readonly": true,
          "Order": 70,
          "Sections": [],
          "Items": [
            {
              "Name": "AnnualServicesTotal",
              "DisplayName": "Annual Waiver Plan Services Total:",
              "Description": "Annual Waiver Plan Services Total:",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "NonWaiverAgencySupports",
          "DisplayName": "Non-Waiver Agency Paid Supports",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": true,
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
              "Order": 0
            }, {
              "Name": "ContactName",
              "DisplayName": "Contact Name:",
              "Description": "Contact Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
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
              "Description": null,
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 30
            }, {
              "Name": "DescribeSchedule",
              "DisplayName": "Describe Schedule:",
              "Description": null,
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 40
            }
          ]
        }, {
          "Level": 1,
          "Name": "SelfDirectedAndAgencyDirectedPersonalAssistance",
          "DisplayName": "Self-Directed and Agency-Directed Personal Assistance, Respite, and Companion Su" +
              "pports",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": {
            "Type": "self"
          },
          "CompleteRequiredRule": "sectionSelfDirectedPersonalAssistanceCompleteRule1",
          "Order": 85,
          "Sections": [],
          "Items": [
            {
              "Name": "PersonHasConsumerDirectedOrAgencyDirectedPersonalService",
              "DisplayName": "Person has consumer-directed or agency-directed Personal Assistance, Respite, or" +
                  " Companion services?",
              "Description": "Person has consumer-directed or agency-directed Personal Assistance, Respite, or" +
                  " Companion services?",
              "AdditionalDisplayName": "",
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ContentType": "bool",
              "IsRequired": true,
              "Order": 0
            }, {
              "Name": "PersonServingAsEmployerOfRecordForConsumerDirectedServices",
              "DisplayName": "Person serving as Employer of Record for consumer-directed services:",
              "Description": "Person serving as Employer of Record for consumer-directed services:",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Order": 1
            }, {
              "Name": "RelationshipToIndividual",
              "DisplayName": "Relationship to individual:",
              "Description": "Relationship to individual:",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Order": 2
            }, {
              "Name": "PersonsProvidingPaidDirectSupport",
              "DisplayName": "Person(s) providing paid direct support:",
              "Description": "Person(s) providing paid direct support:",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Order": 3
            }, {
              "Name": "RelationshipToIndividual2",
              "DisplayName": "Relationship to individual:",
              "Description": "Relationship to individual:",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Display": false,
              "Order": 4
            }, {
              "Name": "NameOfUnpaidPrimaryCaregiver",
              "DisplayName": "Name of unpaid primary caregiver:",
              "Description": "Name of unpaid primary caregiver:",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "Display": false,
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 5
            }, {
              "Name": "TypeOfSupportProvidedByUnpaidPrimaryCaregiver",
              "DisplayName": "Describe the type of support provided by the unpaid primary caregiver:",
              "Description": "Describe the type of support provided by the unpaid primary caregiver:",
              "AdditionalDisplayName": "",
              "Type": "TextBox",
              "ContentType": "string",
              "Display": false,
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 6
            }, {
              "Name": "PersonRequiresSupportWithActivitiesOfDailyLiving",
              "DisplayName": "Person requires support with activities of daily living?",
              "Description": "Person requires support with activities of daily living?",
              "AdditionalDisplayName": "If yes, describe",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 7
            }, {
              "Name": "PersonExperiencesDifficultyBeingOrientedTo",
              "DisplayName": "Person experiences difficulty being oriented to place, time, location?",
              "Description": "Person experiences difficulty being oriented to place, time, location?",
              "AdditionalDisplayName": "If yes, describe",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 8
            }, {
              "Name": "PersonNeedsSupportForBehavioralConcerns",
              "DisplayName": "Person needs support for behavioral concerns?",
              "Description": "Person needs support for behavioral concerns?",
              "AdditionalDisplayName": "If yes, describe",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 9
            }, {
              "Name": "PersonHasLimitedRangeOfMotion",
              "DisplayName": "Person has limited range of motion?",
              "Description": "Person has limited range of motion?",
              "AdditionalDisplayName": "If yes, describe",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 10
            }, {
              "Name": "PersonNeedsAssistanceWithTakingMedications",
              "DisplayName": "Person needs assistance with taking medications?",
              "Description": "Person needs assistance with taking medications?",
              "AdditionalDisplayName": "If yes, describe",
              "Type": "RadioButtonWithSpecify",
              "ContentType": "bool",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 11
            }
          ]
        }, {
          "Level": 1,
          "Name": "HealthInformation",
          "DisplayName": "Health Information",
          "EditLink": "SectionEdit",
          "Description": null,
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
                  "the eight DBHDS-identified health risks: skin breakdown, aspiration pneumonia, f" +
                  "alls, urinary tract infections, dehydration, constipation and bowel obstruction," +
                  " sepsis, and seizures.",
              "MultiEntry": false,
              "CompleteRequired": false,
              "Order": 0,
              "Sections": [],
              "Items": [
                {
                  "Name": "NeedsIdentified",
                  "DisplayName": "Active health or behavioral support needs identified on the Annual Support Needs" +
                    " Risk Assessment or elsewhere? ",
                  "AdditionalDisplayName": "If yes, list needs individually below:",
                  "Description": null,
                  "IsRequired": true,
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "bool",
                  "Order": 0
                }
              ]
            }, {
              "Level": 2,
              "Name": "BehavioralCrisisSupports",
              "DisplayName": "Behavioral and Crisis Supports",
              "Description": null,
              "MultiEntry": false,
              "Order": 10,
              "Sections": [],
              "Items": [
                {
                  "Name": "BehavioralSupportPlan",
                  "DisplayName": "Is there a behavioral supports plan?",
                  "Description": "Is there a behavioral supports plan?",
                  "AdditionalDisplayName": "Location of plan",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 0
                }, {
                  "Name": "CrisisSupportPlan",
                  "DisplayName": "Is there a crisis supports plan?",
                  "Description": "Is there a crisis supports plan?",
                  "AdditionalDisplayName": "Location of plan",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": false,
                  "Order": 10
                }, {
                  "Name": "DescribeSupports ",
                  "DisplayName": "Describe previous and current behavioral supports:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": false,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "SeriousIncidents",
              "DisplayName": "Serious Incidents",
              "Description": null,
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
                  "Order": 0
                }
              ]
            }, {
              "Level": 2,
              "Name": "Medications",
              "DisplayName": "Medications",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "CompleteRequiredRule": "sectionHealthInformationMedicationsCompleteRule1",
              "Order": 1,
              "Sections": [
                {
                  "Level": 2,
                  "Name": "Medication",
                  "DisplayName": "Medication",
                  "Description": null,
                  "MultiEntry": true,
                  "CompleteRequired": true,
                  "Order": 0,
                  "Sections": [],
                  "Items": [
                    {
                      "Name": "Medication",
                      "DisplayName": "Medication",
                      "Description": "Medication",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Order": 0
                    }, {
                      "Name": "Prescriber",
                      "DisplayName": "Prescriber",
                      "Description": "Prescriber",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Order": 10
                    }, {
                      "Name": "Dosage",
                      "DisplayName": "Dosage",
                      "Description": "Dosage",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Order": 20
                    }, {
                      "Name": "Frequency",
                      "DisplayName": "Frequency",
                      "Description": "Frequency",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Order": 30
                    }, {
                      "Name": "Route",
                      "DisplayName": "Route",
                      "Description": "Route",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Order": 40
                    }, {
                      "Name": "Psychotropic",
                      "DisplayName": "Psychotropic",
                      "Description": "Psychotropic",
                      "Type": "YesNoRadioButtons",
                      "ValueType": "Bool",
                      "IsRequired": true,
                      "Order": 50
                    }, {
                      "Name": "Date",
                      "DisplayName": "Date",
                      "Description": "Date",
                      "Type": "DatePicker",
                      "ValueType": "DateTimeOffset",
                      "IsRequired": true,
                      "Order": 60
                    }, {
                      "Name": "LocationInformation",
                      "DisplayName": "Location of side effect information",
                      "Description": "Location of side effect information",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": true,
                      "Order": 70
                    }
                  ]
                }
              ],
              "Items": [
                {
                  "Name": "MedicationsRequired",
                  "DisplayName": "Medications Required?",
                  "Description": null,
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "Order": 0
                }, {
                  "Name": "IsThereAnAdvancedDirective",
                  "DisplayName": "Is there an advanced directive?",
                  "Description": null,
                  "AdditionalDisplayName": "If yes, provide a copy to relevant parties:",
                  "Type": "RadioButtonWithSpecify",
                  "IsRequired": true,
                  "ValueType": "bool",
                  "Order": 10
                }, {
                  "Name": "ObtainedPsychotropicMedication",
                  "DisplayName": "Consent obtained for psychotropic medications?",
                  "Description": "Consent obtained for psychotropic medications?",
                  "Type": "Dropdown",
                  "ValueType": "LookupIdentifier",
                  "IsRequired": true,
                  "Order": 20
                }
              ]
            }, {
              "Level": 2,
              "Name": "PhysicalConditions",
              "DisplayName": "Physical and Health Conditions",
              "Description": null,
              "MultiEntry": false,
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
                  "Order": 0
                }, {
                  "Name": "ConcernsHistory",
                  "DisplayName": "History of health concerns? ",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "History of health concerns? ",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "CurrentConditions",
                  "DisplayName": "Current health conditions?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Current health conditions?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "Limitations",
                  "DisplayName": "Current health-related limitations or restrictions?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Current health-related limitations or restrictions?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "SeriousHospitalizations",
                  "DisplayName": "Serious hospitalizations in past year?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Serious hospitalizations in past year?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 40
                }, {
                  "Name": "CommunicableDiseases",
                  "DisplayName": "Communicable diseases?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Communicable diseases?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 50
                }, {
                  "Name": "FamilyIllnessConditions",
                  "DisplayName": "Serious illness or conditions among family?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Serious illness or conditions among family?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 60
                }, {
                  "Name": "SeriousIllness",
                  "DisplayName": "Serious illness or conditions among housemates",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Serious illness or conditions among housemates",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 70
                }, {
                  "Name": "AlcoholUse",
                  "DisplayName": "Any alcohol use?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Any alcohol use?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 80
                }, {
                  "Name": "TreatmentHistory",
                  "DisplayName": "History of treatment related to alcohol/drugs/medication use?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "History of treatment related to alcohol/drugs/medication use?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 90
                }, {
                  "Name": "PhysicalIssues",
                  "DisplayName": "Issues with physical intimacy, pregnancy, or child rearing?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Issues with physical intimacy, pregnancy, or child rearing?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 100
                }, {
                  "Name": "ProtocolsOrRequirements",
                  "DisplayName": "Restrictive protocols or monitoring requirements?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Restrictive protocols or monitoring requirements? ",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 110
                }, {
                  "Name": "DietNeeds",
                  "DisplayName": "Special diet or nutritional needs?",
                  "AdditionalDisplayName": "If yes, describe:",
                  "Description": "Special diet or nutritional needs?",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "Bool",
                  "IsRequired": true,
                  "Order": 120
                }
              ]
            }, {
              "Level": 2,
              "Name": "LastExamDates",
              "DisplayName": "Last Exam Dates",
              "Description": null,
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
                  "Name": "PhysicalExamDateIsApproximate",
                  "DisplayName": "Estimated/Approximate Date:",
                  "Description": "Estimated/Approximate Date:",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "Bool",
                  "IsRequired": false,
                  "Order": 10
                }, {
                  "Name": "PhysicalExamResult",
                  "DisplayName": "Examination Results (Physical Exam):",
                  "Description": "Examination Results (Physical Exam):",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": false,
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
                  "Name": "DentalExamDateIsApproximate",
                  "DisplayName": "Estimated/Approximate Date:",
                  "Description": "Estimated/Approximate Date:",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "Bool",
                  "IsRequired": false,
                  "Order": 40
                }, {
                  "Name": "DentalExamResult",
                  "DisplayName": "Examination Results (Dental  Exam):",
                  "Description": "Examination Results (Dental  Exam):",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": false,
                  "Order": 50
                }
              ]
            }, {
              "Level": 2,
              "Name": "Allergies",
              "DisplayName": "Allergies",
              "Description": null,
              "MultiEntry": false,
              "Order": 60,
              "Sections": [
                {
                  "Level": 2,
                  "Name": "Allergies",
                  "DisplayName": "Allergies",
                  "Description": null,
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
                      "Order": 0
                    }, {
                      "Name": "Reactions",
                      "DisplayName": "Reactions",
                      "Description": "Reactions",
                      "Type": "TextBox",
                      "ValueType": "String",
                      "IsRequired": false,
                      "Order": 10
                    }
                  ]
                }

              ],
              "Items": []
            }, {
              "Level": 2,
              "Name": "AnnualSISMedicalBehaviorReview",
              "DisplayName": "Annual SIS Medical/Behavior Review",
              "Description": null,
              "MultiEntry": false,
              "Order": 70,
              "Sections": [],
              "Items": [
                {
                  "Name": "DateCompleted",
                  "DisplayName": "Date completed",
                  "Description": "Date completed",
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
                }
              ]
            }
          ],
          "Items": []
        }, {
          "Level": 1,
          "Name": "SocialDevelopmentalBehavioralFamilyHistory",
          "DisplayName": "Social Developmental Behavioral Family History",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Display": true,
          "Order": 100,
          "Sections": [],
          "Items": [
            {
              "Name": "FamilyHistoryDescribe",
              "DisplayName": "Describe my relevant social, developmental, behavioral, and family history:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 0
            }, {
              "Name": "TraumaHistory",
              "DisplayName": "History of abuse, neglect, sexual or domestic violence, or trauma including psyc" +
                  "hological trauma?",
              "AdditionalDisplayName": "If yes, describe:",
              "Description": "History of abuse, neglect, sexual or domestic violence, or trauma including psyc" +
                  "hological trauma?",
              "Type": "RadioButtonWithSpecify",
              "ValueType": "Bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 10
            }, {
              "Name": "LivingArrangementsSummary",
              "DisplayName": "Provide a summary of my current and past living arrangements:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 20
            }
          ]
        }, {
          "Level": 1,
          "Name": "CommunicationAssistiveTechnologyAndModifications",
          "DisplayName": "Communication, Assistive Technology, and Modifications",
          "EditLink": "SectionEdit",
          "Description": null,
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
              "Order": 10
            }, {
              "Name": "EquipmentSupport",
              "DisplayName": "Describe any adaptive equipment or assistive technology supports used:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 20
            }, {
              "Name": "Maintained",
              "DisplayName": "Describe how is equipment maintained and who is responsible:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 30
            }, {
              "Name": "BackupPlan",
              "DisplayName": "Describe the back-up plan for power outages if equipment is used:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 40
            }, {
              "Name": "EnvironmentalModifications",
              "DisplayName": "Describe any environmental modifications used:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
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
              "Order": 100
            }
          ]
        }, {
          "Level": 1,
          "Name": "Education",
          "DisplayName": "Education",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
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
              "Order": 10
            }, {
              "Name": "EducationalHistory",
              "DisplayName": "Describe my educational history:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": false,
              "Order": 20
            }
          ]
        }, {
          "Level": 1,
          "Name": "Employment",
          "DisplayName": "Employment",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Display": true,
          "Order": 130,
          "Sections": [
            {
              "Level": 2,
              "Name": "EmploymentSubSection",
              "DisplayName": "Employment",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 0,
              "Sections": [],
              "Items": [
                {
                  "Name": "Employed",
                  "DisplayName": "Has {{Parameters.PreferredName}} ever been employed?",
                  "Description": "Has {{Parameters.PreferredName}} ever been employed?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Order": 0
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
                  "Order": 10
                }, {
                  "Name": "NotInterestedInWorkReason",
                  "DisplayName": "Individual is not interested in work due to childhood or retirement age?",
                  "Description": "Individual is not interested in work due to childhood or retirement age?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": false,
                  "CompleteRequired": true,
                  "Order": 20
                }, {
                  "Name": "EmploymentBarriers",
                  "DisplayName": "Indicate all of the current barriers to employment:",
                  "Description": "Check all that apply:",
                  "Type": "CheckboxList",
                  "Style": "Vertical",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Order": 30
                }, {
                  "Name": "EmploymentBarriersOtherDescribe",
                  "DisplayName": "Please describe:",
                  "Description": "",
                  "Type": "Textarea",
                  "ValueType": "String",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Display": false,
                  "Order": 40
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
                  "Order": 50
                }
              ]
            }, {
              "Level": 2,
              "Name": "AlternatesToWork",
              "DisplayName": "Alternates to work",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 1,
              "Sections": [],
              "Items": [
                {
                  "Name": "Volunteered",
                  "DisplayName": "Has {{Parameters.PreferredName}} ever volunteered?",
                  "Description": "Has {{Parameters.PreferredName}} ever volunteered?",
                  "AdditionalDisplayName": "If yes, describe",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Order": 0
                }, {
                  "Name": "CurrentVolunteer",
                  "DisplayName": "Does {{Parameters.PreferredName}} currently volunteer?",
                  "Description": "Does {{Parameters.PreferredName}} currently volunteer?",
                  "AdditionalDisplayName": "If yes, describe",
                  "Type": "RadioButtonWithSpecify",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Order": 10
                }, {
                  "Name": "InvolvedInCommunityEngagementActivities ",
                  "DisplayName": "Is {{Parameters.PreferredName}} involved in activities of community engagement?",
                  "Description": "Is {{Parameters.PreferredName}} involved in activities of community engagement?",
                  "Type": "YesNoRadioButtons",
                  "ValueType": "bool",
                  "IsRequired": true,
                  "CompleteRequired": true,
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
                  "Order": 30
                }, {
                  "Name": "CommunityEngagementBarriers",
                  "DisplayName": "Indicate all of the current barriers to CE/CC:",
                  "Description": "Check all that apply:",
                  "Type": "CheckboxList",
                  "Style": "Vertical",
                  "IsRequired": true,
                  "CompleteRequired": true,
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
                  "Order": 60
                }
              ]
            }
          ],
          "Items": []
        }, {
          "Level": 1,
          "Name": "VolunteerParticipation",
          "DisplayName": "Volunteer Participation",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "CompleteRequiredRule": "sectionVolunteerParticipationCompleteRule1",
          "Display": true,
          "Order": 140,
          "Sections": [
            {
              "Level": 2,
              "Name": "VolunteerHistory",
              "DisplayName": "Volunteer Participation History",
              "Description": null,
              "MultiEntry": true,
              "CompleteRequired": true,
              "Order": 0,
              "Sections": [],
              "Items": [
                {
                  "Name": "CurrentLocation",
                  "DisplayName": "Location",
                  "Description": "Current location",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "VolunteerRole",
                  "DisplayName": "Volunteer role",
                  "Description": "Volunteer role",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "Duties",
                  "DisplayName": "Duties",
                  "Description": "Duties",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "WorkingDay",
                  "DisplayName": "Number of days per week",
                  "Description": "Number of days  per week",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": true,
                  "Order": 40
                }, {
                  "Name": "WorkingHours",
                  "DisplayName": "Number of hours per week",
                  "Description": "Number of hours per week",
                  "Type": "TextBox",
                  "ValueType": "String",
                  "IsRequired": true,
                  "Order": 50
                }, {
                  "Name": "StartDate",
                  "DisplayName": "Start Date",
                  "Description": null,
                  "Type": "DatePicker",
                  "ValueType": "DateTimeOffset?",
                  "IsRequired": true,
                  "Order": 60
                }, {
                  "Name": "StartDateIsApproximate",
                  "DisplayName": "Start Date is approximate:",
                  "Description": null,
                  "Type": "Checkbox",
                  "ValueType": "bool",
                  "IsRequired": false,
                  "Order": 70
                }, {
                  "Name": "EndDate",
                  "DisplayName": "End Date",
                  "Description": null,
                  "Type": "DatePicker",
                  "ValueType": "DateTimeOffset?",
                  "IsRequired": true,
                  "Validations": [
                    {
                      "Type": "compare",
                      "Expression": ">",
                      "CompareTo": "StartDate",
                      "Message": "End date must be after start date."
                    }
                  ],
                  "Order": 80
                }, {
                  "Name": "EndDateIsApproximate",
                  "DisplayName": "End date is approximate:",
                  "Description": null,
                  "Type": "Checkbox",
                  "ValueType": "bool",
                  "IsRequired": false,
                  "Order": 90
                }
              ]
            }
          ],
          "Items": [
            {
              "Name": "Volunteered",
              "DisplayName": "Has {{Parameters.PreferredName}} ever volunteered?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "EmergencyPlans",
          "DisplayName": "Back-up and Emergency Plans",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
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
              "Order": 10
            }, {
              "Name": "NaturalDisaster",
              "DisplayName": "Describe steps to take when a natural disaster occurs:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 20
            }, {
              "Name": "FuturePlan",
              "DisplayName": "Describe plan for future living arrangements:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 30
            }, {
              "Name": "InclusiveSupport",
              "DisplayName": "Describe supports needed to transition to more inclusive settings:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 40
            }
          ]
        }, {
          "Level": 1,
          "Name": "ReviewOfMostIntegratedSettings",
          "DisplayName": "Review of Most Integrated Settings",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Display": true,
          "Order": 160,
          "Sections": [],
          "Items": [
            {
              "Name": "CurrentLivingSituation",
              "DisplayName": "Current primary living situation:",
              "Description": "Current primary living situation:",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "CompleteRequired": true,
              "ReadOnly": true,
              "Order": 0
            }, {
              "Name": "PrimaryEmployment",
              "DisplayName": "Current primary employment or day setting",
              "Description": "Check all that apply:",
              "Type": "CheckboxList",
              "Style": "Vertical",
              "ValueType": "String",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 10
            }, {
              "Name": "PrimaryEmploymentOtherOptionDescribe",
              "DisplayName": "If Other, describe:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "Display": false,
              "Order": 30
            }, {
              "Name": "HousingChoice",
              "DisplayName": "Has the individual and/or substitute decision maker identified an interest in pu" +
                  "rsuing one or more of these integrated housing options?",
              "Description": "Check all that apply:",
              "Type": "CheckboxList",
              "Style": "Vertical",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Order": 20
            }, {
              "Name": "HousingChoiceOtherOptionDescribe",
              "DisplayName": "If Other, describe:",
              "Description": null,
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "Display": false,
              "Order": 30
            }, {
              "Name": "HousingChoiceAdditionalMessage",
              "DisplayName": "If any of the above options are checked, complete a ",
              "Description": "If any of the above options are checked, complete a ",
              "HyperLink": {
                'Text': 'DBHDS-Housing Assessment.',
                'Href': 'http://www.dbhds.virginia.gov/individuals-and-families/developmental-disabilitie' +
                    's/community-support-services',
                'Type': 'AdditionalDisplayName'
              },
              "Type": "Description",
              "ValueType": "String",
              "Display": false,
              "Order": 31
            }, {
              "Name": "IntegratedWaiver",
              "DisplayName": "Has the individual and/or substitute decision maker identified an interest in pu" +
                  "rsuing one or more of these integrated waiver service options?",
              "Description": "Check all that apply:",
              "Type": "CheckboxList",
              "Style": "Vertical",
              "ValueType": "String",
              "IsRequired": false,
              "Order": 40
            }, {
              "Name": "IntegratedWaiverOtherOptionDescribe",
              "DisplayName": "If Other, describe:",
              "Description": null,
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "Display": false,
              "Order": 50
            }, {
              "Name": "ResourcesNeededForMoreIntegratedOption",
              "DisplayName": "Are any resources needed to obtain more integrated options? ",
              "Description": null,
              "AdditionalDisplayName": 'If yes, Describe how these will be addressed:',
              "Type": "RadioButtonWithSpecify",
              "ValueType": "String",
              "IsRequired": false,
              "Order": 60
            }, {
              "Name": "NeededAvailable",
              "DisplayName": "Are supports or services needed that are not available?",
              "Description": null,
              "AdditionalDisplayName": 'If yes, the Support Coordinator can contact the Community Resource Consultant to' +
                  ' discuss.',
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 70
            }

          ]
        }, {
          "Level": 1,
          "Name": "AdditionalComments",
          "DisplayName": "Additional Comments",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": false,
          "Display": true,
          "Order": 170,
          "Sections": [],
          "Items": [
            {
              "Name": "AdditionalComment",
              "DisplayName": "Additional Comments",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "IsRequired": false,
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
      "Description": null,
      "MultiEntry": false,
      "CompleteRequired": true,
      "Order": 20,
      "Sections": [
        {
          "Level": 1,
          "Name": "Meeting",
          "DisplayName": "{{Parameters.PreferredName}}’s Meeting",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
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
              "Order": 0
            }, {
              "Name": "AnnualPlanning",
              "DisplayName": "My preferences for annual planning:",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 10
            }, {
              "Name": "DateTimeLocationForMeeting",
              "DisplayName": "My preferred date, time, and location for my meeting:",
              "Description": null,
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 20
            }
          ]
        }, {
          "Level": 1,
          "Name": "TalentsContributions",
          "DisplayName": "{{Parameters.PreferredName}}’s Talents & Contributions",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": true,
          "CompleteRequired": true,
          "Order": 20,
          "Sections": [],
          "Items": [
            {
              "Name": "GreatThings",
              "DisplayName": "List great things about {{Parameters.PreferredName}}",
              "Description": null,
              "Type": "Textarea",
              "CompleteRequired": true,
              "ValueType": "string",
              "IsRequired": true,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "LifeToday",
          "DisplayName": "{{Parameters.PreferredName}}’s Life Today",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 30,
          "Sections": [],
          "Items": [
            {
              "Name": "DescribeLifeToday",
              "DisplayName": "Briefly describe how {{Parameters.PreferredName}} currently lives ",
              "Description": "e.g. type of setting, number of housemates, employment or day setting, community" +
                " inclusion, etc",
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "LifeWants",
          "DisplayName": "The Life {{Parameters.PreferredName}} Wants",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 40,
          "Sections": [],
          "Items": [
            {
              "Name": "DescribeLifeVision",
              "DisplayName": "Describe {{Parameters.PreferredName}}’s vision of the life he or she wants",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "string",
              "CompleteRequired": true,
              "IsRequired": true,
              "Order": 0
            }
          ]
        }, {
          "Level": 1,
          "Name": "GetLifeWants",
          "DisplayName": "Getting the Life {{Parameters.PreferredName}} Wants",
          "EditLink": "SectionEdit",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Order": 50,
          "Sections": [
            {
              "Level": 2,
              "Name": "WorkAlternates",
              "DisplayName": "Work and Alternates to Work",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 1,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "LearningOtherPursuits",
              "DisplayName": "Learning & Other Pursuits",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 20,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "CommunityInterests",
              "DisplayName": "Community & Interests",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 30,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "Relationships",
              "DisplayName": "Relationships",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 40,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "Home",
              "DisplayName": "Home",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 50,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "TransportationTravel",
              "DisplayName": "Transportation and Travel",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 60,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "Money",
              "DisplayName": "Money",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 70,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
                  "Order": 40
                }
              ]
            }, {
              "Level": 2,
              "Name": "HealthSafety",
              "DisplayName": "Health & Safety",
              "Description": null,
              "MultiEntry": false,
              "CompleteRequired": true,
              "Order": 80,
              "Sections": [],
              "Items": [
                {
                  "Name": "WorkingNow",
                  "DisplayName": "What’s Working Now",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 10
                }, {
                  "Name": "NotWorking",
                  "DisplayName": "What’s Not Working",
                  "Description": null,
                  "Type": "Textarea",
                  "CompleteRequired": true,
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 20
                }, {
                  "Name": "ImportantTo",
                  "DisplayName": "Important TO {{Parameters.PreferredName}}",
                  "Description": null,
                  "CompleteRequired": true,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Order": 30
                }, {
                  "Name": "OthersNeedToKnow",
                  "DisplayName": "What others need to know and do to support {{Parameters.PreferredName}} (include" +
                      "s important FOR)",
                  "Description": null,
                  "Type": "Textarea",
                  "ValueType": "string",
                  "CompleteRequired": true,
                  "IsRequired": true,
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
      "BusinessComponent": "IspPart3",
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "Agreement",
      "DisplayName": "Part IV. Agreements",
      "Description": null,
      "MultiEntry": false,
      "CompleteRequired": true,
      "Order": 40,
      "Sections": [
        {
          "Level": 1,
          "Name": "DoesMyPlanMatch",
          "DisplayName": "Does My Plan Match...",
          "Description": null,
          "EditLink": "SectionEdit",
          "MultiEntry": false,
          "CompleteRequired": true,
          "Display": true,
          "Order": 10,
          "Sections": [],
          "Items": [
            {
              "Name": "MyPlanMatchQ1",
              "DisplayName": "What makes me happy?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 10
            }, {
              "Name": "MyPlanMatchQ2",
              "DisplayName": "My dreams?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 20
            }, {
              "Name": "MyPlanMatchQ3",
              "DisplayName": "Being with people I like?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 30
            }, {
              "Name": "MyPlanMatchQ4",
              "DisplayName": "Where and how I want to live?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 40
            }, {
              "Name": "MyPlanMatchQ5",
              "DisplayName": "Things I like to do?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 50
            }, {
              "Name": "MyPlanMatchQ6",
              "DisplayName": "How I want to travel?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 60
            }, {
              "Name": "MyPlanMatchQ7",
              "DisplayName": "How I want to handle my money?  ",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 70
            }, {
              "Name": "MyPlanMatchQ8",
              "DisplayName": "What I need to be safe?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 80
            }, {
              "Name": "MyPlanMatchQ9",
              "DisplayName": "How I contribute?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 90
            }, {
              "Name": "MyPlanMatchQ10",
              "DisplayName": "New things I want to learn? ",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 100
            }, {
              "Name": "MyPlanMatchQ11",
              "DisplayName": "My work dreams?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 110
            }, {
              "Name": "MyPlanMatchQ12",
              "DisplayName": "The support that I need?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 120
            }, {
              "Name": "MyPlanMatchQ13",
              "DisplayName": "People who support me?  ",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 130
            }, {
              "Name": "MyPlanMatchQ14",
              "DisplayName": "I describe a good life?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 140
            }, {
              "Name": "MyPlanMatchQ15",
              "DisplayName": "I have had the opportunity to plan for personal topics apart from the full team?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 150
            }, {
              "Name": "MyPlanMatchQ16",
              "DisplayName": "I was supported to direct and participate in my planning process as described in" +
                  " Part II: Personal Profile?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 160
            }, {
              "Name": "MyPlanMatchNoReasonAndResolvePlan",
              "DisplayName": 'If the answer is “no” to any question above, go back and consider again. Describ' +
                  'e the reason for any questions about remaining “no” at the end of the meeting an' +
                  'd any plan to resolve:',
              "Description": null,
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": true,
              "Display": false,
              "Order": 170
            }
          ]

        }, {
          "Level": 1,
          "Name": "TeamQuestions",
          "DisplayName": "Team Questions",
          "Description": null,
          "EditLink": "SectionEdit",
          "MultiEntry": false,
          "CompleteRequired": true,
          "Display": true,
          "Order": 20,
          "Sections": [],
          "Items": [
            {
              "Name": "TeamQuestionsQ1",
              "DisplayName": "Does any team member have an objection to any outcomes in my plan? ",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,

              "Order": 10
            }, {
              "Name": "TeamQuestionsQ2",
              "DisplayName": "Are there any restrictions that require review or agreement?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 20
            }, {
              "Name": "TeamQuestionsQ3",
              "DisplayName": "Do I need financial planning or benefits counseling in order to maintain or maxi" +
                  "mize resources?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 30
            }, {
              "Name": "TeamQuestionsQ4",
              "DisplayName": "Is there any IMPORTANT TO or IMPORTANT FOR information elsewhere that is not add" +
                  "ressed in my plan?",
              "Description": null,
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 40
            }, {
              "Name": "TeamQuestionsNoReasonAndResolvePlan",
              "DisplayName": 'Describe the reason for any questions above being marked "yes" and any plan to r' +
                  'esolve:',
              "Description": null,
              "Type": "Textarea",
              "CompleteRequired": false,
              "ValueType": "string",
              "IsRequired": true,
              "Display": false,
              "Order": 50
            }, {
              "Name": "AnySupportsOrServicesNotAvailable",
              "DisplayName": "Are supports or services needed that are not available",
              "Description": null,
              "AdditionalDisplayName": 'If yes, the Support Coordinator can contact the Community Resource Consultant to' +
                  ' discuss.',
              "Type": "YesNoRadioButtons",
              "CompleteRequired": true,
              "ValueType": "bool",
              "IsRequired": true,
              "Order": 60
            }
          ]
        }, {
          "Level": 1,
          "Name": "AgreementSignatures",
          "DisplayName": "Signatures",
          "Description": "This ISP was developed based on an assessment with the full participation and in" +
              "formed choice of the person receiving services. We have discussed the proposed s" +
              "ervices to be delivered, alternative services that might be advantageous, accomp" +
              "anying risks or benefits, and reasons for choosing each option included in this " +
              "ISP. Outcomes and activities that are not accomplished by the identified target " +
              "dates will be reviewed along with the reasons for lack of progress providing the" +
              " person an opportunity to make an informed choice of how to proceed.",
          "EditLink": "SectionEdit",
          "MultiEntry": true,
          "CompleteRequired": true,
          "Display": true,
          "Order": 30,
          "Sections": [],
          "Items": [
            {
              "Name": "SignerType",
              "DisplayName": "Signer Type",
              "Description": "Signer Type",
              "Type": "AttributeFilterDropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
              "Order": 0
            }, {
              "Name": "SignatureProvider",
              "DisplayName": "Provider",
              "Description": "Provider",
              "Type": "Dropdown",
              "DataSource": {
                "Options": "AssignedProviders"
              },
              "ValueType": "object",
              "Display": false,
              "IsRequired": true,
              "Order": 1
            }, {
              "Name": "SignatureType",
              "DisplayName": "Signature Type",
              "Description": "Signature Type",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "IsRequired": true,
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
              "Order": 3
            }, {
              "Name": "PrintName",
              "DisplayName": "Print Name",
              "Description": "Print Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Order": 4
            }, {
              "Name": "RelationshipOrService",
              "DisplayName": "Relationship/Service",
              "Description": "Relationship/Service",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
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
            }, {
              "Name": "Id",
              "DisplayName": "Id",
              "Description": "Id",
              "Type": "String",
              "ValueType": "string",
              "IsRequired": false,
              "Display": false,
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
              "Order": 10,
              "HideColumn": false
            }
          ]
        }, {
          "Level": 1,
          "Name": "PersonCenteredDates",
          "DisplayName": "Person-Centered Review Dates",
          "Description": null,
          "MultiEntry": false,
          "EditLink": "SectionEdit",
          "CompleteRequired": true,
          "Display": true,
          "Order": 50,
          "Sections": [],
          "Items": [
            {
              "Name": "FirstQuarterReviewDate",
              "DisplayName": "1st Quarter Date",
              "Description": "1st Quarter Date",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 0
            }, {
              "Name": "SecondQuarterReviewDate",
              "DisplayName": "2nd Quarter Date",
              "Description": "2nd Quarter Date",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 1
            }, {
              "Name": "ThirdQuarterReviewDate",
              "DisplayName": "3rd Quarter Date",
              "Description": "3rd Quarter Date",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 2
            }, {
              "Name": "FourthQuarterReviewDate",
              "DisplayName": "4th Quarter Date",
              "Description": "4th Quarter Date",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "IsRequired": true,
              "CompleteRequired": true,
              "Order": 3
            }
          ]
        }
      ],
      "Items": []
    }, {
      "Level": 0,
      "Name": "PlanForSupport",
      "DisplayName": "Part V. Plan for Supports",
      "BusinessComponent": "IspPart5",
      "Order": 50,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "Attachment",
      "DisplayName": "Attachment",
      "BusinessComponent": "Attachment",
      "Order": 60,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "FormNotes",
      "DisplayName": "Form Notes",
      "BusinessComponent": "FormNotes",
      "Order": 70,
      "Sections": [],
      "Items": []
    }, {
      "Level": 0,
      "Name": "AuditTrail",
      "DisplayName": "Changes History",
      "BusinessComponent": "AuditTrail",
      "Order": 80,
      "Sections": [],
      "Items": []
    }
  ],
  "AdditionalPrintSection":
    { "Name":"PlanForSupport",
      "DataName":"PlanForSupportDetails",
      "BusinessComponent":"Part5SectionPrint"
    }       
};

export default function IndividualSupportPlan() {
  return new Promise((resolve, reject) => {
    metadata.Options = Object.assign({}, options);
    metadata.views = Object.assign({}, views);
    metadata.Rules = Object.assign([], rules);
    resolve(Object.assign({}, metadata));
  });
}
