// ---------------------------------------------------
// ROUTES SETUP - Student
// ---------------------------------------------------

// 1) Importing External Libraries
//const express = require("express");

// 2) Importing Controller Methods
const {
    register,
    createStudent,
    findAllStudents,
    findOneSingleStudent,
    findStudentsByManyId,
    deleteOneSpecificStudent,
    updateExistingStudent,
    findAllStudentsByRoleStudent,
  } = require("../controllers/student.controller");


  
  //3) importing authenticate methods
  const { authenticate } = require('../config/jwt.config');

  //4) importing checkPermissions methods
  const { checkPermissions } = require('../config/jwt.config');
  
 

  
  module.exports = app => {
      app.post("/api/registerStudent", register);  
     

      app.post("/api/students",authenticate, checkPermissions('admin'), createStudent);
      app.get("/api/students",authenticate, checkPermissions('admin', 'instructor'), findAllStudents);
      app.get('/api/students/:id',authenticate, checkPermissions('admin'), findOneSingleStudent);
     // app.get('/api/studentsMany/:id',authenticate, findStudentsByManyId);
      app.patch("/api/students/:id",authenticate, checkPermissions('admin'), updateExistingStudent);//  // si je creer une page pr ça
      app.delete("/api/students/:id",authenticate, checkPermissions('admin'),  deleteOneSpecificStudent);//
  }
  
  
  
  