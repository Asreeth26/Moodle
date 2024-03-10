import { useEffect, useRef,useState } from "react";


function Material(){


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

    

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">FileName</label>
                <input type="text" name="filename" id="" ref={filename} /> <br /> <br />
                <input type="file" name="file" id="" ref={file} accept=".pdf"/> <br /> <br />
                <input type="submit" value="Submit" />
            </form>
            <br /><br />
            
        </>
    )

}

export default Material