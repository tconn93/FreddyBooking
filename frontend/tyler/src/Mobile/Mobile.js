import React from'react';
import MobileMenu from '../util/menu/MobileMenu';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MobileProfile from '../Profile/MobileProfile';
import Admin from '../Admin/Admin';
import AdminLanding from '../Admin/AdminLanding';
import AdminLogin from '../Admin/AdminLogin';
import OtherArtist from '../Admin/otherartist/OtherArtist';
import BookRequest from '../Admin/bookrequest/BookRequest';
import Avail from '../Admin/availability/Avail';
import EditAvail from '../Admin/availability/edit/EditAvail';
function Mobile(){

    const router = createBrowserRouter([
        {
            path: '/',
            element: <MobileProfile />
           // element: <Admin  isMobile={true}/>
        },{
            path:'/admin',
            element:<AdminLogin />
        },{
            path:'/admin/:artistId',
            element: <Admin isMobile={true}/>
        },{
            path:'/admin/:artistId/others',
            element: <OtherArtist />
    
        },{
            path: '/admin/:artistId/bookRequest',
            element: <BookRequest />
        },
        {
            path:'/admin/:artistId/availability',
            element:<Avail />
        },{
            path:'/admin/:artistId/availability/edit',
            element: <EditAvail />
        }
    ]);

    return(
        <div style={{backgroundColor: 'black', height: '100vh'}}>
       
        <RouterProvider router={router}/>
        </div>
    )
}

export default Mobile;