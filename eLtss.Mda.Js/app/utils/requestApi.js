import request from 'superagent';
import toastr from "./toastr";
import lodash from "lodash";
import noCache from "superagent-no-cache";

function buildRequest(req, options, url) {
  let reqNew = req;
  options = options || {};
  if (options.method && options.method.toLowerCase() !== "get") {
    switch (options.method.toLowerCase()) {
      case 'head':
        reqNew = reqNew.head(url);
        break;
      case 'post':
        reqNew = reqNew.post(url);
        break;
      case 'put':
        reqNew = reqNew.post(url);
        break;
      default:
        reqNew = reqNew.get(url);
        break;
    }
  } else {
    reqNew = reqNew.get(url);
  }
  if (options.headers) {
    lodash
      .forIn(options.headers, function (value, key) {
        reqNew = reqNew.set(key, value);
      });
  }
  if (options.body) {
    reqNew = reqNew.send(options.body);
  }

  return reqNew.withCredentials();
}

function requestApi(url, options) {
  return new Promise((resolve, reject) => {
    buildRequest(request, options, url).use(noCache).end(function (err, res) {
      if (err || !res.ok) {
        toastr.error(err);
      } else if (res && res.body) {
        if (res.body.Message) {
          if (res.body.ResultFlag === 1) {
            toastr.success(res.body.Message);
            resolve(res.body);
          } else {
            toastr.error(res.body.Message);
          }
        } else {
          resolve(res.body);
        }
      } else {
        toastr.error('Query return null');
      }
      window.deActivateBlockUi && window.deActivateBlockUi();
    });
  });
}

export default requestApi;