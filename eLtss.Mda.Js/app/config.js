import path from "path";
import URI from "urijs";
const moduleList = [
    {
        "Name": 'IndividualSupportPlan',
        "RoutePrefix": ['/IndividualSupportPlans/IndividualSupportPlan']
    }, {
        "Name": 'PlanForSupport',
        "RoutePrefix": ['/IndividualSupportPlans/IndividualSupportPlan']
    }, {
        "Name": 'Outreach',
        "RoutePrefix": ['/Outreach/OutreachQueue']
    }, {
        "Name": 'OutreachSummary',
        "RoutePrefix": ['/Outreach/OutreachSummary']
    }, {
        "Name": 'VisitChecklist',
        "RoutePrefix": ['/VisitChecklists/VisitChecklist']
    }, {
        "Name": 'PlanOfCare',
        "RoutePrefix": ['/PlanOfCares/PlanOfCare']
    }
];
let defaultModule = 'Outreach'
var uri = URI(window.location.href);
let host = uri.origin();
let virtualPath = uri.segment(0);
if(process.env.NODE_ENV==="production")
{
    if(virtualPath === "webapp")
    {
        __webpack_public_path__= "/" +  virtualPath + "/Mda/";
        host = host + "/" + virtualPath
    }
    else
    {
        const seg2=uri.segment(1);
        if(seg2==="Ltss.Web")
        {
            virtualPath = virtualPath + "/" + uri.segment(1);
            __webpack_public_path__= "/" +  virtualPath + "/Mda/";
            host = host + "/" + virtualPath
        }
        else
        {
            virtualPath="";
            __webpack_public_path__= "/Mda/";
        }
    }

}
else
{
    if(uri.port() === "3000")
    {
        host =uri.port(3001).origin();
    }

}

export function combineUrlByQuery(prefix, actionName, query) {
    let url = host + prefix;
    let getURL = `${url}/${actionName}?`;
    if (!query) {
        return getURL;
    }

    const esc = encodeURIComponent;
    const queryString = Object
        .keys(query)
        .map(k => esc(k) + '=' + esc(query[k]))
        .join('&');

    if (queryString) {
        getURL += queryString;
    }
    return getURL;
}

export function getRoutePrefix(prefix, type) {

    if (process.env.NODE_ENV === 'development') {
        return "";
    }
    else {
        const resultPrefix =  virtualPath + prefix;
        if (type && type === "razor") {
            return resultPrefix;
        }
        return resultPrefix+'/Index/';
    }
}

export const HOST = host;
export const DEFAULT_MODULE = defaultModule;
export const MODULE_LIST = moduleList;