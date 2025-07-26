import React, {useState} from'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Admin from '../Admin/Admin';
import Avail from '../Admin/availability/Avail';
import EditAvail from '../Admin/availability/edit/EditAvail';
import AdminLogin from '../Admin/AdminLogin';
import OtherArtist from '../Admin/otherartist/OtherArtist';
import BookRequest from '../Admin/bookrequest/BookRequest';



function Desktop(){
    let [admin,setAdmin] = useState(undefined);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Profile />
       // element:<Admin  isMobile={false}/>
    },{
        path:'/admin',
        element:<AdminLogin />
    },{
        path:'/admin/:artistId',
        element: <Admin isMobile={false}/>
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

    return(<div>
    
<RouterProvider router={router}/>
    </div>)
  }


  export default Desktop;