import lodash from "lodash";
import * as customRules from './customRules';

const defaultState = {
    _display: true,
    _readonly: false,
    _required: false,
    _customAttribute: null,
    _value: null
};

export function initComponentsState(metadata, path = '') {
    let state = {};
    let rules = {};
    let flattenIndexedRules = {};
    state['rules'] = [];
    if(metadata.Rules)
    {
        for (let rule of metadata.Rules) {
            let isRuleInCurrentPage = false;
            if (rule.Sources) {
                for (let source of rule.Sources) {
                    if (source.indexOf(path) === 0) {
                        isRuleInCurrentPage = true;
                        if (rules[source]) {
                            rules[source].push(Object.assign({}, rule));
                            flattenIndexedRules[source].push(Object.assign({}, rule));
                        } else {
                            rules[source] = [Object.assign({}, rule)];
                            flattenIndexedRules[source] = [Object.assign({}, rule)];
                        }
                    }
                }
            }
            if (rule.Targets) {
                for (let target of rule.Targets) {
                    if (target.indexOf(path) === 0) {
                        isRuleInCurrentPage = true;
                        const paths = (target || '').split('.');

                        lodash.forEach(paths, (path, key) => {
                            let tempPath = paths
                                .slice(0, key + 1)
                                .join('.');
                            if (lodash.get(state, tempPath)) {
                                lodash.set(state, tempPath, Object.assign({}, lodash.get(state, tempPath), buildDefaultStateByPath(tempPath, metadata)));
                            } else {
                                lodash.set(state, tempPath, Object.assign({}, buildDefaultStateByPath(tempPath, metadata)));
                            }
                        });
                    }
                }
            }
            if (isRuleInCurrentPage) {
                state['rules'].push(Object.assign(rule));
            }
        }
    }

    state['_display'] = true;
    state['flattenIndexedRules'] = flattenIndexedRules;
    return Object.assign({}, state);
}

/*
{
    When:"return section1.question1 === section1.question2",
    Then:"show/hide/makeReadonly/makeEditable/makeRequired/makeOptional",
    Sources:["section1.question1","section1.question2"]
    Targets:["section1.question3","section1.question4"]
}
*/

export function combineComponentsState(componentsState, data, context) {
    if(data)
    {
        lodash.forIn(componentsState.rules, (rule, key) => {
            const func = buildJavascriptFunction(rule.When)(customRules, data, context);
            if ((typeof func === 'function' && func(lodash, data) === true) || func === true) {
                applyRule(rule.Then, rule.Targets, componentsState);
            }
        });
    }

    return componentsState;
}

//Add CombineOutreach
/*export function combineOutreachComponentsState(componentsState, data) {
    if(data)
    {
        lodash.forIn(componentsState.rules, (rule, key) => {
            const func = buildJavascriptFunction(rule.When)(data.FirstAttempt);
            if ((typeof func === 'function' && func(lodash, data.FirstAttempt) === true) || func === true) {
                applyRule(rule.Then, rule.Targets, componentsState);
            }
        });
    }

    return componentsState;
}*/

export function applyRule(then, targets, componentsState) {

    let nextComponentsState = {};
    for (let target of targets) {
        if (then.indexOf('mark:') === 0) {
            const attribute = then.substring(5);
            lodash.set(componentsState, target, Object.assign({}, lodash.get(componentsState, target), {_customAttribute: attribute}));
        } else {
            switch (then) {
                case 'show':
                    lodash.set(componentsState, target, Object.assign({}, lodash.get(componentsState, target), {_display: true}));
                    break;
                case 'hide':
                    lodash.set(componentsState, target, Object.assign({}, lodash.get(componentsState, target), {_display: false}));
                    break;
                case 'makeReadonly':
                    lodash.set(componentsState, target, Object.assign({}, lodash.get(componentsState, target), {_readonly: true}));
                    break;
                case 'makeEditable':
                    lodash.set(componentsState, target, Object.assign({}, lodash.get(componentsState, target), {_readonly: false}));
                    break;
                case 'makeRequired':
                    lodash.set(componentsState, target, Object.assign({}, lodash.get(componentsState, target), {_required: true}));
                    break;
                case 'makeOptional':
                    lodash.set(componentsState, target, Object.assign({}, lodash.get(componentsState, target), {_required: false}));
                    break;              
                default:
                    break;
            }
        }
    }
}

export function buildJavascriptFunction(jsCode) {
    const func = new Function('customRules', 'data', 'context', 'try{' + jsCode + '}catch(err){return false;}');
    return func;
}

export function buildDefaultStateByItem(item) {
    return {
        _display: (item && item.Display) === false
            ? false
            : true,
        _readonly: (item && item.ReadOnly) || false,
        _required: (item && item.IsRequired) || false,
        _customAttribute: (item && item.CustomAttribute) || null,
        _value: (item && item.Value) || null
    };
}

export function buildDefaultStateByPath(path, metadata) {
    const item = findItemFromMetadata(path, metadata);
    return buildDefaultStateByItem(item);
}

export function findItemFromMetadata(path, metadata) {

    if (!path) {
        return Object.assign({}, metadata);
    }

    if (metadata && (metadata.Items || metadata.Sections) && path) {
        const firstPath = path.substring(0, path.indexOf('.') == -1
            ? path.length
            : path.indexOf('.'));
        const restPath = path.substring(firstPath.length + 1);

        let item = lodash.find(metadata.Items, {'Name': firstPath});
        if (item) {
            return Object.assign({}, item);
        }

        const section = lodash.find(metadata.Sections, {'Name': firstPath});

        if (section) {
            if (restPath) {
                return findItemFromMetadata(restPath, section);
            } else {
                return Object.assign({}, section);
            }
        }
        return null;
    }
    return null;
}