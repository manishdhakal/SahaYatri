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
  return (
    <>
      <ExamplesNavbar {...props} />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
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
                    <Link to={'/local'}>
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
                  <Input placeholder="Username" type="text" />
                  <label className='text-white '>Password</label>
                  <Input placeholder="Password" type="password" />
                  <Link to={'/local'}>
                    <Button block className="btn-round" color="info">
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



export default RegisterLocal;
