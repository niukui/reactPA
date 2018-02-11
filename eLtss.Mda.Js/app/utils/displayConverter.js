import {formatJsonDate, formatJsonDateTime} from './dateHelper';

export const convertValueToDisplayValue = (value, item, index) => {
    if (item.Type === 'Address') {
        if (!value) {
            return "";
        }

        let displayValue = value.AddressLine1 || '';
        displayValue = displayValue + (value.AddressLine2
            ? ((displayValue
                ? ", "
                : "") + value.AddressLine2)
            : "");
        displayValue = displayValue + (value.City
            ? ((displayValue
                ? ", "
                : "") + value.City)
            : "");
        displayValue = displayValue + (((value.StateProvince && value.StateProvince.UniqueAttribute && value.StateProvince.UniqueAttribute.Description)
            ? (displayValue
                ? ", "
                : "") + value.StateProvince.UniqueAttribute.Description
            : ""));
        displayValue = displayValue + (value.PostalCode
            ? ((displayValue
                ? ", "
                : "") + value.PostalCode)
            : "");
        displayValue = displayValue + (value.County && value.County.Name
            ? ((displayValue
                ? ", "
                : "") + value.County.Name)
            : "");

        return displayValue;
    }
    if (item.Type === 'Dropdown' || item.Type === 'RadioButtonList' || item.Type === 'AttributeFilterDropdown') {
        if (item.DataSource) {
            return value && value.Name
                ? value.Name
                : "";
        } else {
            return value && value.UniqueAttribute && value.UniqueAttribute.Description
                ? value.UniqueAttribute.Description
                : "";
        }
    }
    if (item.Type === 'CheckboxList') {
        let joinedValue = '';
        return (value || [])
            .map(item => {
            return item.UniqueAttribute.Description;
        })
            .join(', ');
    }
    if (item.Type === 'Checkbox') {
        return value === true
            ? 'Yes'
            : 'No';
    }
    if (item.Type === 'YesNoRadioButtons' && (value === true || value === false)) {
        return value
            ? "yes"
            : "no";
    }
    if (item.Type === 'DateTimePicker') {
        return formatJsonDateTime(value,item.DisplayFormat);
    }
    if (item.Type === 'DatePicker' || item.ValueType=== 'DateTimeOffset') {
        return formatJsonDate(value);
    }

    if (item.Type === 'SignaturePad') {
        return "No Signature Uploaded";
    }
    
    if(item.Type === 'OrderNumber'){
      return index + 1;
    }
    return value;
};