/**
 * Created by sea35 on 2016/12/7.
 */

const httpHeader = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host':'news.at.zhihu.com'
    }
};
function http(method, url, params, callback, err?: (err: Error) => void) {
    var header = Object.assign({}, httpHeader, {method: method});

    if (params)
        header.body = params;

    fetch(url, header)
        .then((resp) => resp.json())
        .then((resp) => {
            callback(resp);
        })
        .catch((error) => {
            if (err)
                err(error);
        });
}
module.exports={
    get:( url, params, callback, err?: (err: Error) => void)=>{
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        http("GET",url, null, callback, err);
    },
    post:( url, params, callback, err?: (err: Error) => void)=>{
        http("POST",url, params, callback, err);
    }
}