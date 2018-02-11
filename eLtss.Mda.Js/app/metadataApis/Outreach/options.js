const options = {
  "Prefix": "/Outreach/OutreachQueue",
  "LoadAction": "GetSummaryInfo",
  "PostAction": "SaveSectionObject",
  "CreateAction": "Create",
  "PreCreate": "InitiateModel",
  "LoadListAction": "GetListModel",
  "OnSearchAction": "GetListData",  
  "ProcessEventAction":"ProcessEvent"
}

export default options;