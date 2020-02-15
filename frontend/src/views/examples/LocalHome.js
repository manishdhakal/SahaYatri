
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
import { TileLayer , Map, Marker, Popup } from 'react-leaflet'
import { create_food } from 'api'
import { get_all_sathis } from "api";
import { book } from "api";
import { bookings } from "api";

let off =[
  {
    name:'Pramod Khadka',
    date:'2020-02-25',
    price:450,
    time:7, 
  },
  {
    name:'Dinesh Acharya',
    date:'2020-02-27',
    price:550,
    time:5, 
  },
  {
    name:'Pramod Khadka',
    date:'2020-02-25',
    price:660,
    time:7, 
  },
  {
    name:'Pramod Khadka',
    date:'2020-03-15',
    price:450,
    time:2.5, 
  }
]
 
function LocalHome(props) {

  // const []
  const [isLoading, setIsloading] = useState(true)
  const [comp, setComp] = useState('incomings')


  const {user, setUser} = useContext(Context)

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
      <div style={{width:350, margin:'auto',marginTop:80}}>
        <label className='text-dark font-weight-bold test'>Select Your Options</label>
        <Input  type="select" name="select" id="exampleSelect" style={{}} onChange={(e) => setComp(e.target.value)}>
          <option value='incomings'>Offers</option>
          <option value='event'>Add Events</option>
          <option value='food'> Add Cook {'&'} Dine</option>
        </Input>
      </div>
      {comp === 'event' &&
        <AddEvent {...props} />
      }
      {comp === 'food' &&
        <AddFood {...props} />
      }
      {
        comp === 'incomings' &&
        <Offers {...props} />

      }
      <DemoFooter />
    </>
  );
}


const Offers =  (props) => {
  const [sathis, setSathis] = useState([])

  const [offers, setOffers] = useState(off)
  
  const [modal, setModal] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};

  useEffect(() => {
    get_all_sathis().then(res => setSathis(res.allSathis)).catch(err => console.log(err))
  },[]);
  console.log(sathis)
  return (
    <>
      <div className="main">
        <div className="section section-nude text-center" >
        <Modal isOpen={modal} toggle={toggle} className='text-dark'>
				<ModalHeader>
					<div className="icon-box">
						<i className="material-icons">&#xE876;</i>
					</div>
					<p className="modal-title">Awesome!</p>
				</ModalHeader>
				<ModalBody>
					<p style={{ textAlign: "center" }}>
						Your offer has been assigned to you. Check your email for
						detials.
					</p>
				</ModalBody>
				<ModalFooter>
					<Container fluid>
						<Button
							color="primary"
							onClick={() => {
								toggle()
							}}
						>
							<p style={{ textAlign: "center", textTransform:'uppercase', fontWeight:'bold' }}>Proceed</p>
						</Button>
					</Container>
				</ModalFooter>
			</Modal>
        <p className='font-weight-bold'>You are an authorized the local person. You can post events and get hired as companion for the tourists</p>
          <Container  style={{color:'#000'}} >
            <h3 className="title font-weight-bold">Hires</h3>
            <Row>
              {sathis.map( sathi => 
              <Col md="4" >
                <Col md='12' className=' rounded border shadow' style={{marginBottom:10}}>
                  <Card className="card-plain">
                  
                    <CardBody>
                        <div className="author">
                          <CardTitle tag="h4" className='font-weight-bold' >
                            {sathi.name}
                            
                          </CardTitle>
                          <br />
                        </div>
                      <br />
                      {/* <h4 className='text-info font-weight-bold'>$6/h</h4> */}
                      {sathi.booktime.length ?
                        <h5 style={{fontFamily:'serif'}}>{sathi.booktime[0].date}</h5>:
                        <h5 style={{fontFamily:'serif'}}>2020-01-24</h5>
                      }
                      {/* <Button
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
                      </Button> */}
                    </CardBody>
                  </Card>
                </Col>
              </Col>
              )}
            </Row>
            </Container>
            
            <br />
            <br />
            <br />
            <Container  style={{color:'#000'}} >
            <h3 className="title font-weight-bold">Similar Offers</h3>
            {sathis.length > 0 &&
              <Row>  
                {offers.map( (sathi, index) => 
                <Col md="4" >
                  <Col md='12' className=' rounded border shadow' style={{marginBottom:10}}>
                    <Card className="card-plain">
                    
                      <CardBody>
                          <div className="author">
                            <CardTitle tag="h4" className='font-weight-bold' >
                              {sathi.name}
                            </CardTitle>
                          </div>
                        <br />
                        <h4 className='text-info font-weight-bold'>Nrs. {sathi.price}</h4>
                        <h5 style={{fontFamily:'serif'}}>{sathi.date}</h5>
                        <h5 style={{fontFamily:'serif'}}>{sathi.time} hrs.</h5>
                        {/* <Button
                          className=""
                          style={{margin:10}}
                          color="danger"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Decline
                        </Button> */}
                        <Button
                          className=""
                          color="success"
                          href="#pablo"
                          style={{margin:10}}
                          onClick={() => {
                            setOffers(offers.filter((val, i) => i !== index))
                            toggle()
                            
                          } }
                        >
                          Accept  
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Col>
                )}
              </Row>
            }
            </Container>
        </div>
        </div>  
      </>
  )
}

const AddFood = (props) => {
  const date = new Date()
  const {user, setUser} = useContext(Context)
  const [formData, setFormData] = useState({date:`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`, cook:false })
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [viewport, setViewport] = useState({
  center : [27.694483, 85.311253],
  zoom: 16,
  });

// const [myLoc, setMyLoc] = useState([27.694483, 85.311253])
  console.log(formData)
useEffect(()=>{
  // axios.get(url+'/api/sathi/').then(resp => setSathis(resp.data)

  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    // console.log('pos')
  } else {
    
    navigator.geolocation.getCurrentPosition((pos)=>{
      
      setViewport({...viewport, center:[pos.coords.latitude, pos.coords.longitude]})
      // setMyLoc([pos.coords.latitude, pos.coords.longitude])
    });
  }

},[])
  return(
    <>
    <Modal isOpen={modal} toggle={toggle} className='text-dark'>
    <ModalHeader>
      <div className="icon-box">
        <i className="material-icons">&#xE876;</i>
      </div>
      <p className="modal-title">Awesome!</p>
    </ModalHeader>
    <ModalBody>
      <p style={{ textAlign: "center" }}>
        Your event has been confirmed. Check your email for
        detials.
      </p>
    </ModalBody>
    <ModalFooter>
      <Container fluid>
        <Button
          color="primary"
          onClick={() => {
            props.history.push("/local");
            setModal(false)
          }}
        >
          <p style={{ textAlign: "center", textTransform:'uppercase', fontWeight:'bold' }}>Proceed</p>
        </Button>
      </Container>
    </ModalFooter>
  </Modal>
  <Container>
    <h5 className='text-center font-weight-bold'>Add a Cook {'&'} Dine for the tourist</h5>
    <Form >
      <FormGroup>
        <Label for="docID" className='text-dark font-weight-bold h5'> Date</Label>
        <Calendar className='shadow' minDate={new Date()} onChange={(e) => setFormData({date: `${e.getFullYear()}- ${e.getMonth()}-${e.getDay()}`, ...formData})}/>
      </FormGroup>
      <FormGroup>
        <Label for="Document" className=' font-weight-bold h5 text-dark'>Name</Label>
          <Input type="text" name="document" id="document" 
              onChange={(e) => setFormData({...formData, name:e.target.value})}
            />
      </FormGroup>
      <FormGroup>
        <Label for="Document" className=' font-weight-bold h5 text-dark'>Description</Label>
          <Input type="textarea" name="document" id="document" 
              onChange={(e) => setFormData({...formData, description:e.target.value})}
            />
      </FormGroup>
      <FormGroup>
        <Label for="Document" className=' font-weight-bold h5 text-dark'>Price (in NRs.)</Label>
        <Input type="number" name="document" id="document" 
            onChange={(e) => setFormData({...formData, price:e.target.value})}
            // onChange={(e) => console.log(e.target.value)}
          />
      </FormGroup>
      <FormGroup>
        <Label for="Document" className=' font-weight-bold h5 text-dark'>Location</Label>
        <Input type="text" name="document" id="document" 
            onChange={(e) => setFormData({...formData, location:e.target.value})}
            // onChange={(e) => console.log(e.target.value)}
          />
      </FormGroup>
      <FormGroup onChange={e => setFormData({...formData ,cook: e.target.value})} tag="fieldset">
						<Label className='font-weight-bold h5 text-dark'>Cook As Well</Label>
						<FormGroup check >
							<Label check>
								<Input
									type="radio"
									name="docType"
									value={true}
									
								/>{" "}
								<span className='font-weight-bold' >Yes </span>
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input
									type="radio"
									name="docType"
									value={false}
								/>{" "}
								<span className='font-weight-bold' >No </span>
							</Label>
						</FormGroup>
					</FormGroup>
      <Map className='leaflet-1' center={viewport.center} zoom={viewport.zoom}  style={{marginTop:50, }}
          onclick={(e)=> {
              // setUser({...user,location : [e.latlng.lat, e.latlng.lng]})
              setViewport({zoom: e.target._animateToZoom, center: [e.latlng.lat, e.latlng.lng]})
          }}
      >
          <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          
          />
          <Marker position={viewport.center} >
          <Popup>
              The Location of your desire.
          </Popup>  
          </Marker>
      </Map>
      <Button style={{marginTop:20}} color='success' onClick={() => {
          // create_food(formData.name,formData.description,formData.cook,formData.location,viewport.center[0], viewport.center[1], formData.price,).then((res) => setModal(true))
          setModal(true)  
        }}
      >Submit</Button>
    </Form>
  </Container>
  </>
  )
}

const mycss = `display: block;
	margin: auto;`
export default LocalHome;
