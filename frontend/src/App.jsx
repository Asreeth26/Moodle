
import Student from "./Student";
import {Link, RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from "./Login";
import Dashboard from "./Tdashboard";
import Teacherl from "./Teacherl";
import Attendance from "./Attendance";

const router = createBrowserRouter([
  {path:'/',element:<Login />},
  {path:'/student',element:<Student/>},
  {path:'/teacher',element:<Teacherl/>},
  {path:'/dashboard',element:<Dashboard/>},
  {path:'/teacher/attendance',element:<Attendance/>}
])

function App() {
  
  return <RouterProvider router={router}/>
}

export default App
