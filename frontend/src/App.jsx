
import Student from "./Student";
import {Link, RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from "./Login";
import Dashboard from "./Tdashboard";
import Teacherl from "./Teacherl";

const router = createBrowserRouter([
  {path:'/',element:<Login />},
  {path:'/student',element:<Student/>},
  {path:'/teacher',element:<Teacherl/>},
  {path:'/dashboard',element:<Dashboard/>}
])

function App() {
  
  return <RouterProvider router={router}/>
}

export default App
