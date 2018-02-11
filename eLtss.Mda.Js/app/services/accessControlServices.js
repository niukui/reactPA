import {HOST} from 'config';
import requestApi from 'utils/requestApi';
import lodash from 'lodash';

let accessModel = null;
export function getAccessControlFromCache(moduleName) {
    
    return new Promise((resolve, reject) => {
        let result = lodash.get(accessModel, moduleName);
        if (result) {
            resolve(result);
        } else {
            getAccessControl(moduleName).then((result) => {
                const policy = {
                    AccessPolicies: result
                }
                lodash.set(accessModel, name, policy);
                resolve(policy);
            }).catch(err => {
                reject(err);
            });
        }
    });
}

function getAccessControl(moduleName) {
    
    return new Promise((resolve, reject) => {
        const modelDescriptor = "";
        const requestURL = `${HOST}/Account/GetAccessPoliciesByModuleName?name=${moduleName}`;
        requestApi(requestURL, {credentials: 'include'}).then((result) => {
            resolve(result.DataObject);
        }).catch((err) => {
            reject(err);
        });
    });
}
