import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef,useState } from "react";

function Student() {
  // Extracting props passed from Login component
    const location = useLocation();
    const id1 = location.state.id; // Accessing the id1 prop from state
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/material')
            .then(response => response.json())
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    return (
        <>
            <div>
            <h2>Material List</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id}>
                        <strong>Filename:</strong> {file.fileName}
                        <br />
                        <strong>File Data:</strong>
                        <a href={`data:application/pdf;base64,${file.file}`} download={file.fileName}>
                            Download
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default Student;

