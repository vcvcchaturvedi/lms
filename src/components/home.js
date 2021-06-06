import React, { useState, useEffect, Fragment } from "react";
import { api } from "../App.js";
import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import { run as runHolder } from "holderjs/holder";
import FirstSlide from "../images/1.jpg";
import SecondSlide from "../images/2.jpg";
import ThirdSlide from "../images/3.jpg";
import aiml from "../images/aiml.png";
import CourseDetail from "./coursedetail.js";

const Home = function () {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    api
      .get("/courses")
      .then((res) => {
        setCourses([...res.data]);
      })
      .catch((err) => console.log(JSON.stringify(err)));
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
          {courses.map((course) => {
            return <CourseDetail course={course} />;
          })}
        </div>
      </section>
    </div>
  );
};
export default Home;
