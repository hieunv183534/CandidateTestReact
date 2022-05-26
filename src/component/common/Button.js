import React from "react";
import '../../css/common/Button.css';

function Button({btnText, btnType, btnOnClick}) {

    return (
        <button className={`button ${btnType}`} onClick={btnOnClick}>
            <p>{btnText}</p>
        </button>
    );
}

export default Button;