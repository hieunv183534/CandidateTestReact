import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class TestApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/test";
    }
  
    getListTest(count,index,searchTerm){
        return BaseApiConfig.get(`${this.apiController}?count=${count}&index=${index}&searchTerms=${searchTerm}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }

    getListCandidate(testId){
        return BaseApiConfig.get(`${this.apiController}/getCandidatesOfTest/${testId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token"),
            }
        });
    }
}

export default new TestApi();