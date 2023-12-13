import deleteicon from "../../assets/delete-32.png";
import modifyicon from "../../assets/edit-32.png";
import { Link } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import CourseElement from "./CourseElement";
import { useState, useEffect } from "react";
import DeleteBox from "../DeleteBox";
import Grey from "../Grey";
import axios from "axios";
const CoursesTable = () => {
  const [myopt, setmyopt] = useState(0);
  const [deleteop, setdeleteop] = useState(false);
  const [info, setinfo] = useState();
  const setdelete = (temp, id, xname, opt) => {
    setinfo({ id: id, name: xname });
    setdeleteop(!temp);
    setmyopt(opt);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request to the server
        const response = await axios.get("/api/courses");

        // Handle the response from the server
        setData(response.data);
        // Add any additional logic based on the server response
      } catch (error) {
        // Handle errors
        console.error("Error:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [deleteop]);

  return (
    <div className="StudentsList">
      <div className="top">
        <p>Courses</p>
        <Link to="/courses/addcourse">
          <div className="topbtn">New course</div>
        </Link>
      </div>
      <div className="searchbare">
        <div className="search">
          <p>What are you looking for ?</p>
          <input
            type="text"
            id="search"
            placeholder="What are you looking for..."
          ></input>
        </div>
        <div className="filter">
          <p>Filter</p>
          <select>
            <option disabled>Filter</option>
            <option>Newest</option>
            <option>Oldest</option>
            <option>Price</option>
          </select>
        </div>
        <div className="filter">
          <p>Status</p>
          <select>
            <option>Status</option>
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>
        <div className="btn">
          <p>.</p>
          <button>Apply Filters</button>
        </div>
      </div>
      <div className="studentstable">
        <div className="tablehead">
          <p id="fln">Course Name</p>
          <p id="mail">Location</p>
          <p id="nbr">Price</p>
          <p>Groups</p>
          <p id="sts">Status</p>
          <p id="acts"></p>
        </div>
        <div className="tableelements">
          {data.map((item) => (
            <CourseElement key={item._id} data={item} deletecrs={setdelete} />
          ))}
        </div>
      </div>
      {deleteop ? (
        <div>
          <DeleteBox deleteStd={setdelete} option={myopt} data={info} />{" "}
          <Grey />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default CoursesTable;
