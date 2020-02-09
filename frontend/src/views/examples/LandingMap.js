import React, { useEffect, useState, useContext } from 'react'
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
import L, {Icon} from 'leaflet'
import Context from 'context/context';
import 'leaflet-routing-machine'
import {Card,  CardBody, Button, CardTitle, Input, Row, Col, InputGroup, InputGroupAddon} from 'reactstrap'
import url from 'url.js'
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import { get_nearby_sathis } from 'api';
import { resources_api } from 'api';


const personIcon = (imgUrl) => new Icon({
	iconUrl: imgUrl,
	iconSize:     [30, 30],
	shadowSize:   [50, 64],
	// iconAnchor:   [22, 94],
	shadowAnchor: [4, 62],
	popupAnchor:  [-3, -15],
	className:'speech-bubble' 
})

const LandingMap = (props)=>  {

	const [viewport, setViewport] = useState({
		center : [27.684624, 85.333711],
		zoom: 17,
	  });

	const [myLoc, setMyLoc] = useState([27.684624, 85.333711])
	// const [search, setSearch] = useState(false)
    const [sathis, setSathis] = useState([])
    
    const {user, setUser} = useContext(Context)
	
	useEffect(()=>{
		// axios.get(url+'/api/sathi/').then(resp => setSathis(resp.data))
		
		if (!navigator.geolocation) {
			alert('Geolocation is not supported by your browser');
		} else {
			
			navigator.geolocation.getCurrentPosition((pos)=>{
				
				setViewport({...viewport, center:[pos.coords.latitude, pos.coords.longitude]})
				setMyLoc([pos.coords.latitude, pos.coords.longitude])
				get_nearby_sathis(pos.coords.latitude, pos.coords.longitude).then(res => setSathis(res.data.nearbySathis))
			});
		}

	},[])

	console.log(sathis)
	const markers = sathis.map(sathi => 
		<Marker position={[sathi.lat, sathi.lon]} 
				icon={personIcon(resources_api + sathi.photos[0].image)} 
		>{console.log(sathi)}
			<Popup>
				<Card className="card-profile card-plain" style={{width:200}}>
                    <div className="card-avatar">
                      <a href=" " onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/user/'+ sathi.id}} >
                        <img
                          alt="..."
                          src={resources_api+sathi.photos[0].image}
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
                      <br />
                      <h5 className='text-info font-weight-bold'>$6/h</h5>
                      <p className="card-description text-center" style={{color:'#000', fontSize:13}}>
                        {sathi.description}
                      </p>
                    </CardBody>
                  </Card>
			</Popup>  
		</Marker>
		)
	
	// console.log(user , 'Map')
	// if(user.isLoggedIn) return(<Redirect to='/home' />)
	// else 
		return (
			<div>
				<ExamplesNavbar {...props}/>
				<Map center={viewport.center} zoom={viewport.zoom}  style={{marginTop:50}}
					onclick={(e)=> {
						setUser({...user,location : [e.latlng.lat, e.latlng.lng]})
						setViewport({zoom: e.target._animateToZoom, center: [e.latlng.lat, e.latlng.lng]})
					}}
				>
					<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					
					/>
					{/* <ReactLeafletSearch closeResultsOnClick={true} inputPlaceholder='Search Places'  position="topright" showPopup={false} /> */}
					{markers}
					<CircleMarker center={{lat:myLoc[0], lng:myLoc[1]}} radius={20} >
					<Popup>
						You Are Here.
					</Popup>
					</CircleMarker>
					<Marker position={viewport.center} >
					<Popup>
						The Location of your desire.
					</Popup>  
					</Marker>
				</Map>
				{/* <div 
					// style={{position:'relative', top:0, left:0, right:0, height:50}}
					// className='text-center'> 
					// <Link to='/home'>
					// 	<Button  className="btn-round  pull-right" color="info">
					// 		Next
					// 	</Button>
					// </Link>
					style={{display:'block', flexDirection:'row'}}
					>
						<div className='w-50'>
							<Input type="select" name="select" id="">
								<option>All</option>
								<option>Companion</option>
								<option>Events</option>
							<option>Cook {'&'} Dine</option>
								</Input>
						</div>
						<div className='w-50'> 
								<label>Filter</label>
						        <Input type="select" name="select" id="exampleSelect">
									<option>All</option>
									<option>Companion</option>
									<option>Events</option>
									<option>Cook {'&'} Dine</option>
								</Input>
						</div> */}
				{/* </div> */}
				<Row>
					<Col xs='4' lg='auto'>
						<label className='text-dark font-weight-bold'>Filter</label>
						<Input type="select" name="select" id="exampleSelect">
							<option>All</option>
							<option>Companion</option>
							<option>Events</option>
							<option>Cook {'&'} Dine</option>
						</Input>					
					</Col>
					<Col xs='8' lg='auto'>
					<label className='text-dark font-weight-bold'>Search</label>
					<InputGroup>
						<Input type="text" name="select" placeholder='Search'/>					
						<InputGroupAddon addonType="append"><Button color="info" style={{height:40, fontSize:15}} className='text-center'><i className='nc-icon nc-zoom-split' /></Button></InputGroupAddon>
      				</InputGroup>
					</Col>
				</Row>
			</div>
		)
}


export default  LandingMap
