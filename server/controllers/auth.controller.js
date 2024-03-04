
// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const StudentModel = require("../models/student.model");

const InstructorModel = require("../models/instructor.model");

//const UserModel = require("../models/user.model");

// 3) Exporting Controller functions
module.exports = {

  login : async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Recherchez l'utilisateur dans les deux collections
      const student = await StudentModel.findOne({ email });
      const instructor = await InstructorModel.findOne({ email });
   

      if (student) {
        // Utilisateur trouvé : c'est un étudiant

        // verifie le password
        const isPasswordValid = await bcrypt.compare(password, student.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Incorrect email or password" });
        }
      // Générez un jeton JWT
      const studentInfo = {
        _id: student._id,
        name: student.name,
       // email: student.email,
        role: 'student', // Ajoutez le rôle de l'utilisateur (étudiant)
      };

      const studentToken = jwt.sign(studentInfo, process.env.JWT_SECRET);

      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7200000),
      };

      // Redirigez vers /student-dashboard avec le jeton dans le cookie
      res
        .cookie('usertoken', studentToken, cookieOptions)
        .json({
          message: "Successfully logged in",
          student: studentInfo,
          studentToken: studentToken,
        });

      } else if (instructor) {
        // Utilisateur trouvé : c'est un instructeur
       
         // verifie le password
         const isPasswordValid = await bcrypt.compare(password, instructor.password);
  
         if (!isPasswordValid) {
           return res.status(400).json({ message: "Incorrect email or password" });
         }
       // Générez un jeton JWT
       const instructorInfo = {
         _id: instructor._id,
         name: instructor.name,
        // email: instructor.email,
         role: 'instructor', // Ajoutez le rôle de l'utilisateur (instructeur)
         isInstructor: instructor.isInstructor,
       };
 
       const instructorToken = jwt.sign(instructorInfo, process.env.JWT_SECRET);
 
       const cookieOptions = {
         httpOnly: true,
         expires: new Date(Date.now() + 7200000),
       };
 
       // Redirigez vers /instructor-dashboard avec le jeton dans le cookie
       res
         .cookie('usertoken', instructorToken, cookieOptions)
         .json({
          message: "Successfully logged in",
          instructor: instructorInfo,
          instructorToken: instructorToken
        });

      } else {
        // Aucun utilisateur trouvé : affichez un message d'erreur
        res.status(400).json({ message: "Incorrect email or password" });
      }
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong', error });
    }
  },

  /*
  login2 : async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Recherchez l'utilisateur dans les deux collections
      const student = await StudentModel.findOne({ email });
      const instructor = await InstructorModel.findOne({ email });
   //   const admin = await UserModel.findOne({ email });

      if (student) {
        // Utilisateur trouvé : c'est un étudiant

        // verifie le password
        const isPasswordValid = await bcrypt.compare(password, student.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Incorrect email or password" });
        }
      // Générez un jeton JWT
      const studentInfo = {
        _id: student._id,
        name: student.name,
        email: student.email,
        role: 'student', // Ajoutez le rôle de l'utilisateur (étudiant)
      };

      const studentToken = jwt.sign(studentInfo, process.env.JWT_SECRET);

      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7200000),
      };

      // Redirigez vers /student-dashboard avec le jeton dans le cookie
      res
        .cookie('usertoken', studentToken, cookieOptions)
        .json({
          message: "Successfully logged in",
          student: studentInfo,
          studentToken: studentToken,
        });

      } else if (instructor) {
        // Utilisateur trouvé : c'est un instructeur
       
         // verifie le password
         const isPasswordValid = await bcrypt.compare(password, instructor.password);
  
         if (!isPasswordValid) {
           return res.status(400).json({ message: "Incorrect email or password" });
         }
       // Générez un jeton JWT
       const instructorInfo = {
         _id: instructor._id,
         name: instructor.name,
         email: instructor.email,
         role: 'instructor', // Ajoutez le rôle de l'utilisateur (instructeur)
         isInstructor: instructor.isInstructor,
       };
 
       const instructorToken = jwt.sign(instructorInfo, process.env.JWT_SECRET);
 
       const cookieOptions = {
         httpOnly: true,
         expires: new Date(Date.now() + 7200000),
       };
 
       // Redirigez vers /student-dashboard avec le jeton dans le cookie
       res
         .cookie('usertoken', instructorToken, cookieOptions)
         .json({
          message: "Successfully logged in",
          instructor: instructorInfo,
          instructorToken: instructorToken
        });

      } else if (admin) {
        // Utilisateur trouvé : c'est un admin
       
         // verifie le password
         const isPasswordValid = await bcrypt.compare(password, admin.password);
  
         if (!isPasswordValid) {
           return res.status(400).json({ message: "Incorrect email or password" });
         }
       // Générez un jeton JWT
       const adminInfo = {
         _id: admin._id,
         name: admin.name,
         email: admin.email,
         role: 'admin', // Ajoutez le rôle de l'utilisateur (admin)
       };
 
       const adminToken = jwt.sign(adminInfo, process.env.JWT_SECRET);
 
       const cookieOptions = {
         httpOnly: true,
         expires: new Date(Date.now() + 7200000), // expire dns 2h = 7200000 ms
       };
 
       // Redirigez vers /student-dashboard avec le jeton dans le cookie
       res
         .cookie('usertoken', adminToken, cookieOptions)
         .json({
          message: "Successfully logged in",
          admin: adminInfo,
          adminToken: adminToken,
        });

      } else {
        // Aucun utilisateur trouvé : affichez un message d'erreur
        res.status(400).json({ message: "Incorrect email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }, */

  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
    });
  },

}  













