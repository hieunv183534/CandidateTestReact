import React, { useState } from "react";
import '../../css/common/Menu.css'

import { Link } from 'react-router-dom'

function Menu({listMenu}) {

    const [optionActive, setOptionActive] = useState(window.location.pathname);

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