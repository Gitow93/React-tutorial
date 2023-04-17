import React, { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const fetchSchedule = async () => {
  const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";
  const response = await fetch(url);
  if (!response.ok) throw response;
  return await response.json();
};

const terms = { F: "Fall", W: "Winter", S: "Spring" };

const getCourseTerm = (course) => {
  const id = course.id || "";
  return terms[id.charAt(0)] || "";
};

const getCourseNumber = (course) => (course.id ? course.id.slice(1, 4) : "");

const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">
        {getCourseTerm(course)} CS {getCourseNumber(course)}
      </div>
      <div className="card-text">{course.title}</div>
    </div>
    <hr />
    <div className="card-text">{course.meets}</div>
  </div>
);

const Banner = ({ title }) => <h1>{title}</h1>;
const CourseList = ({ courses }) => {
  const [term, setTerm] = useState("Fall");
  const termCourses = Object.values(courses).filter(
    (course) => term === getCourseTerm(course)
  );

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
        {termCourses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};
const Main = () => {
  const {
    data: schedule,
    isLoading,
    error,
  } = useQuery("schedule", fetchSchedule);

  if (error) return <h1>{error}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>;

  return (
    <div className="container">
      <Banner title={schedule?.title} />
      <CourseList
        courses={schedule?.courses ? Object.values(schedule.courses) : []}
      />
    </div>
  );
};

// Añadimos el filtro que va dentro de nuestra constante lista de cursos:

const TermSelector = ({ term, setTerm }) => (
  <div className="btn-group">
    {Object.values(terms).map((value) => (
      <TermButton
        key={value}
        term={value}
        setTerm={setTerm}
        checked={value === term}
      />
    ))}
  </div>
);

//Creamos un botón
const TermButton = ({ term, setTerm, checked }) => (
  <>
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={checked}
      autoComplete="off"
      onChange={() => setTerm(term)}
    />
    <label class="btn btn-success m-1 p-2" htmlFor={term}>
      {term}
    </label>
  </>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
