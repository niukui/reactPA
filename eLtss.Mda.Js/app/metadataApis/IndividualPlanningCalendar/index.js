import options from './options';
import views from './views';
const metadata = {
  "Name": "IndividualPlanningCalendar",
  "LookupPrefix": "ipc",
  "Title": "Individual Planning Calendar",
  "Sections": [
    {
      "Level": 0,
      "Name": "OverviewInformation",
      "DisplayName": "Overview Information",
      "MultiEntry": false,
      "CompleteRequired": true,
      "Order": 10,
      "Sections": [],
      "EditLink": "SectionEdit",
      "Items": [
        {
          "Name": "Area",
          "DisplayName": "Area",
          "Type": "Dropdown",
          "DataSource": {
            "LookupPrefix": "supportspackage"
          },
          "ValueType": "LookupIdentifier",
          "ReadOnly": true,
          "CompleteRequired": true,
          "Validations": null,
          "Order": 10
        }, {
          "Name": "LivingSetting",
          "DisplayName": "Living Setting",
          "Type": "Dropdown",
          "DataSource": {
            "LookupCategory": "livingsituationonwaivertypes"
          },
          "ValueType": "LookupIdentifier",
          "ReadOnly": true,
          "CompleteRequired": true,
          "Validations": null,
          "Order": 20
        }, {
          "Name": "Level",
          "DisplayName": "Level",
          "Type": "String",
          "ValueType": "int",
          "ReadOnly": true,
          "CompleteRequired": true,
          "Validations": null,
          "Order": 30
        }
      ]
    }, {
      "Level": 0,
      "Name": "GeneralEvents",
      "DisplayName": "Services and Events",
      "BusinessComponent": "GeneralCalendar",
      "Order": 20,
      "Sections": [],
      "Items": []
    }
  ]
};

export default function individualPlanningCalendar() {
  return new Promise((resolve, reject) => {
    metadata.Options = Object.assign({}, options);
    metadata.views = Object.assign({}, views);
    resolve(Object.assign({}, metadata));
  });
}