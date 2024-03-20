import { useEffect, useRef,useState } from "react";
function Materials(){
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
    return(
        <div className="Materials">
            <h2>Material List</h2>
            <table>
                <th className="first-column"><strong>Filename</strong></th>
                <th className="second-column"><strong>File Data</strong></th>
                {files.map(file => (
                    <tr key={file._id}>
                        <td className="first-column" > {file.fileName}</td>
                        <td className="second-column">
                        <a href={`data:application/pdf;base64,${file.file}`} download={file.fileName}>
                            Download
                        </a>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Materials;   