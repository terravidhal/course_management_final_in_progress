// ---------------------------------------------------
// ROUTES SETUP - Instructor
// ---------------------------------------------------

// 1) Importing External Libraries
//const express = require("express");

// 2) Importing Controller Methods
const {
    register,
    findAllInstructors,
    findOneSingleInstructor,
    findInstructorsByManyId,
    findSingleEntity,
    deleteOneSpecificInstructor,
    updateExistingInstructor,
    createInstructor,
  } = require("../controllers/instructor.controller");
  
  //3) importing authenticate methods
  const { authenticate } = require('../config/jwt.config');

  //4) importing checkPermissions methods
  const { checkPermissions } = require('../config/jwt.config');
  

  
  
  module.exports = app => {
      app.post("/api/registerInstructor", register);  
      
      /*AJOUT*/ 
      //  app.get("/api/instructors/instructors",authenticate, verifyRole(["admin", "instructor"]), findAllInstructorsByRoleInstructor);
      // app.post("/api/instructors",authenticate, verifyRole(["admin"]), createInstructor); // si je creer une page pr ça

      app.post("/api/instructors",authenticate,checkPermissions('admin'), createInstructor); // si je creer une page pr ça
      app.get("/api/instructors",authenticate, checkPermissions('admin'), findAllInstructors);
      app.get('/api/instructors/:id',authenticate, checkPermissions('admin'), findOneSingleInstructor);
      app.get('/api/instructorOruser/:id',authenticate, checkPermissions('admin','instructor','student'), findSingleEntity);
      //app.get('/api/instructorsMany/:id',authenticate, findInstructorsByManyId);
      app.patch("/api/instructors/:id",authenticate, checkPermissions('admin'), updateExistingInstructor);//
      app.delete("/api/instructors/:id",authenticate, checkPermissions('admin'),  deleteOneSpecificInstructor);//
  }
  
  
  
  
  
  