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
// import { get_nearby_sathis } from "api";
import MyBookings from "views/examples/MyBookings";
import MyOffers from "views/examples/MyOffers";
import cookie from 'react-cookies'
import { check_session } from "api";
import { uri } from "api";

import { GraphQLClient } from "graphql-request";
import { my_sathis } from "api";


// console.log('Route')
// const temp_user = {isLoggedIn:true, isLocalApproved: true}
// cookie.save('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1hbmlzaDEiLCJleHAiOjE1ODEzMTQ4MTUsIm9yaWdJYXQiOjE1ODEzMTQ1MTV9.5z-SIR5rLf3CPDEf8VpUutCz_bet1_FhKdnxlSK6bKs")
var client
const MyRoute = ()=>{
	const token = cookie.load('token')

	if(token !== undefined){
		client = new GraphQLClient(uri +'/graphql/',{
			headers:{
				Authorization: "JWT "+ token,
			}
		})
	}
	else{
		client = new GraphQLClient(uri+'/graphql/') 
	}

	const [isConnecting, setIsConnecting] = useState(true)
	const [user, setUser] = useState({isLoggedIn:false, isLocalApproved:false})
	const provider = useMemo(() => ({user, setUser}), [user, setUser])

	console.log(client)
	useEffect(() => {

		if( token !== undefined) {
			// my_sathis().then(res => console.log('res'))
			check_session(token).then(res => {
				console.log(res)
				if (res.verifyToken.payload){
					let data = res.verifyToken.payload
					console.log(data)
					my_sathis()
					.then(res=>{ 
						setUser({...user,isLoggedIn:true, username:data.username, isLocalApproved:res.mySathis[0].approved, sathiId:res.mySathis[0].id})
						setIsConnecting(false)
					})
					.catch(err => console.log(err))
					// setUser({...user, })

				}

			}).catch(err => {
				setUser({...user, isLoggedIn:false})
				setIsConnecting(false)
			})
		}else{
			setUser({...user, isLoggedIn:false})
			setIsConnecting(false)
		}

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
				{/* <Route
					path="/home"
					component={LandingPage}
				/> */}

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
				{/* <Route path="/filter" component={FilterPage} /> */}
				<Route strict={false} path='/make-offer' component={MakeOffer} />
				{/* <Route path="/filter-event" render={props => <FilterPage {...props} />} />
				<Route path="/filter-food" render={props => <FilterPage {...props} />} /> */}
				<Route
					path="/checkout"
					component={CheckoutPage}
				/>
				<Route path='/my-bookings'  component={MyBookings} />
				<Route path='/my-offers' component={MyOffers} />
				<Route
					path="/local"
					component={LocalHome}
				/>
				<Route
					path="/deadend"
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
export {client}