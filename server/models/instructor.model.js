// ---------------------------------------------------
// MODEL SETUP - Instructor
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// 2) Creating Schema for Model (blueprint)
const InstructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Error: name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Error: email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Error: password is required"],
    },
    role: {
      type: String,
      default: "instructor",
      required: true,
    },
    isInstructor: { 
      type: String, 
      enum: ['false', 'true'],
      default: 'false', 
      required:[true, "isInstructor is required"],
    },
  },
  {
    timestamps: true,
  }
);


/**
 * Ensuite, nous devons utiliser du middleware pour ajouter une autre validation. Plus précisément, 
 * nous utiliserons  le "pre hook" et le ferons exécuter avant les validations. 
 */

// 3) Create virtual fields // Créer des champs virtuels

// 3.1) Create a |virtual space" to hold confirmPassword value
// 3.1)  Créer un espace |virtuel »(essentiellement des champs que nous ne voulons pas enregistrer dans MongoDB)
// pour contenir la valeur confirmPassword
InstructorSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword) // définir getter pour la propriété virtuelle « confirmPassword »
  .set((value) => (this._confirmPassword = value)); // définir le setter pour la propriété virtuelle « confirmPassword »

// 3.2) Comparer les mots de passe mais NE PAS enregistrer confirmPassword dans la base de données
InstructorSchema.pre("validate", function (next){ // "pre" -> avant de valider
  if(this.confirmPassword !== this.password ){
    this.invalidate("confirmPassword", "Error: passwords didn't match. Please try again.");
  }

  // Si les mots de passe correspondent, nous pouvons passer avec succès aux étapes de validation « normales »

  next(); /**Une caractéristique commune du Middleware est la fonction « next ». Essentiellement, lorsque notre 
             middleware a terminé tout ce qu'il doit faire, nous devons l'appeler pour que le prochain middleware 
             ou la prochaine fonction (dans ce cas, les validations normales) s'exécutent. 
           */
})
// REMARQUE : évitez de réécrire la fonction de rappel à l'aide d'une fonction fléchée car elle 
// n'aura pas la portée correcte pour this.


//Bcrypt // install --> npm i bcrypt
/**
 * Nous voulons nous assurer que nos mots 
 * de passe ne sont pas enregistrés sous forme 
 * de texte réel. Bcrypt est une bibliothèque très 
 * populaire pour le hachage de mots de passe et également 
 * facile à installer pour nous. En utilisant NPM, nous 
 * pouvons l'installer avec un simple "npm i bcrypt".

Ensuite, nous pouvons utiliser un autre "pre hook", cette fois avant que l'utilisateur ne soit 
enregistré dans la base de données. 
 */

// 3.3) Hacher le mot de passe avant de l’enregistrer dans la base de données > personne ne peut 
//      accéder au mot de passe réel de l’utilisateur
InstructorSchema.pre("save", function (next) {  // "pre" -> avant de valider
  bcrypt.hash(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
})




// 5) Création d’un modèle à l’aide d’un schéma
const InstructorModel = mongoose.model("Instructor", InstructorSchema);

// 6) Exportation du modèle
module.exports = InstructorModel;
