import { useEffect, useState } from "react"

function Attendance(){

    const [attend,setAttend] = useState([])
    const [presentKeys, setPresentKeys] = useState([]);

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

    

    const handleSubmit = async(event) => {
        event.preventDefault();
        const present = [];
        attend.forEach((file) => {
          Object.keys(file).forEach((key) => {
            // Find the checkbox corresponding to the key
            const checkbox = event.target.elements[`attendance_${key}`];
            if (checkbox && checkbox.checked) {
                present.push(parseInt(key, 10));
            }
          });
        });
        setPresentKeys(present);
        console.log(present)

        try {
            const response = await fetch('http://localhost:8000/attendance', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(present)
            });
            if (response.ok) {
              console.log('Attendance successfully');
            } else {
              console.error('Failed to upload file');
            }
          } catch (error) {
            console.error('Error:', error);
          }

          window.location.reload();
      };
     
  

    return(
        <>
            <ul>
      {attend.map((file, index) => (
        <li key={index}>
          <form onSubmit={(event) => handleSubmit(event)}>
            {Object.keys(file).map((key, innerIndex) => (
              // Check if the key is numeric
              !isNaN(key) && (
                <div key={innerIndex}>
                  <label>
                    <strong>{key}:</strong>
                  </label>
                  <label>
                    Present
                    <input type="checkbox" name={`attendance_${key}`} value="present" />
                  </label>
                </div>
              )
            ))}
            <input type="submit" value="Submit" />
          </form>
        </li>
      ))}
    </ul>
        </>
    )
}

export default Attendance