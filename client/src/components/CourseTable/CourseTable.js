import React from "react";
import "./CourseTable.css";
import { Link } from "react-router-dom";



const CourseTable = (props) => {
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  console.log("userObjsId+++++++++", userObjsId);

  const { allCourses, deleteCourse } = props;
 


  return (
    <div className="CourseTable">
      <table >
         <thead>
          <tr>
            <th>Name of Course</th>
            <th>Level</th>
            <th>field</th>
            <th>Instructor</th>
            <th>Day Of Week</th>
            <th>type Of Course</th>
            <th>Link Meeting</th>
            <th>documents Link</th>
            <th>start Time</th>
            <th>end Time</th>
            <th>duration</th>
            <th>Status</th>
            <th>Students</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {  allCourses.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions">{elt.level}</td>
                <td  className="actions">{elt.field}</td>
                <td  className="actions">
                  { userObjsId === elt.instructor ? "Me" :
                     <Link className="btt blue"  to={"/instructorByCourse/" + elt.instructor}>
                       view instructor 
                     </Link>
                  }
                  </td>
                <td  className="actions">
                  {elt.dayOfWeek}
                </td>
                <td  className="actions">{elt.typeOfCourse}</td>
                <td  className="actions">{elt.linkMeeting}</td>
                <td  className="actions">{elt.documentsLink}</td>
                <td  className="actions">{elt.startTime}</td>
                <td  className="actions">{elt.endTime}</td>
                <td  className="actions">{elt.duration}</td>
                <td  className="actions">
                  <button
                      className={`${
                        elt.status === "pending"
                          ? "blue-btn"
                          : "red-btn"
                      }`}
                    > {elt.status}</button>
                </td>
                <td  className="actions">
                 <ul>
                    <Link className="btt brown"  to={"/studentsByCourse/" + elt._id}>
                       view students register
                     </Link>&nbsp;
                  </ul> 
                 
                  </td>
                <td className="actions">
                  <Link className="btt violet"  to={"/courses/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className="btt orange"  to={"/courses/edit/" + elt._id}>
                    edit
                  </Link> |&nbsp;
                  <button className="btt vert" onClick={() => deleteCourse(elt._id)}>remove</button>
                </td>
              </tr>
            );
          })} 
        </tbody>
      </table>
    </div>
  );
};





export default CourseTable;













