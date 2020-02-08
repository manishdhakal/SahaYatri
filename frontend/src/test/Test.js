import React, { useEffect, useState, useContext, useRef } from 'react'
import { Map, TileLayer, Marker, Popup, DivOverlay, LayersControl, ImageOverlay , MapControl, withLeaflet, MapLayer, Circle, CircleMarker , LayerGroup} from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import { Link } from "react-router-dom";
import axios from 'axios'
import L, {Icon} from 'leaflet'
import Context from 'context/context';
import 'leaflet-routing-machine'
import {Card,  CardBody, Button, CardTitle} from 'reactstrap'
import url from 'url.js'


const personIcon = (imgUrl) => new Icon({
	iconUrl: imgUrl,
	iconSize:     [30, 30],
	shadowSize:   [50, 64],
	// iconAnchor:   [22, 94],
	shadowAnchor: [4, 62],
	popupAnchor:  [-3, -15],
	className:'speech-bubble' 
})

const SimpleExample = ()=>  {

	const [viewport, setViewport] = useState({
		center : [27.684624, 85.333711],
		zoom: 17,
	  });

	const [myLoc, setMyLoc] = useState([27.684624, 85.333711])
	const [search, setSearch] = useState(false)
	const [sathis, setSathis] = useState([])
	
	useEffect(()=>{
		axios.get(url+'/api/sathi/').then(resp => setSathis(resp.data))
		
		if (!navigator.geolocation) {
			alert('Geolocation is not supported by your browser');
		} else {
			
			navigator.geolocation.getCurrentPosition((pos)=>{
				
				setViewport({...viewport, center:[pos.coords.latitude, pos.coords.longitude]})
				setMyLoc([pos.coords.latitude, pos.coords.longitude])
			});
		}

	},[])

	
	const markers = sathis.map((sathi,i) => 
		<Marker position={[viewport.center[0]+0.01* (i+1), viewport.center[1]+(0.01*i)]} icon={personIcon(url + sathi.image[0])} >
			<Popup>
				<Card className="card-profile card-plain" style={{width:200}}>
                    <div className="card-avatar">
                      <a href=" " onClick={e => e.preventDefault()}>
                        <Link to={{pathname:'/user/'+ sathi.id}} >
                        <img
                          alt="..."
                          src={url+sathi.image[0]}
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
	
	console.log(viewport)
    return (
		<>

			<Map center={viewport.center} zoom={viewport.zoom} height='100vh' 
				onclick={(e)=> setViewport({zoom: e.target._animateToZoom, center: [e.latlng.lat, e.latlng.lng]})}
			>
				<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				
				/>
				<ReactLeafletSearch closeResultsOnClick={true} inputPlaceholder='Search Places'  position="topright" showPopup={false} />
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
			<div style={{position:'relative', top:0, left:0, right:0, height:50}} className='text-center'> 
				<Link to='/home'>
					<Button  className="btn-round  pull-right" color="info">
						Next
					</Button>
				</Link>
			</div>
		</>
    )
}


export default  SimpleExample
