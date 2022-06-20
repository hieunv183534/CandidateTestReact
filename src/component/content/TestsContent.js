import React , { useState} from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import '../../css/layout/TestContent.css'




function TestsContent(){
    
    return( 
      <div className="TestContent">
      <h1 className="title">Quản lý bài thi</h1>
        <div className="questions">
            <div className="questions-content">
              <h2>Question 1</h2>
            </div>
            <div className="questions-content">
              <h2>Question 2</h2>
            </div>
            <div className="questions-content">
              <h2>Question 3</h2>
            </div>
           
           
            
        </div>
        
    </div> );
}

export default TestsContent;