import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import Cookies from "universal-cookie";
import './StudentDashboard.css';
import CourseTableStudent from '../../components/CourseTableStudent/CourseTableStudent';



const StudentDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();

 /* const cookies = new Cookies();
  const userObjsId = cookies.get("USER_OBJ")._id || ''; */


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
 
  

  // get all courses by student
  /*
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/student/" + userObjsId,{withCredentials: true})
      .then((res) => {
        setAllCourses(res.data.coursesByStudent);
        console.log('r+++++++', res.data.coursesByStudent)
      })
      .catch((err) => console.log(err));
  }, []); */


   // check and update courses status
   useEffect(() => {
    const GetAllCoursesByStudent = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses/student/"+ userObjsId, { withCredentials: true });
        const courses = response.data.coursesByStudent;

        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses); 

        setAllCourses(updatedCourses);
      } catch (err) {
        console.error(err);
      }
    };

    GetAllCoursesByStudent();
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


 

  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      //console.log("res", res);
      console.log("deconnexion",res.data.message);
     // console.log("is res data message",res.data.message);
      // cookies.remove("USER_OBJ");
       localStorage.removeItem('USER_OBJ');
      navigate("/login_page");
    })
    .catch((err)=>{
     // console.log("+++++++++++",err.response);
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};


  
  return (
    <div className="StudentDashboard">
       <div className="page-top">
        <h1>Speedy course</h1>
      </div>
      <button onClick={logout}>logout</button>
      <h4>we have quotes by : </h4>
      <CourseTableStudent allCourses={allCourses} />
    </div>
  );

};


export default StudentDashboard;

