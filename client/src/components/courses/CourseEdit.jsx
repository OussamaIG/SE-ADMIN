import { useEffect, useState, useRef } from "react";
import addicon from "../../assets/add-32-blue.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PiKeyReturnFill } from "react-icons/pi";
import axios from "axios";
const CourseEdit = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setcourse] = useState(location.state);
  const [number, setnumber] = useState(course.groups.length);
  const [mswitch, setmswitch] = useState(course.status);
  console.log(course);
  const nameref = useRef(null);
  const locationref = useRef(null);
  const priceref = useRef(null);
  const desciptionref = useRef(null);
  const [red7, setred7] = useState(false);
  const [red8, setred8] = useState(false);
  const [red9, setred9] = useState(false);
  const [red10, setred10] = useState(false);
  const [refresh, setrefresh] = useState(false);

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
      const ncourse = {
        name: course.name,
        price: course.price,
        description: course.description,
        status: mswitch,
      };
      try {
        const response = await axios.patch(
          `/api/courses//editcourse/${id}`,
          ncourse
        );
        if (response.status === 200) {
          console.log(`Course successfully added to student `);
        } else {
          console.error(`Failed to add course  to student `);
        }
      } catch (error) {
        console.error(error);
      }
      navigate("/courses");
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "name") {
      event.target.value === ""
        ? setcourse({ ...course, name: "" })
        : setcourse({ ...course, name: event.target.value });
    } else if (event.target.name === "location") {
      event.target.value === ""
        ? setcourse({ ...course, location: "" })
        : setcourse({ ...course, location: event.target.value });
    } else if (event.target.name === "price") {
      event.target.value === ""
        ? setcourse({ ...course, price: 0 })
        : setcourse({ ...course, price: Number(event.target.value) });
    } else if (event.target.name === "desciption") {
      event.target.value === ""
        ? setcourse({ ...course, description: "" })
        : setcourse({ ...course, description: event.target.value });
    }
  };

  const addgroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/courses/${id}/createGroup`);
      if (response.status === 200) {
        console.log(`Course successfully added to student `);
      } else {
        console.error(`Failed to add course  to student `);
      }
    } catch (error) {
      console.error(error);
    }
    let temp = refresh;
    setrefresh(!temp);

    setnumber(number + 1);
  };

  const deletegroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/courses/${id}/deletegroup`);
      if (response.status === 200) {
        console.log(`Course successfully deleted to student `);
      } else {
        console.error(`Failed to add course  to student `);
      }
    } catch (error) {
      console.error(error);
    }
    let temp = refresh;
    setrefresh(!temp);

    setnumber(number - 1);
  };

  const statusSwitch = () => {
    let temp = mswitch;
    setmswitch(!temp);
  };

  return (
    <div className="bodypage">
      <div className="bodypage-title">
        <div className="title">
          <FiEdit id="iconchange" />
          <p>edit course</p>
        </div>
        <Link to="/courses">
          <div className="return">
            <PiKeyReturnFill />
          </div>
        </Link>
      </div>
      <form action="">
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Name :</label>
            <input
              name="name"
              type="text"
              ref={nameref}
              id={red7 ? "error" : ""}
              value={course.name}
              onChange={handleChange}
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Location :</label>
            <input
              name="location"
              type="text"
              ref={locationref}
              id={red9 ? "error" : ""}
              value="Online"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Price :</label>
            <input
              name="price"
              type="number"
              ref={priceref}
              id={red8 ? "error" : ""}
              value={course.price}
              onChange={handleChange}
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Groups :</label>
            <div className="addgroup">
              <p>{number}</p>
              <button onClick={addgroup}>+</button>
              <button id="red" onClick={deletegroup}>
                -
              </button>
            </div>
          </div>
        </div>
        <div className="elementss" id="makeitbigger">
          <div className="inputelement">
            <label htmlFor="">Description :</label>
            <textarea
              price="desciption"
              type="text"
              ref={desciptionref}
              id={red10 ? "error" : "makeitbigger2"}
              value={course.description}
              onChange={handleChange}
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Status :</label>
            <div className="addgroup set">
              <p>UNAVAILABLE</p>
              <label class="switch">
                <input
                  type="checkbox"
                  onClick={statusSwitch}
                  checked={mswitch ? true : false}
                />
                <span class="slider round"></span>
              </label>
              <p>AVAILABLE</p>
            </div>
          </div>
        </div>

        <div className="elementsbtn">
          <Link to="/courses">
            <button id="redors">CANCEL</button>
          </Link>
          <button onClick={addCourse}>CONFIRM</button>
        </div>
      </form>
    </div>
  );
};
export default CourseEdit;
