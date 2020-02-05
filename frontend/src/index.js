import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
// styles
import "assets/css/bootstrap.min.css";
import 'assets/css/sahayatri.css'
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";

// pages
import MyRoute from 'Route'
// others

ReactDOM.render(<MyRoute />, document.getElementById("root") );

// ReactDOM.render(<Test/>, document.getElementById('root'))
serviceWorker.register();
