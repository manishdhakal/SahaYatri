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
				path="/profile"
				render={props => <ProfilePage {...props} />}
			/>
			<Route
				path="/register"
				render={props => <RegisterPage {...props} />}
			/>
			<Route path="/filter" render={props => <FilterPage {...props} />} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

serviceWorker.register();
