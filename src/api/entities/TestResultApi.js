import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class TestResultApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/testresult";
    }


    getTestResult(testId, candidateId){
        return BaseApiConfig.get(`${this.apiController}/byTestIdAndCandidateId?testId=${testId}&candidateId=${candidateId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }

    chamThi(id, scores){
        return BaseApiConfig.put(`${this.apiController}/${id}`, scores ,{
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }
}

export default new TestResultApi();