
import React,{useState,useEffect, useContext} from "react";
import axios from 'axios'
import url from 'url.js'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { Link, Redirect } from "react-router-dom";
import Context from "context/context";
import LocalNavbar from "components/Navbars/LocalNavbar";
import { login_user } from "api";
import {ScaleLoader} from 'react-spinners'
import Calendar from "react-calendar";
import AddEvent from "./AddEvent";

function LocalHome(props) {

  // const []
  const [isLoading, setIsloading] = useState(true)
  const [comp, setComp] = useState('offers')


  const {user, setUser} = useContext(Context)
  console.log(user.isLoggedIn)

  if(!user.isLoggedIn)
  return(
      <Redirect to='/register-local' />
  )
  else if (!user.isLocalApproved)
    return(
        <div className='text-center'>
        <ExamplesNavbar {...props} />
        <div style={{marginTop:100}}>
          <img alt='' src={require("assets/img/cross.png")} style={{width:100, height:100}} />
          <h1 >
          You are not a verified Local
          </h1>
          <h4> Contact our SahaYatri Office at Sankhamul, Kathmandu  to be verified <br /> Phone: 01-4------</h4>
        </div>
      </div>
    )
  else
  return (
    <>
      <LocalNavbar {...props} />
      <Input type="select" name="select" id="exampleSelect" style={{marginTop:80}}>
        <option value='offers'>Offers</option>
        <option value='freetime'>Add Freetime</option>
        <option value='events'>Add Events</option>
        <option value='food'> Add Cook {'&'} Dine</option>
      </Input>
      {comp === 'offers' &&
        <AddEvent {...props} />
      }
      <DemoFooter />
    </>
  );
}


const Offers =  (props) => {
  const [sathis, setSathis] = useState([])
  const [events, setEvents] = useState([])
  const [foods, setFoods] = useState([])


  const [eventSM, setEventSM] = useState(false)
  const [foodSM, setFoodSM] = useState(false)

  const [userSM, setUserSM] = useState(false)
  const slicedSathis = userSM ?  sathis :  sathis.slice(0,3)
  const slicedEvents = eventSM? events: events.slice(0,3)
  const slicedFoods = foodSM? foods: foods.slice(0,3)
  

  useEffect(() => {

  },[]);

  return (
    <>
      <div className="main">
        <div className="section section-nude text-center" >
        <p className='font-weight-bold'>You are an authorized the local person. You can post events and get hired as companion for the tourists</p>
          <Container  style={{color:'#000'}} >
            <h3 className="title font-weight-bold">Incoming Hirings</h3>
            <Row>
              {slicedSathis.map( sathi => 
              <Col md="4" >
                <Col md='12' className=' rounded border shadow' style={{marginBottom:10}}>
                  <Card className="card-plain">
                  
                    <CardBody>
                      <a href=" " onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4" >
                            <Link className='font-weight-bold text-primary' to ={{pathname:'/user/'+String(sathi.id), fromLocal:true}}> {sathi.name} </Link>
                          </CardTitle>
                        </div>
                      </a>
                      <br />
                      {/* <h4 className='text-info font-weight-bold'>$6/h</h4> */}
                      <h5>2020-01-24</h5>
                      <h5>3hrs</h5>
                      <Button
                        className=""
                        style={{margin:10}}
                        color="danger"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Decline
                      </Button>
                      <Button
                        className=""
                        color="info"
                        href="#pablo"
                        style={{margin:10}}
                        onClick={e => e.preventDefault()}
                      >
                        Accept  
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Col>
              )}
            </Row>
            { !userSM &&
            <button className="btn-show-more info-show-more font-weight-bold rounded" style={{marginTop:10}} onClick={() => setUserSM(true)} > Show More <i className='fa fa-caret-down'/></button>
            }
            </Container>
        </div>

        <div className="section section-nude text-center">
          <Container>
            <h2 className="title">Events Near You</h2>
            <Row>
              {slicedEvents.map(event => 
              <Col md="4">
                <Col md='12' className=' rounded border shadow' style={{height:500}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/event/'+ event.id, id:event.id}}>
                          <img
                            alt="..."
                            src={url+event.image[0]}
                          />
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4" className='font-weight-bold'>{event.name}</CardTitle>
                        </div>
                      </a>
                      <p className="card-description text-center" style={{color:'#000'}}>
                        {event.description}
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-instagram" />
                      </Button>
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Col>
              )}
            </Row>
            { !eventSM &&
            <button className="btn-show-more info-show-more font-weight-bold rounded" style={{marginTop:10}} onClick={() => setEventSM(true)} > Show More <i className='fa fa-caret-down'/></button>
            }
          </Container>
        </div>
        <div className="section section-nude text-center">
          <Container>
            <h2 className="title">Cook {'&'} Dine Near You</h2>
            <Row>
              {slicedFoods.map(food => 
              <Col md="4">
                <Col md='12' className=' rounded border shadow' style={{height:500}}>
                  <Card className="card-profile card-plain">
                    <div className="card-avatar">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/cookndine/'+ food.id, id:food.id}}>
                          <img
                            alt="..."
                            src={url+food.image[0]}
                          />
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <div className="author">
                          <CardTitle tag="h4">{food.name}</CardTitle>
                        </div>
                      </a>
                      <p className="card-description text-center">
                        {food.description}
                      </p>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-instagram" />
                      </Button>
                      <Button
                        className="btn-just-icon btn-neutral ml-1"
                        color="link"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Col>
              )}
            </Row>
            { !foodSM &&
            <button className="btn-show-more info-show-more font-weight-bold rounded" style={{marginTop:10}} onClick={() => setFoodSM(true)} > Show More <i className='fa fa-caret-down'/></button>
            }
          </Container>
        </div>
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto  text-dark" md="8">
                <h2 className="text-center">Keep in touch?</h2>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label className=''>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    rows="4"
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>

        </div>
      </div>  
      </>
  )
}


const mycss = `display: block;
	margin: auto;`
export default LocalHome;
