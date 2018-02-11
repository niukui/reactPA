import options from './options';
import rules from './rules';
import views from './views';
import sections from '../Outreach/sections';

const metadata = {
  "Name": "Outreach",
  "ModuleName":"OutreachSummary",
  "LookupPrefix": "Outreach",
  "Title": "Outreach Summary",
  "DisplayName": "Outreach",
  "LeftActions": [
    {
      "Caption": "Back to List",
      "Path": "list",
      "Parameters": [
        {
          "Name": "moduleName",
          "Type": "context",
          "Value": "moduleName"
        },
        {
          "Name": "clientId",
          "Type": "context",
          "Value": "clientId"
        }
      ]
    }
  ],
};

export default function OutreachSummary() {
  return new Promise((resolve, reject) => {
    metadata.Options = Object.assign({}, options);
    metadata.Rules = Object.assign([],rules);
    metadata.Sections=  Object.assign([], sections);
    metadata.views = Object.assign({}, views);
    resolve(Object.assign({}, metadata));
  });
}
