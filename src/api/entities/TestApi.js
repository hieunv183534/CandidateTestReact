import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class TestApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/test";
    }
  
    getListTest(count,index,searchTerm){
        return BaseApiConfig.get(`${this.apiController}?count=${count}&index=${index}&searchTerm=${searchTerm}`);
    }

    getListCandidate(testId){
        return BaseApiConfig.get(`${this.apiController}/getCandidatesOfTest/${testId}`);
    }
}

export default new TestApi();