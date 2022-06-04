import BaseApi from "../base/BaseApi.js"
import BaseApiConfig from "../base/BaseApiConfig.js"

class AccountApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "api/Account";
    }

    login(username, password){
        return BaseApiConfig.post(`${this.apiController}/login`, {username,password});
    }

    getListAccount(index,count,searchTerms,role ){
        return BaseApiConfig.get(`${this.apiController}?index=${index}&count=${count}&searchTerms=${searchTerms}&role=${role}`,{headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
        }});
    }
    deleteAccout(id){
        return BaseApiConfig.delete(`${this.apiController}?id=${id} `);
    }

}

export default new AccountApi();