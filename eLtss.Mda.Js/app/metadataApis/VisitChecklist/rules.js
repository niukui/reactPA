const rules = [
{
    "When": 'return data.VisitSetting.Id === "lookupitems/vclvisitsettings/46fa2b0f-7086-4c29-ae92-b21c4519ce6a"',
    "Then": 'hide',
    "Sources": ['VisitSetting'],
    "Targets": ['VisitChecklistDetails.ResponsibilityAndAware','VisitChecklistDetails.ServicesAssociatedWithCare','VisitChecklistDetails.NursingFacilityEnvironment','VisitChecklistDetails.MdsSection','VisitChecklistDetails.CommunitytransitioningInfo','VisitChecklistDetails.NHTmodule','VisitChecklistDetails.MdsSectionDate','VisitChecklistDetails.ResidentReview','VisitChecklistDetails.NursingFacility']
}, {
    "When": 'return data.VisitSetting.Id === "lookupitems/vclvisitsettings/37b7b71e-083a-49fb-9533-1ea2bf694413"',
    "Then": 'hide',
    "Sources": ['VisitSetting'],
    "Targets": ['VisitChecklistDetails.SafeEnvironment','VisitChecklistDetails.ProvidedPlan','VisitChecklistDetails.RolesUnderstand','VisitChecklistDetails.AvailableResourceOfHiring','VisitChecklistDetails.AvailableResourceOfTrainingNeeds','VisitChecklistDetails.AvailableResourceOfReplacement','VisitChecklistDetails.BudgetAuthorityModel','VisitChecklistDetails.DailyDecisionMaking','VisitChecklistDetails.ShortAndLongRangePlanning','VisitChecklistDetails.RoleAsEmployer','VisitChecklistDetails.RoleAsEmployee','VisitChecklistDetails.SelfAssessment',
    'VisitChecklistDetails.serviceDelivery','VisitChecklistDetails.TraditionalAgencyModel','VisitChecklistDetails.AttendantServices','VisitChecklistDetails.InformingAndEducating','VisitChecklistDetails.FinancialManagement','VisitChecklistDetails.FMSAgency','VisitChecklistDetails.AssistingToAssess','VisitChecklistDetails.AssistingAsNeeded','VisitChecklistDetails.ServiceMyWay','VisitChecklistDetails.ServiceMyWayLabel'
    ]
},{
    "When":'return data.VisitSetting.Id === "lookupitems/vclvisitsettings/46fa2b0f-7086-4c29-ae92-b21c4519ce6a"',
    "Then":'show',
    "Sources":['VisitSetting'],
    "Targets":["OverviewInformation.VisitSettingNote"]
},{
    "When":'return data.NursingFacilityEnvironment.Id === "lookupitems/vclyesnonas/425ecd7b-1c2f-4780-98cb-5e528ad18d02"',
    "Then":'show',
    "Sources":['NursingFacilityEnvironment'],
    "Targets":["VisitChecklistDetails.UnsafeEnvironmentComments"]
}
];

export default rules; 
