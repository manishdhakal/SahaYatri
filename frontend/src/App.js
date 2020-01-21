import React, {useState} from 'react';
// import {Link} from 'react-router-dom'
import axios from 'axios'
import url from './djangoURL'
// import cookie from 'react-cookies'

import LogIn from './components/Login';
import SignUp from './components/SignUp';
import DashBoard from './components/DashBoard'
import './css/hover-min.css'
import Guides from './components/Guides';
import Profile from './components/Profile';


let comps  = {
  HOME: 'home',
  LOGIN: 'login',
  SIGNUP: 'signup',
  INTRO: 'intro',
  GUIDES: 'guides',
  PROFILE:'profile',
}


function App() {
  const [comp, setComp] = useState('profile')
  
  // const api =  ()=> {
  //   axios.post(url+'/new-user', {
  //     name:'dhakal'
  //   })
  //   .then((resp) => setText(resp.data))
  //   .catch((err) => console.log(err))
  // }

  // const saveCookie = ()=> {
  //   cookie.save('userID', '563255', {path:'/'})
  // }


  // const getCookie = ()=> {
  //   setId(cookie.load('userID'))
  // }

  switch(comp){

    case comps.HOME:
      return <DashBoard setComp={setComp} />

    case comps.LOGIN:
      return <LogIn />
    
    case comps.SIGNUP:
      return <SignUp />
    
    case comps.GUIDES:
      return <Guides />
    
    case comps.PROFILE:
      return <Profile />
  
  }
}

export default App;

