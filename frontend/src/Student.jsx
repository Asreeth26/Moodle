import React from "react";
import { useLocation } from "react-router-dom";

function Student() {
  // Extracting props passed from Login component
    const location = useLocation();
    const id1 = location.state.id; // Accessing the id1 prop from state

    return (
        <div>
            <h1>Welcome, Student!</h1>
            <p>Your ID is: {id1}</p>
        </div>
    );
}

export default Student;

