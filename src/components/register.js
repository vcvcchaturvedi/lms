import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { api } from "../App.js";
const Register = function ({
  isLoggedIn,
  setIsLoggedIn,
  userData,
  setUserData,
}) {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const onSubmit = (data) => {
    api
      .post("/auth/register", data)
      .then((response) => {
        setIsLoggedIn(true);
        setUserData(response.data);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [password, setPassword] = useState("");

  return (
    <div className="formRegister">
      <h2 style={{ color: "darkblue", padding: "5px" }}>Register on LMS</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-6">
            <label className="labelRegisterForm" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              {...register("firstname", {
                required: true,
                maxLength: 40,
              })}
            />
            {errors.firstname && (
              <p className="errorLoginForm">
                ⚠ Please enter a valid First Name
              </p>
            )}
          </div>
          <div className="col-6">
            <label className="labelRegisterForm" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              {...register("lastname", { required: true, maxLength: 100 })}
            />
            {errors.lastname && (
              <p className="errorLoginForm">⚠ Please enter a last name</p>
            )}
          </div>
        </div>
        <div>
          <label className="labelRegisterForm" htmlFor="email">
            Email ID
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email ID"
            {...register("email", {
              required: true,
              maxLength: 100,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <p className="errorLoginForm">
              ⚠ Incorrect email id format, please use valid email id!
            </p>
          )}
        </div>
        <div className="row">
          <div className="col-6">
            <label className="labelRegisterForm" htmlFor="username">
              User Name
            </label>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              {...register("username", {
                required: true,
                maxLength: 66,
              })}
            />
            {errors.username && (
              <p className="errorLoginForm">⚠ Please enter valid username</p>
            )}
          </div>
          <div className="col-6">
            <div>
              <label className="labelRegisterForm" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  maxLength: 21,
                  pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
                })}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {errors.password && errors.password.type == "maxLength" && (
                <p className="errorLoginForm">
                  ⚠ Please make sure your password is small!
                </p>
              )}
              {errors.password && errors.password.type == "pattern" && (
                <p className="errorLoginForm">
                  ⚠ Please check if password has at least 1 uppercase, 1
                  lowercase and 1 number
                </p>
              )}
            </div>
            <div>
              <label className="labelRegisterForm" htmlFor="confirmpassword">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                {...register("confirmpassword", {
                  required: true,
                  maxLength: 21,
                  pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
                  validate: {
                    compare: (v) => v == password,
                  },
                })}
              />
              {errors.confirmpassword &&
                errors.confirmpassword.type == "maxLength" && (
                  <p className="errorLoginForm">
                    ⚠ Please make sure your password is small!
                  </p>
                )}
              {errors.confirmpassword &&
                errors.confirmpassword.type == "required" && (
                  <p className="errorLoginForm">
                    ⚠ Please re enter your password to confirm it!
                  </p>
                )}
              {errors.confirmpassword &&
                errors.confirmpassword.type == "pattern" && (
                  <p className="errorLoginForm">
                    ⚠ Please check if password has at least 1 uppercase, 1
                    lowercase and 1 number
                  </p>
                )}
              {errors.confirmpassword &&
                errors.confirmpassword.type == "compare" && (
                  <p className="errorLoginForm">
                    ⚠ Please check if both passwords entered match!
                  </p>
                )}
            </div>
          </div>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
