import React, { useState } from "react";
import '../../css/common/DropDown.css';
import 'devextreme/dist/css/dx.light.css';

import DropDownButton from 'devextreme-react/drop-down-button';

function DropDown({ actions, onSelect }) {

    const [myText, setMyText] = useState(actions[0].text1);

    const clickVao1Item = (e) => {
        setMyText(e.itemData.text1);
        onSelect(e.itemData);
    }

    return (
        <DropDownButton
            className="my-dropdown"
            items={actions}
            keyExpr={"id"}
            displayExpr={"text1"}
            text={myText}
            onItemClick={clickVao1Item}
        />
    );
}

export default DropDown;