import React from "react";
import { useLocation } from "react-router-dom";

function Tdashboard(){// Extracting props passed from Login component
    const location = useLocation();
    const id1 = location.state.id; // Accessing the id1 prop from state

    return (
        <div>
            <h1>Welcome, Teacher!</h1>
            <p>Your ID is: {id1}</p>
        </div>
    );
}

export default Tdashboard;