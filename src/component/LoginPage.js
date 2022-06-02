import React , {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./common/LoginForm";


function LoginPage(){
    const navigate = useNavigate();

    const toAdminPage = () =>{
        navigate("/admin/");
    };
  
    return( 
            <div>
                <LoginForm />
                <button onClick={toAdminPage} >To Admin page</button>
            </div>
    );
}

export default LoginPage;