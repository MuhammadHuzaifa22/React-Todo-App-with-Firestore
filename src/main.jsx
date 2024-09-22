import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/Sign-up.jsx'
import Home from './Pages/Home.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children:[
      ,{
        path:'/',
        element: <Login/>
      }
      ,{
        path: 'SignUp',
        element: <SignUp/>
      },{
        path: 'home',
        element: <Home/>

      }
    ]
  }
  
])



createRoot(document.getElementById('root')).render(
<RouterProvider router={router}>

    
</RouterProvider>  
  
)
