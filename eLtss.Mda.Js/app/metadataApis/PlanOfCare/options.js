const options = {
  "Prefix": "/PlanOfCares/PlanOfCare",  
  "LoadAction": "GetSummaryInfo",
  "PostAction": "SaveSectionObject",
  "LoadListAction": "GetListData",
  "LoadPreProcess":"LoadPreProcessPOC",
  "LoadPostProcess":"LoadPostProcessPOC",
  "LoadListAction": "ListInfo",
  "CreateAction": "CreateObject",

  "FormNotePrefix": "/PlanOfCares/PlanOfCare",
  "FormNotesActionName":"CreateNewPocFormNote",
  "DeleteFormNoteAction":"DeleteFormNote",
  "UploadAttachmentUrl":"/PlanOfCares/PlanOfCareAttachment/SaveNewPocClientAttachment",
  "DeleteAttachmentUrl":"/PlanOfCares/PlanOfCareAttachment/DeleteNewPocClientAttachment",
  "DownloadAttachmentUrl":"/PlanOfCares/PlanOfCareAttachment/DownloadClientAttachment/", 
  "PreCreate":"PreCreate",
  "ProcessEventAction":"ProcessEvent",
}

export default options;