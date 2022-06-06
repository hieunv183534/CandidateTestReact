import React, { useEffect } from "react";
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
      <div clasName="img-container">
        <img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t31.18172-8/15844793_1549444465073658_5405440182702780537_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=1iDJA4f5ktwAX_rJGLE&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9fmaaUhk3Hh3dJOSYQb9F_vIkLMEbBedpFUPIYzdguHQ&oe=62C1A80E" alt="Avatar" class="avatar" />
      </div>
      <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Enter Username:</h3>
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
        <h3>Enter Password:</h3>
          <input
            type="text"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" Login />
      </form>
      </div>
    </div>
  );
}

export default LoginPage;
