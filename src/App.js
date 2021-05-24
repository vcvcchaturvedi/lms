import logo from "./logoLMS.png";
import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import $, { event } from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import { run as runHolder } from "holderjs/holder";
import FirstSlide from "./images/1.jpg";
import SecondSlide from "./images/2.jpg";
import ThirdSlide from "./images/3.jpg";
import aiml from "./images/aiml.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3200",
});
const element = <FontAwesomeIcon icon={faUser} />;
let Features = function () {
  return <div>This is the features section</div>;
};
let Pricing = function () {
  return <div>This is the pricing section</div>;
};
let About = function () {
  return <div>This is the about us section</div>;
};

let Register = function () {
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
        alert(JSON.stringify(response));
        history.push("/dashboard");
      })
      .catch((error) => {
        alert(error);
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
let Dashboard = function () {
  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => alert(JSON.stringify(res)))
      .catch((err) => alert(err));
  }, []);
  return <div>Hello user!</div>;
};
let Login = function () {
  let history = useHistory();
  const [resdata, setResdata] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let res = await api.post("/login", data);
    setResdata(res.data);
    alert(JSON.stringify(res.data));
    history.push("/dashboard");
    // api
    //   .post("/login", data)
    //   .then((res) => {
    //     setResdata(res.data);
    //   })
    //   .then(() => {
    //     alert(JSON.stringify(resdata));
    //     history.push("/dashboard");
    //   })
    //   .catch((err) => alert(err));
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
let Home = function () {
  useEffect(() => {
    runHolder("d-block w-100"); /*.addTheme("dark", {
      bg: "#000",
      fg: "#aaa",
      size: 11,
      font: "Monaco",
      fontweight: "normal",
    });*/
  }, []);

  return (
    <div>
      <div className="mt-5 Heading">
        LMS - The Learning Management System where Teachers meet Students
        <br />
        <hr />
        <Carousel fade>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={ThirdSlide} /*/800x400?text=First slide&bg=373940*/
              alt="First slide"
            />
            {/*<Carousel.Caption>
            <h3 className="cc1">Study online</h3>
            <p className="cc2">Study at the comfort of your home</p>
          </Carousel.Caption>*/}
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={
                SecondSlide
              } /*"holder.js/800x400?text=Second slide&bg=282c34"*/
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3 className="cc1">Best In class Teachers</h3>
              <p className="cc2">
                Our array of best in class teachers ensures you have the best
                learning experience
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={
                FirstSlide
              } /*"holder.js/800x400?text=Third slide&bg=20232a"*/
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="cc1">Build your portfolio</h3>
              <p className="cc2">
                Build your portfolio with wide array of expertise to match
                recruiters' expectations
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <hr />
      <section className="mt-5">
        <h1 className="Heading">Our most saught of courses...</h1>
        <div className="row">
          <div className="col-4">
            <div className="card mb-3 bg-warning">
              <img className="card-img-top" src={aiml} alt="AIML" />
              <div className="card-body">
                <h5 className="card-title">
                  <b>Artificial Intelligence & Machine Learning</b>
                </h5>
                <p className="card-text">
                  A rigorous course on Artificial Intelligence and Machine
                  Learning taught by Professor Vinay Chaturvedi equips you with
                  the latest in this field.
                </p>
                <p className="card-text">
                  <button className="btn btn-primary">Enroll Now!</button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card mb-3 bg-warning">
              <img className="card-img-top" src={aiml} alt="AIML" />
              <div className="card-body">
                <h5 className="card-title">
                  <b>Artificial Intelligence & Machine Learning</b>
                </h5>
                <p className="card-text">
                  A rigorous course on Artificial Intelligence and Machine
                  Learning taught by Professor Vinay Chaturvedi equips you with
                  the latest in this field.
                </p>
                <p className="card-text">
                  <button className="btn btn-primary">Enroll Now!</button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card mb-3 bg-warning">
              <img className="card-img-top" src={aiml} alt="AIML" />
              <div className="card-body">
                <h5 className="card-title">
                  <b>Artificial Intelligence & Machine Learning</b>
                </h5>
                <p className="card-text">
                  A rigorous course on Artificial Intelligence and Machine
                  Learning taught by Professor Vinay Chaturvedi equips you with
                  the latest in this field.
                </p>
                <p className="card-text">
                  <button className="btn btn-primary">Enroll Now!</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
function App() {
  const [onMouseOverCourses, setOnMouseOverCourses] = useState(false);
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

                <li
                  className={
                    onMouseOverCourses
                      ? "nav-item dropdown open"
                      : "nav-item dropdown"
                  }
                  onMouseEnter={() => {
                    setOnMouseOverCourses(!onMouseOverCourses);
                  }}
                  onMouseLeave={() => {
                    setOnMouseOverCourses(!onMouseOverCourses);
                  }}
                >
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Courses
                  </a>
                  <div
                    id="CoursesDropDown"
                    className={
                      onMouseOverCourses
                        ? "dropdown-menu show"
                        : "dropdown-menu"
                    }
                  >
                    <a href="#" className="dropdown-item">
                      Information Technology
                    </a>
                    <a href="#" className="dropdown-item">
                      Management
                    </a>
                    <a href="#" className="dropdown-item">
                      Accounting
                    </a>
                    <a href="#" className="dropdown-item">
                      Others
                    </a>
                  </div>
                </li>
                <Link to="/login" className="HideLink">
                  <li className="nav-item">
                    <button className="nav-link btn">
                      {element} &nbsp; Login
                    </button>
                  </li>
                </Link>
              </ul>
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search a course"
                  aria-label="Search"
                ></input>
                <button className="btn btn-outline-info my-2 my-sm-0">
                  Search
                </button>
              </form>
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
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
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
