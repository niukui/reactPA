import {ISP_SIGNATURE_TYPE_IDS, ISP_SIGNER_TYPE_IDS} from 'utils/constants'
import options from './options';

const metadata = {
  "Name": "SupportsPackage",
  "LookupPrefix": "supportspackage",
  "Title": "Supports Package",
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
          "Name": "Name",
          "DisplayName": "Supports Package Name",
          "Description": "Supports Package Name",
          "Type": "TextBox",
          "ValueType": "string",
          "IsRequired": true,
          "Validations": null,
          "CompleteRequired": true,
          "Order": 0
        }, {
          "Name": "Area",
          "DisplayName": "Area",
          "Description": "Area",
          "Type": "Dropdown",
          "ValueType": "LookupIdentifier",
          "IsRequired": true,
          "CompleteRequired": true,
          "Validations": null,
          "Order": 1
        }, {
          "Name": "LivingSetting",
          "DisplayName": "Living Setting",
          "Description": "Living Setting",
          "Type": "Dropdown",
          "DataSource": {
            "LookupCategory": "supportspackagelivingsetting"
          },
          "ValueType": "LookupIdentifier",
          "IsRequired": true,
          "CompleteRequired": true,
          "Validations": null,
          "Order": 2
        }, {
          "Name": "StartDate",
          "DisplayName": "Effective Date",
          "Description": "Effective Date",
          "Type": "DatePicker",
          "ValueType": "DateTimeOffset?",
          "IsRequired": true,
          "CompleteRequired": true,
          "Validations": null,
          "Order": 3
        }, {
          "Name": "EndDate",
          "DisplayName": "End Date",
          "Description": "End Date",
          "Type": "DatePicker",
          "ValueType": "DateTimeOffset?",
          "ReadOnly": true,
          "CompleteRequired": true,
          "Validations": null,
          "Order": 4
        }
      ]
    }, {
      "Level": 0,
      "Name": "Services",
      "DisplayName": "Services",
      "Description": "Services",
      "BusinessComponent": "SpServicesSection",
      "Order": 20,
      "Sections": [],
      "Items": []
    }
  ]
};

export default function SupportsPackage() {
  return new Promise((resolve, reject) => {
    metadata.Options = Object.assign({}, options);
    resolve(Object.assign({}, metadata));
  });
}