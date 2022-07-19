import axios from 'axios';
import constant from '../constant.js';

class BaseApi {
    test() {
        console.log('constant', constant.apiBaseUrl);
    }
    getAll(url) {
        return axios 
        //.get(constant.apiBaseUrl + url + '?' + 'filter=' + '%7B%22where%22%3A%7B%22isDeleted%22%3A0%7D%7D')          
        .get(constant.apiBaseUrl + url + '?' + 'filter={ "where":{"isDeleted":"0"},"order":["id DESC"]}')    
            .then((response) => {
                //console.log(response.data);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getListKV(url) {
        return axios
            .get(constant.apiBaseUrl + url + '/'+'getListKV' )
            .then((response) => {
              
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getJoinList(url) {
        return axios
            .get(constant.apiBaseUrl + url + '/'+'getJoinList' )
            .then((response) => {
              
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getListByParentId(url,methodname,parentId) {
        return axios
            .get(constant.apiBaseUrl + url + '/'+ methodname+'/'+parentId )
            .then((response) => {
              
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getById(url, id) {
        return axios
            .get(constant.apiBaseUrl + url + '/' + id)
            .then((response) => {
                //console.log(response.data);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    request(name, postData, method) {
        return new Promise(function (resolve, reject) {
            var url = constant.apiBaseUrl + name;

            if (method === undefined) {
                method = 'post';
            }

            axios
                .request({
                    method: method,
                    url: url,
                    data: postData,
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(async (response) => {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }
}
export default BaseApi;
