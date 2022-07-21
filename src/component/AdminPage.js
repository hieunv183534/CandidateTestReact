import React from "react"; 
import Menu from './common/Menu';
import Header from './common/Header';
import '../css/layout/AdminPage.css';
import { Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";
import { Input } from "@mui/material";


function AdminPage(){
    const listMenu = [
        {
            to: '/admin/',
            icon: 'home',
            text: 'Trang chủ'
        },
        {
            to: '/admin/account',
            icon: 'user-gear',
            text: 'Quản lí người dùng'
        },
        {
            to: '/admin/question',
            icon: 'clipboard-question',
            text: 'Quản lí câu hỏi'
        },
        {
            to: '/admin/test',
            icon: 'circle-check',
            text: 'Quản lí bài thi'
        },
        {
            to: '/admin/testcandidate',
            icon: 'square',
            text: 'Người thi - bài thi'
        }
    ]
    
    return( 
        <div className="admin-page">
            <div className="right">
                <Menu listMenu={listMenu}/>
            </div>
            <div className="left">
                <Header userName={JSON.parse(sessionStorage.getItem('info')).userName}/>
                <Outlet />
            </div>
        </div> 
    );
}

export default AdminPage;