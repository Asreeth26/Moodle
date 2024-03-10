import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef,useState } from "react";

function Tdashboard(){// Extracting props passed from Login component
    const location = useLocation();
    const id1 = location.state.id; // Accessing the id1 prop from state
    const filename = useRef();
    const file = useRef()

    async function handleSubmit(event) {
        event.preventDefault();
        const filename1 = filename.current.value;
        const file1 = file.current.files[0];
        console.log(filename1, file1)
        const formData = new FormData();
        formData.append('fileName', filename1);
        formData.append('file', file1);

        try {
            const response = await fetch('http://localhost:8000/assignment', {
              method: 'POST',
              body: formData
            });
            if (response.ok) {
              console.log('File uploaded successfully');
            } else {
              console.error('Failed to upload file');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <>
        <div>
            <h1>Welcome, Teacher!</h1>
            <p>Your ID is: {id1}</p>
        </div>

        <form onSubmit={handleSubmit}>
                <label htmlFor="">FileName</label>
                <input type="text" name="filename" id="" ref={filename} /> <br /> <br />
                <input type="file" name="file" id="" ref={file} accept=".pdf"/> <br /> <br />
                <input type="submit" value="Submit" />
        </form>
        
        </>
        
        
    );
}

export default Tdashboard;