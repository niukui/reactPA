

const accessControlIsp = [
   {
    'Id': 'isp/accesspolicy',
    'Name': 'IndividualSupportPlan',
    'FormDescriptor': 'ISP',
    'AccessPolicies': [
      {
        "Permission": "IndividualSupportPlanEdit",
        "Resource": "IndividualSupportPlan.Overview",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanProviderAdd",
        "Resource": "Providers.AddProvider",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanProviderDelete",
        "Resource": "Providers.RemoveProvider",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Delete"]
        }
      }, {
        "Permission": "IndividualSupportPlanEssentialInformationEdit",
        "Resource": "EssentialInformation",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanEssentialInformationView",
        "Resource": "EssentialInformation",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "IndividualSupportPlanPersonalProfileEdit",
        "Resource": "PersonalProfile",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanPersonalProfileView",
        "Resource": "PersonalProfile",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "IndividualSupportPlanSharedPlanningsAdd",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Create"]
        }
      }, {
        "Permission": "IndividualSupportPlanSharedPlanningsEdit",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": [
            "PendingScInput", "IspCompleted", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanSharedPlanningsDelete",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Delete"]
        }
      }, {
        "Permission": "IndividualSupportPlanSharedPlanningsView",
        "Resource": "SharedPlannings",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "IndividualSupportPlanPartDoesMyPlanMatchEdit",
        "Resource": "Agreement.DoesMyPlanMatch",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualSupportPlanPartTeamQuestionsEdit",
        "Resource": "Agreement.TeamQuestions",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualSupportPlanPartContributorsEdit",
        "Resource": "Agreement.ContributorsNotIncludedForPlanning",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualSupportPlanPartPersonCenteredDatesEdit",
        "Resource": "Agreement.PersonCenteredDates",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualSupportPlanAgreementSignaturesEdit",
        "Resource": "Agreement.AgreementSignatures",
        "Policy": {
          "Status": ["PendingScInput"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualSupportPlanAgreementView",
        "Resource": "Agreement",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "IndividualSupportPlanScComplete",
        "Resource": "ScComplete",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingScInputAfterIspCompleted"
          ],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "IndividualSupportPlanProviderComplete",
        "Resource": "ProviderComplete",
        "Policy": {
          "Status": ["PendingProviderCompletion"],
          "AccessLevels": ["Write"]
        }
      },{
        "Permission": "IndividualSupportPlanAddPlanForSupport",
        "Resource": "PlanForSupport.AddPlanForSupport",
        "Policy": {
            "Status": [ "PendingScInput", "PendingProviderCompletion", "PendingScInputAfterIspCompleted" ],
            "AccessLevels": [ "Write" ]
        },
        "CustomRules": [ "EditableUntil30DaysAfterEndDate" ]
      }, {
        "Permission": "IndividualSupportPlanAttachmentUpload",
        "Resource": "Attachments.UploadAttachment",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanAttachmentDownload",
        "Resource": "Attachments.ViewAttachment",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }, {
        "Permission": "IndividualSupportPlanAttachmentDelete",
        "Resource": "Attachments.DeleteAttachment",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Delete"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanFormNoteCreate",
        "Resource": "FormNotes.AddFormNote",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanFormNoteEdit",
        "Resource": "FormNotes",
        "Policy": {
          "Status": [
            "PendingScInput", "PendingProviderCompletion", "IspCompleted"
          ],
          "AccessLevels": ["Write"]
        },
        "CustomRules": ["EditableUntil30DaysAfterEndDate"]
      }, {
        "Permission": "IndividualSupportPlanFormNoteView",
        "Resource": "FormNotes",
        "Policy": {
          "Status": ["*"],
          "AccessLevels": ["Read"]
        }
      }
    ]
  }
];



export default accessControlIsp;