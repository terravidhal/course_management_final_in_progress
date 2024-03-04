import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import Cookies from "universal-cookie";
import './InstructorDashboard.css';
import CourseTableInstructor from '../../components/CourseTableInstructor/CourseTableInstructor';



const InstructorDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();

/*  const cookies = new Cookies();
  const userObjs = cookies.get("USER_OBJ") || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default'; */


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
 
  

  // get all courses by Instructor
 /* useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/instructor/" + userObjsId,{withCredentials: true})
      .then((res) => {
        setAllCourses(res.data.coursesByInstructor);
        console.log('r+++++++', res.data.coursesByInstructor)
      })
      .catch((err) => console.log(err));
  }, []); */


   // check and update courses status
   useEffect(() => {
    const GetAllCoursesByInstructor = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses/instructor/"+ userObjsId, { withCredentials: true });
        const courses = response.data.coursesByInstructor;

        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses); 

        setAllCourses(updatedCourses);
      } catch (err) {
        console.error(err);
      }
    };

    GetAllCoursesByInstructor();
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

/*
  const updateCourseStatuses2 = (courses) => {
    return courses.map((course) => {
      const currentDate = new Date().getDay(); // Get current day of the week
      const courseDate = new Date(course.dayOfWeek).getDay(); // Get day of the week from course
  
      // Update status if current date is past the course's day
      if (currentDate > courseDate) {
        course.status = 'resolved';
      }
  
      return course;
    });
  } */


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

 

  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      //console.log("res", res);
      console.log("deconnexion",res.data.message);
     // console.log("is res data message",res.data.message);
     //  cookies.remove("USER_OBJ");
       localStorage.removeItem('USER_OBJ');
     // localStorage.removeItem("USER_OBJ");
      navigate("/login_page");
    })
    .catch((err)=>{
     // console.log("+++++++++++",err.response);
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};


  
  return (
    <div className="InstructorDashboard">
       <div className="page-top">
        <h1>Speedy course</h1>
         <Link to="/courses/new">
         Add an course
          </Link>
      </div>
      <button onClick={logout}>logout</button>
      <h4>we have quotes by : </h4>
      <CourseTableInstructor allCourses={allCourses} deleteCourse={deleteCourse} />
    </div>
  );

};


export default InstructorDashboard;
