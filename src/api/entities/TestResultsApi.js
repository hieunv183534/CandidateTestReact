import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class TestResultsApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/testresult";
    }
  
    getTestResult(testId){
        return BaseApiConfig.get(`${this.apiController}/${testId}`);
    }
    
}

export default new TestResultsApi();