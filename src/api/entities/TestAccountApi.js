import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class TestAccountApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/testaccount";
    }

    updateTestAccount(change){
        return BaseApiConfig.post(`${this.apiController}/updateTestAccount`, change,{
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }
}

export default new TestAccountApi();