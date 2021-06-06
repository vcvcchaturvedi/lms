import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { api } from "../App.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
const Instructor = function ({
  isLoggedIn,
  setIsLoggedIn,
  userData,
  setUserData,
}) {
  let history = useHistory();
  let setTutor = function () {
    api
      .post("/tutor", userData)
      .then((res) => {
        alert("Hey, welcome onboard LMS as a Tutor!");
        setUserData((userData) => {
          let t = { ...userData };
          t.isTutor = true;
          return t;
        });
      })
      .catch((err) => console.log("Error: " + err));
  };
  let CreateCourse = function () {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
      let req = {};
      req.title = data.title;
      req.image = data.image;
      req.description = data.description;
      let chapters = [];
      for (let i = 1; i <= chapterCount; i++) {
        let chapter = {};
        let url = "url" + i;
        chapter.url = data[url];
        let chapterTitle = "chapterTitle" + i;
        chapter.chapterTitle = data[chapterTitle];
        chapters.push(chapter);
      }
      req.chapters = chapters;

      api
        .post("/newcourse", req)
        .then((res) => alert("Course Created!"))
        .catch((err) => alert("Error: " + err));
    };
    const [chapterCount, setChapterCount] = useState(1);

    let AddChapter = function ({ index }) {
      const nameURL = "url" + index.toString();
      const nameChapterTitle = "chapterTitle" + index.toString();
      return (
        <div className="col-8 offset-2">
          Chapter {index}
          <label className="labelLoginForm col-6" htmlFor={nameURL}>
            Chapter Content URL
          </label>
          <input
            name={nameURL}
            type="url"
            placeholder="Enter Content URL of the chapter"
            {...register(nameURL, { required: true })}
          />
          {errors.nameURL && (
            <p className="errorLoginForm">⚠ Please enter correct URL</p>
          )}
          <label className="labelLoginForm col-6" htmlFor={nameChapterTitle}>
            Chapter Title
          </label>
          <input
            name={nameChapterTitle}
            type="text"
            placeholder="Enter title of the chapter"
            {...register(nameChapterTitle, { required: true })}
          />
          {errors.nameChapterTitle && (
            <p className="errorLoginForm">⚠ Please enter a chapter title</p>
          )}
          <button
            className="btn btn-primary"
            onClick={() => {
              setChapterCount((chapterCount) => chapterCount + 1);
            }}
          >
            Add Chapter
          </button>
        </div>
      );
    };
    return (
      <div className="text-center formRegister">
        <h2 style={{ color: "gray", padding: "50px" }}>
          Create a new course on LMS
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6">
              <label className="labelLoginForm col-6" htmlFor="title">
                Course Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter Title of the course"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="errorLoginForm">⚠ Please enter course title</p>
              )}
            </div>
            <div className="col-6">
              <label className="labelLoginForm" htmlFor="image">
                Image URL
              </label>
              <input
                name="image"
                type="url"
                placeholder="Enter course image url"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="errorLoginForm">
                  ⚠ Please enter URL of image for the course
                </p>
              )}
            </div>
            <div className="col-12">
              <label className="labelLoginForm" htmlFor="description">
                Course Description
              </label>
              <input
                name="description"
                type="text"
                placeholder="Enter course description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="errorLoginForm">
                  ⚠ Please enter course description
                </p>
              )}
            </div>
            <div className="col-12 text-center">
              <label>Chapters</label>
              {[...Array(chapterCount)].map((x, i) => {
                return <AddChapter index={i + 1} />;
              })}
            </div>
          </div>

          <input type="submit" />
        </form>
      </div>
    );
  };
  return (
    <div className="row">
      {userData.isTutor ? (
        <Router>
          <Switch>
            <Route path="/instructor/newCourse">
              <CreateCourse />
            </Route>
            <div className="col-8 offset-2">
              <Link
                to="/instructor/newCourse"
                className="btn btn-success"
                onClick={() => {
                  history.push("/instructor/newCourse");
                }}
              >
                Create a course
              </Link>
            </div>
          </Switch>
        </Router>
      ) : (
        <div className="col-8 tutotInvite IBMPlex">
          Do you have any course(s) that might help the world of learners? If
          so, please{" "}
          <button className="btn btn-secondary" onClick={setTutor}>
            Become an instructor
          </button>
        </div>
      )}
    </div>
  );
};
export default Instructor;
