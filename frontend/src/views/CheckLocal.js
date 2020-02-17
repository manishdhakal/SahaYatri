import React, {useContext, useEffect} from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import Context from "context/context";
import { Redirect } from "react-router";

const CheckLocal = (props) =>{

    const {user,setUser} = useContext(Context)
    console.log(user, 'check-local')

    // useEffect(() =>{
    //     console.log('useEffect inside check-local')
    // },[])

    if(user.isLocalApproved)
    return(
        <Redirect to='/local-home' />
    )
    else
    return(
      <div className='text-center'>
        <ExamplesNavbar {...props} />
        <div style={{marginTop:100}}>
          <img alt='' src={require("assets/img/cross.png")} style={{width:100, height:100}} />
          <h1 >
          You are not a verified Local
          </h1>
          <h4> Contact our SahaYatri Office at Sankhamul, Kathmandu  to be verified <br /> Phone: 01-4------</h4>
        </div>
      </div>
    )
  }

export default CheckLocal