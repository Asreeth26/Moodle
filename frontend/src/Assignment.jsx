import { useEffect, useRef,useState } from "react";
import './Assignment.css';

function Assignment({id1}){
    const [assignment,setAssignment] = useState([]);
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
        <div>
        <h2>Assignment List</h2>
            <div className="container-overall">
                {assignment.map(file => (
                    <div className="container" key={file._id}>
                        <strong>Assignment:</strong> {file.fileName}
                        <br />
                        <strong>File Data:</strong>
                        <a href={`data:application/pdf;base64,${file.file}`} download={file.fileName}>
                            Download
                        </a>
                        <form onSubmit={(event) => handleSubmit(event, file._id)}>
                           <h3>Upload file</h3>
                            <input type="file" name="file" id="" ref={file} accept=".pdf"/> <br /> <br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>


                ))}
            </div>

        </div>
    );
}

export default Assignment;