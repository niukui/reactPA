import lodash from 'lodash';
import moment from 'moment';

const validationTypes = {
    regex: 'regex',
    min: 'min',
    max: 'max',
    compare: 'compare',
    custom: 'custom'
};

export const getValidationByType = (item, type) => {
    if (item.Validations && item.Validations.length > 0) {
        return lodash.find(item.Validations, {'Type': type});
    }
};

export const getRegexValidation = (item) => {
    if (item.Validations && item.Validations.length > 0) {
        return lodash.find(item.Validations, {'Type': validationTypes.regex});
    }
};

export const getMinValidation = (item) => {
    if (item.Validations && item.Validations.length > 0) {
        return lodash.find(item.Validations, {'Type': validationTypes.min});
    }
};

export const getMaxValidation = (item) => {
    if (item.Validations && item.Validations.length > 0) {
        return lodash.find(item.Validations, {'Type': validationTypes.max});
    }
};

export const getCompareValidation = (item) => {
    if (item.Validations && item.Validations.length > 0) {
        return lodash.find(item.Validations, {'Type': validationTypes.compare});
    }
};

export const getCustomValidation = (item) => {
    if (item.Validations && item.Validations.length > 0) {
        return lodash.find(item.Validations, {'Type': validationTypes.custom});
    }
};

const compareDateValue = (value, compareToValue, compareExpression) => {
    let validationResult = true;
    const momentValue = moment.isMoment(value)
        ? value
        : new moment(value);
    const momentCompareToValue = moment.isMoment(compareToValue)
        ? compareToValue
        : new moment(compareToValue);

    switch (compareExpression) {
        case '=':
            validationResult = (momentValue.isSame(momentCompareToValue, 'd'));
            break;
        case '!=':
            validationResult = !(momentValue.isSame(momentCompareToValue, 'd'));
            break;
        case '>':
            validationResult = (momentValue.isAfter(momentCompareToValue, 'd'));
            break;
        case '<':
            validationResult = (momentValue.isBefore(momentCompareToValue, 'd'));
            break;
        case '>=':
            validationResult = (momentValue.isSameOrAfter(momentCompareToValue, 'd'));
            break;
        case '<=':
            validationResult = (momentValue.isSameOrBefore(momentCompareToValue, 'd'));
            break;
    }
    return validationResult;
}

export const compareValue = (validation, valueObject) => {
    let validationResult = true;
    const value = lodash.get(valueObject, validation.name);
    const compareToValue = lodash.get(valueObject, validation.compare.compareTo);
    if (value && compareToValue) {
        if (validation.compare.valueType.startsWith('DateTimeOffset')) {
            validationResult = compareDateValue(value, compareToValue, validation.compare.expression);
        } else {
            switch (validation.compare.expression) {
                case '=':
                    validationResult = (value === compareToValue);
                    break;
                case '!=':
                    validationResult = (value !== compareToValue);
                    break;
                case '>':
                    validationResult = (value > compareToValue);
                    break;
                case '<':
                    validationResult = (value < compareToValue);
                    break;
                case '>=':
                    validationResult = (value >= compareToValue);
                    break;
                case '<=':
                    validationResult = (value <= compareToValue);
                    break;
            }
        }
    }

    return validationResult;
};