

const accessControlPlanForSupport = [
  {
    'Id': 'PlanForSupport',
    'Name': 'PlanForSupport',
    'FormDescriptor': 'PFS',
    'AccessPolicies': [
      {
        "Permission": "IndividualSupportPlanAddPlanForSupport",
        "Resource": "AddPlanForSupport",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportServiceAndOutcomesEdit",
        "Resource": "ServiceAndOutcomes",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportServiceGeneralScheduleSupportsEdit",
        "Resource": "GeneralScheduleSupports",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSafetyRestrictionEdit",
        "Resource": "SafetyRestriction",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSafetyRestrictionSignaturesEdit",
        "Resource": "SafetyRestrictionSignatures",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSignaturesEdit",
        "Resource": "Signatures",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportReview",
        "Resource": "ServiceAndOutcomes",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportReview",
        "Resource": "Signatures",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportView",
        "Resource": "PlanForSupport",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanForSupportRevise",
        "Resource": "reviseButton",
        "Policy": {
          "Status": [
            "PartVCompleted", "AllPartVsCompletedForTheProvider", "Approved"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportEdit",
        "Resource": "PlanForSupport",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSubmitForScReview",
        "Resource": "submitButton",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportComplete",
        "Resource": "completeButton",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSubmitForProviderReview",
        "Resource": "scSubmitButton",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportDiscard",
        "Resource": "discardButton",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportProviderApprove",
        "Resource": "providerApproveButton",
        "Policy": {
          "Status": ["PendingProviderReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportProviderReject",
        "Resource": "providerRejectButton",
        "Policy": {
          "Status": ["PendingProviderReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportScApprove",
        "Resource": "scApproveButton",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportScReject",
        "Resource": "scRejectButton",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }
    ]
  }
];


export default accessControlPlanForSupport;