import { useEffect, useRef, useState } from "react";
import addicon from "../../assets/add-32-blue.png";
import { PiKeyReturnFill } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
const StudentEdit = (props) => {
  const location = useLocation();
  const student = location.state;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: student.name,
    surname: student.surname,
    email: student.email,
    phone: student.phone,
    university: student.university,
    speciality: student.speciality,
    group: "",
    course: "",
  });
  const { id } = useParams();
  const NameVal = useRef(null);
  const SurameVal = useRef(null);
  const EmailVal = useRef(null);
  const PhoneVal = useRef(null);
  const GroupVal = useRef(null);
  const CourseNameVal = useRef(null);
  const UniversityVal = useRef(null);
  const SpecialityVal = useRef(null);
  const [red1, setred1] = useState(false);
  const [red2, setred2] = useState(false);
  const [red3, setred3] = useState(false);
  const [red4, setred4] = useState(false);
  const [red5, setred5] = useState(false);
  const [red6, setred6] = useState(false);
  const [courses, setcourses] = useState([]);
  const [groups, setgroups] = useState([]);

  const grp = student.group[0];
  const [group, setgroup] = useState({});
  const [groupid, setgroupid] = useState();
  const [getcrs, setgetcrs] = useState(false);

  const addNewCourse = async (e) => {
    e.preventDefault();
    let courseId = courses.find(
      (item) => item.name === CourseNameVal.current.value
    );
    console.log(groupid);

    let info = {
      courseId: courseId._id,
      groupId: groupid,
      coursName: courseId.name,
    };

    try {
      const response = await axios.patch(`/api/students/${id}/AddCourse`, info);
      if (response.status === 200) {
        console.log(`Course successfully added to student `);
      } else {
        console.error(`Failed to add course  to student `);
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/students");
  };

  const FetchCoursesAndGroups = (e) => {
    e.preventDefault();
    setgetcrs(true);
    const fetchData = async () => {
      try {
        // Make the GET request to the server
        const response = await axios.get("/api/courses");

        // Handle the response from the server
        console.log(student);
        console.log(response.data);
        const filteredObjectsArray = response.data
          .filter((obj) => !student.courses.includes(obj.name)) // Remove based on namesArray
          .filter((obj) => obj.status !== false);
        setcourses(filteredObjectsArray);
        // setgroups(response.data[0].groups);
        let groupNames = [];
        // Use map to iterate over each group ID and make individual requests
        await Promise.all(
          filteredObjectsArray[0].groups.map(async (groupId) => {
            try {
              const response = await axios.get(`/api/groups/${groupId}`);
              const groupName = response.data; // Adjust the property based on your API response
              groupNames.push(groupName);
            } catch (error) {
              console.error(`Error fetching group with ID ${groupId}:`, error);
              // Handle errors as needed
            }
          })
        );

        setgroups(groupNames);
        // Add any additional logic based on the server response
      } catch (error) {
        // Handle errors
        console.error("Error:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (NameVal.current.value == "") {
      setred1(true);
    } else {
      setred1(false);
    }
    if (SurameVal.current.value == "") {
      setred2(true);
    } else {
      setred2(false);
    }
    if (EmailVal.current.value == "") {
      setred3(true);
    } else {
      setred3(false);
    }
    if (PhoneVal.current.value == "") {
      setred4(true);
    } else {
      setred4(false);
    }
    if (UniversityVal.current.value == "") {
      setred5(true);
    } else {
      setred5(false);
    }
    if (SpecialityVal.current.value == "") {
      setred6(true);
    } else {
      setred6(false);
    }
    const newUser = {
      name: NameVal.current.value,
      surname: SurameVal.current.value,
      email: EmailVal.current.value,
      phone: PhoneVal.current.value,
      university: UniversityVal.current.value,
      Specility: SpecialityVal.current.value,
    };
    try {
      const response = await axios.patch(`/api/students/${id}`, newUser);
      if (response.status === 200) {
        console.log(`Course successfully added to student `);
      } else {
        console.error(`Failed to add course  to student `);
      }
    } catch (error) {
      console.error(error);
    }
    navigate("/students");
  };
  const watchme = () => {
    let course = courses.find(
      (item) => item.name === CourseNameVal.current.value
    );
    const fetchData = async () => {
      let groupNames = [];
      // Use map to iterate over each group ID and make individual requests
      await Promise.all(
        course.groups.map(async (groupId) => {
          try {
            const response = await axios.get(`/api/groups/${groupId}`);
            const groupName = response.data; // Adjust the property based on your API response
            groupNames.push(groupName);
            console.log(groupName);
          } catch (error) {
            console.error(`Error fetching group with ID ${groupId}:`, error);
            // Handle errors as needed
          }
        })
      );
      setgroups(groupNames);
      // Add any additional logic based on the server response
    };

    // Call the fetchData function when the component mounts
    fetchData();
  };

  const watchme2 = async () => {
    console.log(student);
    const courseIndex = student.courses.findIndex(
      (course) => course === CourseNameVal.current.value
    );
    const group = await axios.get(`/api/groups/${student.group[courseIndex]}`);
    console.log(group.data);
    setgroup(group.data);
  };
  const handleChange = (event) => {
    if (event.target.name === "name") {
      event.target.value === ""
        ? setUser({ ...user, name: "" })
        : setUser({ ...user, name: event.target.value });
    } else if (event.target.name === "surname") {
      event.target.value === ""
        ? setUser({ ...user, surname: "" })
        : setUser({ ...user, surname: event.target.value });
    } else if (event.target.name === "phone") {
      event.target.value === ""
        ? setUser({ ...user, phone: "" })
        : setUser({ ...user, phone: event.target.value });
    } else if (event.target.name === "email") {
      event.target.value === ""
        ? setUser({ ...user, email: "" })
        : setUser({ ...user, email: event.target.value });
    } else if (event.target.name === "uni") {
      event.target.value === ""
        ? setUser({ ...user, university: "" })
        : setUser({ ...user, university: event.target.value });
    } else if (event.target.name === "speciality") {
      event.target.value === ""
        ? setUser({ ...user, speciality: "" })
        : setUser({ ...user, speciality: event.target.value });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/groups/${grp}`);
        const groupName = response.data;
        // Adjust the property based on your API response
        setgroup(groupName);
      } catch (error) {
        console.error(`Error fetching group with ID ${grp}:`, error);
        // Handle errors as needed
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  const getid = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];

    // Get the key (id in this case) from the dataset
    const key = selectedOption.dataset.id;
    console.log(key);
    // Now you have the key associated with the selected option
    setgroupid(key);
  };

  return (
    <div className="bodypage">
      <div className="bodypage-title">
        <div className="title">
          <FiEdit id="iconchange" />
          <p>Edit student</p>
        </div>
        <Link to="/students">
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
              ref={NameVal}
              id={red1 ? "error" : ""}
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Surname :</label>
            <input
              name="surname"
              type="text"
              ref={SurameVal}
              id={red2 ? "error" : ""}
              value={user.surname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Email :</label>
            <input
              name="email"
              type="text"
              ref={EmailVal}
              id={red3 ? "error" : ""}
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Phone Number :</label>
            <input
              name="phone"
              type="text"
              ref={PhoneVal}
              id={red4 ? "error" : ""}
              value={user.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">University :</label>
            <input
              name="uni"
              type="text"
              ref={UniversityVal}
              id={red5 ? "error" : ""}
              value={user.university}
              onChange={handleChange}
            />
          </div>
          <div className="inputelement">
            <label htmlFor="">Speciality :</label>
            <input
              name="speciality"
              type="text"
              ref={SpecialityVal}
              id={red6 ? "error" : ""}
              value={user.speciality}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Course :</label>
            <div className="flexit">
              {getcrs ? (
                <select ref={CourseNameVal} onChange={watchme}>
                  {courses.map((item) => (
                    <option>{item.name}</option>
                  ))}
                </select>
              ) : (
                <select ref={CourseNameVal} onChange={watchme2}>
                  {student.courses.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>
              )}
              <button onClick={FetchCoursesAndGroups}>New course</button>
            </div>
          </div>
          <div className="inputelement">
            <label htmlFor="">Group :</label>
            {getcrs ? (
              <select ref={GroupVal} onChange={getid}>
                {groups.map((item) => (
                  <option data-id={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            ) : (
              <select ref={GroupVal}>
                <option>{group.name}</option>
              </select>
            )}
          </div>
        </div>
        <div className="elementsbtn">
          <Link to="/students">
            <button id="redors">CANCEL</button>
          </Link>
          <button onClick={getcrs ? addNewCourse : SubmitHandler}>
            CONFIRM
          </button>
        </div>
      </form>
    </div>
  );
};
export default StudentEdit;
