import toastr from "utils/toastr";
import metadataApis from 'metadataApis';
import lodash from 'lodash';

let metadata = null;

export default function getMetadataFromCache(name) {
    return new Promise((resolve, reject) => {
        let result=lodash.get(metadata,name);
        if (result) {
            resolve(result);
        } else {
            getMetadata(name).then((result) => {
                lodash.set(metadata,name,result);
                resolve(result);
            }).catch(err => {
                toastr(`load metadata error: ${err}`);
            });
        }
    });
}

export function getMetadataSectionByName(metadata, name) {
    if (metadata && metadata.Sections && metadata.Sections.length > 0) {
        const section = metadata
            .Sections
            .filter(section => section.Name == name);
        if (section) 
            return section[0];
        }
    return null;
}

const updateItemDataSource = (item, lookupPrefix) => {
    if ((item.Type === "Dropdown" || item.Type === "RadioButtonList" || item.Type === "CheckboxList" || item.Type === "AttributeFilterDropdown") && (!item.DataSource || !item.DataSource.LookupPrefix)) {
        item.DataSource = Object.assign({}, item.DataSource, lookupPrefix);
    }
}

const updateSectionItemsDataSource = (section, lookupPrefix) => {
    if (section.Items) {
        lodash.forEach(section.Items, item => {
            updateItemDataSource(item, lookupPrefix);
        });
    }
    if (section.Sections) {
        lodash.forEach(section.Sections, subSection => {
            updateSectionItemsDataSource(subSection, lookupPrefix);
        });
    }
}

export function getMetadata(name) {

    return new Promise((resolve, reject) => {
        // const modelDescriptor = ""; const requestURL =
        // `${HOST}/Systems/DomainModelDefinition/GetByModelDescriptor?modelDescriptor=$
        // { modelDescriptor}`;
        metadataApis[name]('', {credentials: 'include'}).then((result) => {
            let metadataDef = Object.assign({}, result);
            const lookupPrefix = {
                "LookupPrefix": metadataDef.LookupPrefix
            };

            lodash.forEach(metadataDef.Items, item => {
                updateItemDataSource(item, lookupPrefix);
            });
            lodash.forEach(metadataDef.Sections, section => {
                updateSectionItemsDataSource(section, lookupPrefix);
            });
            resolve(metadataDef);
        }).catch((err) => {
            reject(err);
        });
    });
}
