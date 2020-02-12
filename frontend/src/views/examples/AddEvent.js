import React,{useContext, useState, useEffect} from 'react'
import {ModalFooter, ModalBody, Modal, ModalHeader, Container, Form, FormGroup, Button, Label, Input} from 'reactstrap'
import Context from 'context/context'
import Calendar from 'react-calendar'
import { TileLayer , Map, Marker, Popup } from 'react-leaflet'
import { create_event } from 'api'
const AddEvent = (props) => {
    const date = new Date()
    const {user, setUser} = useContext(Context)
    const [formData, setFormData] = useState({date:`${date.getFullYear()}- ${date.getMonth()}-${date.getDay()}` })
    const [modal, setModal] = useState(false);
    const toggle = () => {
      setModal(!modal);
    };

    const [viewport, setViewport] = useState({
		center : [27.684624, 85.333711],
		zoom: 16,
	  });

	// const [myLoc, setMyLoc] = useState([27.684624, 85.333711])
	
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
          Your offer has been confirmed. Check your email for
          detials.
        </p>
      </ModalBody>
      <ModalFooter>
        <Container fluid>
          <Button
            color="primary"
            onClick={() => {
              props.history.push("/");
            }}
          >
            <p style={{ textAlign: "center", textTransform:'uppercase', fontWeight:'bold' }}>Goto homepage</p>
          </Button>
        </Container>
      </ModalFooter>
    </Modal>
    <Container style={{width:400}}>
      <h5 className='text-center font-weight-bold'>Add an Event for the tourist</h5>
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
            // create_event(formData.name,formData.description,formData.location,viewport.center[0], viewport.center[1], formData.price,).then((res) => setModal(true))
            setModal(true)
            }}
        >Submit</Button>
      </Form>
    </Container>
    </>
    )
  }

  export default AddEvent