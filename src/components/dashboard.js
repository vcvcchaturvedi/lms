import React, { useState, useEffect, Fragment } from "react";
import { api } from "../App.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  Redirect,
} from "react-router-dom";
const Dashboard = function ({
  isLoggedIn,
  setIsLoggedIn,
  userData,
  setUserData,
}) {
  const [coursesData, setCoursesData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [started, setStarted] = useState(false);
  let history = useHistory();
  let Chapter = function ({ chapter }) {
    return (
      <div className="ChapterContent">
        <div>{chapter.chapterTitle}</div>
        <iframe
          className="ChapterIFrameContent"
          src={chapter.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
    );
  };
  let CourseContent = function () {
    const [startFromChapter, setStartFromChapter] = useState(0);
    const [completed, setCompleted] = useState(false);
    let { title } = useParams();
    useEffect(() => {
      let courseSelected = null;
      for (let i = 0; i < coursesData.length; i++)
        if (coursesData[i].title == title) {
          courseSelected = coursesData[i];
          setSelectedCourse(courseSelected);
          userData.coursesEnrolled.ids.forEach((id) => {
            if (id.course == selectedCourse._id)
              setStartFromChapter(id.startFromChapter);
          });
          return;
        }
    }, []);
    useEffect(() => {
      if (completed && startFromChapter + 1 < selectedCourse.chapters.length) {
        let data = {};
        data.userID = userData._id;
        data.courseID = selectedCourse._id;

        data.currentChapterID = startFromChapter;
        api
          .put("/incrementchapter", data)
          .then((data) => {
            setStartFromChapter((s) => s + 1);
            setCompleted(false);
          })
          .catch((err) => console.log("ERROR!:" + JSON.stringify(err)));
      } else if (
        completed &&
        startFromChapter + 1 == selectedCourse.chapters.length
      ) {
        alert("You have reached the end of the course, Congratulations!");
      }
    }, [completed]);
    useEffect(() => {
      setCompleted(false);
    }, [startFromChapter]);
    return (
      <Fragment>
        <div>{selectedCourse.title}</div>
        {!started ? (
          <div className="row">
            <div className="col-3">
              <img
                className="imageCourse img-fluid"
                src={selectedCourse.image}
              />
            </div>
            <div className="col-9 text-left">
              <h5 className="courseDescription">
                {selectedCourse.description}
              </h5>
              <button
                onClick={() => setStarted(true)}
                className="btn btn-success mt-3"
              >
                {startFromChapter == 0 ? "Start Now!" : "Continue Learning"}
              </button>
            </div>
          </div>
        ) : (
          // selectedCourse.chapters.map((chapter) => (
          <Fragment>
            {startFromChapter > 0 ? (
              <button
                className="btn btn-primary previous"
                onClick={() => {
                  setStartFromChapter(
                    (startFromChapter) => startFromChapter - 1
                  );
                }}
              >
                Previous Lecture
              </button>
            ) : (
              ""
            )}
            <Chapter chapter={selectedCourse.chapters[startFromChapter]} />
            <button
              className="btn btn-success"
              onClick={() => {
                setCompleted(true);
              }}
            >
              Mark Completed
            </button>
          </Fragment>
          // ))
        )}
      </Fragment>
    );
  };
  let Course = function ({ courseData }) {
    const urlCourse = "/courses/" + courseData.title;
    return (
      <Fragment>
        <Link to={urlCourse}>
          <a onClick={() => setSelectedCourse(courseData)}>
            <img className="iconCourse" src={courseData.image}></img>
            <li className="dashboardLI">{courseData.title}</li>
          </a>
        </Link>
      </Fragment>
    );
  };
  let AllCourses = function () {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      api
        .get("/courses")
        .then((res) => setCourses([...res.data]))
        .catch((err) => console.log(err));
    }, []);
    let CourseNotEnrolled = function ({ course }) {
      const [isEnrolled, setIsEnrolled] = useState(false);
      useEffect(() => {
        for (let i = 0; i < userData.coursesEnrolled.ids.length; i++) {
          let c = userData.coursesEnrolled.ids[i].course;
          if (c == course.id) {
            setIsEnrolled(true);
            break;
          }
        }
      }, []);
      return (
        <Fragment>
          {!isEnrolled ? (
            <div className="col-4">
              <div className="card mb-3 bg-primary">
                <img
                  className="card-img-top"
                  src={course.image}
                  alt="Course image"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>{course.title}</b>
                  </h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        let data = {};
                        let id = userData._id;
                        let courseID = course.id;
                        data.id = id;
                        data.courseID = courseID;
                        api
                          .post("/enroll", data)
                          .then((res) => {
                            let temp = {
                              course: courseID,
                              startFromChapter: 0,
                            };

                            setUserData((userData) => {
                              let t = { ...userData };
                              t.coursesEnrolled.ids.push(temp);
                              return t;
                            });
                          })
                          .catch((err) => console.log("Error" + err));
                      }}
                    >
                      Enroll Now!
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Fragment>
      );
    };
    return (
      <Fragment>
        {courses.map((course) => (
          <CourseNotEnrolled course={course} />
        ))}
      </Fragment>
    );
  };
  useEffect(() => {
    if (!isLoggedIn || userData.username === "") {
      api
        .get("/dashboard", {
          headers: {
            Accept: "*/*",
            // "Content-Type": "application/x-www-form-urlencoded",
            // "Access-Control-Allow-Origin": "*",
            // withCredentials: true,
            // credentials: "include",
          },
          JSON: true,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
        })
        .then((res) => {
          if (!res) history.push("/login");
          else {
            setUserData(res.data);
            setIsLoggedIn(true);
            let ids = res.data.coursesEnrolled.ids;

            api
              .post("/courses", { ids })
              .then((res) => {
                let courses = res.data;
                setCoursesData([...courses]);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (
      userData.username !== "" &&
      userData.coursesEnrolled.ids.length > 0 &&
      coursesData.length < userData.coursesEnrolled.ids.length
    ) {
      let ids = [];
      userData.coursesEnrolled.ids.forEach((id) => {
        ids.push(id.course);
      });
      api
        .post("/courses", { ids })
        .then((res) => {
          setCoursesData([...res.data]);
        })
        .catch((err) => console.log(err));
    }
  }, [userData]);
  return (
    <div className="DashboardOuterDiv">
      <Fragment>
        <Router>
          <div className="row DashboardPanel row-eq-height">
            <div className="col-2 bg-secondary DashboardLeftDiv">
              <b className="IBMPlex">Your Courses:</b>
              <ul className="dashboardUL">
                {coursesData.map((course) => {
                  return <Course courseData={course} />;
                })}
              </ul>
            </div>
            <div className="col-10 bg-grey DashboardRightDiv">
              {Object.keys(selectedCourse).length === 0 &&
              selectedCourse.constructor === Object ? (
                <Fragment>
                  <h2 className="Heading">
                    Hello {userData.firstname} {userData.lastname}! Choose a
                    course on your "Your courses" section on the left pane to
                    start learning! You will see any courses that we have which
                    you have not enrolled below.
                  </h2>
                  <div className="row">
                    <AllCourses />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedCourse({});
                    }}
                  >
                    All Courses
                  </button>

                  <Route path="/courses/:title">
                    <CourseContent />
                  </Route>
                </Fragment>
              )}
            </div>
          </div>
        </Router>
      </Fragment>
    </div>
  );
};
export default Dashboard;
