import logo from "../assets/logo.png";
import studenticon from "../assets/student-32.png";
import courseicon from "../assets/folder-6-32.png";
import SideBarElement from "./SideBarElement";
import SideBarElement2 from "./SideBarElement2";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  return (
    <div className="sidebar">
      <Link to="/">
        <div className="logo">
          <img src={logo}></img>
          <h1>SEVREE EDUCATION</h1>
        </div>
      </Link>
      <div className="sidebar-elements">
        <SideBarElement
          id="1"
          title="students"
          icon={studenticon}
          TriggerStudent={props.setAddStudent}
        />
        <SideBarElement2
          id="2"
          title="courses"
          icon={courseicon}
          TriggerCourse={props.setAddcourse}
        />
      </div>
    </div>
  );
};
export default SideBar;
