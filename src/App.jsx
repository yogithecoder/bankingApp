import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes
} from 'react-router-dom';
import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        [<Route path='/' element={<Login />}></Route>,
          <Route  path='Register' element={<Register />}/>,
          <Route  path='Dashboard' element={<Dashboard />}/>,
          <Route  path='Transaction' element={<Transaction />}/>
        ]
     
    )
)
return <RouterProvider router={router}/>
}

export default App;
