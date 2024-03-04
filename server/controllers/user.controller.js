// ---------------------------------------------------
// CONTROLLER SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const UserModel = require("../models/user.model");

// 3) Exporting Controller functions
module.exports = {


  // I) REGISTER
  register: (req, res) => {

    if (req.body.keyCode !== process.env.KEY_CODE) {
      return res.status(400).json({ message: "Invalid keycode" });
    }

    const { keycode, ...userData } = req.body;

    // Remplacer req.body par l'objet userData
    req.body = userData;

     // Supprimer le keycode de l'objet req.body
     /*
      const modifiedBody = {
        name: req.body.name,
        email: req.body.email,
      //  keyCode: req.body.keyCode,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      }; */
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newUser = new UserModel( req.body);
    // ii) Enregistrer dans la base de données instance newUser
    newUser
      .save()
      .then((newUser) => {
        res
          .status(201)
          .json({ message: "User successfully created", user: newUser });
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


  // login
  login : async (req, res) => {
    const { email, password, tocken } = req.body;
  
    const secretToken = process.env.SECRET_TOCKEN; // Votre mot de passe secret

    try {
    
      if (tocken !== secretToken) {
        return res.status(400).json({ message: "Invalid tocken" });
      }
      // Recherchez l'utilisateur dans les deux collections
      const admin = await UserModel.findOne({ email });

     
       // verifie le password
       const isPasswordValid = await bcrypt.compare(password, admin.password);
  
       if (!isPasswordValid) {
         return res.status(400).json({ message: "Incorrect email or password" });
       }
     // Générez un jeton JWT
     const adminInfo = {
       _id: admin._id,
       name: admin.name,
      // email: admin.email,
       role: 'admin', // Ajoutez le rôle de l'utilisateur (admin)
     };
 
       const adminToken = jwt.sign(adminInfo, process.env.JWT_SECRET);
 
       const cookieOptions = {
         httpOnly: true,
         expires: new Date(Date.now() + 7200000), // expire dns 2h = 7200000 ms
       };
 
       res
         .cookie('usertoken', adminToken, cookieOptions)
         .json({
          message: "Successfully logged in",
          admin: adminInfo,
          adminToken: adminToken,
        });

    } catch (error) {
      res.status(400).json({ message: 'Something went wrong', error });
    }
  }, 


/*
  // IV) READ ALL
  findAllUsers: (req, res) => {
    UserModel.find({})
      .then((allUsers) => res.status(200).json(allUsers))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  // find user by id
  findOneSingleUser : (req, res) => {
    UserModel.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
          console.log("oneSingleUser",oneSingleUser);
            res.json({ oneSingleUser })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },


  // find users by many ids
findUsersByManyId: (req, res) => {
//  const { ids } = req.body; // Récupère les IDs depuis le corps de la requête
  const { ids } = req.params.id; // Récupère les IDs depuis le corps de la requête

  // Vérifie si la liste d'IDs est vide
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Liste d'IDs vide." });
  }

  // Requête pour trouver les utilisateurs correspondants aux IDs
  UserModel.find({ _id: { $in: ids } })
    .then((users) => {
      // Si aucun utilisateur n'est trouvé
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      // Réponse avec les utilisateurs trouvés
      res.json({ users });
    })
    .catch((err) => {
      // Erreur lors de la requête
      res.status(400).json(err);
    });
},





  // VI) DELETE ALL
  deleteAllUsers: (req, res) => {
    UserModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

 
  // VII) UPDATE EXISTING USER
updateExistingUser: (req, res) => {
  const userId = req.params.id; // Obtenez l'ID de l'utilisateur à mettre à jour
  const updatedData = req.body; // Les nouvelles données à mettre à jour

  UserModel.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},


// VIII) CREATE USER
createUser: (req, res) => {
  const userData = req.body; // Les données de l'utilisateur à créer

  UserModel.create(userData)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},


// IX) DELETE ONE SPECIFIC USER
deleteOneSpecificUser: (req, res) => {
  const userId = req.params.id; // Obtenez l'ID de l'utilisateur à supprimer

  UserModel.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
}, */

}  















