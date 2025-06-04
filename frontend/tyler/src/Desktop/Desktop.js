import React from'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Admin from '../Admin/Admin';



function Desktop(){

const router = createBrowserRouter([
    {
        path: '/',
        element: <Profile />
       // element:<Admin  isMobile={false}/>
    },{
        path:'/admin',
        element:<Admin isMobile={false}/>
    }
]);

    return(<div>
    
<RouterProvider router={router}/>
    </div>)
  }


  export default Desktop;