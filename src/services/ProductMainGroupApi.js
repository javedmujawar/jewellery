import axios from 'axios';
const baseurl = 'http://localhost:3000/api/productmaingroups';
class ProductMainGroupApi {
    getAll() {
        return axios.get(baseurl);
    }
}
export default new ProductMainGroupApi();
