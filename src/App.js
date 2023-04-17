import React from "react";
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
const CourseList = ({ courses }) => (
  <div className="course-list">
    {Object.values(courses).map((course) => (
      <Course key={course.id} course={course} />
    ))}
    ;
  </div>
);
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
