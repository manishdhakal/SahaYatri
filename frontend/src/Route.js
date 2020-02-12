import React,{useState, useMemo, useEffect} from "react";
import { BrowserRouter, Route,} from "react-router-dom";

import ProfilePage from "views/examples/ProfilePage.js";
import RegisterLocal from "views/examples/RegisterLocal.js";
import EventDetails from "views/examples/EventDetails";
import CookNDine from "views/examples/CookNDineDetails";
import CheckoutPage from "views/CheckoutPage";
import Context from "context/context";
import LandingMap from "views/examples/LandingMap";
import {ScaleLoader} from 'react-spinners'
import LocalHome from "views/examples/LocalHome";
import LocalRoute from "views/examples/LocalRoute";
import Register from "views/examples/Register";
import MakeOffer from 'views/examples/MakeOffer'
import MyBookings from "views/examples/MyBookings";
import MyOffers from "views/examples/MyOffers";
import cookie from 'react-cookies'
import { check_session } from "api";
import { uri } from "api";

import { GraphQLClient } from "graphql-request";
import { my_sathis } from "api";


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

				<Route
					exact
					path="/"
					component={LandingMap}
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
				<Route path='/make-offer' component={MakeOffer} />
				
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
		</BrowserRouter>
		</Context.Provider>
	)
}

const mycss = `display: block;
	margin: auto;`

export default MyRoute
export {client}