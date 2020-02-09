import React,{useState, useMemo, useEffect} from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterLocal from "views/examples/RegisterLocal.js";
import FilterPage from "views/FilterPage";
import EventDetails from "views/examples/EventDetails";
import CookNDine from "views/examples/CookNDineDetails";
import CheckoutPage from "views/CheckoutPage";
import Index from 'views/Index'
import Context from "context/context";
import LandingMap from "views/examples/LandingMap";
import axios  from "axios";
// import url from "url";
import CheckLocal from "views/examples/CheckLocal";
import {RingLoader, BarLoader, PropagateLoader, ScaleLoader} from 'react-spinners'
import LocalHome from "views/examples/LocalHome";
import LocalRoute from "views/examples/LocalRoute";
import Register from "views/examples/Register";
import MakeOffer from 'views/examples/MakeOffer'
import { get_nearby_sathis } from "api";


// console.log('Route')
// const temp_user = {isLoggedIn:true, isLocalApproved: true}

const MyRoute = ()=>{

	const [isConnecting, setIsConnecting] = useState(true)
	const [user, setUser] = useState({isLoggedIn:false, isLocalApproved:false})
	const provider = useMemo(() => ({user, setUser}), [user, setUser])



	console.log(user)
	useEffect(() => {
			setUser({...user, isLoggedIn:true, isLocalApproved: true})
			setIsConnecting(false)
		// console.log('Route inside useeffect')
	},[])

	if(isConnecting)
	return(
		<div className='text-center' style={{marginTop:250 }}>
			<ScaleLoader color='green' css={mycss}  />
		</div>
	)
	else
	return (
		<Context.Provider value={provider}>
			<BrowserRouter>
			{/* <Switch> */}

				<Route
					exact
					path="/"
					component={LandingMap}
					 />
				/>
				<Route
					path="/home"
					component={LandingPage}
				/>

				<Route
					path="/user/:id"
					component={ProfilePage}
				/>
				<Route
					path="/event/:id"
					component={EventDetails}
				/>
				<Route
					path="/cookndine/:id"
					component={CookNDine}
				/>
				<Route
					path="/register-local"
					component={RegisterLocal}
				/>
				<Route
					path="/register"
					component={Register}
				/>
				<Route path="/filter" component={FilterPage} />
				<Route path='/make-offer' component={MakeOffer} />
				{/* <Route path="/filter-event" render={props => <FilterPage {...props} />} />
				<Route path="/filter-food" render={props => <FilterPage {...props} />} /> */}
				<Route
					path="/checkout"
					component={CheckoutPage}
				/>
	
				<Route
					path="/local"
					component={LocalRoute}
				/>

				{/* <Route
					path="/local-home"
					component={LocalHome}
				/> */}

			{/* </Switch> */}
		</BrowserRouter>
		</Context.Provider>
	)
}

const mycss = `display: block;
	margin: auto;`
export default MyRoute