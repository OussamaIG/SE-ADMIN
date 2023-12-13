import { useEffect, useState } from "react";
import deleteicon from "../../assets/delete-32.png";
import modifyicon from "../../assets/edit-32.png";
import { Link } from "react-router-dom";
const StudentElement = (props) => {
  const [deletetmp, setdeletetemp] = useState(false);
  const studentid = String(props.data._id);
  const mytring = "/students/editstudent/" + studentid;
  const opt = 2
  const setDeleteStd = () => {
    props.deletecrs(deletetmp, studentid, opt);
  };
  return (
    <div className="student">
      <p id="fln">
        {props.data.name} {props.data.surname}
      </p>
      <p id="mail">{props.data.email}</p>
      <p id="nbr">{props.data.phone}</p>
      <p>{props.data.groupDetails}</p>
      <div id="stsunpayed">Unpayed</div>
      <div id="acts">
        <img src={deleteicon} onClick={setDeleteStd} />
        <Link to={mytring} state={props.data}>
          <img src={modifyicon} />
        </Link>
      </div>
    </div>
  );
};
export default StudentElement;
