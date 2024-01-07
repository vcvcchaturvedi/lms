import logo from "./logoLMS.png";
import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import Features from "./components/features.js";
import Pricing from "./components/pricing.js";
import About from "./components/about.js";
import Register from "./components/register.js";
import Dashboard from "./components/dashboard.js";
import Login from "./components/login.js";
import Home from "./components/home.js";
import Instructor from "./components/instructor.js";
export const api = axios.create({
  baseURL: "https://lms-backend-ojcr.onrender.com/",
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});
const element = <FontAwesomeIcon icon={faUser} />;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: "" });
  let logBtnClickHandler = function () {
    if (isLoggedIn && userData.username !== "") {
      setIsLoggedIn(false);
      api
        .get("/logout")
        .then((res) => {
          setUserData({});
          setIsLoggedIn(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <Link to="/" className="HideLink">
              <a className="navbar-brand float-left" href="#">
                <div>
                  <img src={logo} className="App-logo" alt="logo" />
                </div>
                Learning Management System
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse float-right"
              id="navbarColor01"
            >
              <ul className="navbar-nav mr-auto float-right ml-auto">
                <Link to="/" className="HideLink">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </Link>
                <Link to="/features" className="HideLink">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                </Link>
                <Link to="/pricing" className="HideLink">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                </Link>
                <Link to="/about" className="HideLink">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      About
                    </a>
                  </li>
                </Link>

                <Link to="/login" className="HideLink">
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={logBtnClickHandler}
                    >
                      {element} &nbsp; {isLoggedIn ? "Logout" : "Login"}
                    </button>
                  </li>
                </Link>
                {isLoggedIn ? (
                  <Fragment>
                    <Link to="/dashboard" className="HideLink">
                      <li className="nav-item">
                        <button className="nav-link btn">Dashboard</button>
                      </li>
                    </Link>
                    <Link to="/instructor" className="HideLink">
                      <li className="nav-item">
                        <button className="nav-link btn">Instructor</button>
                      </li>
                    </Link>
                  </Fragment>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </nav>
          <Switch>
            <Route path="/features">
              <Features />
            </Route>
            <Route path="/pricing">
              <Pricing />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userData={userData}
                setUserData={setUserData}
              />
            </Route>
            <Route path="/register">
              <Register
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userData={userData}
                setUserData={setUserData}
              />
            </Route>
            <Route path="/courses/:title">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <Dashboard
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userData={userData}
                setUserData={setUserData}
              />
            </Route>
            <Route path="/instructor">
              <Instructor
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userData={userData}
                setUserData={setUserData}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
