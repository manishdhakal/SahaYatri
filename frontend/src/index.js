import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
// styles
import "assets/css/bootstrap.min.css";
import 'assets/css/sahayatri.css'
import "assets/scss/paper-kit.scss";


// Route
import MyRoute from 'Route'

ReactDOM.render(<MyRoute />, document.getElementById("root") );

serviceWorker.register();
