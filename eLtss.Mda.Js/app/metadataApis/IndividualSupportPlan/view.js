const views = {
  "workflowPopups": {
    "ScComplete": {
      "NeedConfirmation": true,
      "Title": "Support Coordinator Complete ISP",
      "Message": "Are you sure to complete the ISP? You cannot undo it once you completed a ISP.",
      "Items": [
        {
          "Name": "Comment",
          "DisplayName": "Comment",
          "Type": "String",
          "ValueType": "string",
          "IsRequired": true,
          "CompleteRequired": false,
          "Order": 0
        }
      ]
    },
    "Discard": {
      "NeedConfirmation": true,
      "Title": "Discard ISP",
      "Message": "Are you sure to Discard the ISP? You cannot undo it once you discarded a ISP.",
      "Items": [
        {
          "Name": "Comment",
          "DisplayName": "Comment",
          "Type": "String",
          "ValueType": "string",
          "IsRequired": true,
          "CompleteRequired": false,
          "Order": 0
        }
      ]
    }
  },
  "list": {
    "Title":"Individual Support Plan",
    "ClassName":"workspace",
    "HeaderHeight":32.98,
    "Buttons": [],
    "Items":[]
  }
}

export default views;