import axios from 'axios';
import config from '../constant.js';
console.log(config.baseurl);
class BaseApi {
    test() {
        console.log('config', config);
    }
    getAll(param) {
        axios
            .get(baseurl + param)
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
