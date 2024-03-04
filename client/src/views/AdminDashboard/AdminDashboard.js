import React, {useState, useEffect} from 'react';
import './AdminDashboard.css';
import CourseTable from '../../components/CourseTable/CourseTable';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import StudentTable from '../../components/StudentTable/StudentTable';
import InstructorTable from '../../components/InstructorTable/InstructorTable';




const AdminDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const navigate = useNavigate();

 
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);


  // check and update courses status
  useEffect(() => {
    const GetAllCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses", { withCredentials: true });
        const courses = response.data.allDaCourses;
       // console.log('response', response);
        
        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses); 

        setAllCourses(updatedCourses);
      } catch (err) {
        console.error(err);
      }
    };

    GetAllCourses();
  }, []); 

  //update courses
  const updateCourseStatuses = (courses) => {
    return courses.map((course) => {
      const currentDate = new Date().getDate(); // Get current day of the week
      const courseDate = new Date(course.dayOfWeek).getDate(); // Get day of the week from course
  
      const date = new Date();
      const hours = date.getHours(); // 11
      const minutes = date.getMinutes(); // 1
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const currentTime = new Date(
        0,
        0,
        0,
        parseInt(formattedTime.split(":")[0]),
        parseInt(formattedTime.split(":")[1])
      );
  
      const startTIME = new Date(
        0,
        0,
        0,
        parseInt(course.startTime.split(":")[0]),
        parseInt(course.startTime.split(":")[1])
      );
      const endTIME = new Date(
        0,
        0,
        0,
        parseInt(course.endTime.split(":")[0]),
        parseInt(course.endTime.split(":")[1])
      );

     // console.log('currentDate > courseDate // currentTime > endTIME',currentDate > courseDate,currentTime > endTIME);
     // console.log('currentTime , endTIME',currentTime , endTIME);

      // Update status if current date is past the course's day and current time is past the course's end time
      if (currentDate > courseDate ) {
        course.status = "resolved";
      } else if (currentDate === courseDate && currentTime > endTIME) {
        course.status = "resolved";
      } else {
         console.log('pending');
      }
      return course;
    });
  };

  

  // get all students
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students",{withCredentials: true})
      .then((res) => {
        setAllStudents(res.data);
        console.log('r+++++++', res.data)
      })
      .catch((err) => console.log(err));
  }, []); 

  // get all instructors
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instructors",{withCredentials: true})
      .then((res) => {
        setAllInstructors(res.data);
        console.log('r+++++++', res.data)
      })
      .catch((err) => console.log(err));
  }, []); 



  // delete One specific course
  const deleteCourse = (courseId) => {
    axios
      .delete("http://localhost:8000/api/courses/" + courseId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllCourses(allCourses.filter(course=> course._id !== courseId)); 
      })
      .catch((err) => console.log(err));
  };

  // delete One specific student
  const deleteStudent = (studentId) => {
    axios
      .delete("http://localhost:8000/api/students/" + studentId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllStudents(allStudents.filter(student=> student._id !== studentId)); 
      })
      .catch((err) => console.log(err));
  };

  // delete One specific instructor
  const deleteInstructor = (instructorId) => {
    axios
      .delete("http://localhost:8000/api/instructors/" + instructorId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllInstructors(allInstructors.filter(instructor=> instructor._id !== instructorId)); 
      })
      .catch((err) => console.log(err));
  };


  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      if ( userObjsRole === 'student') {
          
        console.log("deconnexion",res.data.message);
        localStorage.removeItem('USER_OBJ');
         navigate("/login_page");
         
      }else if (userObjsRole === 'instructor') {
          
          console.log("deconnexion",res.data.message);
          localStorage.removeItem('USER_OBJ');
           navigate("/login_page");
      }else if (userObjsRole === 'admin') {
          
          console.log("deconnexion",res.data.message);
          localStorage.removeItem('USER_OBJ');
           navigate("/route/log/loaded25");

      } else{
        console.error("Unexpected response:", res.data);
       
      }   
    })
    .catch((err)=>{
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};


  
  return (
    <div className="AdminDashboard">
        <div className="container">
        <div className="navigation">
            <ul>
                <li className=''>
                    <a  href="#">
                        <span className="icon colorIcon">
                            <ion-icon name="logo-pwa"></ion-icon>
                        </span>
                    </a>
                </li>
                <li className='select'>
                    <a href="#">
                        <span className="icon">
                            <ion-icon name="logo-buffer"></ion-icon>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <div className="main">
            <div class="topbar">
                <div class="toggle">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
                <div class="search welcome">
                    <label>
                        Admin Dashboard
                    </label>
                </div>
                <div class="user">
                    <img src="assets/images/utilisateur.png" alt=""/>
                </div>
            </div>
            <div class="topbar">
                <div class="welcomeUser">
                   &nbsp;&nbsp;&nbsp;welcome <span>{userObjs.name}</span> !
                </div>
                <div class="logout">
                    <button class="btnn logout"  onClick={logout}>logout</button>
                </div>
            </div>
            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>All Courses</h2>
                        <Link class="btn" to="/courses/new">
                           Add New Courses
                       </Link>
                    </div>
                    <CourseTable allCourses={allCourses} deleteCourse={deleteCourse} />
                </div>
                <div className="recentOrders2">
                    <div className="cardHeader">
                        <h2>All Students</h2>
                        <Link class="btn" to="/students/new">
                           Add New Student
                       </Link>
                    </div>
                    <StudentTable allStudents={allStudents} deleteStudent={deleteStudent} />
                </div>
                <div className="recentOrders2">
                    <div className="cardHeader">
                        <h2>All Instructors</h2>
                        <Link class="btn" to="/instructors/new">
                           Add New instructor
                       </Link>
                    </div>
                    <InstructorTable allInstructors={allInstructors} deleteInstructor={deleteInstructor} />
                </div>
            </div>
        </div>
        </div> 
          {/* <div className="page-top">
            <h1>Speedy course</h1>
             <Link to="/courses/new">
             Add an course
              </Link>
             <Link to="/instructors/new">
             Add an instructor
              </Link>
             <Link to="/students/new">
             Add an students
              </Link>
          </div>
          <button onClick={logout}>logout</button>
          <h4>we have quotes by : </h4>
          <CourseTable allCourses={allCourses} deleteCourse={deleteCourse} />
          <StudentTable allStudents={allStudents} deleteStudent={deleteStudent} />
          <InstructorTable allInstructors={allInstructors} deleteInstructor={deleteInstructor} /> */}
    </div>
  );

};


export default AdminDashboard;
