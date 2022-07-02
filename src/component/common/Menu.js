import React, { useState } from "react";
import '../../css/common/Menu.css'

import { Link } from 'react-router-dom'

function Menu() {

    const [optionActive, setOptionActive] = useState(window.location.pathname);

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
        },
        {
            to: '/admin/testresult',
            icon: 'bullseye',
            text: 'Quản lí kết quả'
        }
    ]

    return (
        <div className="menu">
            <div className="menu-header">
            </div>
            {listMenu.map(item =>
                <Link to={item.to} onClick={() => setOptionActive(item.to)} key={item.to}>
                    <div className={`menu-option ${item.to === optionActive ? 'active' : ''}`}>
                        <i className={`fas fa-${item.icon}`}></i>
                        <p>{item.text}</p>
                    </div>
                </Link>)}
            <div className="toggle-menu">
                <i className="fas fa-angle-left"></i>
            </div>
        </div>
    );
};

export default Menu;