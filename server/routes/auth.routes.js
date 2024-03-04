// 1) Importing Controller Methods
const {
    login,
    logout,
  } = require("../controllers/auth.controller");


  //2) importing authenticate methods
  const { authenticate } = require('../config/jwt.config');
  
  //3) importing verifyRole methods
  const { verifyRole } = require('../config/jwt.config');
  
  module.exports = app => {
      app.post("/api/login", login);
      app.post("/api/logout", logout); 
  }
  
  
  
  