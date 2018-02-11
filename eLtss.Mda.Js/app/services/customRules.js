function ParseDate(jsonDate){ 
	let theDate = new Date(parseInt(jsonDate.substring(6,19)));
	return theDate.toLocaleDateString();
}

export function serviceCoordinatorSignatureDateReviewEncounterDateRule(lodash, data) {
  try {
    const scSignature = lodash.last(data.PlanOfCare.Agreement.AgreementSignatures, item => {
        return item.SignerType.UniqueAttribute.Guid === 'd1bf8017-cafe-454f-a730-f9d1271bfa36';
    });    
    return (scSignature) ? !(ParseDate(scSignature.SignedDate) === data.Agreement.PlanOfCareReviewDates.EncounterDate.toDate().toLocaleDateString()) : true;
  } catch (err) {
    return false;
  }
}


export function expectedNextReviewDateHideRule(lodash, data){
  try {
    const setting = (data.Setting ? data.Setting.UniqueAttribute.Guid : data.PlanOfCare.Setting.UniqueAttribute.Guid);
    const match = setting === 'ee9f799a-bfdd-4dd0-be11-73bd17faec87' ||
                    data.Agreement.PlanOfCareReviewDates.ReviewType.UniqueAttribute.Guid === '1d13e8f9-5029-433d-bf5d-479d6665e1b7' ;
     return match; 
   } catch (err) {
     return false;
   }
}

export function agreementDoesMyPlanMatchRule1(lodash, data) {
  try {
   const match = data.Agreement.ServicesSatisfactionSurvey;
    return match.MyPlanMatchQ1.Value === true;    
  } catch (err) {
    return false;
  }
}

export function emergencyContactsContactTypeOtherSpecifyRule(lodash, data) {
  try {
    return data.EssentialInformation.EmergencyContacts.ContactType.UniqueAttribute.Guid === 'a6e85cfa-d401-44d0-83fe-bcc0e2885ebe';
  } catch (err) {
    return false;
  }
}

export function emergencyContactsEmergencyContactRelationshipOtherSpecifyRule(lodash, data) {
  try {
    const match = lodash.some(data.EssentialInformation.EmergencyContacts.EmergencyContactRelationship, item => {
        return item.UniqueAttribute.Guid === 'dd0452f0-0bb8-4022-a5ee-41bb1b61f91b';
    });
    return match;
  } catch (err) {
    return false;
  }
}

export function healthcareContactsSpecialtyOtherSpecifyRule(lodash, data) {
  try {
    return data.EssentialInformation.HealthcareContacts.Specialty.UniqueAttribute.Guid === '1eccc552-1d35-4659-aaa9-856c6caeba27';
  } catch (err) {
    return false;
  }
}

export function employmentBarriersOtherDescribeRule(lodash, data) {
  try {
    const match = lodash.some(data.EssentialInformation.Employment.EmploymentSubSection.EmploymentBarriers, item => {
        return item.UniqueAttribute.Guid === '035913d8-690c-493a-9c14-c0a9b27ed769';
    });
    return match;
  } catch (err) {
    return false;
  }
}

export function communityEngagementBarriersOtherDescribeRule(lodash, data) {
  try {
    const match = lodash.some(data.EssentialInformation.Employment.AlternatesToWork.CommunityEngagementBarriers, item => {
        return item.UniqueAttribute.Guid === '133aadf8-32be-4091-9bfc-a2a3db73f850';
    });
    return match;
  } catch (err) {
    return false;
  }
}

export function reviewOfMostIntegratedSettingsPrimaryEmploymentRule(lodash, data){
  try {
    const match = lodash.some(data.EssentialInformation.ReviewOfMostIntegratedSettings.PrimaryEmployment, item => {
        return item.UniqueAttribute.Guid === 'da04570e-4fab-41ea-9a8e-c6b1669f6c31';
    });
    return match;
  } catch (err) {
    return false;
  }
}
export function reviewOfMostIntegratedSettingsHousingChoiceRule(lodash, data){
  try {
    const match = lodash.some(data.EssentialInformation.ReviewOfMostIntegratedSettings.HousingChoice, item => {
        return item.UniqueAttribute.Guid === '438f77e1-9a8f-4b98-907b-e990a1b5d5bd';
    });
    return match;
  } catch (err) {
    return false;
  }
}
export function reviewOfMostIntegratedSettingsHousingChoiceRule2(lodash, data){
  try {
    const match = data.EssentialInformation.ReviewOfMostIntegratedSettings.HousingChoice && data.EssentialInformation.ReviewOfMostIntegratedSettings.HousingChoice.length > 0;
    return match;
  } catch (err) {
    return false;
  }
}
export function reviewOfMostIntegratedSettingsIntegratedWaiverRule(lodash, data){
  try {
    const match = lodash.some(data.EssentialInformation.ReviewOfMostIntegratedSettings.IntegratedWaiver, item => {
        return item.UniqueAttribute.Guid === '21c34ea3-6707-41bd-861a-2b6df045f728';
    });
    return match;
  } catch (err) {
    return false;
  }
}

export function employmentInterestedOtherDescribeRule(lodash, data) {
  try {
    const match = lodash.some(data.EssentialInformation.Employment.EmploymentSubSection.SpecifyInterestedEmployment, item => {
        return item.UniqueAttribute.Guid === 'f161dc6f-febe-491a-9b0b-0fcfaf88dc6a';
    });
    return match;
  } catch (err) {
    return false;
  }
}