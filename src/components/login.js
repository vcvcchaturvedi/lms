import React, { useState, useEffect, Fragment } from "react";
import { api } from "../App.js";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
const Login = function ({ isLoggedIn, setIsLoggedIn, userData, setUserData }) {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let data2 = {};
    for (let key in data) {
      data2[key.toString()] = data[key];
    }

    let res = await api.post("/login", JSON.parse(JSON.stringify(data)), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      JSON: true,
    });
    if (res.data.username) {
      setUserData(res.data);
      setIsLoggedIn(true);
      console.log(JSON.stringify(res.data));
      history.push("/dashboard");
    } else {
      alert("Error in logging in: " + res.data.message);
    }
  };

  return (
    <div className="formLogin">
      <h2 style={{ color: "gray", padding: "50px" }}>Login to LMS</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="labelLoginForm" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="errorLoginForm">⚠ Please enter your user name</p>
          )}
        </div>

        <div>
          <label className="labelLoginForm" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="errorLoginForm">⚠ Please enter your password</p>
          )}
        </div>

        <input type="submit" />
      </form>
      <h5>
        New User? &nbsp;
        <Link to="/register">Register here</Link>
      </h5>
    </div>
  );
};
export default Login;
