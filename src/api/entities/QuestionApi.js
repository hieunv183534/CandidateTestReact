import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class QuestionApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/question";
    }
  
    getListQuestion(count,index,type,category ){
        return BaseApiConfig.get(`${this.apiController}?count=${count}&index=${index}&type=${type}&category=${category}`);
    }
}

export default new QuestionApi();