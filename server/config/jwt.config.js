// ---------------------------------------------------
// CONFIG SETUP - Authentication
// ---------------------------------------------------

// 1) Importing External Libraries
const jwt = require("jsonwebtoken");

// 1) Importing model course
// const Course = require('../models/course.model');

const StudentModel = require("../models/student.model");

const InstructorModel = require("../models/instructor.model");

const UserModel = require("../models/user.model");

/*
 // Définir les rôles et les permissions
const roles = {
  admin: {
    permissions: ["*"], // Accès complet
  },
  student: {
    permissions: ["read:profile", "update:profile", "read:courses", "join:courses"],
  },
  teacher: {
    permissions: ["read:courses", "create:courses", "update:courses", "manage:enrollments", "grade:assignments"],
  },
};

// Middleware de vérification des permissions
function hasPermission(permission) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles[userRole].permissions.includes(permission)) {
      return res.status(403).json({ message: "Vous n'avez pas les permissions nécessaires" });
    }
    next();
  };
}  */

/*
// Route protégée par la permission "read:profile"
app.get("/api/profile", hasPermission("read:profile"), (req, res) => {
  // Accès autorisé uniquement aux utilisateurs avec la permission "read:profile"
  res.json({ message: "Votre profil" });
});

// Route protégée par la permission "create:courses"
app.post("/api/courses", hasPermission("create:courses"), (req, res) => {
  // Accès autorisé uniquement aux utilisateurs avec la permission "create:courses"
  // ...
}); */

// 2) Exporting a function for checking authentication
module.exports = {
 /* authenticate1: (req, res, next) => {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          res.status(401).json({ verified: false });
        } else {
          console.log("You are authenticated!");
          next();
        }
      }
    );
  }, */

  authenticate: (req, res, next) => {
    jwt.verify( req.cookies.usertoken, process.env.JWT_SECRET, async(err, decodedToken) => {
      const user = await UserModel.findOne({_id: decodedToken._id})
      const student = await StudentModel.findOne({_id: decodedToken._id})
      const instructor = await InstructorModel.findOne({_id: decodedToken._id})
      console.log(" decodedToken._id", decodedToken._id);
        if (err) {
          res.status(401).json({ verified: false, message : 'please make you are logged in' });
        } else {
          if (user) {
            console.log("user", user);
            req.role = user.role;
            console.log("You are authenticated!");
            next();
          }else if(student){
            console.log("student", student);
            req.role = student.role;
            console.log("You are authenticated!");
            next();
          }else if(instructor){
            console.log("instructor", instructor);
            req.role = instructor.role;
            req.isInstructor = instructor.isInstructor;
            console.log("You are authenticated!");
            next();
          }else{
            console.log("null");
          }
          //console.log("You are authenticated!");
         // next();
        }
      }
    );
  },

  

  checkPermissions: (...role) => {
    return (req, res, next) =>{
      if (!role.includes(req.role)) {
        const error =  res.status(401).json({ verified: false, message : 'you do not have permission to perform this action' });
        next(error);
       //next('route');
      } else {
        // Autoriser l'accès au prochain middleware
        next();
      }
    }
  },

  // Middleware pour vérifier le jeton d'accès
  /*
 checkAdminToken : (req, res, next) => {
  const { tocken } = req.query;
  const secretToken = "hostingerK555"; // Votre mot de passe secret

  if (tocken === secretToken) {
      // Jeton valide, autorisez l'accès
      next();
  } else {
      const error =  res.status(401).json({ verified: false, message : 'you do not have permission to perform this action' });
      next(error);
  }
} , */



/*
  authenticate2: (req, res, next) => {
    const tokenNames = ['studenttoken', 'instructortoken', 'usertoken'];
    const validToken = tokenNames.find((tokenName) => req.cookies[tokenName]);
  
    if (!validToken) {
      // No valid token found, return 401 unauthorized
      return res.status(401).json({ verified: false });
    }
  
    jwt.verify(
      req.cookies[validToken],
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          // Token verification failed, return 401 unauthorized
          return res.status(401).json({ verified: false });
        } else {
          console.log("You are authenticated!");
          // Attach the payload to the request object for access in other routes
          req.user = payload;
          next();
        }
      }
    );
  }, */

 /**
  * Dans le middleware modifié que vous avez fourni, la ligne req.user = payload;répond à deux objectifs principaux : 

1. Joindre des informations utilisateur à l'objet de requête : 

    Cette ligne attribue le vérifié payload(qui contient des informations utilisateur codées dans le JWT) au req.userpropriété de l’objet de requête.
    En stockant la charge utile dans req.user, vous le rendez facilement accessible dans n'importe quel gestionnaire de route qui suit le middleware.
    Cela élimine le besoin d'accéder et de vérifier à plusieurs reprises le jeton dans chaque route protégée, améliorant ainsi l'efficacité et la lisibilité du code.

2. Simplification de l'accès aux informations des utilisateurs : 

    Au lieu d'extraire manuellement les détails utilisateur spécifiques de la charge utile de chaque itinéraire, vous pouvez désormais y accéder directement via req.user.
    Par exemple, si la charge utile inclut l'ID de l'utilisateur comme _id, vous pouvez le récupérer en utilisant req.user._id.
    Cette approche favorise un code plus propre et plus concis dans vos itinéraires protégés.

Note: 

    Le payloadLa structure dépend de la façon dont vous avez défini les informations utilisateur dans votre jwt.signappeler pendant la connexion.
    Assurez-vous d'inclure les détails utilisateur pertinents dans la charge utile pour faciliter l'accès à vos itinéraires.

  */






  
  /*
  verifyRole: (roles) => {
    return (req, res, next) => {
      // Décoder le jeton JWT
      const token = req.cookies.usertoken;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Vérifier si l'utilisateur a le rôle requis
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Vous n'avez pas les autorisations nécessaires pour effectuer cette action." });
      }

      // Autoriser l'accès au prochain middleware
      next();
    };
  },
  // Nouveau middleware pour vérifier l'instructeur du cours
  verifyInstructor: async (req, res, next) => {
    try {
      const _id = req.params.id; // Récupérer l'ID du cours à partir des paramètres de la requête
      const decoded = jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET); // La variable decoded contient l'objet JSON décodé du jeton JWT. Cet objet contient les informations de l'utilisateur, telles que son ID, son nom, son rôle

      // Trouver le cours
      const course = await Course.findById(_id);
      if (!course) {
        return res.status(404).json({ message: "Cours non trouvé" });
      } */


      // Vérifier si l'utilisateur est l'instructeur du cours ou l'administrateur
     /* if (course.instructor !== decoded._id ) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce cours." });
      }*/
      /*
      if (decoded.role !== "admin" || course.instructor !== decoded._id ) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce cours." });
      }

      // Autoriser l'utilisateur à modifier le cours
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la vérification de l'instructeur" });
    }
  }, */
};



/**
 * expliquer les differnts 'statuts' rs.status(500)
 */