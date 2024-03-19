import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef,useState } from "react";

function Student() {
  // Extracting props passed from Login component
    const location = useLocation();
    const id1 = location.state.id; // Accessing the id1 prop from state
    const [files, setFiles] = useState([]);
    const [assignment,setAssignment] = useState([]);
    const file = useRef();

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

    useEffect(()=>{

        fetch('http://localhost:8000/assignment')
        .then(response => response.json())
            .then(data => {
                setAssignment(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });

    },[])

    async function handleSubmit(event,fileId){
        event.preventDefault();

        const fileInput = event.target.querySelector('input[type="file"]');

        const formData = new FormData();
        formData.append('id',fileId);
        formData.append('sid', id1);
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch('http://localhost:8000/assign_upload', {
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

        <div>
        <h2>Assignment List</h2>
            <ul>
                {assignment.map(file => (
                    <li key={file._id}>
                        <p>{file._id}</p>
                        <strong>Filename:</strong> {file.fileName}
                        <br />
                        <strong>File Data:</strong>
                        <a href={`data:application/pdf;base64,${file.file}`} download={file.fileName}>
                            Download
                        </a>
                        <form onSubmit={(event) => handleSubmit(event, file._id)}>
                           <h1>Upload file</h1>
                            <input type="file" name="file" id="" ref={file} accept=".pdf"/> <br /> <br />
                            <input type="submit" value="Submit" />
                        </form>
                    </li>


                ))}
            </ul>

        </div>
        </>
    );
}

export default Student;

