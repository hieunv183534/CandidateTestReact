import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import TestResultApi from "../../api/entities/TestResultApi.js";
import QuestionApi from "../../api/entities/QuestionApi.js";
import "../../css/layout/TestContent.css";
import Button from '../common/Button.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PopupConfirm from '../common/PopupConfirm.js';
import { toast } from 'react-toastify';

function TestResultsContent(){
    const getTestResult=() => {

    }
    return( <div>
        <h2>Trang testresult home</h2>
        <input>abc</input>
        <Button btnText={"Thêm gì đây?"} btnType={"btn-primary"} btnOnClick={() => { alert(1) }} />
        
    </div> );
}

export default TestResultsContent;