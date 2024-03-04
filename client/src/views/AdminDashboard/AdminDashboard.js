import React, {useState, useEffect} from 'react';
import './AdminDashboard.css';
import CourseTable from '../../components/CourseTable/CourseTable';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import Cookies from "universal-cookie";
import StudentTable from '../../components/StudentTable/StudentTable';
import InstructorTable from '../../components/InstructorTable/InstructorTable';







const AdminDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const navigate = useNavigate();

 /* const cookies = new Cookies();

  const userObjs = cookies.get("USER_OBJ") || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default'; */
  
/*  const userObjs = cookies.get("USER_OBJ") ;
  const userObjsRole = userObjs.role ;
  const userObjsId = userObjs._id ; */

  
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);

/**
 * IMPORTANT : MAINTENANT QUE NOUS UTILISONS DES COOKIES 
 * POUR L'AUTHENTIFICATION ET L'AUTORISATION, NOUS ASSURERONS 
 * QUE CHAQUE DEMANDE EST ENVOYÉE AVEC { withCredentials: true }. 
 * CELA ENVOYERA LES COOKIES À CHAQUE DEMANDE AFIN QUE NOTRE 
 * MIDDLEWARE VÉRIFIE QUI EST CONNECTÉ. 
  */  
 
  // 

     // add hovered className to selected list item
   /*  let list = document.querySelectorAll(".AdminDashboard .navigation li");
     
     function activeLink() {
       list.forEach((item) => {
         item.classList.remove("hovered");
       });
       this.classList.add("hovered");
     } */
     
    // list.forEach((item) => item.addEventListener("mouseover", activeLink));
     
     // Menu Toggle
   /*  let toggle = document.querySelector(".AdminDashboard .toggle") || {};
     let navigation = document.querySelector(".AdminDashboard .navigation");
     let main = document.querySelector(".AdminDashboard .main");
     
     toggle.onclick = function () {
       navigation.classList.toggle("active");
       main.classList.toggle("active");
     }; */


  // get all courses
/*  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses",{withCredentials: true})
      .then((res) => {
        setAllCourses(res.data.allDaCourses);
        console.log('r+++++++', res.data.allDaCourses)
      })
      .catch((err) => console.log(err));
  }, []); */


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
        setAllCourses(allCourses.filter(course=> course._id !== courseId)); // pas necessaire
      })
      .catch((err) => console.log(err));
  };

  // delete One specific student
  const deleteStudent = (studentId) => {
    axios
      .delete("http://localhost:8000/api/students/" + studentId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllStudents(allStudents.filter(student=> student._id !== studentId)); // 
      })
      .catch((err) => console.log(err));
  };

  // delete One specific instructor
  const deleteInstructor = (instructorId) => {
    axios
      .delete("http://localhost:8000/api/instructors/" + instructorId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllInstructors(allInstructors.filter(instructor=> instructor._id !== instructorId)); // 
      })
      .catch((err) => console.log(err));
  };


  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      if ( userObjsRole === 'student') {
          
        console.log("deconnexion",res.data.message);
      //  cookies.remove("USER_OBJ");
        localStorage.removeItem('USER_OBJ');
         navigate("/login_page");
         
      }else if (userObjsRole === 'instructor') {
          
          console.log("deconnexion",res.data.message);
         // cookies.remove("USER_OBJ");
          localStorage.removeItem('USER_OBJ');
           navigate("/login_page");
      }else if (userObjsRole === 'admin') {
          
          console.log("deconnexion",res.data.message);
        //  cookies.remove("USER_OBJ");
          localStorage.removeItem('USER_OBJ');
           navigate("/route/log/loaded25");

      } else{
        console.error("Unexpected response:", res.data);
       
      }   
    })
    .catch((err)=>{
     // console.log("+++++++++++",err.response);
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};


  
  return (
    <div className="AdminDashboard">
        <div className="container">
        <div className="navigation active">
            <ul>
                <li>
                    <a href="#">
                        <span className="icon colorIcon">
                            <ion-icon name="book-outline"></ion-icon>
                        </span>
                        <span className="title smallTitle">Courses Manager</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon">
                            <ion-icon name="reader-outline"></ion-icon>
                        </span>
                        <span className="title">Admin Dashboard</span>
                    </a>
                </li>
            </ul>
        </div>
        <div className="main active">
            <div class="topbar">
                <div class="toggle active">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
                <div class="search welcome">
                    <label>
                        {/* <input type="text" placeholder="Search here"/>
                        <ion-icon name="search-outline"></ion-icon> */}
                        {/* welcome {userObjs.name} ! */}
                        Admin Dashboard
                    </label>
                </div>
                <div class="user">
                    <img src="assets/images/utilisateur.png" alt=""/>
                </div>
            </div>
            <div class="topbar">
                <div class="welcomeUser">
                   &nbsp;&nbsp;&nbsp;welcome {userObjs.name} !
                </div>
                <div class="logout">
                    Logout
                </div>
            </div>
            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>All Courses</h2>
                        <a href="#" class="btn">Add New Courses</a>
                    </div>
                    <CourseTable allCourses={allCourses} deleteCourse={deleteCourse} />
                    {/* <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Payment</td>
                                <td>Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Star Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td><span className="status delivered">Delivered</span></td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
                {/* <div class="recentCustomers">
                    <div class="cardHeader">
                        <h2>Create Customers</h2>
                    </div>
                    <table>
                        <tr>
                            <td>
                                <h4>Create New Course <br/></h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Create New Instructor <br/></h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Create New Student <br/></h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Logout<br/></h4>
                            </td>
                        </tr>
                    </table>
                </div> */}
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
