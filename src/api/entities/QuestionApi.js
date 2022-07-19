import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class QuestionApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/question";
    }
  
    getListQuestion(count,index,type,category,searchTerms ){
        let _type = type ? `&type=${type}` : '';
        let _searchTerms = searchTerms ? `&searchTerms=${searchTerms}` : '';
        let _category = category ? `&category=${category}` : '';
        return BaseApiConfig.get(`${this.apiController}?count=${count}&index=${index}${_type}${_category}${_searchTerms}`);
    }
}

export default new QuestionApi();