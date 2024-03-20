import React from "react";
import "./Student.css";
import profile from "./assets/profile.png";
import { useLocation } from "react-router-dom";
import { useEffect, useRef,useState } from "react";
import Materials from "./Materials";
import Assignment from "./Assignment";

function Student() {
  // Extracting props passed from Login component
    const location = useLocation();
    const id1 = location.state.id; // Accessing the id1 prop from state
    
   const [assignment,setAssignment] = useState(false);
   const [materials,setMaterials] = useState(false);
    const file = useRef();
    const handleAssignmentClick = () => {
        setAssignment(true);
        setMaterials(false);
    };

    const handleMaterialsClick = () => {
        setMaterials(true);
        setAssignment(false);
    };

   const goDefault = () => {
         setAssignment(false);
         setMaterials(false);
   }

    

    return (
        <div className="main-student">
        <div className="N">
            <nav className="N-inner">
            <ul className="N-inner-items">
                        <span onClick={goDefault}>Home</span><br />
                        <span onClick={handleAssignmentClick}>Assignment</span><br />
                        <span onClick={handleMaterialsClick}>Materials</span><br />
                        <span ><a href="/">Sign Out</a></span>
            </ul>
            </nav>
        </div>
        <div className="main-student-inner">
            <div className="heading">
                <img src={profile} alt="student" />
                <h1>Welcome,{id1}!</h1>
            </div>
        {assignment && <Assignment id1 ={id1} />}
        {materials && <Materials />}
        </div>
        </div>
    );
}

export default Student;

