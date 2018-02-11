import lodash from 'lodash';
import {POC_REVIEW_TYPE_IDS, POC_SETTING_TYPES} from 'utils/constants';
import moment from 'moment';

export const calculateService = (customCalculateFunctions, currentItem, items, data) => {
    lodash
        .forEach(customCalculateFunctions, function (customCalculateFunction) {
            if (lodash.indexOf(customCalculateFunction.Triggers, currentItem[0].name) >= 0) {
                lodash
                    .forEach(customCalculateFunction.Functions, function (functionName) {
                        switch (functionName) {
                            case "calculateReviewDate":
                                calculateReviewDate(currentItem, items, data);
                            default:
                                break;
                        }
                    })
            }
        })
}

const calculateReviewDate = (currentItem, items, data) => {
    var encounterDate = lodash.find(items, function (o) {
        return o.definition.Name == "EncounterDate";
    });
    var expectedNextReviewDate = lodash.find(items, function (o) {
        return o.definition.Name == "ExpectedNextReviewDate";
    });
    var reviewType = lodash.find(items, function (o) {
        return o.definition.Name == "ReviewType";
    });
    if (data.Setting.Id == POC_SETTING_TYPES.cwd) {
        expectedNextReviewDate.value = '';
        return;
    }
    if (encounterDate.value != null) {
        if (reviewType.value.Id == POC_REVIEW_TYPE_IDS.ninetyDays) {
            let EncounterDate = moment(encounterDate.value);
            expectedNextReviewDate.value = EncounterDate.add(90, 'days');
        } else if (reviewType.value.Id == POC_REVIEW_TYPE_IDS.hundredEightyDays) {
            let EncounterDate = moment(encounterDate.value);
            expectedNextReviewDate.value = EncounterDate.add(180, 'days');
        } else {
            expectedNextReviewDate.value = '';
        }
    }
}
