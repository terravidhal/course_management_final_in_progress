import React from "react";
import './InstructorTable.css';
import { Link } from "react-router-dom";





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
                <td className="actions middle">
                  <Link className="btt violet"  to={"/instructors/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className="btt orange"  to={"/instructors/edit/" + elt._id}>
                    edit
                  </Link> |&nbsp;
                  <button className="btt vert" onClick={() => deleteInstructor(elt._id)}>remove</button>
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







































