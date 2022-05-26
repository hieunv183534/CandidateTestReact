import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class QuestionApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/Question";
    }
}

export default new QuestionApi();