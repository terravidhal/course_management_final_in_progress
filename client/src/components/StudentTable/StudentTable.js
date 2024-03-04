import React from "react";
import './StudentTable.css'
import { Link } from "react-router-dom";





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
                <td className="actions middle">
                  <Link className="btt violet"  to={"/students/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className="btt orange"  to={"/students/edit/" + elt._id}>
                    edit
                  </Link> |&nbsp;
                   &nbsp;
                  <button className="btt vert" onClick={() => deleteStudent(elt._id)}>remove</button>
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



























