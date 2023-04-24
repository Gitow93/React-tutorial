import React, { useState } from "react";
import { Course } from "./Course";

export const CourseList = ({ courses }) => {
  const [term, setTerm] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const termCourses = Object.values(courses).filter(
    (course) => term === getCourseTerm(course)
  );

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
        {termCourses.map((course) => (
          <Course
            key={course.id}
            course={course}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </>
  );
};

export const TermSelector = ({ term, setTerm }) => (
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

export const terms = { F: "Fall", W: "Winter", S: "Spring" };

export const TermButton = ({ term, setTerm, checked }) => (
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

export const getCourseTerm = (course) => terms[course.id.charAt(0)];

export const hasConflict = (course, selected) =>
  selected.some((selection) => courseConflict(course, selection));

export const toggle = (x, lst) =>
  lst.includes(x) ? lst.filter((y) => y !== x) : [x, ...lst];

export const getCourseNumber = (course) => course.id.slice(1, 4);

export const courseConflict = (course1, course2) =>
  getCourseTerm(course1) === getCourseTerm(course2) &&
  timeConflict(course1, course2);

export const timeConflict = (course1, course2) =>
  daysOverlap(course1.days, course2.days) &&
  hoursOverlap(course1.hours, course2.hours);

export const daysOverlap = (days1, days2) =>
  days.some((day) => days1.includes(day) && days2.includes(day));

export const hoursOverlap = (hours1, hours2) =>
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end);

export const days = ["M", "Tu", "W", "Th", "F"];
