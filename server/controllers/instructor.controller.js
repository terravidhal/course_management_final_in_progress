// ---------------------------------------------------
// CONTROLLER SETUP - Instructor
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const InstructorModel = require("../models/instructor.model");
const UserModel = require("../models/user.model");

//const StudentModel = require("../models/student.model");

// 3) Exporting Controller functions
module.exports = {


  // I) REGISTER
  /*
  register: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newInstructor = new InstructorModel(req.body);

    // ii) Enregistrer dans la base de données instance newInstructor
    newInstructor
      .save()
      .then((newInstructor) => {
        res
          .status(201)
          .json({ message: "Instructor successfully created", instructor: newInstructor });
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

  register: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newInstructor = new InstructorModel(req.body);

    // ii) Enregistrer dans la base de données instance newInstructor
    newInstructor
      .save()
      .then((newInstruct) => {

          // Générez un jeton JWT
         const instructorInfo = {
           _id: newInstruct._id,
           name: newInstruct.name,
           role: 'instructor', 
           isInstructor: newInstruct.isInstructor,
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
           // instructorToken: instructorToken
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


  // VIII) CREATE INSTRUCTOR
createInstructor: (req, res) => {
   // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newInstructor = new InstructorModel(req.body);
    // ii) Enregistrer dans la base de données instance newInstructor
    newInstructor
      .save()
      .then((newInstructor) => {
        res
          .status(201)
          .json({ message: "Instructor successfully created", instructor: newInstructor });
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


//update Instructor
updateExistingInstructor: async(req, res) => {
  const { id, name, email, isInstructor, password } = req.body;

  // Authentification et autorisation (à implémenter)
  // Validation des données (à implémenter)

  InstructorModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: name,
      email: email,
      isInstructor: isInstructor,
      password: await bcrypt.hash(password, 10),
    },
    { new: true, runValidators: true }
    )
    .then((updatedInstructor) => {
        if (!updatedInstructor) {
          return res.status(404).json({ message: "instructeur introuvable" });
        }
        res.status(200).json({ message: "instructeur mis à jour avec succès", instructor: updatedInstructor });
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




  // IV) READ ALL
  findAllInstructors: (req, res) => {
    InstructorModel.find({})
      .then((allInstructors) => res.status(200).json(allInstructors))
      .catch((err) =>
        res.status(400).json({ message: "Something went wrong", error: err })
      );
  },

  // find instructor by id
  findOneSingleInstructor : (req, res) => {
    InstructorModel.findOne({ _id: req.params.id })
        .then(oneSingleInstructor => {
          console.log("oneSingleInstructor",oneSingleInstructor);
            res.json({ oneSingleInstructor })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },

  // find instructor by id or find user by id

  findOneSingleInstructorOrUser : async (req, res) => {
    const { id } = req.params;
    const entityType = req.params.entityType; // "instructor" ou "user"
  
    const models = {
      instructor: InstructorModel,
      user: UserModel,
    };
  
    const model = models[entityType];
    if (!model) return res.status(400).json({ error: "Invalid entity type" });
  
    try {
      const entity = await model.findOne({ _id: id });
      if (!entity) return res.status(404).json({ error: "Entity not found" });
      res.json({ entity });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },


   findSingleEntity : async (req, res) => {
    const { id } = req.params;
    const instructor = await InstructorModel.findOne({ _id: id });
    const user = await UserModel.findOne({ _id: id });
  
    if (instructor) {
      try {
        if (!instructor) return res.status(404).json({ error: "Instructor not found" });
        return res.json({ result: instructor });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    } else if (user) {
      try {
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json({ result: user });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    } else {
      return res.status(400).json({ error: "Invalid entity type" });
    }
  },
  
  


  // IX) DELETE ONE SPECIFIC INSTRUCTOR
  deleteOneSpecificInstructor : (req, res) => {
    InstructorModel.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },

/*
deleteOneSpecificInstructor2: (req, res) => {
  const instructorId = req.params.id; // Obtenez l'ID de l'utilisateur à supprimer

  InstructorModel.findByIdAndDelete(instructorId)
    .then((deletedInstructor) => {
      if (!deletedInstructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      res.status(200).json({ message: "Instructor deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
}, */

  // find instructors by many ids
findInstructorsByManyId: (req, res) => {
//  const { ids } = req.body; // Récupère les IDs depuis le corps de la requête
  const { ids } = req.params.id; // Récupère les IDs depuis le corps de la requête

  // Vérifie si la liste d'IDs est vide
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Liste d'IDs vide." });
  }

  // Requête pour trouver les utilisateurs correspondants aux IDs
  InstructorModel.find({ _id: { $in: ids } })
    .then((instructors) => {
      // Si aucun utilisateur n'est trouvé
      if (!instructors || instructors.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      // Réponse avec les utilisateurs trouvés
      res.json({ instructors });
    })
    .catch((err) => {
      // Erreur lors de la requête
      res.status(400).json(err);
    });
},



  // VI) DELETE ALL
  deleteAllInstructors: (req, res) => {
    InstructorModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(400).json({ message: "Something went wrong", error: err })
      );
  },

  /*AJOUT*/ 




}  













