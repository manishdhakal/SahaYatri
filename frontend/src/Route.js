import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import FilterPage from "views/FilterPage";
import EventDetails from "views/examples/EventDetails";
import CookNDine from "views/examples/CookNDineDetails";
import CheckoutPage from "views/CheckoutPage";
import Test from "test/Test";
import Index from 'views/Index'
import Context from "context/context";

const MyRoute = ()=>{


	return (
		<Context.Provider value={"mani"}>
		<BrowserRouter>
			<Switch>
				<Route
					exact
					path="/"
					render={props => <Test {...props} />}
				/>
				<Route
					path="/home"
					render={props => <LandingPage {...props} />}
				/>

				<Route
					path="/user/:id"
					render={props => <ProfilePage {...props} />}
				/>
				<Route
					path="/event/:id"
					render={props => <EventDetails {...props} />}
				/>
				<Route
					path="/cookndine/:id"
					render={props => <CookNDine {...props} />}
				/>
				<Route
					path="/register"
					render={props => <RegisterPage {...props} />}
				/>
				<Route path="/filter" render={props => <FilterPage {...props} />} />
				{/* <Route path="/filter-event" render={props => <FilterPage {...props} />} />
				<Route path="/filter-food" render={props => <FilterPage {...props} />} /> */}
				<Route
					path="/checkout"
					render={props => <CheckoutPage {...props} />}
				/>

				<Route
					path="/index"
					render={props => <Index {...props} />}
				/>
			</Switch>
		</BrowserRouter>
		</Context.Provider>
	)
}
export default MyRoute