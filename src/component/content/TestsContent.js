import React , { useState} from "react";
import Table from "../common/Table";
import Button from "../common/Button";

import '../../css/layout/TestContent.css'

var user = [{
  name : 'John',
  location : 'New York',
  age : 21
},
{
name : 'Andy',
location : 'Bangkok',
age : 22
},
{
name : 'Lena',
location : 'Pakistan',
age : 18
},
{
name : 'Luna',
location : 'Taiwan',
age : 19
}]


function TestsContent(){
    
    return( 
      <div className="TestContent">
        <h1 className="title">Quản lý bài thi</h1>
       <div className="questions">
        <div>
         {user.map((user, index) => {
          return (
            <div key={index}  className="question-content">
              {index}
              <p>{user.name}</p>
              <p>{user.location}</p>
              <p>{user.age}</p>
            </div>
          )
         })}
        </div>
      </div>
    </div>  
)}

export default TestsContent;