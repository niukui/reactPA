import {ISP_SIGNATURE_TYPE_IDS, ISP_SIGNER_TYPE_IDS} from 'utils/constants'
const rules = [
  {
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
    "When": 'return data.EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Pers' +
        'onHasConsumerDirectedOrAgencyDirectedPersonalService === true',
    "Then": 'show',
    "Sources": ['EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.PersonHasCo' +
        'nsumerDirectedOrAgencyDirectedPersonalService'],
    "Targets": [
      'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.PersonServi' +
          'ngAsEmployerOfRecordForConsumerDirectedServices',
      'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Relationshi' +
          'pToIndividual',
      'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.PersonsProv' +
          'idingPaidDirectSupport',
      'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.Relationshi' +
          'pToIndividual2',
      'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.NameOfUnpai' +
          'dPrimaryCaregiver',
      'EssentialInformation.SelfDirectedAndAgencyDirectedPersonalAssistance.TypeOfSuppo' +
          'rtProvidedByUnpaidPrimaryCaregiver'
    ]
  }, {
    "When": 'return data.Agreement.TeamQuestions.TeamQuestionsQ1 === true || data.Agreement.TeamQuestio' +
        'ns.TeamQuestionsQ2 === true || Agreement.TeamQuestions.TeamQuestionsQ3 === true ' +
        '|| Agreement.TeamQuestions.TeamQuestionsQ4 === true; ',
    "Then": 'show',
    "Sources": [
      'Agreement.TeamQuestions.TeamQuestionsQ1', 'Agreement.TeamQuestions.TeamQuestionsQ2', 'Agreement.TeamQuestions.TeamQuestionsQ3', 'Agreement.TeamQuestions.TeamQuestionsQ4'
    ],
    "Targets": ['Agreement.TeamQuestions.TeamQuestionsNoReasonAndResolvePlan']
  }, {
    "When": 'return customRules.agreementDoesMyPlanMatchRule1',
    "Then": 'show',
    "Sources": [
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ1",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ2",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ3",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ4",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ5",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ6",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ7",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ8",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ9",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ10",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ11",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ12",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ13",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ14",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ15",
      "Agreement.DoesMyPlanMatch.MyPlanMatchQ16"
    ],
    "Targets": ['Agreement.DoesMyPlanMatch.MyPlanMatchNoReasonAndResolvePlan']
  }, {
    "When": `return data.Agreement.AgreementSignatures.SignerType.Id === '${ISP_SIGNER_TYPE_IDS.provider}'`,
    "Then": 'show',
    "Sources": ["Agreement.AgreementSignatures.SignerType"],
    "Targets": ['Agreement.AgreementSignatures.SignatureProvider']
  }, {
    "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
    "Then": 'mark:ESignature',
    "Sources": ["Agreement.AgreementSignatures.SignatureType"],
    "Targets": ['Agreement.AgreementSignatures.Base64Data']
  }, {
    "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
    "Then": 'mark:WrittenSignature',
    "Sources": ['Agreement.AgreementSignatures.SignatureType'],
    "Targets": ['Agreement.AgreementSignatures.Base64Data']
  }, {
    "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
    "Then": 'makeOptional',
    "Sources": ['Agreement.AgreementSignatures.SignatureType'],
    "Targets": ['Agreement.AgreementSignatures.Base64Data']
  }, {
    "When": `return data.Agreement.AgreementSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'|| data.Agreement.AgreementSignatures.SignatureType.Id==='${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
    "Then": 'show',
    "Sources": ['Agreement.AgreementSignatures.SignatureType'],
    "Targets": ['Agreement.AgreementSignatures.Base64Data']
  }, {
    "When": `return data.Agreement.AgreementSignatures.SignatureType.Id !=='${ISP_SIGNATURE_TYPE_IDS.contributorNotHereForPlanning}'`,
    "Then": 'show',
    "Sources": ['Agreement.AgreementSignatures.SignatureType'],
    "Targets": ['Agreement.AgreementSignatures.SignedDate']
  }, {
    "When": `return data.PlanForSupport.Signatures.SignatureType.Id === '${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
    "Then": 'mark:ESignature',
    "Sources": ["PlanForSupport.Signatures.SignatureType"],
    "Targets": ['PlanForSupport.Signatures.Base64Data']
  }, {
    "When": `return data.PlanForSupport.Signatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
    "Then": 'mark:WrittenSignature',
    "Sources": ['PlanForSupport.Signatures.SignatureType'],
    "Targets": ['PlanForSupport.Signatures.Base64Data']
  }, {
    "When": `return data.PlanForSupport.Signatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
    "Then": 'makeOptional',
    "Sources": ['PlanForSupport.Signatures.SignatureType'],
    "Targets": ['PlanForSupport.Signatures.Base64Data']
  }, {
    "When": `return data.PlanForSupport.Signatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'|| data.PlanForSupport.Signatures.SignatureType.Id==='${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
    "Then": 'show',
    "Sources": ['PlanForSupport.Signatures.SignatureType'],
    "Targets": ['PlanForSupport.Signatures.Base64Data']
  }, {
    "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id === '${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
    "Then": 'mark:ESignature',
    "Sources": ["PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType"],
    "Targets": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
  }, {
    "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
    "Then": 'mark:WrittenSignature',
    "Sources": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
    "Targets": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
  }, {
    "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
    "Then": 'makeOptional',
    "Sources": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
    "Targets": ['PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
  }, {
    "When": `return data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'||data.PlanForSupport.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id==='${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
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
  }
];

export default rules;