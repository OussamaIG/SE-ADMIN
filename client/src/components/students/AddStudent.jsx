import { useEffect, useRef, useState } from "react";
import addicon from "../../assets/add-32-blue.png";
import { PiKeyReturnFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AddStudent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    group: "",
    course: "",
  });

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
  const [groupid, setgroupid] = useState();

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
    if (
      NameVal.current.value != "" &&
      SurameVal.current.value != "" &&
      EmailVal.current.value != "" &&
      PhoneVal.current.value != "" &&
      UniversityVal.current.value != "" &&
      SpecialityVal.current.value != ""
    ) {
      let course = courses.find(
        (item) => item.name === CourseNameVal.current.value
      );
      let newStudent = {
        name: NameVal.current.value,
        surname: SurameVal.current.value,
        email: EmailVal.current.value,
        phone: PhoneVal.current.value,
        university: UniversityVal.current.value,
        speciality: SpecialityVal.current.value,
        courseID: course._id,
        group: groupid,
      };
      const response = await axios.post("/api/students", newStudent);
      console.log(response.data);
      navigate("/students");
    }
    e.preventDefault();
    const newUser = {
      name: NameVal.current.value,
      surname: SurameVal.current.value,
      email: EmailVal.current.value,
      phone: PhoneVal.current.value,
      group: GroupVal.current.value,
      course: CourseNameVal.current.value,
      university: UniversityVal.current.value,
      Specility: SpecialityVal.current.value,
    };
    setUser(newUser);
  };

  const ClearnInput = (e) => {
    e.preventDefault();
    NameVal.current.value = "";
    SurameVal.current.value = "";
    EmailVal.current.value = "";
    PhoneVal.current.value = "";
    GroupVal.current.value = "";
    CourseNameVal.current.value = "";
    UniversityVal.current.value = "";
    SpecialityVal.current.value = "";
    setred1(false);
    setred2(false);
    setred3(false);
    setred4(false);
    setred5(false);
    setred6(false);
  };
  const watchme = async () => {
    let course = courses.find(
      (item) => item.name === CourseNameVal.current.value
    );
    console.log(course.groups);
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
  };
  const [courses, setcourses] = useState([]);
  const [groups, setgroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request to the server
        let status = true;
        const response = await axios.get(`/api/courses?status=${status}`);

        // Handle the response from the server
        setcourses(response.data);
        // const groups = await axios.get(`/api/groups`);
        let groupNames = [];
        // Use map to iterate over each group ID and make individual requests
        await Promise.all(
          response.data[0].groups.map(async (groupId) => {
            try {
              const response = await axios.get(`/api/groups/${groupId}`);
              const groupName = response.data;
              // Adjust the property based on your API response
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
  }, []);

  const getid = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];

    // Get the key (id in this case) from the dataset
    const key = selectedOption.dataset.id;

    // Now you have the key associated with the selected option
    setgroupid(key);
  };

  return (
    <div className="bodypage">
      <div className="bodypage-title">
        <div className="title">
          <img src={addicon} alt="" />
          <p>Add student</p>
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
            <input type="text" ref={NameVal} id={red1 ? "error" : ""} />
          </div>
          <div className="inputelement">
            <label htmlFor="">Surname :</label>
            <input type="text" ref={SurameVal} id={red2 ? "error" : ""} />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Email :</label>
            <input type="text" ref={EmailVal} id={red3 ? "error" : ""} />
          </div>
          <div className="inputelement">
            <label htmlFor="">Phone Number :</label>
            <input type="text" ref={PhoneVal} id={red4 ? "error" : ""} />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">University :</label>
            <input type="text" ref={UniversityVal} id={red5 ? "error" : ""} />
          </div>
          <div className="inputelement">
            <label htmlFor="">Speciality :</label>
            <input type="text" ref={SpecialityVal} id={red6 ? "error" : ""} />
          </div>
        </div>
        <div className="elementss">
          <div className="inputelement">
            <label htmlFor="">Course :</label>
            <select ref={CourseNameVal} onChange={watchme}>
              {courses.map((item) => (
                <option>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="inputelement">
            <label htmlFor="">Group :</label>
            <select ref={GroupVal} onChange={getid}>
              {groups.map((item) => (
                <option key={item._id} data-id={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="elementsbtn">
          <button id="redors" onClick={ClearnInput}>
            CLEAR
          </button>
          <button onClick={SubmitHandler}>CONFIRM</button>
        </div>
      </form>
    </div>
  );
};
export default AddStudent;
