import React from "react";
import '../../css/common/Menu.css'

import { Link } from 'react-router-dom'

function Menu() {
    return (
        <div className="menu">
            <div className="menu-header">
            </div>
            <Link to="/admin/">
                <div className="menu-option">
                    <i className="fas fa-home"></i>
                    <p>Trang chủ</p>
                </div>
            </Link>
            <Link to="/admin/account">
                <div className="menu-option">
                    <i className="fas fa-user-gear"></i>
                    <p>Quản lí người dùng</p>
                </div>
            </Link>
            <Link to="/admin/question">
                <div className="menu-option">
                <i className="fas fa-clipboard-question"></i>
                    <p>Quản lí câu hỏi</p>
                </div>
            </Link>
            <Link to="/admin/test">
                <div className="menu-option">
                <i className="fas fa-file-circle-check"></i>
                    <p>Quản lí bài thi</p>
                </div>
            </Link>
            <Link to="/admin/testresult">
                <div className="menu-option">
                <i className="fas fa-bullseye"></i>
                    <p>Quản lí kết quả</p>
                </div>
            </Link>
        </div>
    );
}

export default Menu;