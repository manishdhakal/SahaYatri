import React,{useEffect, useState, useContext} from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col} from "reactstrap";
import {Link} from 'react-router-dom'
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Context from "context/context";
import { login_user } from "api";
// import { check_session } from "api";
import cookie from 'react-cookies'

function Register(props) {

  const [isNew, setIsNew] = useState(false)
  const [login, setLogin] = useState({})
  const [signup, setSignup] = useState({})
  const {user, setUser} = useContext(Context)
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    cookie.remove('token')
    setUser({...user, isLoggedIn:false, isLocalApproved:false})
  
  },[]);
  const next_link = user.afterLogin ? user.afterLogin: '/'

  const handleLogin = () =>{
    login_user(login.username, login.password).then(res => {
      console.log(res)
      let auth = res.tokenAuth
      if (auth){
        cookie.save('token', auth.token)
        setUser({...user, isLoggedIn:true})
        props.history.push('/')
      }
    }).catch(err => alert('Invalid username or password'))
  }
  return (
    <>
      <ExamplesNavbar {...props} />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.png") + ")"
        }}
      >
        <div className="filter" />
        {isNew ?
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register bg-dark ml-auto mr-auto">
                  <h3 className="title mx-auto text-white">Register Companion</h3>
                  <div className="social-line text-center">
                    <Button
                      className="btn-neutral btn-just-icon mr-1"
                      color="facebook"
                      href="/"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button
                      className="btn-neutral btn-just-icon mr-1"
                      color="google"
                      href="/"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-google-plus" />
                    </Button>
                    <Button
                      className="btn-neutral btn-just-icon"
                      color="twitter"
                      href="/"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-twitter" />
                    </Button>
                  </div>
                  <Form className="register-form">
                    <label className='text-white '>Full Name</label>
                    <Input placeholder="Full name" type="text" />
                    <label className='text-white '>Email</label>
                    <Input placeholder="Email" type="email" />
                    <label className='text-white '>Password</label>
                    <Input placeholder="Password" type="password" />
                    <label className='text-white '>Phone</label>
                    <Input placeholder="Phone" type="text" />
                    <label className='text-white '>Username</label>
                    <Input placeholder="Username" type="text" />
                    <label className='text-white'>Location</label>
                    <Input type='select' >
                      <option selected value="Kathmandu">Kathmandu</option>
                      <option value="Pokhara">Pokhara</option>
                      <option value="Lalitpur">Lalitpur</option>
                      <option value="Dang">Dang</option>
                    </Input>
                    <Link to={next_link} onClick={() => setUser({...user,isLoggedIn:true, isLocalApproved:true})}>
                      <Button block className="btn-round" color="info">
                        Register
                      </Button>
                    </Link>
                  </Form>
                  <div className="forgot">
                    Already have an account ?
                    <Button
                      className="btn-link"
                      color="success"
                      href="#pablo"
                      onClick={e => setIsNew(false)}
                    >
                      Sign In
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container> :
          <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register bg-dark ml-auto mr-auto">
                <h3 className="title mx-auto text-white">Login Companion</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon"
                    color="twitter"
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <Form className="register-form">
                  <label className='text-white '>Username</label>
                  <Input placeholder="Username" type="text" onChange={e => setLogin({...login, username:e.target.value})} />
                  <label className='text-white '>Password</label>
                  <Input placeholder="Password" type="password" onChange={e => setLogin({...login, password:e.target.value})} />
                  <Link>
                    <Button block className="btn-round" color="info" onClick={handleLogin} hr>
                      Continue
                    </Button>
                  </Link>
                </Form>
                <div className="forgot">
                  New to SahaYatri ?
                    <Button
                      className="btn-link"
                      color="success"
                      href="#pablo"
                      onClick={e => setIsNew(true)}
                    >
                      Sign Up
                    </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        }
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by SahaYatri
          </h6>
        </div>
      </div>
    </>
  );
}



export default Register;
