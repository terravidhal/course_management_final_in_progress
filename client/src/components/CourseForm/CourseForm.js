import React, { useEffect, useState } from 'react';
import './CourseForm.css';
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button';
import axios from 'axios';



const CourseForm = (props) => {
  
    
  const { initialName, 
          initialLevel,
          initialDescription,
          initialField,
          initialLinkMeeting,
          initialTypeOfCourse,
          initialDocumentsLink,
          initialInstructorId,
          initialadminId,
          initialInstructId,
          initialDayOfWeek,
          initialStartTime,
          initialEndTime,
          initialDuration,
          initialStudents,
          initialAvailableStudents,
          requestPostorPatch,  // requestPostorPatch (lifting state)
          setErrors, // setErrors
          errors ,
          errors2 ,
          create,
          update,
          deletes,
          iscreatePage,
          userObjsRole
        } = props;
  const [name, setName] = useState(initialName);  // initialName = ""
  const [level, setLevel] = useState(initialLevel);  
  const [description, setDescription] = useState(initialDescription);
  const [field, setField] = useState(initialField);
  const [linkMeeting, setLinkMeeting] = useState(initialLinkMeeting);
  const [typeOfCourse, setTypeOfCourse] = useState(initialTypeOfCourse);
  const [documentsLink, setDocumentsLink] = useState(initialDocumentsLink);
  const [instructor, setInstructor] = useState(initialInstructorId);
  const [adminId, setAdminId] = useState(initialadminId);
  const [instructId, setInstructId] = useState(initialInstructId);
  const [dayOfWeek, setDayOfWeek] = useState(initialDayOfWeek);
  const [duration, setDuration] = useState(initialDuration);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
//  
const [loaded, setLoaded] = useState(false); // check if the data is available
const [students, setStudents] = useState(initialStudents);// initialStudents => []
const [availableStudents, setavailableStudents] = useState(initialAvailableStudents);// initialAvailableStudents => []

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false); // state button submit
  


  // get all  students
useEffect(() => {
  axios
    .get("http://localhost:8000/api/students",{withCredentials: true})
    .then((res) => {
      console.log('t+++++', res.data);
      setavailableStudents(res.data);
      setLoaded(true); // data available => set "true"
    })
    .catch((err) => console.log('err all users role students : ',err));
}, []); // important!  //students
  
// Fonctions de gestion de la sélection des étudiants
//add students
  const handleStudentSelection = (e,studentId) => {
    e.preventDefault();
    setStudents([...students, studentId]);
  };

  // remove students
  const handleStudentRemoval = (e,studentId) => {
    e.preventDefault();
    setStudents(students.filter((s) => s !== studentId));
  };



  useEffect(() => {
    SubmitButton();
    console.log('new Date(dayOfWeek).getDay()', new Date(dayOfWeek).getTime());
    console.log('new Date().getDay()', new Date().getTime());
    console.log('dayOfWeek', dayOfWeek);
  }, [name,level,description, 
     duration, dayOfWeek, startTime,endTime
    ]);


  const SubmitButton =  () =>{
    if (name.length < 3 || name.length > 20) {
      setIsActive(false);
    } else if (parseInt(level) < 1 || parseInt(level) > 5) {
      setIsActive(false);
    } else if (description.length < 10) {
      setIsActive(false);
    } else if (parseInt(duration) < 30 || parseInt(duration) > 240) {
      setIsActive(false);
    } else if (new Date(dayOfWeek).getDate() < new Date().getDate() || dayOfWeek === '' ) {
      setIsActive(false);
    } else if (new Date(0, 0, 0, parseInt(startTime.split(":")[0]), parseInt(startTime.split(":")[1]))  < new Date(0, 0, 0, parseInt("08:00".split(":")[0]), parseInt("08:00".split(":")[1])) ||
               new Date(0, 0, 0, parseInt(startTime.split(":")[0]), parseInt(startTime.split(":")[1]))  >= new Date(0, 0, 0, parseInt(endTime.split(":")[0]), parseInt(endTime.split(":")[1])) || startTime === '') {
      setIsActive(false);  
    } else if (new Date(0, 0, 0, parseInt(endTime.split(":")[0]), parseInt(endTime.split(":")[1])) <= new Date(0, 0, 0, parseInt("08:00".split(":")[0]), parseInt("08:00".split(":")[1]))  ||
               new Date(0, 0, 0, parseInt(endTime.split(":")[0]), parseInt(endTime.split(":")[1]))  > new Date(0, 0, 0, parseInt("18:00".split(":")[0]), parseInt("18:00".split(":")[1]))  || endTime === '') {
      setIsActive(false);  
    } else {
      setIsActive(true);
    }
    };


  const onSubmitHandler =  async(e) => {
      e.preventDefault();

      requestPostorPatch({ 
        name,
        level,
        description,
        instructor,
        dayOfWeek,
        duration,
        students,
        linkMeeting,
        documentsLink,
        field,
        typeOfCourse,
        startTime,
        endTime,
      }); 

      console.log("errors:::::::", errors);
  }
  
 //VALIDATIONS FRONT-END
  const handleNameErrors = (e) =>{ 
    setName(e.target.value);
   
   if (3 > e.target.value.length || e.target.value.length > 20 ) {
      setErrors({...errors,name:{ message: "Course names must be at least 3 characters long and no more than 20 characters long" }});
   } 
   else  {
      setErrors({...errors,name:{ message: "" }});
   }
 } 

  const handleLevelErrors = (e) =>{ 
    setLevel(e.target.value);
    
    if (1 > parseInt(e.target.value) || parseInt(e.target.value) > 5) {
       setErrors({...errors,level:{ message: "level must be a minimum of 1  and no more than 5 long" }});
    } 
    else  {
       setErrors({...errors,level:{ message: "" }});
    }
  } 


  const handleDescriptionErrors = (e) =>{ 
    setDescription(e.target.value);
   
   if (e.target.value.length < 10) {
      setErrors({...errors,description:{ message: "Descriptions must be at least 10 characters long" }});
   } 
   else  {
      setErrors({...errors,description:{ message: "" }});
   }
 } 

  const handleDayOfWeekErrors = (e) =>{ 
    setDayOfWeek(e.target.value);
    const currentDate = new Date().getDate();
    const selectedDate = new Date(e.target.value).getDate(); 

   // console.log('new Date() === new Date("2024-03-02")',new Date() === new Date("2024-03-03"));
   
   if (selectedDate < currentDate) {
      setErrors({...errors,dayOfWeek:{ message: "La date doit être supérieure ou égale à la date actuelle" }});
   } 
   else  {
      setErrors({...errors,dayOfWeek:{ message: "" }});
   }
 } 

  const handleStartTimeErrors = (e) =>{ 
    setStartTime(e.target.value); 

    const heure1 = "08:00";
    const heure2 = e.target.value;
    const heure3 = endTime;
    const currentTime = new Date(0, 0, 0, parseInt(heure1.split(":")[0]), parseInt(heure1.split(":")[1]));
    const currentTime2 = new Date(0, 0, 0, parseInt(heure3.split(":")[0]), parseInt(heure3.split(":")[1]));
    const selectedTime = new Date(0, 0, 0, parseInt(heure2.split(":")[0]), parseInt(heure2.split(":")[1]));

  //  const currentTime = Date.parse("08:00");
   // const selectedTime = Date.parse(e.target.value);
   console.log('endTime',endTime);
   
   if (selectedTime < currentTime || selectedTime >= currentTime2 ) {
      setErrors({...errors,startTime:{ message: "startTime doit être supérieure ou égale à 08:00 et doit être inférieure au endTime" }});
   } 
   else  {
      setErrors({...errors,startTime:{ message: "" }});
   }
 } 

  const handleEndTimeErrors = (e) =>{ 
    setEndTime(e.target.value); 
    const heure1 = "18:00";
    const heure2 = e.target.value;
   // const heure3 = "08:00";
    const heure3 = startTime;
    const currentTime = new Date(0, 0, 0, parseInt(heure1.split(":")[0]), parseInt(heure1.split(":")[1]));
    const currentTime2 = new Date(0, 0, 0, parseInt(heure3.split(":")[0]), parseInt(heure3.split(":")[1]));
    const selectedTime = new Date(0, 0, 0, parseInt(heure2.split(":")[0]), parseInt(heure2.split(":")[1]));

 
   
   if (selectedTime <= currentTime2 || selectedTime > currentTime ) {
      setErrors({...errors,endTime:{ message: "endTime doit être supérieure à startime et inférieure ou égale à 18:00" }});
   } 
   else  {
      setErrors({...errors,endTime:{ message: "" }});
   }
 } 

  



const handleDurationErrors = (e) =>{ 
  setDuration(e.target.value);
  
  if (30 > parseInt(e.target.value) || parseInt(e.target.value) > 240) {
     setErrors({...errors,duration:{ message: "Duration must be a minimum of 30 minutes  and no more than 240 minuted long" }});
  } 
  else  {
     setErrors({...errors,duration:{ message: "" }});
  }
}






  return (
      <div className="CourseForm">
        <form onSubmit={onSubmitHandler}>
            <div className="form-left">

               { errors2.errors? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors2.errors}</p>
                      : null
               } 
              <div className='field'>
               <label>Name of courses :</label><br/>
               <input type="text" value={name} onChange = {(e)=>handleNameErrors(e)}/>
               { errors.name ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.name.message}</p>
                      : null
               } 
              </div>

              <div className='field'>
               <label>Level :</label><br/>
               <input type="number" value={level} onChange = {(e)=>handleLevelErrors(e)}/>
              { errors.level ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.level.message}</p>
                      : null
               } 
              </div>


              <div className='field'>
               <label>Description :</label><br/>
               <input type="text" value={description} onChange = {(e)=>handleDescriptionErrors(e)}/>
               { errors.description ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.description.message}</p>
                      : null
               }
              </div>


              <div className='field'>
               <label>Instructor :</label><br/>
               <input type="hidden" value={instructor}  onChange = {(e)=>setInstructor(e.target.value)}/>
               {
                iscreatePage === false ?
               <select name="" id="" value={instructor} onChange = {(e)=>setInstructor(e.target.value)}>
                 <option value={adminId}>Me</option>
                    {
                    userObjsRole === 'admin' && adminId !== instructId ?
                   <option value={instructId}>Instructor</option> : null } 
               </select> : null }
              </div>


              <Button courseId="" create={create} update={update} 
                deletes={deletes}
                isActive={isActive}
                successCallback={() => console.log('form')}/>

              </div>

            <div className="form-right">
             
              <div className='field'>
               <label>DayOfWeek :</label><br/>
               {/* <input type="date" value={dayOfWeek} onChange = {(e)=>setDayOfWeek(e.target.value)}/> */}
               <input type="date" value={dayOfWeek} onChange = {(e)=>handleDayOfWeekErrors(e)}/>
               { errors.dayOfWeek ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.dayOfWeek.message}</p>
                      : null
               }
              </div>

              <div className='field'>
               <label>Type of course :</label><br/>
               <select name="" id="" value={typeOfCourse} onChange = {(e)=>setTypeOfCourse(e.target.value)}>
                   <option value="presential">presential</option>
                   <option value="online">online</option>
               </select>
               { errors.typeOfCourse ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.typeOfCourse.message}</p>
                      : null
               }
              </div>

              <div className='field'>
               <label>Link Meeting :</label><br/>
               <input type="text" value={linkMeeting} onChange = {(e)=>setLinkMeeting(e.target.value)}/>
              </div>

              <div className='field'>
               <label>Documents Link :</label><br/>
               <input type="text" value={documentsLink} onChange = {(e)=>setDocumentsLink(e.target.value)}/>
              </div>

              <div className='field'>
               <label>Field :</label><br/>
               <select name="" id="" value={field} onChange = {(e)=>setField(e.target.value)}>
                   <option value="Web developement">Web developement</option>
                   <option value="data analyst">data analyst</option>
                   <option value="ux design">ux design</option>
               </select>
               { errors.field ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.field.message}</p>
                      : null
               }
              </div>


              <div className='field'>
               <label>start Time :</label><br/>
               {/* <input type="time" value={startTime} onChange = {(e)=>setStartTime(e.target.value)}/> */}
               <input type="time" value={startTime} onChange = {(e)=>handleStartTimeErrors(e)}/>
               { errors.startTime ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.startTime.message}</p>
                      : null
               }
              </div>

              <div className='field'>
               <label>End Time :</label><br/>
               {/* <input type="time" value={endTime} onChange = {(e)=>setEndTime(e.target.value)}/> */}
               <input type="time" value={endTime} onChange = {(e)=>handleEndTimeErrors(e)}/>
               { errors.endTime ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.endTime.message}</p>
                      : null
               }
              </div>

              <div className='field'>
               <label>Duration :</label><br/>
               <input type="number" value={duration} onChange = {(e)=>handleDurationErrors(e)}/>
               { errors.duration ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.duration.message}</p>
                      : null
               }
              </div>


              {
                iscreatePage === false ?
                 <div className='field'>
                 <label>Students:</label><br/>
                 {loaded === true ? 
                 <ul>
                    { availableStudents.map((elt) => (
                      <li key={elt._id} >
                        {elt.name}
                        {/* {console.log('availableStudents****', availableStudents)}
                        {console.log('students****', students)}
                        {console.log('students****', students.some((elt2) => elt2=== elt._id))} */}
                        
                       {students.some((elt2) => elt2 === elt._id) ? (
                          <button onClick={(e) => handleStudentRemoval(e,elt._id)}>Remove</button>
                        ) : (
                          <button onClick={(e) => handleStudentSelection(e,elt._id)}>Add</button>
                        )} 
                        {/* Cette partie vérifie si un étudiant ( s) dans le selectedStudents le tableau 
                        a un _id qui correspond à celui de l'étudiant actuel _id.
                        Le somela méthode renvoie true si au moins un élément du tableau remplit 
                        la condition, et false sinon */}
                      </li>
                    )) 
                   }
                 </ul>
                 : null }
                 </div>
                 :
                 null
              }

            </div>
        </form>
      </div>
   )
};

export default CourseForm;























