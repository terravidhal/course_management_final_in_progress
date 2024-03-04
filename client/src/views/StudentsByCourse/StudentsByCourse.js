import React, { useEffect, useState } from 'react';
import './StudentsByCourse.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Cookies from "universal-cookie";

const StudentsByCourse = () => {
 /* const cookies = new Cookies();
  const userObjsRole = cookies.get("USER_OBJ").role || '';  */

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);



  const [StudByCourse, setStudByCourse] = useState([]);
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // check if the data is available

  
  
  
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/students/course/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res);
          console.log("p++++++++++",res.data.students);
          setStudByCourse(res.data.students)
          setLoaded(true); // data available => set "true"
          console.log("y++++++++++StudByCourse",StudByCourse);
        })
        .catch( err => console.log(err) );
  }, [id]); 





 
  return(
    <div className="StudentsByCourse">
      <div className="page-top">
        <h1>Students by course</h1>
        {
          userObjsRole === 'admin' ?
            <Link to="/admin-dashboard">
              back to Home
             </Link> :
             <Link to="/instructor-dashboard">
             back to Home
            </Link>
        }
      </div>  
        
      <div className="page-top">
        <h2> students</h2>
      </div>  
      <div className="page-content">
          <div className="fields">
          { loaded === true ? 
              StudByCourse.map((elt,index) => (
                <li key={index}>
                   <p><span className='infos'>name:</span>&nbsp;{elt.name}</p>
                   <p><span className='infos'>email:</span>&nbsp;{elt.email}</p>
                   <p><span className='infos'>fieldOfStudy:</span>&nbsp;{elt.fieldOfStudy}</p>
                   <p><span className='infos'>levelStudent:</span>&nbsp;{elt.levelStudent}</p>
                </li>
              )) : null
          } 
          </div>
      </div>
    </div>
  );
};


export default StudentsByCourse;

