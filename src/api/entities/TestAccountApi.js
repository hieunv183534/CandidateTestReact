import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class TestAccountApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/testaccount";
    }

    updateTestAccount(change){
        return BaseApiConfig.post(`${this.apiController}/updateTestAccount`, change);
    }
}

export default new TestAccountApi();