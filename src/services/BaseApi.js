import axios from 'axios';
import constant from '../constant.js';

class BaseApi {
    test() {
        console.log('constant', constant.apiBaseUrl);
    }
    getAll(url) {
        axios
            .get(constant.apiBaseUrl + url)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
export default BaseApi;
