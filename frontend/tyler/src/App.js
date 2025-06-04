import React from 'react';
import Profile from './Profile/Profile';
import { isMobile } from 'react-device-detect';
import './App.css';
import Mobile from './Mobile/Mobile';
import Desktop from './Desktop/Desktop';



function App(){


if(isMobile){
  return <Mobile />
}

  return <Desktop />
}

export default App;
