import React,{useEffect, useState, useContext} from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import {Link, Redirect} from 'react-router-dom'
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Context from "context/context";

function RegisterLocal(props) {

  const [isNew, setIsNew] = useState(true)
  const {user, setUser} = useContext(Context)
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("register");
    return function cleanup() {
      document.body.classList.remove("register");
    };
  });
  if (user.isLoggedIn) return <Redirect to='/local' />
  else{
    setUser({...user, afterLogin:'/local'})
  return (
    <Redirect to='/register' />
  );
  }
}



export default RegisterLocal;
