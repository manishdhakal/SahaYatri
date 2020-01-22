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
import {Navigator, Footer} from './components/Common'


let comps  = {
  HOME: 'home',
  LOGIN: 'login',
  SIGNUP: 'signup',
  INTRO: 'intro',
  GUIDES: 'guides',
  PROFILE:'profile',
}
let retval

function App() {
  const [comp, setComp] = useState('home')
  
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
      retval =  <DashBoard setComp={setComp}/>
      break;
    case comps.LOGIN:
      retval =  <LogIn />
      break
    case comps.SIGNUP:
      retval = <SignUp />
      break
    case comps.GUIDES:
      retval = <Guides setComp={setComp} />
      break  
    case comps.PROFILE:
      retval = <Profile setComp={setComp} /> 
      break
  }
  return retval
}

export default App;

