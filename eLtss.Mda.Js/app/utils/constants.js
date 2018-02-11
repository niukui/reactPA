export const POC_SERVICE_TYPE_IDS = {

    "inpatient": "lookupitems/planofcareservicetypes/fdb93e99-f620-42af-ab88-c0010339e194",
    "outpatient": "lookupitems/planofcareservicetypes/c9098518-64d8-4610-96cd-80c191f69df1"
}
export const AUDIT_TRAIL = {
    CHANGES_HISTORY: 'CHANGES_HISTORY',
    ToValue: 'ToValue',
    FromValue: 'FromValue',
    DisplayField: 'DisplayField',
    SectionDisplayName: 'SectionDisplayName'
};

export const SP_WORKFLOW_STATUS = {
    Pending: "Pending",
    Published: "Published",
    Expired: "Expired"
}

export const ISP_WORKFLOW_STATUS = {
    pendingScInput: 'PendingScInput',
    pendingProviderCompletion: 'PendingProviderCompletion',
    ispCompleted: 'IspCompleted',
    discarded: 'Discarded'
};

export const PART_V_WORKFLOW_STATUS = {
    inProgress: 'InProgress',
    partVCompleted: 'PartVCompleted',
    allPartVsCompletedForTheProvider: 'AllPartVsCompletedForTheProvider',
    pendingScReview: 'PendingScReview',
    approved: 'Approved',
    pendingProviderReview: 'PendingProviderReview',
    providerAccepted: 'ProviderAccepted',
    discarded: 'Discarded'
};

export const ISP_SIGNATURE_TYPE_IDS = {
    written: 'lookupitems/ispsignaturetypes/6fe813a3-58a8-417d-b7af-a39f9eddf1bb',
    eSignature: 'lookupitems/ispsignaturetypes/92891e52-4e39-483c-a55a-4212c84c415c',
    contributorNotHereForPlanning: 'lookupitems/ispsignaturetypes/8028c98f-4911-4786-b70a-b7d82cffa381'
};

export const ISP_SIGNER_TYPE_IDS = {
    provider: 'lookupitems/ispsignertypes/26a8833d-4b25-454b-ad63-06f76f324c4d',
    person: 'lookupitems/ispsignertypes/ed96a946-f109-406c-aa02-d528366f76af',
    substituteDecisionMaker: 'lookupitems/ispsignertypes/569f61b2-322d-470a-9012-4111fabda3b0',
    scCm: 'lookupitems/ispsignertypes/d1bf8017-cafe-454f-a730-f9d1271bfa36'
};
export const POC_SIGNATURE_TYPE_IDS = {
    written: 'lookupitems/planofcaresignaturetypes/6fe813a3-58a8-417d-b7af-a39f9eddf1bb',
    eSignature: 'lookupitems/planofcaresignaturetypes/92891e52-4e39-483c-a55a-4212c84c415c',
    contributorNotHereForPlanning: 'lookupitems/planofcaresignaturetypes/8028c98f-4911-4786-b70a-b7d82cffa381',
    unableToSign:'lookupitems/planofcaresignaturetypes/d3c79afb-41fd-4aa0-9adb-e84f4ac6702a'
};

export const POC_SIGNER_TYPE_IDS = {
    provider: 'lookupitems/planofcaresignertypes/26a8833d-4b25-454b-ad63-06f76f324c4d',
    person: 'lookupitems/planofcaresignertypes/ed96a946-f109-406c-aa02-d528366f76af',
    substituteDecisionMaker: 'lookupitems/planofcaresignertypes/569f61b2-322d-470a-9012-4111fabda3b0',
    scCm: 'lookupitems/planofcaresignertypes/d1bf8017-cafe-454f-a730-f9d1271bfa36'
};

export const SUPPORT_TYPE_IDS = {
    eligibilityBased: 'lookupitems/supporttypes/0ef63270-bd1d-4e67-a3e2-621cd76714e6'
};

export const LIFE_AREA_IDS = {
    workAndAlternatesToWork: 'lookupitems/planofcarelifeareas/aa77fb8f-0d65-4e4d-b0ca-5d15a9ae3dca',
    learningOtherPursuits: 'lookupitems/planofcarelifeareas/99154801-2813-424a-bbe1-ea27a30faba3',
    communityInterests: 'lookupitems/planofcarelifeareas/376ccad9-bc56-4615-a7d4-64d729999382',
    home: 'lookupitems/planofcarelifeareas/120877bc-5479-4e94-9b9f-ed5621ddc4ae',
    money: 'lookupitems/planofcarelifeareas/4a484d31-6c51-46d0-aabb-d5c031283aa6',
    healthSafety: 'lookupitems/planofcarelifeareas/380fad1e-a6b5-49c9-b4bb-b6e6ac302187',
    wellness:'lookupitems/planofcarelifeareas/556ffcd0-19d4-46ee-a5e1-f39b98edf247',
    relationships:'lookupitems/planofcarelifeareas/1b704295-b2c8-4b45-a526-352d4c4774b2',
    transportationAndTravel:'lookupitems/planofcarelifeareas/f480d795-8de8-48d2-88be-3e923c281c24'
};

export const SERVICES_RECEIVED = {
    adultDayLiving: 'lookupitems/planofcareservicesreceived/874BAFE0-9360-4913-AE87-3AA1941CD287',
    homeDeliveredMeals: 'lookupitems/planofcareservicesreceived/9A0F8B14-8437-4FAB-89DF-42BAAC34BC62',
    homeHealthServices: 'lookupitems/planofcareservicesreceived/444BCA9A-27BB-41F8-BAE3-CEBBCF92BCAB',
    nonMedicalTransportation: 'lookupitems/planofcareservicesreceived/1DD7970C-EED4-4A3A-8A22-C8E7A652FF12',
    participantDirectedCommunitySupports:'lookupitems/planofcareservicesreceived/A7DA6C74-31A9-4C7F-B2DB-7B2D627F61D9',
    participantDirectedGoodsAndServices: 'lookupitems/planofcareservicesreceived/E83C7940-7EE7-4418-81C7-8E5FE44F0877',
    personalAssistanceServices:'lookupitems/planofcareservicesreceived/1C24BB9A-A716-4C39-9BE4-498962C1A758',
    respite: 'lookupitems/planofcareservicesreceived/E9AC03C9-CEAD-432D-8D17-AA9DEC31E563',
    structureDayHabilitation: 'lookupitems/planofcareservicesreceived/F9B83DDC-8C13-44D4-B425-40E52C148772'
};

const purple = '#CCBFED';
const darkblue = '#BFCAED';
const lightblue = '#BFFBED';
const pink = '#EBB9CD';
const green = '#6CDF6F';
const lightgreen = '#7DCEA0';

export const EVENT_TYPE_COLORS = {
    "lookupitems/ipceventtypes/4c8a2ba4-3ea6-496e-b19e-c41fb4fdebeb": purple,
    "lookupitems/ipceventtypes/7b67c51b-2b0e-4ace-945f-06bacee28538": darkblue,
    "lookupitems/ipceventtypes/97a17069-cbff-41b5-b70b-a3e9e009313c": lightblue,
    "lookupitems/ipceventtypes/409d38d1-a0a7-4f1f-a64a-52c305478861": pink,
    "lookupitems/ipceventtypes/d7845b80-df0a-45fb-a1ac-b290ac195273": green,
    "lookupitems/ipceventtypes/83bbfb1f-9394-45cc-b24b-a3f5c28558ae": lightgreen
}

export const IPC_EVENT_TYPE_IDS = {
    relationship: "lookupitems/ipceventtypes/4c8a2ba4-3ea6-496e-b19e-c41fb4fdebeb",
    communityBased: "lookupitems/ipceventtypes/7b67c51b-2b0e-4ace-945f-06bacee28538",
    personalStrenth: "lookupitems/ipceventtypes/97a17069-cbff-41b5-b70b-a3e9e009313c",
    technology: "lookupitems/ipceventtypes/409d38d1-a0a7-4f1f-a64a-52c305478861",
    standardsSupportsPackageService: "lookupitems/ipceventtypes/d7845b80-df0a-45fb-a1ac-b290ac195273",
    additionalSupportsService: "lookupitems/ipceventtypes/83bbfb1f-9394-45cc-b24b-a3f5c28558ae"
}

export const POC_REVIEW_TYPE_IDS = {
  ninetyDays: "lookupitems/planofcarereviewtypes/7e22c08f-2974-49a1-94d5-bbe31b038af2",
  hundredEightyDays: "lookupitems/planofcarereviewtypes/FE5F4202-7779-4DAE-94FB-6573E2BA4490",
  other: "lookupitems/planofcarereviewtypes/1d13e8f9-5029-433d-bf5d-479d6665e1b7"
};


export const POC_INTERESTED_EMPLOYMENT_TYPE_IDS = {
  jobCoaching:"lookupitems/planofcareinterestedemploymentypes/7e0f7ff3-8b42-4fd3-8ad0-e8376c7be1b1",
  jobFinding:"lookupitems/planofcareinterestedemploymentypes/80412a21-d767-46be-86fe-5c45884a9b24",
  careerAssessment:"lookupitems/planofcareinterestedemploymentypes/8db6a46d-e9ce-43af-841b-fa512b20423b",
  benefitsCounseling:"lookupitems/planofcareinterestedemploymentypes/008c84f5-97b0-46f2-b8e6-f9c94777749c",
  employmentSkills: "lookupitems/planofcareinterestedemploymentypes/6b1ac540-ca85-4213-a6ec-a4cb3e6356c0",
  development: "lookupitems/planofcareinterestedemploymentypes/615c414a-1512-4940-a261-314871796899",
  other: "lookupitems/planofcareinterestedemploymentypes/f161dc6f-febe-491a-9b0b-0fcfaf88dc6a"
};

export const POC_SETTING_TYPES = {
    community: "lookupitems/planofcaresettings/ccfd53e8-18db-4ac4-9a03-95432f61c962",
    nursingFacility: "lookupitems/planofcaresettings/dd9ebf2c-2497-449a-a3de-764b5b043d86",
    cwd: "lookupitems/planofcaresettings/ee9f799a-bfdd-4dd0-be11-73bd17faec87"
};

export const POC_TYPES = {
    initial: "lookupitems/planofcaretypes/dbfd53e8-18db-4ac4-9a03-95432f61c962",
    review: "lookupitems/planofcaretypes/299f799a-bfdd-4dd0-be11-73bd17faec87",
    annual: "lookupitems/planofcaretypes/e09ebf2c-2497-449a-a3de-764b5b043d86",
    changeInCondition: "lookupitems/planofcaretypes/ef9f799a-bfdd-4dd0-be11-73bd17faecef",
    quarterly: "lookupitems/planofcaretypes/953681c9-bae8-4923-b50b-4b289900b366"

}