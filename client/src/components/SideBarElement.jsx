import { useState } from "react";
import { useEffect } from "react";
import arrowicon from "../assets/arrow-206-32.png";
import addicon from "../assets/add-32.png";
import deleteicon from "../assets/x-mark-3-32.png";
import modifyicon from "../assets/activity-feed-32.png";
import { Link } from "react-router-dom";

const SideBarElement = (props) => {
  const [trigger, setTrigger] = useState(false);

  const TriggerElements = () => {
    setTrigger((currentState) => {
      return !currentState;
    });
  };

  return (
    <div className="element">
      <div className="element-title">
        <div className="element-title-head">
          <img src={props.icon} alt="" />
          <h2>{props.title} Management</h2>
        </div>
        <img src={arrowicon} alt="" onClick={TriggerElements} />
      </div>
      {trigger ? (
        <div className="element-body">
          <Link to="/students/addstudent">
            <div className="element-body-el">
              <img src={addicon} alt="" />
              <p>Add {props.title}</p>
            </div>
          </Link>
          <Link to={"/students"}>
            <div className="element-body-el">
              <img src={modifyicon} alt="" />
              <p>Modify {props.title}</p>
            </div>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default SideBarElement;
