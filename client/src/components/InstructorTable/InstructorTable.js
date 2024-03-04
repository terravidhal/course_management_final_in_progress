import React, { useEffect, useState } from "react";
import './InstructorTable.css';
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { Table } from 'reactstrap';
import axios from "axios";
import Button from "../Button/Button";




const InstructorTable = (props) => {
  const { allInstructors, deleteInstructor } = props;


  return (
    <div className="InstructorTable">
      <table  >
         <thead>
          <tr>
            <th>Name of Instructor</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allInstructors.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td className="actions">
                  <Link className=""  to={"/instructors/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/instructors/edit/" + elt._id}>
                    edit
                  </Link> |&nbsp;
                  <Button  create="" update="" 
                   deletes="delete" 
                   isActive={true}
                   successCallback={() => deleteInstructor(elt._id)}/>
                  <button onClick={() => deleteInstructor(elt._id)}>remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};



export default InstructorTable;







































