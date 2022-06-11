import React, { useState } from "react";
import Button from '../common/Button.js';
import Dropdown from '../common/Dropdown.js';
import MyPopup from '../common/Popup.js';


function QuestionsContent({}){

    const  [myChoose, setMyChoose] =  useState("");
    const [isPopupVisible, setPopupVisibility] = useState(true);
 
    const togglePopup = () => {
        setPopupVisibility(!isPopupVisible);
    };

    const btnOnClick = ()=>{
        alert(myChoose);
    }

    const dropdownOnSelect = (item)=>{
        console.log(item);
        setMyChoose(item.text1);
    }

    const renderContent = () =>  {
        return (
            <>
                <Button btnText={"Xác nhận"} btnType={"btn-secondary"} btnOnClick={btnOnClick}/>
            </>            
        )
    }



    const actions = [
        { id: 1, text1: "My profile", icon: "user" },
        { id: 2, text1: "Messages", icon: "email" },
        { id: 3, text1: "Contacts", icon: "group" },
        { id: 4, text1: "Log out", icon: "runner" }
    ];

    return( <div>
        <h2>Trang question home</h2>
        <br /><br /><br />
        <Button btnText={"Show"} btnType={"btn-secondary"} btnOnClick={togglePopup}/>
        <Dropdown actions={actions} onSelect = {dropdownOnSelect}/>
        <MyPopup isPopupVisible={isPopupVisible} togglePopup={togglePopup} title = {"Thông báo"} contentRender= {renderContent}/>

    </div> );

}

export default QuestionsContent;