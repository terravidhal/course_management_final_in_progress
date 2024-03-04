import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./RegisterAdmin.css";


const RegisterAdmin = (props)=>{
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const [errs2, setErrs2] = useState("");
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      keyCode:"",
      password: "",
      confirmPassword:""
    })
  
    const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]: e.target.value // e.target.name => recupere la valeur du champ "name" de l'input
      })
    }
  
    const register = e =>{
      e.preventDefault();
      axios.post('http://localhost:8000/api/registerAdmin',
      user,
      {
        withCredentials: true,
      })
      .then(res =>{
        console.log(res.data);
        setUser({
          name:"",
          email:"",
          keyCode:"",
          password:"",
          confirmPassword:""
        })
        setConfirmReg("Thank you for registering, you can now log in");
        setErrs({});
        navigate("/route/log/loaded25");
      })
      .catch((err)=>{
       // console.log(err);
       // setErrs(err.response.data.errors.errors);
        setErrs2(err.response.data.message)
        console.log("+++++++++",err.response.data.message);
      })
  };
  
  return(
    <div>
      <h2>Register admin</h2>
      <Link to="/route/log/loaded25">
             login admin
      </Link>

      {
        confirmReg?
        <h1 style={{color: "grey"}}>{confirmReg}</h1>
        :null
      }
      {
        errs2?
        <span className="error-text">{errs2}</span>
        :null
      }
      <form onSubmit={register}>
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
          <label>Key Code</label>
          <input type="password" name="keyCode" value={user.keyCode} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Password</label>
          {
            errs.password?
            <span className="error-text">{errs.password.message}</span>
            :null
          }
          <input type="password" name="password" value={user.password} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Confirm Password</label>
          {
            errs.confirmPassword?
            <span className="error-text">{errs.confirmPassword.message}</span>
            :null
          }
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=> handleChange(e)}/>
        </div>
        <button type="submit">Register Me</button>
      </form>
    </div>
  );
  };
  
  export default RegisterAdmin;
