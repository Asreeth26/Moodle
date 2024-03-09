import {  useRef, useState } from "react"
import {Link} from "react-router-dom"
function Login(){
        
    const id = useRef();
    const pass = useRef()

    async function handleSubmit(event) {
        event.preventDefault();
        const id1 = id.current.value;
        const pass1 = pass.current.value;
        console.log(id1, pass1)
        const res = await fetch('http://localhost:8000/', {
          method: 'POST',
          body: JSON.stringify({ id: id1, password: pass1 }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const d = await res.json();
        console.log(d.rollno,d.message)
        if (d.message === "1") {
          window.location = '/student'
        }
        else {
          console.log('no')
          return false
        }
      }
    return(
        <>
        <h1>Welcome</h1>

            <form onSubmit={handleSubmit}>
            <label htmlFor="id" >Id</label>
            <input type="number" name="id" id="id" ref={id} />
            <label htmlFor="pass">Password</label>
            <input type="password" name="password" id="pass" ref={pass} />
            <input type="submit" value="submit" />
            </form>
        </>
    )
}

export default Login