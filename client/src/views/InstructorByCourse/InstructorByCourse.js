import React, { useEffect, useState } from 'react';
import './InstructorByCourse.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Cookies from "universal-cookie";



const InstructorByCourse = () => {
/*  const cookies = new Cookies();
  const userObjsRole = cookies.get("USER_OBJ").role || ''; */

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);



  const [InstructByCourse, setInstructByCourse] = useState({});
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // check if the data is available

  
  
/*
  useEffect(() => {
    axios.get("http://localhost:8000/api/instructors/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res);
          setInstructByCourse(res.data.oneSingleInstructor);
          setLoaded(true); // data available => set "true"
        })
        .catch( err => console.log(err) );
  }, [id]); */


  
  useEffect(() => {
    axios.get("http://localhost:8000/api/instructorOruser/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.result);
          setInstructByCourse(res.data.result);
          setLoaded(true); // data available => set "true"
        })
        .catch( err => console.log(err) );
  }, [id]); 
  
  



 
  return(
    <div className="StudentsByCourse">
      <div className="page-top">
        <h1>Students by course</h1>
        {
            userObjsRole === 'admin' ? (
                <Link to="/admin-dashboard">
                    back to Home
                </Link>
            ) : userObjsRole === 'student' ? (
                <Link to="/student-dashboard">
                    back to Home
                </Link>
            ) : (
                <Link to="/instructor-dashboard">
                    back to Home
                </Link>
            )
        }
      </div>  
        
      <div className="page-top">
        <h2> students</h2>
      </div>  
      <div className="page-content">
          { loaded === true ? 
          <div className="fields">
               <p><span className='infos'>name:</span>&nbsp;{InstructByCourse.name}</p>
               <p><span className='infos'>email:</span>&nbsp;{InstructByCourse.email}</p>
          </div>
          : null }
      </div>
    </div>
  );
}


export default InstructorByCourse;


