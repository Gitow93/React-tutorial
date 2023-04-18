import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { addScheduleTimes } from "./utilities/times.js";
import CourseList from "./components/CourseList";

const fetchSchedule = async () => {
  const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};

const Banner = ({ title }) => <h1>{title}</h1>;

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
