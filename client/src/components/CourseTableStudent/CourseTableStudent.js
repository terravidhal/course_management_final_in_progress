import React, { useEffect, useState } from "react";
import "./CourseTableStudent.css";
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Table } from 'reactstrap';
//import Cookies from "universal-cookie";


const CourseTableStudent = (props) => {
  /*
  const cookies = new Cookies();
  const userObjsId = cookies.get("USER_OBJ")._id; */

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  console.log("userObjsId+++++++++", userObjsId);

  const { allCourses} = props;
 



  return (
    <div className="CourseTableStudent">
      <table striped >
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
                        <Link className=""  to={"/instructorByCourse/" + elt.instructor}>
                         view instructor create courses
                       </Link>
                     
                      {/* {elt.instructor}
                      <Link className=""  to={"/instructorByCourse/" + elt.instructor}>
                           view instructor create courses
                      </Link>&nbsp; */}
                      </td>
                    <td  className="actions">
                      {elt.dayOfWeek}
                      {/* {CheckDayOfWeekErrors(elt.dayOfWeek)} */}
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
                      <td className="actions">
                            <Link className=""  to={"/courses/" + elt._id}>
                              details
                            </Link> |&nbsp;
                      </td>
              </tr>
            );
          })} 
        </tbody>
      </table>
    </div>
  );
};





export default CourseTableStudent;














