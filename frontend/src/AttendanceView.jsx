import { useState,useEffect } from "react";
import "./Tdashboard.css";

function AttendanceView(){
    const [attend,setAttend] = useState([]);

    useEffect(()=>{

        fetch('http://localhost:8000/attendance')
        .then(response => response.json())
            .then(data => {
                console.log(data)
                setAttend(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });

    },[])

    return (
        <>
            {attend.map((file, index) => (
                <div className="containerTable" key={index}>
                    <h2>Attendance List</h2>
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">Student_id</div>
                            <div className="col col-2">Present</div>
                            <div className="col col-3">Total</div>
                            <div className="col col-4">Percentage</div>
                        </li>
                        {Object.keys(file).map((key, i) => {
                        if (!key.startsWith('_') && !key.startsWith('s') && !key.startsWith('t')) {
                            return (
                                <li className="table-row" key={i}>
                                    <div className="col col-1">{key}</div>
                                    <div className="col col-2">{file[key]}</div>
                                    <div className="col col-3">{file['total']}</div>
                                    <div className="col col-4">{(file[key] / file['total']) * 100}</div>
                                </li>
                            );
                        } else {
                            return null; // Skip rendering if key starts with '_', 's', or 't'
                        }
                    })}
                    </ul>
                </div>
            ))}
        </>
    );
    
}

export default AttendanceView;