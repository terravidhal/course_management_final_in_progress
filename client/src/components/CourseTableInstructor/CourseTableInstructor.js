import React, { useEffect, useState } from "react";
import "./CourseTableInstructor.css";
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Table } from 'reactstrap';
import axios from "axios";
import Button from '../../components/Button/Button';
//import Cookies from "universal-cookie";


const CourseTableInstructor = (props) => {
  /*
  const cookies = new Cookies();
  const userObjs = cookies.get("USER_OBJ") || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default'; */


  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjIsInstructor = userObjs.isInstructor || '';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  console.log("userObjsId+++++++++", userObjsId);

  const { allCourses, deleteCourse } = props;
 

  return (
    <div className="CourseTableInstructor">
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
                         "other instructor or admin"
                      }
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
                    <td  className="actions">
                     <ul>
                        <Link className=""  to={"/studentsByCourse/" + elt._id}>
                           view students register
                         </Link>&nbsp;
                      </ul> 
                     
                      </td>
                      <td className="actions">
                      { userObjsId === elt.instructor ? 
                          <div>
                            <Link className=""  to={"/courses/" + elt._id}>
                              details
                            </Link> |&nbsp;
                            <Link className=""  to={"/courses/edit/" + elt._id}>
                              edit
                            </Link> |&nbsp;
                            <Button  create="" update="" 
                             deletes="delete" 
                             isActive={true}
                             successCallback={() => deleteCourse(elt._id)}/>
                            <button onClick={() => deleteCourse(elt._id)}>remove</button>
                          </div>  : null }
                      </td>
              </tr>
            );
          })} 
        </tbody>
      </table>
    </div>
  );
};





export default CourseTableInstructor;














