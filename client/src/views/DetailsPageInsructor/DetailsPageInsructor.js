import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetailsPageInsructor.css';
import axios from 'axios';


const DetailsPageInsructor = () => {

  const [OneInstructor, setOneInstructor] = useState({})
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // check if the data is available

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/instructors/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleInstructor);
          setOneInstructor(res.data.oneSingleInstructor);
          setLoaded(true); // data available => set "true"
          console.log("y++++++++++",OneInstructor.instructors);
        })
        .catch( err => console.log(err) );
  }, [id]); 





 
  return(
    <div className="DetailsPageInsructor">
      <div className="page-top">
        <h1>Speedy Instructors</h1>
         <Link to="/admin-dashboard">
           back to Home
          </Link>
      </div>  
        
      <div className="page-top">
        <h2>{OneInstructor.name} instructors</h2>
      </div>  
      <div className="page-content">
        <div className="fields">
            <p><span className='infos'>name:</span>{OneInstructor.name}</p>
            <p><span className='infos'>email:</span>{OneInstructor.email}</p>
            <p><span className='infos'>isInstructor:</span>{OneInstructor.isInstructor}</p>
            {/* <p><span className='infos'>password:</span> {OneInstructor.password}</p> */}
        </div>
      </div>
    </div>
  );
};


export default DetailsPageInsructor;
