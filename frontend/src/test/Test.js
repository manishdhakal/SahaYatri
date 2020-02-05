// import React, { useState, useEffect } from 'react';
// import ReactMapGL ,{ NavigationControl} from 'react-map-gl';
// import {geolocated} from 'react-geolocated'
// import Geocoder from 'react-map-gl-geocoder'
// import { Container } from 'reactstrap';
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// // import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
// // import 'react-map-gl/dist/'
 
// const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFuaXNoZGhha2FsIiwiYSI6ImNrNXprbGs0MTBmdDAzZW1sc2ZrcWd4bzcifQ.YMVQ4W8A_4ika_oMnA5UjA'
// const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//   c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//   C20.1,15.8,20.2,15.8,20.2,15.7z`;

// const SIZE = 20;

// let checkAvilability = true

// function Map(props) {
//   const [viewport, setViewport] = useState({
// 	// width:350,
// 	// height:500,
// 	// latitude:  27.709564,
// 	// longitude:  85.319609,
// 	// latitude: 27.7017, longitude: 85.3206,
// 	latitude: 27.689023, longitude: 86.280042,
// 	zoom: 15,
// 	bearing: 0,
// 	pitch: 0
//   });

//   useEffect(()=>{
// 	if (!navigator.geolocation) {
// 		console.log('Geolocation is not supported by your browser');
// 	  } else {
		
// 		navigator.geolocation.getCurrentPosition((pos)=>{
// 			setViewport({...viewport, latitude: pos.coords.latitude, longitude: pos.coords.longitude})
// 		});
// 	}
//   },[])

//   console.log(props)
//   console.log(viewport)
// //   if (checkAvilability){
// // 	  if (props.coords){
// // 		  setViewport( {...viewport, latitude: props.coords.latitude, longitude: props.coords.longitude})
// // 		  checkAvilability = false
// // 	  }
// //   }

//   const mapRef = React.createRef()

//   const handleGeocoderViewportChange = (viewport) => {
//     const geocoderDefaultOverrides = { transitionDuration: 1000 }
 
//     return setViewport({
//       ...viewport,
//       ...geocoderDefaultOverrides
//     })
//   }

//   console.log(window)
//   return (
//     <ReactMapGL
// 	  onClick={ e => console.log(e)}
// 	  width="100vw"
// 	  height="100vh"
// 	  {...viewport}
// 	  mapboxApiAccessToken={MAPBOX_TOKEN}
// 	  onViewportChange={setViewport}
	  
//     >
// 		<div style={{position: 'absolute', right: 10, }}>
//           <NavigationControl />
//         </div>
// 		<Marker  longitude={viewport.longitude} latitude={viewport.latitude} >
// 		<svg
//           height={SIZE}
//           viewBox="0 0 24 24"
//           style={{
//             cursor: 'pointer',
//             fill: '#d00',
//             stroke: 'none',
//             transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
//           }}
//         //   onClick={() => onClick(city)}
//         >
//           <path d={ICON} />
//         </svg>
// 		</Marker>
// {/* 
// 		<Geocoder
//           mapRef={mapRef}
//           onViewportChange={handleGeocoderViewportChange}
//           mapboxApiAccessToken={MAPBOX_TOKEN}
//         /> */}
// 	</ReactMapGL>
//   );
// }
// export default geolocated({
//     positionOptions: {
//         enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
// })(Map);

// @flow

import React, { useEffect, useState, useContext, useRef } from 'react'
import { Map, TileLayer, Marker, Popup, DivOverlay, LayersControl, ImageOverlay , MapControl, withLeaflet, MapLayer, Circle, CircleMarker , LayerGroup} from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import { Link } from "react-router-dom";
import axios from 'axios'
import L,{Icon} from 'leaflet'
import Context from 'context/context';
import 'leaflet-routing-machine'
import {Card,  CardBody, CardFooter, Button, CardTitle} from 'reactstrap'
import url from 'url.js'



const myLocIcon = new Icon({
	iconUrl: require('assets/img/my-location.png'),
	iconSize:     [30, 30],
	shadowSize:   [50, 64],
	// iconAnchor:   [22, 94],
	shadowAnchor: [4, 62],
	popupAnchor:  [-3, -76],
	// className:'loc-shadow' 
})

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

	const data = useContext(Context)

	console.log(data)

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

			<Map center={viewport.center} zoom={viewport.zoom} height='100vh' onclick={(e)=> setViewport({zoom: e.target._animateToZoom, center: [e.latlng.lat, e.latlng.lng]})}>
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
				<Button  className="btn-round  pull-right" color="info" href='/home'>
					Next
                </Button>
			</div>
		</>
    )
}


export default  SimpleExample
