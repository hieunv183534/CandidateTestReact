import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class QuestionApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/Question";
    }
    PostQuestion(Question){
        return BaseApiConfig.post(`${this.apiController}`, {Question});
    }
    getListQuestion(count,index,type,category ){
        return BaseApiConfig.get(`${this.apiController}count=${count}&?index=${index}&type=${type}&category=${category}`);
    }
    deleteQuestion(id){
        return BaseApiConfig.delete(`${this.apiController}?id=${id} `);
    }

}

export default new QuestionApi();