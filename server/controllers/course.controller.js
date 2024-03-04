const Course = require('../models/course.model');
 
const StudentModel = require("../models/student.model");


module.exports.findAllCourses = (req, res) => {
  console.log('req.role', req.role);
  console.log('req.Isinstrucor', req.isInstructor);
    Course.find()
        .sort({ name: 1 }) // Trie les auteurs par ordre alphabétique du nom d'utilisateur/ -1 implique ordre decroissant
        .then((allDaCourses) => {
            res.json({ allDaCourses })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
}

// find all courses by specific instructor
module.exports.findAllCoursesByInstructor = (req, res) => {
  const instructorId = req.params.id; // Supposons que l'id de l'instructeur est passé en tant que paramètre

  Course.find({ instructor: instructorId })
      .sort({ name: 1 }) // Trie les cours par ordre alphabétique du nom
      .then((coursesByInstructor) => {
          res.json({ coursesByInstructor });
      })
      .catch((err) => {
          res.status(400).json(err);
      });
};


// find all courses by specific student
module.exports.findAllCoursesByStudent = (req, res) => {
  const studentId = req.params.id; // Supposons que l'id de l'instructeur est passé en tant que paramètre

  Course.find({ students: studentId })
      .sort({ name: 1 }) // Trie les cours par ordre alphabétique du nom
      .then((coursesByStudent) => {
          res.json({ coursesByStudent });
      })
      .catch((err) => {
          res.status(400).json(err);
      });
}; //////


 
module.exports.findOneSingleCourse = (req, res) => {
    Course.findOne({ _id: req.params.id })
        .then(oneSingleCourse => {
          console.log("oneSingleCourse",oneSingleCourse);
            res.json({ oneSingleCourse })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });}
 

module.exports.createNewCourse = (req, res) => {
    Course.create(req.body)
        .then(newlyCreatedCourse => {
            res.json({ newlyCreatedCourse })
        })
        .catch((err) => {
            res.status(400).json(err) 
        });}


        
module.exports.createNewCourseWithMatchingStudents = async (req, res) => {
  try {
    // Validate input data (assuming you have a validation middleware)

    const { name, field, level,
      description,
        instructor,
        dayOfWeek,
        duration,
        students,
        linkMeeting,
        documentsLink,
        typeOfCourse,
        startTime,
        endTime,
     } = req.body;

    // Find matching students efficiently
    const matchingStudents = await StudentModel.find({
      fieldOfStudy: field,
      levelStudent: level
    }, { _id: true }) // Select only IDs for performance

    // Create the course with linked students
    const newCourse = new Course({
      name,
      field,
      level,
      description,
        instructor,
        dayOfWeek,
        duration,
        students,
        linkMeeting,
        documentsLink,
        typeOfCourse,
        startTime,
        endTime,
      students: matchingStudents.map(({ _id }) => _id)
    });

    // Save the course and students
    await newCourse.save();

    res.status(201).json({
      message: "Course created successfully",
      course: newCourse
    });
  } catch (error) {
    // Handle errors comprehensively (e.g., validation errors, database errors)
    console.error("error backend",error);
   /* res.status(error.statusCode || 500).json({
      message: "Error creating course",
      error: error.message || "An unexpected error occurred"
    }); */
    res.status(400).json({ error: error.message })
  }
};


 

module.exports.updateExistingCourse = (req, res) => {
    Course.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedCourse => {
            res.json({ updatedCourse })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });}
 
        
module.exports.deleteAnExistingCourse = (req, res) => {
    Course.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });}

        /*
module.exports.findInstructorBySpecificCourse = async (req, res) => {
          const { courseId } = req.params; // En supposant que vous obteniez l'ID du cours à partir du paramètre URL
        
          try {
            // Trouver le cours avec des étudiants peuplés
            const course = await Course.findById(courseId).populate('instructor');
        
            if (!course) {
              //return res.status(404).json({ message: 'Course not found' });
              return res.status(400).json({ message: 'Course not found' });
            }
        
            // Extraire et renvoyer les données des étudiants inscrits
            const instructor = course.instructor;
        
            res.json({ instructor: instructor });
          } catch (err) {
            console.error(err);
           // res.status(500).json({ message: 'An error occurred' });
            res.status(400).json({ message: 'An error occurred' });
          }
        }; */
       

 module.exports.findAllStudentsBySpecificCourse = async (req, res) => {
   const { courseId } = req.params; // En supposant que vous obteniez l'ID du cours à partir du paramètre URL
 
   try {
     // Trouver le cours avec des étudiants peuplés
     const course = await Course.findById(courseId).populate('students');
 
     if (!course) {
       //return res.status(404).json({ message: 'Course not found' });
       return res.status(400).json({ message: 'Course not found' });
     }
 
     // Extraire et renvoyer les données des étudiants inscrits
     const students = course.students.map(student => {
       return {
         _id: student._id,
         name: student.name, // Ou d'autres propriétés étudiantes souhaitées
         email: student.email, 
         fieldOfStudy: student.fieldOfStudy, 
         levelStudent: student.levelStudent, 
       };
     });
 
     res.json({ students });
   } catch (err) {
     console.error(err);
    // res.status(500).json({ message: 'An error occurred' });
     res.status(400).json({ message: 'An error occurred' });
   }
 };
     