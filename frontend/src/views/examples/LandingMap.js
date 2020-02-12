import React, { useEffect, useState, useContext } from 'react'
import { Map, TileLayer, Marker, Popup, CircleMarker, ImageOverlay } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import { Link, } from "react-router-dom";

import  {Icon} from 'leaflet'
import Context from 'context/context';
import 'leaflet-routing-machine'
import {Card,  CardBody,  CardTitle, Input, Row, Col, } from 'reactstrap'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import { get_nearby_sathis } from 'api';
import { resource_url } from 'api';
import { get_all_foods } from 'api';
import { get_all_events } from 'api';


const customIcon = (imgUrl) => new Icon({
	iconUrl: imgUrl,
	iconSize:     [30, 30],
	shadowSize:   [50, 64],
	shadowAnchor: [4, 62],
	popupAnchor:  [-3, -15],
	className:'speech-bubble' 
})

const LandingMap = (props)=>  {

	const [show, setShow] = useState('all')
	const [viewport, setViewport] = useState({
		center : [27.684624, 85.333711],
		zoom: 14,
	  });

	const [myLoc, setMyLoc] = useState([27.684624, 85.333711])
	const [sathis, setSathis] = useState([])
	const [foods, setFoods] = useState([])
	const [events, setEvents] = useState([])
    
    const {user, setUser} = useContext(Context)
	
	useEffect(()=>{
		get_nearby_sathis(viewport.center[0], viewport.center[1])
		.then(res => setSathis(res.nearbySathis))
		.catch(err => setSathis([]))

		if (!navigator.geolocation) {
			alert('Geolocation is not supported by your browser');
		} else {
			
			navigator.geolocation.getCurrentPosition((pos)=>{
				setViewport({...viewport, center:[pos.coords.latitude, pos.coords.longitude]})
				setMyLoc([pos.coords.latitude, pos.coords.longitude])
				
				get_nearby_sathis(pos.coords.latitude, pos.coords.longitude)
				.then(res => setSathis(res.nearbySathis))
				.catch(err => setSathis([]))

				get_all_foods()
				.then(res => setFoods(res.allFoods))
				.catch(err => console.log(err))

				get_all_events()
				.then(res => setEvents(res.allEvents))
			});
		}

	},[])
	const filteredEvents = events.filter(val => val.photos.length > 0)
	const filteredFoods = foods.filter(val => val.photos.length > 0)
	const filteredSathis = sathis.filter(val => val.photos.length > 0)


	const sathiMarkers = filteredSathis.map(sathi => 
		<Marker position={[sathi.lat, sathi.lon]} 
				icon={customIcon(resource_url + sathi.photos[0].image)}
		>
			<Popup>
				<Card className="card-profile card-plain" style={{width:200}}>
					<div className="card-avatar">
                      <a href=" " onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/user/'+ sathi.id}} >
                        <img
                          alt="..."
                          src={resource_url+sathi.photos[0].image}
                        />
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href=" " onClick={e => e.preventDefault()}>
                        <div className="author">
							<Link to={{pathname:'/user/'+ sathi.id}} >
                          		<CardTitle tag="h5" className='font-weight-bold text-dark'>{sathi.name}</CardTitle>
							</Link>
                        </div>
                      </a>
					  <h5>Companion</h5>
                      <br />
                      <h5 className='text-info font-weight-bold'>{sathi.price}</h5>
                      <p className="card-description text-center" style={{color:'#000', fontSize:13}}>
                        {sathi.description}
                      </p>
                    </CardBody>
                  </Card>
			</Popup>  
		</Marker>
		)
	
	const foodMarkers = filteredFoods.map(food => 
		<Marker position={[food.lat, food.lon]} 
				icon={customIcon(resource_url + food.photos[0].image)}
		>
			<Popup>
				<Card className="card-profile card-plain" style={{width:200}}>
					<div className="card-avatar">
                      <a href=" " onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/cookndine/'+ food.id}} >
                        <img
                          alt="..."
                          src={resource_url+food.photos[0].image}
                        />
                        </Link>
                      </a>
                    </div>
                    <CardBody>
                      <a href=" " onClick={e => e.preventDefault()}>
                        <div className="author">
							<Link to={{pathname:'/cookndine/'+ food.id}} >
                          		<CardTitle tag="h5" className='font-weight-bold text-dark'>{food.name}</CardTitle>
							</Link>
                        </div>
                      </a>
					  <h5>Companion</h5>
                      <br />
                      <h5 className='text-info font-weight-bold'>{food.price}</h5>
                      <p className="card-description text-center" style={{color:'#000', fontSize:13}}>
                        {food.description}
                      </p>
                    </CardBody>
                  </Card>
			</Popup>
		</Marker>
		)
	const eventMarkers = filteredEvents.map(event => 
		<Marker position={[event.lat, event.lon]} 
			icon={customIcon(resource_url + event.photos[0].image)}
		>
			<Popup>
				<Card className="card-profile card-plain" style={{width:200}}>
					<div className="card-avatar">
						<a href=" " onClick={e => e.preventDefault()}>
						<Link to={{pathname:'/event/'+ event.id}} >
						<img
							alt="..."
							src={resource_url+event.photos[0].image}
						/>
						</Link>
						</a>
					</div>
					<CardBody>
						<a href=" " onClick={e => e.preventDefault()}>
						<div className="author">
							<Link to={{pathname:'/event/'+ event.id}} >
									<CardTitle tag="h5" className='font-weight-bold text-dark'>{event.name}</CardTitle>
							</Link>
						</div>
						</a>
						<h5>Local Event</h5>
						<br />
						<h5 className='text-info font-weight-bold'>{event.price}</h5>
						<p className="card-description text-center" style={{color:'#000', fontSize:13}}>
						{event.description}
						</p>
					</CardBody>
					</Card>
			</Popup>  
		</Marker>
		)
	// const img = new <ImageOverlay />
	return (
		<div>
			<ExamplesNavbar {...props}/>
			<Map zIndex center={viewport.center} zoom={viewport.zoom}  style={{marginTop:50, }}
				onclick={(e)=> {
					setUser({...user,location : [e.latlng.lat, e.latlng.lng]})
					setViewport({zoom: e.target._animateToZoom, center: [e.latlng.lat, e.latlng.lng]})
				}}
			>
				<TileLayer 
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				
				/>
				<ReactLeafletSearch  closeResultsOnClick={true} inputPlaceholder='Search Places'  position="topright" showPopup={false} />
				{show === 'sathi' && sathiMarkers}
				{show === 'food' && foodMarkers}
				{show === 'event' && eventMarkers}
				{show === 'all' && <> {sathiMarkers} {foodMarkers} {eventMarkers} </>}
				<CircleMarker center={{lat:myLoc[0], lng:myLoc[1]}} radius={20} >
				{/* <Popup>
					You Are Here.
				</Popup> */}
				</CircleMarker>
					<Marker position={viewport.center} >
				<Popup>
					The Location of your desire.
				</Popup>  
				</Marker>
			</Map>
			<Row>
				<Col xs='6' >
					<label className='text-dark font-weight-bold'>Filter</label>
					<Input type="select" name="select" id="exampleSelect" onChange={e => setShow(e.target.value)}>
						<option value='all'>All</option>
						<option value='sathi'>Companion</option>
						<option value='event'>Events</option>
						<option value='food'>Cook {'&'} Dine</option>
					</Input>					
				</Col>
				{/* <Col xs='8' lg='auto'>
				<label className='text-dark font-weight-bold'>Search</label>
				<InputGroup>
					<Input type="text" name="select" placeholder='Search'/>					
					<InputGroupAddon addonType="append"><Button color="info" style={{height:40, fontSize:15}} className='text-center'><i className='nc-icon nc-zoom-split' /></Button></InputGroupAddon>
				</InputGroup>
				</Col> */}
			</Row>
		</div>
	)
}


export default  LandingMap
