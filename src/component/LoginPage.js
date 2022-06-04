import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountApi from "../api/entities/AccountApi";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Username:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your password:
          <input
            type="text"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
