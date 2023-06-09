import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { CourseList } from "./Components/CourseList";
import { useData } from "./utilities/firebase";

const Banner = ({ title }) => <h1>{title}</h1>;

const meetsPat =
  /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = (meets) => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match
    ? {}
    : {
        days,
        hours: {
          start: hh1 * 60 + mm1 * 1,
          end: hh2 * 60 + mm2 * 1,
        },
      };
};

const mapValues = (fn, obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)])
  );

const addCourseTimes = (course) => ({
  ...course,
  ...timeParts(course.meets),
});

const addScheduleTimes = (schedule) => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses),
});

const Main = () => {
  const [schedule, loading, error] = useData("/", addScheduleTimes);
  //const { data, isLoading, error } = useQuery('schedule', fetchSchedule);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
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
