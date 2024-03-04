import React, { useEffect, useState } from 'react';
import './DetailsPageCourse.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Cookies from "universal-cookie";


const DetailsPageCourse = () => {
 /* const cookies = new Cookies();
  const userObjsRole = cookies.get("USER_OBJ").role || ''; */

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);



  const [OneCourse, setOneCourse] = useState({})
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // check if the data is available

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/courses/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleCourse);
          setOneCourse(res.data.oneSingleCourse);
          setLoaded(true); // data available => set "true"
          console.log("y++++++++++",OneCourse.students);
        })
        .catch( err => console.log(err) );
  }, [id]); 





 
  return(
    <div className="DetailsPageCourse">
      <div className="page-top">
        <h1>Speedy Courses</h1>
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
        <h2>{OneCourse.name} courses</h2>
      </div>  
      <div className="page-content">
        <div className="fields">
            <p><span className='infos'>Level:</span>{OneCourse.level}</p>
            <p><span className='infos'>field:</span>{OneCourse.field}</p>
            <p><span className='infos'>description:</span> {OneCourse.description}</p>
            <p><span className='infos'>dayOfWeek:</span> {OneCourse.dayOfWeek}</p>
            <p><span className='infos'>type Of Course:</span> {OneCourse.typeOfCourse}</p>
            <p><span className='infos'>link Meeting:</span> {OneCourse.linkMeeting}</p>
            <p><span className='infos'>documents Link:</span> {OneCourse.documentsLink}</p>
            <p><span className='infos'>start Time:</span> {OneCourse.startTime}</p>
            <p><span className='infos'>end Time:</span> {OneCourse.endTime}</p>
            <p><span className='infos'>duration:</span> {OneCourse.duration} minutes</p>
            <p><span className='infos'>status:</span> {OneCourse.status} minutes</p>
        </div>
      </div>
    </div>
  );
};


export default DetailsPageCourse;
