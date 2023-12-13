import { useEffect, useState, useRef } from "react";
import addicon from "../../assets/add-32-blue.png";
import { PiKeyReturnFill } from "react-icons/pi";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const AddCourse = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const nameref = useRef(null);
  const locationref = useRef(null);
  const priceref = useRef(null);
  const desciptionref = useRef(null);
  const [red7, setred7] = useState(false);
  const [red8, setred8] = useState(false);
  const [red9, setred9] = useState(false);
  const [red10, setred10] = useState(false);
  const [status, setStatus] = useState(false);

  const statusClick = () => {
    let temp = status;
    setStatus(!temp);
  };

  const addCourse = async (e) => {
    e.preventDefault();
    nameref.current.value == "" ? setred7(true) : setred7(false);
    priceref.current.value == "" ? setred8(true) : setred8(false);
    locationref.current.value == "" ? setred9(true) : setred9(false);
    desciptionref.current.value == "" ? setred10(true) : setred10(false);
    if (
      nameref.current.value != "" &&
      priceref.current.value != "" &&
      locationref.current.value != "" &&
      desciptionref.current.value != ""
    ) {
      const newcourse = {
        name: nameref.current.value,
        price: priceref.current.value,
        location: locationref.current.value,
        description: desciptionref.current.value,
        status: status,
      };
      const response = await axios.post("/api/courses", newcourse);
      console.log(response.data);

      // Use history.push to navigate to the desired route
      navigate("/courses");
    }
  };

  const ClearnInput = (e) => {
    e.preventDefault();
    nameref.current.value = "";
    locationref.current.value = "";
    priceref.current.value = "";
    desciptionref.current.value = "";
    setred7(false);
    setred8(false);
    setred9(false);
    setred10(false);
  };

  return (
    <div className="bodypage">
      <div className="bodypage-title">
        <div className="title">
          <img src={addicon} alt="" />
          <p>Add course</p>
        </div>
        <Link to="/courses">
          <div className="return">
            <PiKeyReturnFill />
          </div>
        </Link>
      </div>
      <Form method="post" className="form">
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Name :</label>
            <input
              required
              type="text"
              ref={nameref}
              id={red7 ? "error" : ""}
              name="name"
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Location :</label>
            <input
              type="text"
              ref={locationref}
              id={red9 ? "error" : ""}
              name="location"
            />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Price :</label>
            <input
              required
              type="number"
              ref={priceref}
              id={red8 ? "error" : ""}
              name="price"
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Status :</label>
            <div className="addgroup set add">
              <p>UNAVAILABLE</p>
              <label className="switch">
                <input type="checkbox" name="status" onClick={statusClick} />
                <span className="slider round"></span>
              </label>
              <p>AVAILABLE</p>
            </div>
          </div>
        </div>
        <div className="elementss" id="makeitbigger">
          <div className="inputelement">
            <label htmlFor="">Description :</label>
            <textarea
              type="text"
              ref={desciptionref}
              id={red10 ? "error" : "makeitbigger2"}
              name="description"
            />
          </div>
        </div>

        <div className="elementsbtn">
          <button id="redors" onClick={ClearnInput}>
            CLEAR
          </button>
          <button onClick={addCourse} type="submit" disabled={isSubmitting}>
            CONFIRM
          </button>
        </div>
      </Form>
    </div>
  );
};
export default AddCourse;
