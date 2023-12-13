import SideBar from "../SideBar";
import deleteicon from "../../assets/delete-32.png";
import modifyicon from "../../assets/edit-32.png";
import { PiKeyReturnFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import StudentElement from "../students/StudentElement";
import { useState, useEffect } from "react";
import DeleteBox from "../DeleteBox";
import Grey from "../Grey";
import axios from "axios";
const CourseStudents = () => {
  const location = useLocation();
  const [students, setstudents] = useState([]);
  const [updatedStudents, setUpdatedStudents] = useState([]);
  const course = location.state;
  const [deleteop, setdeleteop] = useState(false);
  const setdelete = (temp) => {
    setdeleteop(!temp);
  };
  useEffect(() => {
    // Define the API endpoint and the query parameter
    const apiUrl = `/api/courses/${course._id}/students`;
    const queryParam = course.name; // Replace with the actual course name or value you want to query
    // Make a GET request to the API with the query parameter
    let temp = []
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the API response data
        setstudents(response.data.students);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error.message);
      });
    // Set the updated array to state
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  useEffect(() => {
     const updatedArray = students.map((student) => {
       const courseIndex = student.courses.indexOf(course.name);
       const groupForCourse = student.group[courseIndex];

       return {
         ...student,
         groupnbr: groupForCourse,
       };
     });
    const fetchData = async () => {
      try {
        const updatedStudents = await Promise.all(
          updatedArray.map(async (student) => {
            try {
              const response = await axios.get(
                `/api/groups/${student.groupnbr}`
              );
              const group = response.data;

              return {
                ...student,
                groupDetails: group.name,
              };
            } catch (error) {
              // Handle errors if needed
              console.error(
                `Error fetching group data for ${student.name}:`,
                error.message
              );
              return student;
            }
          })
        );
        console.log(updatedStudents);
        setUpdatedStudents(updatedStudents);
        // Set the updated array to state
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching student data:", error.message);
      }
    };

    fetchData();
  }, [students]);
  return (
    <div className="StudentsList">
      <div className="top">
        <p>{course.name} course</p>
        <div className="topflex">
          <Link to="/courses">
            <div className="return" id="return">
              <PiKeyReturnFill />
            </div>
          </Link>
          <Link to="/students/addstudent">
            <div className="topbtn">New student</div>
          </Link>
        </div>
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
          </select>
        </div>
        <div className="filter">
          <p>Status</p>
          <select>
            <option disabled>Group</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
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
          <p>Group</p>
          <p id="sts">Status</p>
          <p id="acts"></p>
        </div>
        <div className="tableelements">
          {updatedStudents.map((item) => (
            <StudentElement key={item._id} data={item} deletecrs={setdelete} />
          ))}
        </div>
      </div>
      {deleteop ? (
        <div>
          <DeleteBox deleteStd={setdelete} /> <Grey />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default CourseStudents;
