
const accessControlPOC = [
 {
    'Id': 'POC1',
    'Name': 'PlanOfCare',
    'FormDescriptor': 'POC',
    'AccessPolicies': [
      {
        "Permission": "PlanOfCareCreate",
        "Resource": "PlanOfCare.Create",        
        "Policy": {          
          "Status": ["*"] ,
          "AccessLevels": [ "Write" ]
        }
      },{
        "Permission": "PlanOfCareList",
        "Resource": "PlanOfCare",
        "Policy": {
          "Status": [
            "PendingScInput"
          ],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfCareView",
        "Resource": "Overview",
        "Policy": {
          "Status": [
            "PendingScInput"
          ],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfCareEdit",
        "Resource": "Overview",
        "Policy": {
          "Status": [
            "PendingScInput"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareEdit",
        "Resource": "PlanOfCare.Overview",
        "Policy": {
          "Status": [
            "PendingScInput"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareProviderAdd",
        "Resource": "Providers.AddProvider",
        "Policy": {
          "Status": [
            "PendingScInput", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareProviderDelete",
        "Resource": "Providers.RemoveProvider",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Delete"]
        }
      }, {
        "Permission": "PlanOfCareEssentialInformationEdit",
        "Resource": "EssentialInformation",
        "Policy": {
          "Status": [
            "PendingScInput", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareEssentialInformationView",
        "Resource": "EssentialInformation",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfCareServicesEdit",
        "Resource": "Services",
        "Policy": {
          "Status": [
            "PendingScInput", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareServicesView",
        "Resource": "Services",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfCarePersonalProfileEdit",
        "Resource": "PersonalProfile",
        "Policy": {
          "Status": [
            "PendingScInput", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCarePersonalProfileView",
        "Resource": "PersonalProfile",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfCareSharedPlanningsAdd",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Create"]
        }
      }, {
        "Permission": "PlanOfCareSharedPlanningsEdit",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareSharedPlanningsDelete",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Delete"]
        }
      }, {
        "Permission": "PlanOfCareSharedPlanningsView",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfServicesSatisfactionSurveyEdit",
        "Resource": "Agreement.ServicesSatisfactionSurvey",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareReviewDatesEdit",
        "Resource": "Agreement.PlanOfCareReviewDates",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareAgreementSignaturesEdit",
        "Resource": "Agreement.AgreementSignatures",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareAgreementView",
        "Resource": "Agreement",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfCareScComplete",
        "Resource": "ScComplete",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareProviderComplete",
        "Resource": "ProviderComplete",
        "Policy": {
          "Status": ["PendingProviderCompletion"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareScReOpen",
        "Resource": "ScReOpen",
        "Policy": {
            "Status": [
                "PlanOfCareCompleted"
            ],
            "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "PlanOfCareDiscarded",
        "Resource": "Discard",
        "Policy": {
            "Status": [
                "PendingScInput"
            ],
            "AccessLevels": ["Write"]
        }
      },{
        "Permission": "PlanOfCareAddPlanForSupport",
        "Resource": "PlanForSupport.AddPlanForSupport",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportServiceAndOutcomesEdit",
        "Resource": "PlanForSupport.ServiceAndOutcomes",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportServiceGeneralScheduleSupportsEdit",
        "Resource": "PlanForSupport.GeneralScheduleSupports",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSafetyRestrictionEdit",
        "Resource": "PlanForSupport.SafetyRestriction",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSafetyRestrictionSignaturesEdit",
        "Resource": "PlanForSupport.SafetyRestrictionSignatures",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSignaturesEdit",
        "Resource": "PlanForSupport.Signatures",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportReview",
        "Resource": "PlanForSupport.ServiceAndOutcomes",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportReview",
        "Resource": "PlanForSupport.Signatures",
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
        "Resource": "PlanForSupport.reviseButton",
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
        "Resource": "PlanForSupport.submitButton",
        "Policy": {
          "Status": [
            "InProgress", "PendingProviderReview"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportComplete",
        "Resource": "PlanForSupport.completeButton",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportSubmitForProviderReview",
        "Resource": "PlanForSupport.scSubmitButton",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportDiscard",
        "Resource": "PlanForSupport.discardButton",
        "Policy": {
          "Status": ["InProgress"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportProviderApprove",
        "Resource": "PlanForSupport.providerApproveButton",
        "Policy": {
          "Status": ["PendingProviderReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportProviderReject",
        "Resource": "PlanForSupport.providerRejectButton",
        "Policy": {
          "Status": ["PendingProviderReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportScApprove",
        "Resource": "PlanForSupport.scApproveButton",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanForSupportScReject",
        "Resource": "PlanForSupport.scRejectButton",
        "Policy": {
          "Status": ["PendingScReview"],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareAttachmentUpload",
        "Resource": "Attachments.UploadAttachment",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareAttachmentDownload",
        "Resource": "Attachments.ViewAttachment",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "PlanOfCareAttachmentDelete",
        "Resource": "Attachments.DeleteAttachment",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Delete"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareFormNoteCreate",
        "Resource": "FormNotes.AddFormNote",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareFormNoteEdit",
        "Resource": "FormNotes",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "PlanOfCareFormNoteView",
        "Resource": "FormNotes",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }
    ]
  }
];



export default accessControlPOC;