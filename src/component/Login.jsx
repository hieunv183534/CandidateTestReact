import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountApi from "../api/entities/AccountApi";


function Login() {
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
    <div>
  <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
        <form className="login100-form validate-form" onSubmit={handleSubmit}>
          <span className="login100-form-title p-b-26">
            CMC Admin
          </span>
          <span className="login100-form-title p-b-48">
            <i className="zmdi zmdi-font" />
          </span>
          <div className="wrap-input100 validate-input" >
            <input className="input100" 
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange} />
            <span className="focus-input100" data-placeholder="Admin" />
          </div>
          <div className="wrap-input100 validate-input" data-validate="Enter password">
            <span className="btn-show-pass">
              
            </span>
            <input className="input100"
            type="Password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange} />
            <span className="focus-input100" data-placeholder="Password" />
          </div>
          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn" />
              <button className="login100-form-btn"  type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div id="dropDownSelect1" />
</div>
  );
}

export default Login;
