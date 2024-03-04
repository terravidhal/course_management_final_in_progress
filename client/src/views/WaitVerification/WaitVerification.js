import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import Cookies from "universal-cookie";
import './WaitVerification.css';



const WaitVerification = () => {
  const navigate = useNavigate();
 // const cookies = new Cookies(); 

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);


 /* const userObjs = cookies.get("USER_OBJ");
  const userObjRole = cookies.get("USER_OBJ")?.role || '';
  const userObjIsInstructor = cookies.get("USER_OBJ")?.isInstructor || '';
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor); */
  


/**
 * IMPORTANT : MAINTENANT QUE NOUS UTILISONS DES COOKIES 
 * POUR L'AUTHENTIFICATION ET L'AUTORISATION, NOUS ASSURERONS 
 * QUE CHAQUE DEMANDE EST ENVOYÉE AVEC { withCredentials: true }. 
 * CELA ENVOYERA LES COOKIES À CHAQUE DEMANDE AFIN QUE NOTRE 
 * MIDDLEWARE VÉRIFIE QUI EST CONNECTÉ. 
  */  
 
 
  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      //console.log("res", res);
      console.log("deconnexion",res.data.message);
      localStorage.removeItem("USER_OBJ");
      navigate("/login_page");
    })
    .catch((err)=>{
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};


  
  return (
    <div className="WaitVerification">
       <div className="page-top">
        <h1>waiting verification</h1>
      </div>
      <button onClick={logout}>logout</button>
    </div>
  );

};


export default WaitVerification;
