import React from 'react';
import {useState} from "react";
import AccountApi from "../../api/entities/AccountApi.js"


function Form() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    AccountApi.add(inputs).then(res=>{
      alert("thêm tài khoản thành công");
    }).catch(err=>{
      alert("Không thành công");
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>New account:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label> Password:
        <input 
          type="text" 
          name="password"  
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
      <label> FullName:
        <input 
          type="text" 
          name="fullName"   
          value={inputs.fullName || ""} 
          onChange={handleChange}
        />
        </label>
      <label> Email:
        <input 
          type="text" 
          name="email"  
          value={inputs.email  || ""} 
          onChange={handleChange}
        />
        </label>
      <label> Phone:
        <input 
          type="text" 
          name="phone"  
          value={inputs.phone || ""} 
          onChange={handleChange}
        />
        </label>
      <label> Address:
        <input 
          type="text" 
          name="address"   
          value={inputs.address || ""} 
          onChange={handleChange}
        />
        </label>
      <label> Id:
        <input 
          type="text" 
          name="id"   
          value={inputs.id || ""} 
          onChange={handleChange}
        />
        </label>
      <label> Role:
        
        </label>
      <label> DateOfBirth:
        <input 
          type="date" 
          name="dateOfBirth"    
          value={inputs.dateOfBirth || ""}
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}

export default Form;