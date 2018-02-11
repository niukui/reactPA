import {POC_SIGNATURE_TYPE_IDS, POC_SIGNER_TYPE_IDS, POC_SERVICE_TYPE_IDS, POC_REVIEW_TYPE_IDS, POC_INTERESTED_EMPLOYMENT_TYPE_IDS, POC_SETTING_TYPES} from 'utils/constants'
const rules = [
    
    {
        "When": 'return customRules.serviceCoordinatorSignatureDateReviewEncounterDateRule',
        "Then": 'show',
        "Sources": ['Agreement.PlanOfCareReviewDates.EncounterDate'],
        "Targets": ['Agreement.PlanOfCareReviewDates.EncounterDateWarning'],
    },
    {
        "When": 'return customRules.expectedNextReviewDateHideRule',
        "Then": 'hide',
        "Sources": ['Agreement.PlanOfCareReviewDates.ReviewType'],
        "Targets": ['Agreement.PlanOfCareReviewDates.ExpectedNextReviewDate']
    }, 
    {
        "When": `return data.Agreement.PlanOfCareReviewDates.ReviewType.Id ==='${POC_REVIEW_TYPE_IDS.Other}'`,
        "Then": 'makeRequired',
        "Sources": ['Agreement.PlanOfCareReviewDates.ReviewType'],
        "Targets": ['Agreement.PlanOfCareReviewDates.ReviewComment']
      },   
      {
          "When": `return data.Agreement.PlanOfCareReviewDates.ReviewType.Id ==='${POC_REVIEW_TYPE_IDS.Other}'`,
          "Then": 'makeRequired',
          "Sources": ['Agreement.PlanOfCareReviewDates.ReviewType'],
          "Targets": ['Agreement.PlanOfCareReviewDates.ReviewComment']
          },
    {
        "When": `return data.Services.ServiceType.Id ==='${POC_SERVICE_TYPE_IDS.inpatient}'`,
        "Then": 'show',
        "Sources": ['Services.ServiceType'],
        "Targets": [
            'Services.RevCode',
            'Services.AdmitDate',
            'Services.LOSAssigned',
            'Services.StartDate',
            'Services.EndDate',
            'Services.LevelOfCare',
            'Services.ProviderName'
        ]
    }, {
        "When": `return data.Services.ServiceType.Id ==='${POC_SERVICE_TYPE_IDS.outpatient}'`,
        "Then": 'show',
        "Sources": ['Services.ServiceType'],
        "Targets": [
            'Services.ProcedureCode',
            'Services.Unit',
            'Services.Unit',
            'Services.Unit',
            'Services.ServiceStartDate',
            'Services.ServiceEndDate',
            'Services.ProviderName'
        ]
    }, {
        "When": 'return customRules.emergencyContactsContactTypeOtherSpecifyRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.EmergencyContacts.ContactType'],
        "Targets": ['EssentialInformation.EmergencyContacts.ContactTypeOtherSpecify']
    }, {
        "When": 'return customRules.emergencyContactsEmergencyContactRelationshipOtherSpecifyRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.EmergencyContacts.EmergencyContactRelationship'],
        "Targets": ['EssentialInformation.EmergencyContacts.EmergencyContactRelationshipOtherSpecify']
    }, {
        "When": 'return customRules.healthcareContactsSpecialtyOtherSpecifyRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.HealthcareContacts.Specialty'],
        "Targets": ['EssentialInformation.HealthcareContacts.SpecialtyOtherSpecify']
    }, {
        "When": 'return EssentialInformation.HealthInformation.Medications.MedicationsRequired ==' +
                '= false',
        "Then": 'hide',
        "Sources": ['EssentialInformation.HealthInformation.Medications.MedicationsRequired'],
        "Targets": ['EssentialInformation.HealthInformation.Medications.Medication']
    }, {
        "When": 'return customRules.employmentBarriersOtherDescribeRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.Employment.EmploymentSubSection.EmploymentBarriers'],
        "Targets": ['EssentialInformation.Employment.EmploymentSubSection.EmploymentBarriersOtherDesc' +
                'ribe']
    }, {
        "When": 'return customRules.communityEngagementBarriersOtherDescribeRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.Employment.AlternatesToWork.CommunityEngagementBarriers'],
        "Targets": ['EssentialInformation.Employment.AlternatesToWork.CommunityEngagementBarriersOthe' +
                'rDescribe']
    }, {
        "When": 'return data.EssentialInformation.VolunteerParticipation.Volunteered === false',
        "Then": 'hide',
        "Sources": ['EssentialInformation.VolunteerParticipation.Volunteered'],
        "Targets": ['EssentialInformation.VolunteerParticipation.VolunteerHistory']
    }, {
        "When": 'return data.EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance' +
                '.ParticipantHasConsumerDirectedOrAgencyDirectedPersonalService === true',
        "Then": 'show',
        "Sources": ['EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Participant' +
                'HasConsumerDirectedOrAgencyDirectedPersonalService'],
        "Targets": [
            'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Relationshi' +
                    'pToParticipant',
            'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Participant' +
                    'ServingAsEmployerOfRecordForConsumerDirectedServices',
            'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Relationshi' +
                    'pToParticipant',
            'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Participant' +
                    'sProvidingPaidDirectSupport',
            'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Relationshi' +
                    'pToParticipant2',
            'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.NameOfUnpai' +
                    'dPrimaryCaregiver',
            'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.TypeOfSuppo' +
                    'rtProvidedByUnpaidPrimaryCaregiver'
        ]
    }, {
        "When": 'return data.Agreement.TeamQuestions.TeamQuestionsQ1 === true || data.Agreement.T' +
                'eamQuestions.TeamQuestionsQ2 === true || Agreement.TeamQuestions.TeamQuestionsQ3' +
                ' === true || Agreement.TeamQuestions.TeamQuestionsQ4 === true; ',
        "Then": 'show',
        "Sources": [
            'Agreement.TeamQuestions.TeamQuestionsQ1', 'Agreement.TeamQuestions.TeamQuestionsQ2', 'Agreement.TeamQuestions.TeamQuestionsQ3', 'Agreement.TeamQuestions.TeamQuestionsQ4'
        ],
        "Targets": ['Agreement.TeamQuestions.TeamQuestionsNoReasonAndResolvePlan']
    }, 
    // {
    //     "When": 'return customRules.agreementDoesMyPlanMatchRule1',
    //     "Then": 'show',
    //     "Sources": [
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ1",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ2",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ3",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ4",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ5",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ6",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ7",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ8",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ9",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ10",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ11",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ12",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ13",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ14",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ15",
    //         "Agreement.DoesMyPlanMatch.MyPlanMatchQ16"
    //     ],
    //     "Targets": ['Agreement.DoesMyPlanMatch.MyPlanMatchNoReasonAndResolvePlan']
    // }, 
    {
         "When":"return customRules.agreementDoesMyPlanMatchRule1",
         "Then": 'show',
            "Sources": ["Agreement.DoesMyPlanMatch.MyPlanMatchQ1"],
        "Targets": ['Agreement.ServicesSatisfactionSurvey.ServicesReceived']
    },
      {
          "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ1  === true",
          "Then": 'show',
             "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ1"],
         "Targets": ['Agreement.ServicesSatisfactionSurvey.ServicesReceived']
    },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ3  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ3"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ4  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ4"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ5  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ5"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ6  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ6"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ7  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ7"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ8  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ8"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ9  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ9"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    //  {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ10  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ10"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    // {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ11  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ11"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    // {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ12  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ12"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    // {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ13  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ13"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    // {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ14  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ14"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    // {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ15  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ15"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    // {
    //      "When":"return data.Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ16  === false",
    //      "Then": 'show',
    //         "Sources": ["Agreement.ServicesSatisfactionSurvey.MyPlanMatchQ16"],
    //     "Targets": ['Agreement.ServicesSatisfactionSurvey.MyPlanMatchNoReasonAndResolvePlan']
    // },
    
    {
        "When": `return data.Agreement.AgreementSignatures.SignerType.Id === '${POC_SIGNER_TYPE_IDS.provider}'`,
        "Then": 'show',
        "Sources": ["Agreement.AgreementSignatures.SignerType"],
        "Targets": ['Agreement.AgreementSignatures.SignatureProvider']
    },{
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.unableToSign}'`,
        "Then": 'show',
        "Sources": ["Agreement.AgreementSignatures.SignatureType"],
        "Targets": ['Agreement.AgreementSignatures.Reason'],
    },{
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.eSignature}'`,
        "Then": 'mark:ESignature',
        "Sources": ["Agreement.AgreementSignatures.SignatureType"],
        "Targets": ['Agreement.AgreementSignatures.Base64Data']
    }, {
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'`,
        "Then": 'mark:WrittenSignature',
        "Sources": ['Agreement.AgreementSignatures.SignatureType'],
        "Targets": ['Agreement.AgreementSignatures.Base64Data']
    }, {
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'`,
        "Then": 'makeRequired',
        "Sources": ['Agreement.AgreementSignatures.SignatureType'],
        "Targets": ['Agreement.AgreementSignatures.Base64Data']
    }, {
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'|| data.Agreement.AgreementSignatures.SignatureType.Id==='${POC_SIGNATURE_TYPE_IDS.eSignature}'`,
        "Then": 'show',
        "Sources": ['Agreement.AgreementSignatures.SignatureType'],
        "Targets": ['Agreement.AgreementSignatures.Base64Data']
    }, {
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id !=='${POC_SIGNATURE_TYPE_IDS.contributorNotHereForPlanning}'`,
        "Then": 'show',
        "Sources": ['Agreement.AgreementSignatures.SignatureType'],
        "Targets": ['Agreement.AgreementSignatures.SignedDate','Agreement.AgreementSignatures.PrintName','Agreement.AgreementSignatures.RelationshipOrService']
    },{
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.unableToSign}'`,
        "Then": 'hide',
        "Sources": ["Agreement.AgreementSignatures.SignatureType"],
        "Targets": ['Agreement.AgreementSignatures.PrintName','Agreement.AgreementSignatures.RelationshipOrService','Agreement.AgreementSignatures.SignedDate'],
    },
    {
        "When": `return data.Agreement.AgreementSignatures.SignatureType.Id !=='${POC_SIGNATURE_TYPE_IDS.unableToSign}'`,
        "Then": 'show',
        "Sources": ["Agreement.AgreementSignatures.SignatureType"],
        "Targets": ['Agreement.AgreementSignatures.PrintName','Agreement.AgreementSignatures.RelationshipOrService','Agreement.AgreementSignatures.SignedDate'],
    },
    
    {
        "When": `return data.PlanForSupport.Signatures.SignatureType.Id === '${POC_SIGNATURE_TYPE_IDS.eSignature}'`,
        "Then": 'mark:ESignature',
        "Sources": ["PlanForSupport.Signatures.SignatureType"],
        "Targets": ['PlanForSupport.Signatures.Base64Data']
    }, {
        "When": `return data.PlanForSupport.Signatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'`,
        "Then": 'mark:WrittenSignature',
        "Sources": ['PlanForSupport.Signatures.SignatureType'],
        "Targets": ['PlanForSupport.Signatures.Base64Data']
    }, {
        "When": `return data.PlanForSupport.Signatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'`,
        "Then": 'makeOptional',
        "Sources": ['PlanForSupport.Signatures.SignatureType'],
        "Targets": ['PlanForSupport.Signatures.Base64Data']
    }, {
        "When": `return data.PlanForSupport.Signatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'|| data.PlanForSupport.Signatures.SignatureType.Id==='${POC_SIGNATURE_TYPE_IDS.eSignature}'`,
        "Then": 'show',
        "Sources": ['PlanForSupport.Signatures.SignatureType'],
        "Targets": ['PlanForSupport.Signatures.Base64Data']
    }, {
        "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id === '${POC_SIGNATURE_TYPE_IDS.eSignature}'`,
        "Then": 'mark:ESignature',
        "Sources": ["PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType"],
        "Targets": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }, {
        "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'`,
        "Then": 'mark:WrittenSignature',
        "Sources": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
        "Targets": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }, {
        "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'`,
        "Then": 'makeOptional',
        "Sources": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
        "Targets": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }, {
        "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${POC_SIGNATURE_TYPE_IDS.written}'|| data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id==='${POC_SIGNATURE_TYPE_IDS.eSignature}'`,
        "Then": 'show',
        "Sources": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
        "Targets": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }, {
        "When": 'return customRules.reviewOfMostIntegratedSettingsPrimaryEmploymentRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.ReviewOfMostIntegratedSettings.PrimaryEmployment'],
        "Targets": ['EssentialInformation.ReviewOfMostIntegratedSettings.PrimaryEmploymentOtherOption' +
                'Describe']
    }, {
        "When": 'return customRules.reviewOfMostIntegratedSettingsHousingChoiceRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.ReviewOfMostIntegratedSettings.HousingChoice'],
        "Targets": ['EssentialInformation.ReviewOfMostIntegratedSettings.HousingChoiceOtherOptionDesc' +
                'ribe']
    }, {
        "When": 'return customRules.reviewOfMostIntegratedSettingsHousingChoiceRule2',
        "Then": 'show',
        "Sources": ['EssentialInformation.ReviewOfMostIntegratedSettings.HousingChoice'],
        "Targets": ['EssentialInformation.ReviewOfMostIntegratedSettings.HousingChoiceAdditionalMessa' +
                'ge']
    }, {
        "When": 'return customRules.reviewOfMostIntegratedSettingsIntegratedWaiverRule',
        "Then": 'show',
        "Sources": ['EssentialInformation.ReviewOfMostIntegratedSettings.IntegratedWaiver'],
        "Targets": ['EssentialInformation.ReviewOfMostIntegratedSettings.IntegratedWaiverOtherOptionD' +
                'escribe']
    },{
      "When": `return data.EssentialInformation.Employment.EmploymentSubSection.CurrentEmployment`,
      "Then": 'show',
      "Sources": ['EssentialInformation.Employment.EmploymentSubSection.CurrentEmployment'],
      "Targets": ['EssentialInformation.Employment.EmploymentSubSection.SpecifyCurrentEmployment']
    }, {
      "When": `return data.EssentialInformation.Employment.EmploymentSubSection.EmploymentInterest`,
      "Then": 'show',
      "Sources": ['EssentialInformation.Employment.EmploymentSubSection.EmploymentInterest'],
      "Targets": ['EssentialInformation.Employment.EmploymentSubSection.SpecifyInterestedEmployment']
    },
    {
      "When": 'return customRules.employmentInterestedOtherDescribeRule',
      "Then": 'show',
      "Sources": ['EssentialInformation.Employment.EmploymentSubSection.SpecifyInterestedEmployment'],
      "Targets": ['EssentialInformation.Employment.EmploymentSubSection.SpecifyOtherInterestedEmployment']
    }, {
      "When": `return data.EssentialInformation.Employment.AlternatesToWork.ReferralToEmploymentProgramCompleted`,
      "Then": 'show',
      "Sources": ['EssentialInformation.Employment.AlternatesToWork.ReferralToEmploymentProgramCompleted'],
      "Targets": ['EssentialInformation.Employment.AlternatesToWork.SpecifyProgramCompletedDate']
    },
];

export default rules;