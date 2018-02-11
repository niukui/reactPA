import options from './options';
import rules from './rules';
const metadata = {
  "Name": "PlanForSupport",
  "LookupPrefix": "isp",
  "Title":"Part V: Plan for Supports",
  "Sections": [
        {
          "Level": 0,
          "Name": "ServiceAndOutcomes",
          "DisplayName": "Service and Outcomes",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": true,
          "Display": true,
          "Order": 10,
          "Sections": [],
          "Items": []
        }, {
          "Level": 0,
          "Name": "GeneralScheduleSupports",
          "DisplayName": "General Schedule of Supports",
          "Description": null,
          "MultiEntry": false,
          "CompleteRequired": false,
          "Display": true,
          "Order": 20,
          "Sections": [],
          "Items": []
        }, {
          "Level": 0,
          "EditLevel": 1,
          "Name": "Signatures",
          "DisplayName": "Signatures",
          "Description": null,
          "MultiEntry": true,
          "CompleteRequired": false,
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
              "Validations": null,
              "Order": 0
            }, {
              "Name": "SignatureType",
              "DisplayName": "Signature Type",
              "Description": "Signature Type",
              "Type": "Dropdown",
              "ValueType": "LookupIdentifier",
              "RuleAttributes": ["289b9796-ea15-4778-b9cf-d1df334099ef"],
              "IsRequired": true,
              "Validations": null,
              "Order": 1
            }, {
              "Name": "Base64Data",
              "DisplayName": "Signature",
              "Description": "Signature",
              "Type": "SignaturePad",
              "ContentType": "String",
              "IsSignature": true,
              "IsRequired": true,
              "Validations": null,
              "Display": false,
              "Order": 2
            }, {
              "Name": "PrintName",
              "DisplayName": "Print Name",
              "Description": "Print Name",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "CompleteRequired": false,
              "Validations": null,
              "Display": true,
              "Order": 3
            }, {
              "Name": "RelationshipOrService",
              "DisplayName": "Relationship/Service",
              "Description": "Relationship/Service",
              "Type": "TextBox",
              "ValueType": "string",
              "IsRequired": true,
              "Validations": null,
              "Order": 4
            }, {
              "Name": "SignedDate",
              "DisplayName": "Date Signed",
              "Description": "Date Signed",
              "Type": "DatePicker",
              "ValueType": "DateTimeOffset?",
              "IsRequired": true,
              "CompleteRequired": true,
              "Validations": [
                {
                  "Type": "max",
                  "Expression": "today",
                  "Message": "Date cannot be future."
                }
              ],
              "Order": 5
            }, {
              "Name": "Id",
              "DisplayName": "Id",
              "Description": "Id",
              "Type": "String",
              "ValueType": "string",
              "IsRequired": false,
              "Display": false,
              "Validations": null,
              "Order": 6,
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
              "Order": 7,
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
              "Order": 8,
              "HideColumn": false
            }
          ]
        }, {
          "Level": 0,
          "EditLevel": 1,
          "Name": "SafetyRestriction",
          "DisplayName": "Safety Restrictions",
          "Description": "As your provider, we have identified something you want to do that might create " +
              "a risk. We need your input to develop a plan that supports you to have what you " +
              "want in a safe way. We have determined that this restriction is necessary to ach" +
              "ieve a therapeutic benefit, maintain a safe and orderly environment or to interv" +
              "ene in an emergency and that all possible less restrictive options have been tri" +
              "ed. [12VAC35- 115-100].",
          "MultiEntry": false,
          "CompleteRequired": false,
          "Display": true,
          "Order": 40,
          "Sections": [
            {
              "Level": 3,
              "EditLevel": 1,
              "Name": "SafetyRestrictionSignatures",
              "DisplayName": "Safety Restrictions Signatures",
              "Description": "I understand that taking the actions listed can create a safety risk. I understa" +
                  "nd the reason for the restriction, the criteria for removal, and my right to a f" +
                  "air review of whether the restriction is permissible. When utilized, I understan" +
                  "d that the proposed restriction will not cause harm and give my consent to parti" +
                  "cipate.",
              "MultiEntry": true,
              "CompleteRequired": false,
              "Display": true,
              "Order": 50,
              "Sections": [],
              "Items": [
                {
                  "Name": "SignerType",
                  "DisplayName": "Signer Type",
                  "Description": "Signer Type",
                  "Type": "AttributeFilterDropdown",
                  "ValueType": "LookupIdentifier",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 0
                }, {
                  "Name": "SignatureType",
                  "DisplayName": "Signature Type",
                  "Description": "Signature Type",
                  "Type": "Dropdown",
                  "ValueType": "LookupIdentifier",
                  "RuleAttributes": ["289b9796-ea15-4778-b9cf-d1df334099ef"],
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 1
                }, {
                  "Name": "Base64Data",
                  "DisplayName": "Signature:",
                  "Description": "Signature:",
                  "Type": "SignaturePad",
                  "ContentType": "String",
                  "IsSignature": true,
                  "IsRequired": true,
                  "Validations": null,
                  "Display": false,
                  "Order": 2
                }, {
                  "Name": "PrintName",
                  "DisplayName": "Print Name",
                  "Description": "Print Name",
                  "Type": "TextBox",
                  "ValueType": "string",
                  "IsRequired": true,
                  "CompleteRequired": false,
                  "Validations": null,
                  "Display": true,
                  "Order": 3
                }, {
                  "Name": "RelationshipOrService",
                  "DisplayName": "Relationship/Service:",
                  "Description": "Relationship/Service:",
                  "Type": "TextBox",
                  "ValueType": "string",
                  "IsRequired": true,
                  "Validations": null,
                  "Order": 4
                }, {
                  "Name": "SignedDate",
                  "DisplayName": "Date Signed:",
                  "Description": "Date Signed:",
                  "Type": "DatePicker",
                  "ValueType": "DateTimeOffset?",
                  "IsRequired": true,
                  "CompleteRequired": true,
                  "Validations": [
                    {
                      "Type": "max",
                      "Expression": "today",
                      "Message": "Date cannot be future."
                    }
                  ],
                  "Order": 5
                }, {
                  "Name": "Id",
                  "DisplayName": "Id",
                  "Description": "Id",
                  "Type": "String",
                  "ValueType": "string",
                  "IsRequired": false,
                  "Display": false,
                  "Validations": null,
                  "Order": 6,
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
                  "Order": 7,
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
                  "Order": 8,
                  "HideColumn": false
                }
              ]
            }

          ],
          "Items": [
            {
              "Name": "UnderstandThatWillNot",
              "DisplayName": "I understand that I will not",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 0
            }, {
              "Name": "ThisIsNecessaryBecause",
              "DisplayName": "This is necessary because",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 1
            }, {
              "Name": "PlanRelatedToThisRestrictionInclude",
              "DisplayName": "The outcomes in my plan related to this restriction include",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 2
            }, {
              "Name": "CompletedByAQualifiedProfessional",
              "DisplayName": "The following is to be completed by a qualified professional.",
              "Description": "The following is to be completed by a qualified professional.",
              "Type": "Description",
              "ValueType": "String",
              "Order": 3
            }, {
              "Name": "DescriptionOfAssessment",
              "DisplayName": "Describe your assessment, to include all possible alternatives to the proposed r" +
                  "estriction that take into account the individual’s medical and mental condition," +
                  " behavior, preferences, nursing and medication needs, and ability to function in" +
                  "dependently",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 4
            }, {
              "Name": "DescriptionOfOtherLessRestrictive",
              "DisplayName": "Describe other less restrictive, positive approaches that have been attempted to" +
                  " meet safety needs based on the person’s medical and mental condition, behavior," +
                  " preferences, nursing and medication needs, and ability to function independentl" +
                  "y",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 5
            }, {
              "Name": "IsProposedRestrictionNecessary",
              "DisplayName": "Is this proposed restriction necessary for effective treatment of the individual" +
                  " or to protect him or others from personal harm, injury, or death",
              "Description": "",
              "Type": "YesNoRadioButtons",
              "ValueType": "bool",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 6
            }, {
              "Name": "DescriptionOfHowProgress",
              "DisplayName": "Describe how progress toward resolving the restriction(s) will be measured",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 7
            }, {
              "Name": "DescriptionOfHowOftenRestriction",
              "DisplayName": "Describe how often restriction(s) will be reviewed",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 8
            }, {
              "Name": "DescriptionOfConditions",
              "DisplayName": "Describe conditions for removal of restriction(s)",
              "Description": "",
              "Type": "Textarea",
              "ValueType": "String",
              "IsRequired": false,
              "CompleteRequired": false,
              "Validations": null,
              "Order": 9
            }
          ]
        }
      ]
};

export default function PlanForSupport() {
  return new Promise((resolve, reject) => {
    metadata.Options=Object.assign({}, options);
    metadata.Rules = Object.assign([], rules);
    resolve(Object.assign({}, metadata));
  });
}