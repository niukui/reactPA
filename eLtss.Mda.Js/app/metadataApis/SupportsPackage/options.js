const options = {
  "Prefix": "/SupportsPackages/SupportsPackage",
  "LoadAction": "GetSummaryInfo",
  "PostAction": "SaveSectionObject",
  "PreSubmitAction":"CheckExistedSupportsPackage",
  "SubmitAction":"Publish",
  "LoadListAction": "GetListData",
}

export default options;