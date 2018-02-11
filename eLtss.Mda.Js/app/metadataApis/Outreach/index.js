import options from './options';
import rules from './rules';
import views from './views';
import sections from './sections';

const metadata = {
  "Name": "Outreach",
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
        }
      ]
    }
  ],
};

export default function Outreach() {
  return new Promise((resolve, reject) => {
    metadata.Options = Object.assign({}, options);
    metadata.Rules = Object.assign([],rules);
    metadata.Sections=  Object.assign([], sections);
    metadata.views = Object.assign({}, views);
    resolve(Object.assign({}, metadata));
  });
}
