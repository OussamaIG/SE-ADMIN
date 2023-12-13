import { useEffect, useState } from "react";
import "./App.css";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import AddStudent from "./components/students/AddStudent";
import AddCourse from "./components/courses/AddCourse";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import StudentsList from "./components/students/StudentsList";
import StudentTable from "./components/students/StudentTable";
import CoursesTable from "./components/courses/CoursesTable";
import CourseStudents from "./components/courses/CourseStudents";
import CourseEdit from "./components/courses/CourseEdit";
import StudentEdit from "./components/students/StudentEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <StudentTable />,
          },
          {
            path: "addstudent",
            element: <AddStudent />,
          },
          {
            path: "editstudent/:id",
            element: <StudentEdit />,
          },
        ],
      },
      {
        path: "courses",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <CoursesTable />,
          },
          {
            path: "addcourse",
            element: <AddCourse />,
            // action: Registeraction,
          },
          {
            path: "editcourse/:id",
            element: <CourseEdit />,
          },
          {
            path: ":id",
            element: <CourseStudents />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
