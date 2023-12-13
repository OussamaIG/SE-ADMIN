import SideBar from "../SideBar";
import { Link } from "react-router-dom";
import StudentElement from "./StudentElement";
import DeleteBox from "../DeleteBox";
import Grey from "../Grey";
import { useState, useEffect } from "react";
import axios from "axios";
const StudentTable = () => {
  const [deleteop, setdeleteop] = useState(false);
  const [data, setData] = useState([]);
  const [info, setinfo] = useState("");
  const myopt = 0;
  const setdelete = (temp, id) => {
    setinfo(id);
    setdeleteop(!temp);

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request to the server
        const response = await axios.get("/api/students");

        // Handle the response from the server
        setData(response.data.students);
        console.log(response.data.students);
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
      <div className="top ">
        <p>Students</p>
        <Link to="/students/addstudent">
          <div className="topbtn">New student</div>
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
            <option>Formation</option>
          </select>
        </div>
        <div className="filter">
          <p>Status</p>
          <select>
            <option disabled>Filter</option>
            <option>Random</option>
            <option>Payed</option>
            <option>Unpayed</option>
          </select>
        </div>
        <div className="btn">
          <p>.</p>
          <button>Apply Filters</button>
        </div>
      </div>
      <div className="studentstable">
        <div className="tablehead">
          <p id="fln">FullName</p>
          <p id="mail">Email</p>
          <p id="nbr">Phone Number</p>
          <p>Formation</p>
          <p id="sts">Status</p>
          <p id="acts"></p>
        </div>
        <div className="tableelements">
          {data.map((item) => (
            <StudentElement key={item._id} data={item} deletecrs={setdelete} />
          ))}
        </div>
      </div>
      {deleteop ? (
        <div>
          <DeleteBox deleteStd={setdelete} data={info} /> <Grey />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default StudentTable;
