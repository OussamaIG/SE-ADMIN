import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AddStudent from "./students/AddStudent";
import AddCourse from "./courses/AddCourse";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";
const MainPage = () => {
  const [count, setCount] = useState(0);
  const [addstudent, setAddstudent] = useState(false);
  const [addcourse, setAddcourse] = useState(false);
  const [dashboard, setDashboard] = useState(true);

  const TriggerAddStudent = () => {
    if (addcourse == true) {
      setAddcourse(() => {
        return false;
      });
    }
    if (dashboard == true) {
      setDashboard(() => {
        return false;
      });
    }
    setAddstudent(!addstudent);
  };

  const TriggerAddSCourse = () => {
    if (addstudent == true) {
      setAddstudent(() => {
        return false;
      });
    }
    if (dashboard == true) {
      setDashboard(() => {
        return false;
      });
    }
    setAddcourse((currentState) => {
      return !currentState;
    });
  };
  useEffect(() => {
    if (addcourse == false && addstudent == false) {
      setDashboard(true);
    }
  }, [addcourse, addstudent]);

  return (
    <>
      <SideBar
        setAddStudent={TriggerAddStudent}
        setAddcourse={TriggerAddSCourse}
      />
      <Outlet />
    </>
  );
};
export default MainPage;
