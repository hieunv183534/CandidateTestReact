import React , { useState} from "react";
import Table from "../common/Table";
import '../../css/layout/TestContent.css'
import DropDown from "../common/Dropdown";


const columns = [
    "id",
    "Question",
    "Type",
    "Category"
    
  ];
function TestsContent(){
    
    return( 
      <div>
      <h1 className="title">Quản lý bài thi</h1>
      
    </div> );
}

export default TestsContent;