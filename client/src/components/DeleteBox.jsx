import { IoWarning } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const DeleteBox = (props) => {
  console.log(props.option);
  const navigate = useNavigate();
  const [deletetmp, setdeletetemp] = useState(true);
  const setDeleteStd = () => {
    props.deleteStd(deletetmp);
  };
  const deleteElement = async () => {
    if (props.option === 2) {
      const url = `/api/courses/${props.data.id}`;
      try {
        const response = await axios.delete(url);
        if (response.status === 200) {
          props.deleteStd(deletetmp);
        } else {
          throw new Error("Failed to delete student");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      const url = `/api/students/${props.data}`;
      try {
        const response = await axios.delete(url);
        if (response.status === 200) {
          props.deleteStd(deletetmp);
        } else {
          throw new Error("Failed to delete student");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };
  return (
    <div className="deletebox">
      <IoWarning id="alert" />
      <h4>Are you sure ?</h4>
      <p>Are you sure you want to delete this element</p>
      <p id="mtop">Once this operation is done the deleted information</p>
      <p id="mtop">cannot be restored</p>
      <button onClick={deleteElement}>Delete now</button>
      <button id="shadow" onClick={setDeleteStd}>
        Cancel
      </button>
    </div>
  );
};
export default DeleteBox;
