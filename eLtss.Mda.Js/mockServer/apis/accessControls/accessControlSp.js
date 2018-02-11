
const accessControlSp = [
 {
    'Id': 'sp/accesspolicy',
    'Name': 'SupportsPackage',
    'FormDescriptor': 'SP',
    'AccessPolicies': [
      {
        "Permission": "SupportsPackageEdit",
        "Resource": "OverviewInformation",
        "Policy": {
          "Status": ["Pending"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "SupportsPackageServiceEdit",
        "Resource": "Services",
        "Policy": {
          "Status": ["Pending"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "SupportsPackagePublish",
        "Resource": "Publish",
        "Policy": {
          "Status": ["Pending"],
          "AccessLevels": ["Write"]
        }
      }, {
        "Permission": "SupportsPackageExpire",
        "Resource": "Expire",
        "Policy": {
          "Status": ["Published"],
          "AccessLevels": ["Write"]
        }
      }
    ]
  }
];



export default accessControlSp;