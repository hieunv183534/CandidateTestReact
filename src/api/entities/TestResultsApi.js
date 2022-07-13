import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class TestResultsApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/testresult";
    }
  
    getTestResultById(testId){
        return BaseApiConfig.get(`${this.apiController}byTestId?testId=${testId}`);
    }
    getTestResult(candidateId){
        return BaseApiConfig.get(`${this.apiController}?candidateId=${candidateId}`);
    }
}

export default new TestResultsApi();