const CourseDetail = function ({ course }) {
  return (
    <div className="col-4">
      <div className="card mb-3 bg-primary">
        <img className="card-img-top" src={course.image} alt="Course Image" />
        <div className="card-body">
          <h5 className="card-title">
            <b>{course.title}</b>
          </h5>
          <p className="card-text">{course.description}</p>
        </div>
      </div>
    </div>
  );
};
export default CourseDetail;
