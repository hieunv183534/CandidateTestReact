import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountApi from "../api/entities/AccountApi";
import '../css/layout/LoginPage.css'

function LoginPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    AccountApi.login(inputs.username, inputs.password)
      .then((res) => {
        console.log(res.data.data.token);
        sessionStorage.setItem("token", res.data.data.token);
        navigate("/admin/");
      })
      .catch((err) => {
        alert("Tài khoản không đúng!");
      });
  };

  return (
    <div className="login-form">
    
      <div className="login-container">
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="formFieldLabel">
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
            placeholder="Admin"
          />
        </label>
        <label className="formFieldLabel">
          <input
            type="Password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            placeholder="Password"
          />
        </label>
        <div><input type="submit" value="Sign In"/></div>
        
      </form>
      </div>
    </div>
  );
}

export default LoginPage;
