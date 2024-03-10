import {  useRef, useState } from "react"
import './Login.css'
import bg1 from './bg2.png'
import { useNavigate } from "react-router-dom";

function Login(){
        
    const id = useRef();
    const pass = useRef()
    const navigate = useNavigate();

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
        console.log(d.message)
        if (d.message === "1") {
          navigate('/student', { state: { id: id1 } });
        }
        else {
          console.log('no')
          return false
        }
      }
    return(
  <div className="main">
    <img src={bg1} alt="profile" />
   <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form  className="form" onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="number" name="id" id="id" ref={id} />

        <label for="password">Password</label>
        <input type="password" name="password" id="pass" ref={pass} />

        <button>Log In</button>
    </form>
  </div>
    )
}

export default Login