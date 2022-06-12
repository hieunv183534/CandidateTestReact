import React from "react";
import Button from '../common/Button.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function PopupConfirm({ isOpen, title, content, actions }) {
    return (
        <Dialog open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                {actions.map(action => {
                    return (<Button btnText={action.text} btnType={action.buttonType} btnOnClick={action.callBack} key={action.text}/>)
                })}
            </DialogActions>
        </Dialog>
    );
}

export default PopupConfirm;
