import React, { useEffect, useState } from "react";
import './StudentTable.css'
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Table } from 'reactstrap';
import axios from "axios";
import Button from "../Button/Button";




const StudentTable = (props) => {
  const { allStudents, deleteStudent } = props;


  return (
    <div className="StudentTable">
      <table  >
         <thead>
          <tr>
            <th>Name of Student</th>
            <th>Level</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allStudents.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions">{elt.levelStudent}</td>
                <td className="actions">
                  <Link className=""  to={"/students/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/students/edit/" + elt._id}>
                    edit
                  </Link> |&nbsp;
                  |&nbsp;
                  <Button CourseId={elt._id} create="" update="" 
                   deletes="delete" 
                   isActive={true}
                   successCallback={() => deleteStudent(elt._id)}/>
                  <button onClick={() => deleteStudent(elt._id)}>remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};



export default StudentTable;



























