import React, {useState, useEffect} from 'react';
import './UpdatePageStudent.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const UpdatePageStudent = (props) => {

  const { id } = useParams();
  const [loaded, setLoaded] = useState(false); // check if the data is available
  const navigate = useNavigate();


  const [user, setUser] = useState({
    name: "",
    email: "",
    fieldOfStudy: "",
    levelStudent:"",
    password: "",
    confirmPassword: ""
  });
  const [confirmReg, setConfirmReg] = useState("");
  const [errs, setErrs] = useState({});


  //get  data one specific student
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students/" + id,{withCredentials: true})
      .then((res) => {
        console.log("u++++++++++",res.data.oneSingleStudent);
      //  setStudentObj(res.data.oneSingleStudent);
        setUser({
          name: res.data.oneSingleStudent.name,
          email: res.data.oneSingleStudent.email,
          fieldOfStudy: res.data.oneSingleStudent.fieldOfStudy,
          levelStudent: res.data.oneSingleStudent.levelStudent,
          password: "default",
          confirmPassword: "default"
        });
        setLoaded(true); // data available => set "true"
       // console.log("k++++++++++",user.name);
      })
      .catch((err) => console.log(err));
      
    }, [id]); // updating "user" based on "id"


 

  const handleChange = (e)=>{
    setUser({
      ...user,
      [e.target.name]: e.target.value // e.target.name => recupere la valeur du champ "name" de l'input
    })
  }

  const updateStudent = (e) =>{
    e.preventDefault();
    axios.patch('http://localhost:8000/api/students/'+ id,
    user,
    {
      withCredentials: true,
    })
    .then(res =>{
      console.log(res.data);
      setUser({
        name:"",
        email:"",
        fieldOfStudy:"",
        levelStudent:"",
        password:"",
        confirmPassword:""
      })
      setConfirmReg("Thank you for registering, you can now log in");
      setErrs({});
      navigate("/admin-dashboard");
    })
    .catch((err)=>{
      console.log(err);
      setErrs(err.response.data.errors.errors);
      console.log("+++++++++",err.response.data.errors.errors);
    })
};


  



  return (

<div className="UpdatePageStudent">
<h2>update Student</h2>
<Link to="/admin-dashboard">
       dashboard-admin
</Link>



{
  confirmReg?
  <h1 style={{color: "grey"}}>{confirmReg}</h1>
  :null
}


{loaded === true ? 
<form onSubmit={updateStudent}>
  <div>
    <label>name</label>
    {
      errs.name?
      <span className="error-text">{errs.name.message}</span>
      :null
    }
    <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)}/>
  </div>
  <div>
    <label>Email</label>
    {
      errs.email?
      <span className="error-text">{errs.email.message}</span>
      :null
    }
    <input type="email" name="email" value={user.email} onChange={(e)=> handleChange(e)}/>
  </div>
  <div>
    <label>field Of Study</label>
    {
      errs.fieldOfStudy?
      <span className="error-text">{errs.fieldOfStudy.message}</span>
      :null
    }
    <select name="fieldOfStudy" id="" value={user.fieldOfStudy} onChange = {(e)=>handleChange(e)}>
         <option value="Web developement">Web developement</option>
         <option value="data analyst">data analyst</option>
         <option value="ux design">ux design</option>
    </select>
  </div>
  <div>
    <label>level Student</label>
    {
      errs.levelStudent?
      <span className="error-text">{errs.levelStudent.message}</span>
      :null
    }
    <input type="number" name="levelStudent" value={user.levelStudent} onChange={(e)=> handleChange(e)}/>
  </div>
  <div>
    <label>Password</label>
    {
      errs.password?
      <span className="error-text">{errs.password.message}</span>
      :null
    }
    <input type="text" name="password" value={user.password} onChange={(e)=> handleChange(e)}/>
  </div>
  <div>
    <label>Confirm Password</label>
    {
      errs.confirmPassword?
      <span className="error-text">{errs.confirmPassword.message}</span>
      :null
    }
    <input type="text" name="confirmPassword" value={user.confirmPassword} onChange={(e)=> handleChange(e)}/>
  </div>
  <button type="submit">Update</button>
</form> 
 : null }


</div> 
  );

};


export default UpdatePageStudent;
