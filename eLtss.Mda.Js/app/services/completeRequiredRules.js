export function sectionHealthInformationMedicationsCompleteRule1(lodash, data) {
  if (lodash.get(data, 'MedicationsRequired') === false) {
    return ['MedicationsRequired', 'IsThereAnAdvancedDirective', 'ObtainedPsychotropicMedication'];
  }
  return ['Medication', 'IsThereAnAdvancedDirective', 'ObtainedPsychotropicMedication', 'MedicationsRequired'];
}

export function sectionEligibilityCompleteRule1(lodash, data) {
  if (lodash.get(data, 'DiagnosisDD') !== undefined && lodash.get(data, 'DiagnosisDD') !== null) {
    return ['DiagnosisDD'];
  }
  if (lodash.get(data, 'DatePsychological') !== undefined && lodash.get(data, 'DatePsychological') !== null) {
    return ['DatePsychological'];
  }
  return ['DiagnosisDD', 'DatePsychological'];
}

export function sectionVolunteerParticipationCompleteRule1(lodash, data) {
  if (lodash.get(data, 'Volunteered') === false) {
    return ['Volunteered'];
  }
  return ['VolunteerHistory', 'Volunteered'];
}

export function sectionSelfDirectedPersonalAssistanceCompleteRule1(lodash, data){

  if(lodash.get(data,'ParticipantHasConsumerDirectedOrAgencyDirectedPersonalService')===false){
    return['ParticipantHasConsumerDirectedOrAgencyDirectedPersonalService',
    'ParticipantRequiresSupportWithActivitiesOfDailyLiving',
    'ParticipantExperiencesDifficultyBeingOrientedTo',
    'ParticipantNeedsSupportForBehavioralConcerns',
    'ParticipantHasLimitedRangeOfMotion',
    'ParticipantNeedsAssistanceWithTakingMedications'];
  }
  else{
    return['ParticipantHasConsumerDirectedOrAgencyDirectedPersonalService',
    'ParticipantServingAsEmployerOfRecordForConsumerDirectedServices',
    'RelationshipToParticipant',
    'ParticipantsProvidingPaidDirectSupport',
    'RelationshipToParticipant2',
    'NameOfUnpaidPrimaryCaregiver',
    'TypeOfSupportProvidedByUnpaidPrimaryCaregiver',
    'ParticipantRequiresSupportWithActivitiesOfDailyLiving',
    'ParticipantExperiencesDifficultyBeingOrientedTo',
    'ParticipantNeedsSupportForBehavioralConcerns',
    'ParticipantHasLimitedRangeOfMotion',
    'ParticipantNeedsAssistanceWithTakingMedications'
    ];
  }
}