import React from "react"; 
import Menu from './common/Menu';
import Header from './common/Header';
import '../css/layout/AdminPage.css';
import { Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";
import { Input } from "@mui/material";


function AdminPage(){
    
    return( 
        <div className="admin-page">
            <div className="right">
                <Menu/>
            </div>
            <div className="left">
                <Header userName={"Admin"}/>
                <Outlet />
            </div>
        </div> 
    );
}

export default AdminPage;