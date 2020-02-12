import React, { useEffect, useContext, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import { bookings } from 'api';
import Context from 'context/context';
import { Redirect } from 'react-router';

const MyBookings = (props) => {
  const {user, setUser} = useContext(Context)  
  const [sathis, setSathis] = useState([])
  const [foods, setFoods] = useState([])
  const [events, setEvents] = useState([])
  const [showNone, setShowNone] = useState(true)
  useEffect(()=>{

    bookings(0).then(res=> {
      setSathis(JSON.parse(res.bookings))
    }).catch(err => console.log(err))

    bookings(1).then(res=> {
      setFoods(JSON.parse(res.bookings))
    }).catch(err => console.log(err))

    bookings(2).then(res=> {
      console.log(res)
      setEvents(JSON.parse(res.bookings))
    }).catch(err => console.log(err))
  },[])

  if(!user.isLoggedIn){
    setUser({...user,afterLogin:'/my-bookings/'}) 
    return <Redirect to='/register' />
  }
  const sathiComp= 
    <ListGroup  className='text-dark font-weight-bold'>
        <h5 className='text-dark font-weight-bold'>Companions</h5>
      {sathis.map(s => 
        <ListGroupItem>{s.time} <p>{s.sathi}</p></ListGroupItem>
      )}
    </ListGroup>

  const eventComp= 
    <ListGroup  className='text-dark font-weight-bold'>
        <h5 className='text-dark font-weight-bold'>Events</h5>
      {events.map(s => 
        <ListGroupItem>{s.time} <p>{s.sathi}</p></ListGroupItem>
      )}
    </ListGroup>
  const foodComp= 
    <ListGroup  className='text-dark font-weight-bold'>
      <h5 className='text-dark font-weight-bold'>Cook {'&'} Dine</h5>
      {foods.map(s => 
        <ListGroupItem>{s.time} <p>{s.sathi}</p></ListGroupItem>
      )}
    </ListGroup>
  console.log(sathis)
  return (
    <>
        <ExamplesNavbar {...props}/>
        <div  style={{marginTop:100, marginLeft:20, marginRight:10}}>
          {sathis.length >0 && sathiComp}
          {events.length >0 && eventComp}
          {foods.length >0 && foodComp}
        </div>
    </>
  );

}

export default MyBookings;