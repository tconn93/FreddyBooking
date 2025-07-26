import React from'react';
import MobileMenu from '../util/menu/MobileMenu';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MobileProfile from '../Profile/MobileProfile';
import Admin from '../Admin/Admin';
import AdminLanding from '../Admin/AdminLanding';


function Mobile(){

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MobileProfile />
           // element: <Admin  isMobile={true}/>
        },{
            path:'/admin',
            element:<AdminLanding  isMobile={true}/>
        }
    ]);

    return(
        <div style={{backgroundColor: 'black', height: '100vh'}}>
       
        <RouterProvider router={router}/>
        </div>
    )
}

export default Mobile;