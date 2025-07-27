import React, {useState} from'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Admin from '../Admin/Admin';
import Avail from '../Admin/availability/Avail';
import EditAvail from '../Admin/availability/edit/EditAvail';
import AdminLogin from '../Admin/AdminLogin';
import OtherArtist from '../Admin/otherartist/OtherArtist';
import BookRequest from '../Admin/bookrequest/BookRequest';
import Booking from '../Admin/books/Booking';
import GalleryDesk from '../Profile/gallery/GalleryDesk';
import AboutDesk from '../Profile/about/AboutDesk';
import ContactDesk from '../Profile/contact/ContactDesk';
import BookingDesk from '../Profile/booking/BookingDesk';


function Desktop(){
    let [admin,setAdmin] = useState(undefined);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Profile />
       // element:<Admin  isMobile={false}/>
    },{
        path:'/gallery',
        element: <GalleryDesk />
    },{
        path:'/about',
        element: <AboutDesk />
    },{
        path:'/contact',
        element: <ContactDesk />
    },{
        path:'/booking',
        element:<BookingDesk />
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
    },{
        path:'/admin/:artistId/bookings',
        element: <Booking />
    }
]);

    return(<div>
    
<RouterProvider router={router}/>
    </div>)
  }


  export default Desktop;