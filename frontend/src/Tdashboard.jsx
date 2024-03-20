import React from "react";
import "./Tdashboard.css";
import Attendance from "./Attendance";
import AttendanceView from "./AttendanceView";
import { useLocation } from "react-router-dom";
import { useEffect, useRef,useState } from "react";

function Tdashboard(){// Extracting props passed from Login component
    const [files, setFiles] = useState([]);
    const [assignment,setAssignment] = useState(false);
    const [materials,setMaterials] = useState(false);
    const [attendance,setAttendance] = useState(false);
    const [home,setHome] = useState(true);
    const [attenList,setAttenList] = useState(false);
    const [assList,setAssList] = useState(false);

    const goBackT = () => {
        setHome(true);
        setAttenList(false);
        setAssList(false);
    }
    const goToAssList = () => {
        setHome(false);
        setAttenList(false);
        setAssList(true);
    }
    const goToAttenList = () => {
        setHome(false);
        setAttenList(true);
        setAssList(false);
    }
    

    useEffect(() => {
        fetch('http://localhost:8000/assignment')
            .then(response => response.json())
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);
    const location = useLocation();
    const id1 = location.state.id; // Accessing the id1 prop from state
    const filename = useRef();
    const file = useRef()
/////////////////////////////////////////////////////////////   assignment submission
const showAtt = () => {
    setAttendance(true);
    console.log(attendance);
    setAssignment(false);
    setMaterials(false);

}
    const showAss = () => {
        setAssignment(true);
        setMaterials(false);
        setAttendance(false);
    }
    async function handleSubmitAssignment(event) {
        event.preventDefault();
        const filename1 = filename.current.value;
        const file1 = file.current.files[0];
        console.log(filename1, file1)
        const formData = new FormData();
        formData.append('id',id1);
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
///////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////// Material Submission
    const showMat = () => {
        setMaterials(true);
        setAssignment(false);
        setAttendance(false);
    }
async function handleSubmitMaterial(event) {
    event.preventDefault();
    const filename1 = filename.current.value;
    const file1 = file.current.files[0];
    console.log(filename1, file1)
    const formData = new FormData();
    formData.append('fileName', filename1);
    formData.append('file', file1);

    try {
        const response = await fetch('http://localhost:8000/material', {
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

///////////////////////////////////////////////////////////////
    return (
        <div className="tmain">
        
            <div className="N">
                <nav className="N-inner">
                <ul className="N-inner-items">
                            <span onClick={goBackT}>Home</span><br />
                            <span onClick={goToAssList}>Assigment List</span><br />
                            <span onClick={goToAttenList}>Attendance List</span><br />
                            <span ><a href="/teacher">Sign Out</a></span>
                </ul>
                </nav>
            </div>
            <div className="tmain-inner">
                <div >
                    <h1>Welcome, Teacher!</h1>
                    <p>Your ID is: {id1}</p>
                </div>
                {home && 
                <div className="ListOptions">
                    <div className="Option">
                        <span onClick={showAss} className="clickable"><h2>Post Assignment</h2></span>  
                        { assignment && 
                                        <form onSubmit={handleSubmitAssignment}>
                                                <label htmlFor="">FileName</label>
                                                <input type="text" name="filename" id="" ref={filename} /> <br /> <br />
                                                <input type="file" name="file" id="" ref={file} accept=".pdf"/> <br /> <br />
                                                <input type="submit" value="Submit" />
                                        </form>
                        }   
                    </div>
                    <div className="Option">
                        <span onClick={showMat} className="clickable"><h2>Post Material</h2></span>
                        { materials &&
                                        <form onSubmit={handleSubmitMaterial}>
                                                <label htmlFor="">FileName</label>
                                                <input type="text" name="filename" id="" ref={filename} /> <br /> <br />
                                                <input type="file" name="file" id="" ref={file} accept=".pdf"/> <br /> <br />
                                                <input type="submit" value="Submit" />
                                            </form>
                        }
                    </div>
                    <div className="Option">
                        <span onClick={showAtt} className="clickable"><h2>Post Attendance</h2></span>
                        {attendance && <Attendance/>}
                    </div>
                </div> }
                { assList &&
                <div>
                    <h2>Assignments List</h2>
                    <ul>
                    {files.map((file, index) => (
                    <li key={index}>
                        {Object.keys(file).splice(2).map((key, i) => (
                            <div key={i}>
                                {key.startsWith('sid') ? ( // If key starts with 'sid'
                                    <h1>{file[key]}</h1>
                                ) : key.startsWith('fileBuffer') || key.startsWith('file') && key.length === 4 ? ( // If key starts with 'filebuffer'
                                <a href={`data:application/pdf;base64,${file[key]}`} download='download.pdf'>
                                Download
                            </a>
                                ) : ( // Default case, render as text
                                    <span><strong>{key}:</strong> {file[key]}</span>
                                )}
                        </div>
                        ))}
                    </li>
                    ))}
                    </ul>
                </div>
                }
                { attenList &&
                    <AttendanceView/> }
        
            </div>
        </div>
        
    );
}

export default Tdashboard;