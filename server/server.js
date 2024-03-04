// ---------------------------------------------------
// INITIALISATION DU SERVEUR ET CONFIGURATION DU SERVEUR
// ---------------------------------------------------

// 0) charger toutes nos clés et valeurs du fichier .env en mémoire
// (nous pouvons y accéder via un objet appelé « process.env »)
require("dotenv").config();


// 1) Importations de bibliothèques tierces
const express = require("express");
const cors = require('cors')    /* This is new */
const cookieParser = require('cookie-parser'); /* This is new */ // pour pouvoir lire les cookies

// 2) Intégration d’une instance Express ('app') et définition de variables auxiliaires
const app = express();


// 3) Activer les paramètres pour pouvoir lire JSON et analyser les données encodées en url dans les requêtes
app.use(express.json(), express.urlencoded({ extended: true }));


// 4)Changez app.use(cors()) par celui ci-dessous
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));  /* This is new */



// 5) Intégration d’un middleware d’analyse de cookies à une instance Express ('app')
app.use(cookieParser());
    

// 6) Initialisation de la connexion à la base de données NoSQL (MongoDB) à l’aide de l’interface Moongose
require("./config/mongoose.config");



// 7) Importer des routes d’API et les incorporer à l’instance 'app'
   // a) courses
   const AllMyCoursesRoutes = require("./routes/course.routes");
   AllMyCoursesRoutes(app);
   // b) user
   const AllMyUsersRoutes = require("./routes/user.routes");
   AllMyUsersRoutes(app);
   // c) Students
   const AllMyStudentsRoutes = require("./routes/student.routes");
   AllMyStudentsRoutes(app);
   // c) Instructors
   const AllMyInstructorsRoutes = require("./routes/instructor.routes");
   AllMyInstructorsRoutes(app);
   // c) authentification
   const AllMyAuthRoutes = require("./routes/auth.routes");
  AllMyAuthRoutes(app);


// 8) Exécution de l’instance du serveur Express dans le port sélectionné
app.listen(8000, () => console.log("The server is all fired up on port 8000"));