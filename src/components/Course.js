import { hasConflict, terms } from "./../utilities/times";

const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled
      ? "lightgrey"
      : isSelected
      ? "lightgreen"
      : "white",
  };
  return (
    <div
      className="card m-1 p-2"
      style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}
    >
      <div className="card-body">
        <div className="card-title">
          {getCourseTerm(course)} CS {getCourseNumber(course)}
        </div>
        <div className="card-text">{course.title}</div>
        <div className="card-text">{course.meets}</div>
      </div>
    </div>
  );
};

const getCourseNumber = (course) => (course.id ? course.id.slice(1, 4) : "");

export const getCourseTerm = (course) => {
  const id = course.id || "";
  return terms[id.charAt(0)] || "";
};

const toggle = (x, lst) =>
  lst.includes(x) ? lst.filter((y) => y !== x) : [x, ...lst];

export default Course;