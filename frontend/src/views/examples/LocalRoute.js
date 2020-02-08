import React,{useState, useMemo, useEffect, useContext} from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Context from "context/context";
import axios  from "axios";
import url from "url";
import LocalHome from "views/examples/LocalHome";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";

// console.log('Route')
// const temp_user = {isLoggedIn:true, isLocalApproved: true}

const LocalRoute = (props)=>{

	// const [isConnecting, setIsConnecting] = useState(true)
	// const [user, setUser] = useState({isLoggedIn:false, isLocalApproved:false})
    // const provider = useMemo(() => ({user, setUser}), [user, setUser])
    
    const {user, setUser} = useContext(Context)

    console.log(user)

	useEffect(() => {
		// setUser({...user, isLoggedIn:true, isLocalApproved: true})
		// setIsConnecting(false)
		console.log('Route inside useeffect')
	},[])

	if(!user.isLoggedIn)
        return(
            <Redirect to='/register-local' />
        )
    else if (!user.isLocalApproved)
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
    else
	return (
		// // <Context.Provider value={provider}>
		// 	<BrowserRouter>
		// 	{/* <Switch> */}
		// 		<Route
		// 			exact
		// 			path=""
		// 			component={LocalHome}
		// 		/>

                
		// 	{/* </Switch> */}
		// </BrowserRouter>
		// </Context.Provider>
		<LocalHome />
	)
}

export default LocalRoute