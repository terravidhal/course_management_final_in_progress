// ---------------------------------------------------
// CONTROLLER SETUP - Student
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const StudentModel = require("../models/student.model");

//const InstructorModel = require("../models/instructor.model");

//const UserModel = require("../models/user.model");

// 3) Exporting Controller functions
module.exports = {


  // I) REGISTER avec connexion apres l'enregistrement
  register: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newStudent = new StudentModel(req.body);
    // ii) Enregistrer dans la base de données instance newStudent
    newStudent
      .save()
      .then((newStud) => {
          // Générez un jeton JWT
          const studentInfo = {
            _id: newStud._id,
            name: newStud.name,
            role: 'student', 
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
              //studentToken: studentToken,
            });
      }) 
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(400).json({ message: "Something went wrong", errors: err });
      });
  },

/*
  register: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newStudent = new StudentModel(req.body);
    // ii) Enregistrer dans la base de données instance newStudent
    newStudent
      .save()
      .then((newStudent) => {
        res
          .status(201)
          .json({ message: "Student successfully created", student: newStudent });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(400).json({ message: "Something went wrong", errors: err });
      });
  }, */


  // I) Create function register sans connexion apres l'enregistrement
  createStudent: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newStudent = new StudentModel(req.body);
    // ii) Enregistrer dans la base de données instance newStudent
    newStudent
      .save()
      .then((newStudent) => {
        res
          .status(201)
          .json({ message: "Student successfully created", student: newStudent });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(400).json({ message: "Something went wrong", errors: err });
      });
  },

  /*
  updateExistingStudent44: async (req, res) => {
    const { id, name, email, fieldOfStudy, levelStudent, password } = req.body;
  
    // Authentification et autorisation (à implémenter)
  
    // Validation des données (à implémenter)
  
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
        fieldOfStudy: fieldOfStudy,
        levelStudent : levelStudent,
        password: await bcrypt.hash(password, 10),
      },
      { new: true, runValidators: true }
    );
  
    if (!updatedStudent) {
      return res.status(404).json({ message: "Étudiant introuvable" });
    }
  
    res.status(200).json({ message: "Étudiant mis à jour avec succès", student: updatedStudent });
  }, */
  


  updateExistingStudent: async(req, res) => {
    const { id, name, email, fieldOfStudy, levelStudent, password } = req.body;
  
  
    // Authentification et autorisation (à implémenter)
  
    // Validation des données (à implémenter)
  
    StudentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
        fieldOfStudy: fieldOfStudy,
        levelStudent : levelStudent,
        password: await bcrypt.hash(password, 10),
      },
      { new: true, runValidators: true }
      )
      .then((updatedStudent) => {
          if (!updatedStudent) {
            return res.status(404).json({ message: "Étudiant introuvable" });
          }
          res.status(200).json({ message: "Étudiant mis à jour avec succès", student: updatedStudent });
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            return res
              .status(400)
              .json({ message: "Validation Errors", errors: err });
          }
           res.status(400).json({ message: "Une erreur s'est produite", errors: err });
        });
  },



/*
  updateExistingStudent44: (req, res) => {
    const { id, name, email, fieldOfStudy, levelStudent, password } = req.body;
    
  
    // Authentification et autorisation (à implémenter)
  
    // Validation des données (à implémenter)
  
    StudentModel.findById(req.params.id)
      .then((student) => {
        if (!student) {
          return res.status(404).json({ message: "Étudiant introuvable" });
        }
  
        student.name = name;
        student.email = email;
        student.fieldOfStudy = fieldOfStudy;
        student.levelStudent = levelStudent;
  
        const saltRounds = 10;
      //  const hashedPassword = await bcrypt.hash(password, saltRounds);
      //  student.password = hashedPassword;

        const hashedPassword = bcrypt.hash(password, saltRounds)
         .then(hash => {
           // Utilise le hash ici
           student.password = hash;
           console.log('Hash :', hash);
         })
         .catch(err => {
           // Gère les erreurs ici
           console.error(err.message);
         });
  
        student.save()
          .then((updatedStudent) => {
            res.status(200).json({ message: "Étudiant mis à jour avec succès", student: updatedStudent });
          })
          .catch((err) => {
            if (err.name === "ValidationError") {
              return res
                .status(400)
                .json({ message: "Validation Errors", errors: err });
            }
           // res.status(500).json({ message: "Une erreur s'est produite", errors: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ message: "Une erreur s'est produite", errors: err });
      });
  },*/
  










   // VII) UPDATE EXISTING STUDENT
/*
updateExistingStudent44 : async (req, res) => {
  const { id,name, email, fieldOfStudy, levelStudent, password } = req.body;
  

  // Authentification et autorisation (à implémenter)

  // Validation des données (à implémenter)

  const student = await StudentModel.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Étudiant introuvable" });
  }

  student.name = name;
  student.email = email;
  student.fieldOfStudy = fieldOfStudy;
  student.levelStudent = levelStudent;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
 // student.password = hashedPassword;
  student.password = password;

  await student.save();

  res.status(200).json({ message: "Étudiant mis à jour avec succès", student });
}, */


  // IV) READ ALl
  findAllStudents: (req, res) => {
    StudentModel.find({})
      .then((allStudents) => res.status(200).json(allStudents))
      .catch((err) =>
        res.status(400).json({ message: "Something went wrong", error: err })
      );
  },

  // find student by id
  findOneSingleStudent : (req, res) => {
    StudentModel.findOne({ _id: req.params.id })
        .then(oneSingleStudent => {
          console.log("oneSingleStudent",oneSingleStudent);
            res.json({ oneSingleStudent })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },


  // find students by many ids
findStudentsByManyId: (req, res) => {
//  const { ids } = req.body; // Récupère les IDs depuis le corps de la requête
  const { ids } = req.params.id; // Récupère les IDs depuis le corps de la requête

  // Vérifie si la liste d'IDs est vide
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Liste d'IDs vide." });
  }

  // Requête pour trouver les utilisateurs correspondants aux IDs
  StudentModel.find({ _id: { $in: ids } })
    .then((students) => {
      // Si aucun utilisateur n'est trouvé
      if (!students || students.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      // Réponse avec les utilisateurs trouvés
      res.json({ students });
    })
    .catch((err) => {
      // Erreur lors de la requête
      res.status(400).json(err);
    });
},




  // VI) DELETE ALL
 /* deleteAllStudents: (req, res) => {
    StudentModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },  */

  /*AJOUT*/ 
 

// IX) DELETE ONE SPECIFIC STUDENT
deleteOneSpecificStudent: (req, res) => {
  const studentId = req.params.id; // Obtenez l'ID de l'utilisateur à supprimer

  StudentModel.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted successfully" });
    })
    .catch((err) =>
      res.status(400).json({ message: "Something went wrong", error: err })
    );
},

}  













