import React, { useState } from "react";
import '../../css/common/Popup.css';
import 'devextreme/dist/css/dx.light.css';
import { Popup } from 'devextreme-react/popup';


function MyPopup({ title, isPopupVisible, togglePopup ,contentRender}) {
    return (
        <Popup
            visible={isPopupVisible}
            closeOnOutsideClick={true}
            onHiding={togglePopup}
            showTitle={true}
            title={title}
            width={500}
            height={500}
            resizeEnabled={true}
            contentRender ={contentRender}
        />
    );
}

export default MyPopup;