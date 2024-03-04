// ---------------------------------------------------
// ROUTES SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
//const express = require("express");

// 2) Importing Controller Methods
const {
  register,
  login,
} = require("../controllers/user.controller");

//3) importing authenticate methods
const { authenticate } = require('../config/jwt.config');

//4) importing checkPermissions methods
const { checkPermissions } = require('../config/jwt.config');




module.exports = app => {
    app.post("/api/registerAdmin", register);  

    app.post("/api/loginAdmin", login);  

   // app.get("/api/users",authenticate, checkPermissions('admin'), findAllUsers);
  //  app.get('/api/users/:id',authenticate, checkPermissions('admin'), findOneSingleUser);
  //  app.get('/api/usersMany/:id',authenticate, findUsersByManyId);
  //  app.post("/api/users",authenticate, checkPermissions('admin'), createUser); // si je creer une page pr ça
  //  app.patch("/api/users/:id",authenticate, checkPermissions('admin'), updateExistingUser);//
  //  app.delete("/api/users/:id",authenticate, checkPermissions('admin'), deleteOneSpecificUser);//
}





