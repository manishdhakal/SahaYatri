import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";

// pages
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import FilterPage from "views/FilterPage";
import EventDetails from "views/examples/EventDetails";
import CookNDine from "views/examples/CookNDineDetails";
import CheckoutPage from "./views/CheckoutPage";
// others

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route
				exact
				path="/"
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
			<Route
				path="/checkout"
				render={props => <CheckoutPage {...props} />}
			/>
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

serviceWorker.register();
