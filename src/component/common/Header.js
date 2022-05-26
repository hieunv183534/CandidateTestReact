import React, { useState } from "react";
import '../../css/common/Header.css'
import { useNavigate } from "react-router-dom";

function Header({ userName }) {
    const [isShowOption, setIsShowOption] = useState(false);
    const navigate = useNavigate();

    const userInfoOnClick = () => {
        setIsShowOption(true);
    };

    const userInfoOnBlur = () => {
        setTimeout(()=>{
            setIsShowOption(false);
        },500)
    };

    const btnLogoutOnClick = ()=>{
        navigate("/");
    };

    return (
        <div className="header">
            <div className="header-left">
                <h2>Kiểm tra đầu vào ứng viên</h2>
                <h2 id="unitDetail"></h2>
            </div>
            <div className="header-right">
                <div className="notification">
                    <i className="fas fa-bell"></i>
                </div>
                <button className="user" onClick={userInfoOnClick} onBlur={userInfoOnBlur}>
                    <div className="avatar"></div>
                    <p className="display-user">{userName}</p>
                    <i className="fas fa-angle-down"></i>
                </button>
                <div className={`list-option ${isShowOption ? 'list-option-show' : ''}`}>
                    <div className="item-option">Chỉnh sửa thông tin</div>
                    <div className="item-option">Hotline</div>
                    <div className="item-option">About me</div>
                    <div className="item-option" onClick={btnLogoutOnClick}>Đăng xuất</div>
                </div>
            </div>
        </div>);
}

export default Header;