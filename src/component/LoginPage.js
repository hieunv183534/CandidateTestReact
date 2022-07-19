import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountApi from "../api/entities/AccountApi";
import '../css/layout/LoginPage.css'
import { toast } from "react-toastify";

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
        sessionStorage.setItem("info", JSON.stringify(res.data.data.infomation));
        if (res.data.data.infomation.role == 'admin') {
          navigate("/admin/");
        }else{
          toast.error("Tài khoản của bạn không dùng được ở đây!");
        }
      })
      .catch((err) => {
        toast.error("Tài khoản không đúng!");
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
          <div><input type="submit" value="Sign In" /></div>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;
