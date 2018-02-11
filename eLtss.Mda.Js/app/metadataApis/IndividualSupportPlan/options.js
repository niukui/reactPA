const options = {
  "Prefix": "/IndividualSupportPlans/IndividualSupportPlan",
  "LoadAction": "GetSummaryInfo",
  "PostAction": "SaveSectionObject",
  "LoadListAction": "ListInfo",
  "GetOverviewModelAction" : "GetOverviewModel",
  "SaveOverviewAction" : "SaveOverview",
  "CreatePlanForSupportAction": "CreatePlanForSupport",
  "LoadPreProcess": "LoadPreProcessISP",
  "LoadPostProcess": "LoadPostProcessISP",
  "ProcessEventAction":"ProcessEvent",
  
  "FormNotePrefix": "/IndividualSupportPlans/IspFormNote",
  "FormNotesActionName":"CreateNewIspFormNote",
  "UploadAttachmentUrl":"/IndividualSupportPlans/IspAttachment/SaveNewIspClientAttachment",
  "DeleteAttachmentUrl":"/IndividualSupportPlans/IspAttachment/DeleteNewIspClientAttachment",
  "DownloadAttachmentUrl":"/IndividualSupportPlans/IspAttachment/DownloadClientAttachment/",   
}

export default options;