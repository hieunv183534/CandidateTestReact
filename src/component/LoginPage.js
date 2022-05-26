import React , {useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const navigate = useNavigate();

    const toAdminPage = () =>{
        navigate("/admin/");
    };

    return( 
            <div>Hello world!

                <button onClick={toAdminPage}>To Admin page</button>
            </div>
    );
}

export default LoginPage;