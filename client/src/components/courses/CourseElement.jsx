import deleteicon from "../../assets/delete-32.png";
import modifyicon from "../../assets/edit-32.png";
import { Link } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { useState } from "react";

const CourseElement = (props) => {
  const courseid = String(props.data._id);
  let opt = 2;
  const mytring = "/courses/editcourse/" + courseid;
  const students = "/courses/" + courseid;
  const xname = props.data.name;
  const [deletetmp, setdeletetemp] = useState(false);

  const setDeletecrs = () => {
    props.deletecrs(deletetmp, courseid, xname, opt);
  };
  return (
    <div className="student">
      <p id="fln">{props.data.name}</p>
      <p id="mail">Online</p>
      <p id="nbr">{props.data.price} DA</p>
      <p>{props.data.groups.length}</p>
      <div id={props.data.status ? "sts" : "stsunpayed"}>
        {props.data.status ? "Available" : "Unavailable"}
      </div>
      <div id="acts">
        <img src={deleteicon} onClick={setDeletecrs} />
        <Link to={mytring} state={props.data}>
          <img src={modifyicon} />
        </Link>
        <Link to={students} state={props.data}>
          <MdPeopleAlt id="studentss" />
        </Link>
      </div>
    </div>
  );
};
export default CourseElement;
