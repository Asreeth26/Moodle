
import Student from "./Student";
import {Link, RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from "./Login";


const router = createBrowserRouter([
  {path:'/',element:<Login/>},
  {path:'/student',element:<Student/>}
])

function App() {
  
  return <RouterProvider router={router}/>
}

export default App
