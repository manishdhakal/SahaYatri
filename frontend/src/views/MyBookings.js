import React, { useEffect, useContext, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import { bookings } from 'api';
import Context from 'context/context';
import { Redirect } from 'react-router';
import DemoFooter from 'components/Footers/DemoFooter';

const sathis = [
  {
    name:"Ram Yadav",
    date:'2020-03-11',
  },
  {
    name:'Aman Mananadhar',
    date:'2020-02-20',
  }
]

const foods = [
  {
    name:"Yomari",
    date:'2020-02-21',
  },
  {
    name:"Thakali Khana",
    date:"2020-02-27",
  }
]
const events = [
  {
    name:"Deusi Bhailo",
    date:'2020-04-11',
  },
  {
    name:"Rodi",
    date:"2020-02-29",
  }
]

const MyBookings = (props) => {
  const {user, setUser} = useContext(Context)  
  // const [sathis, setSathis] = useState([])
  // const [foods, setFoods] = useState([])
  // const [events, setEvents] = useState([])
  useEffect(()=>{

  },[])

  if(!user.isLoggedIn){
    setUser({...user,afterLogin:'/my-bookings/'}) 
    return <Redirect to='/register' />
  }
  const sathiComp= 
    <ListGroup  className='text-dark font-weight-bold'>
        <h5 className='text-dark font-weight-bold'>Companions</h5>
      {sathis.map(s => 
        <ListGroupItem>{s.date} <p style={{fontFamily:'Arial'}}>{s.name}</p></ListGroupItem>
      )}
    </ListGroup>

  const eventComp= 
    <ListGroup  className='text-dark font-weight-bold'>
        <h5 className='text-dark font-weight-bold'>Events</h5>
      {events.map(s => 
        <ListGroupItem>{s.date} <p style={{fontFamily:'Arial'}}>{s.name}</p></ListGroupItem>
      )}
    </ListGroup>
  const foodComp= 
    <ListGroup  className='text-dark font-weight-bold'>
      <h5 className='text-dark font-weight-bold'>Cook {'&'} Dine</h5>
      {foods.map(s => 
        <ListGroupItem>{s.date} <p style={{fontFamily:'Arial'}}>{s.name}</p></ListGroupItem>
      )}
    </ListGroup>
  console.log(sathis)
  return (
    <>
        <ExamplesNavbar {...props}/>
        <div  style={{marginTop:100, marginLeft:20, marginRight:10}}>
          {sathis.length >0 && sathiComp}
          <br />
          <br/>
          {events.length >0 && eventComp}
          <br />
          <br/>
          {foods.length >0 && foodComp}
        </div>
        <DemoFooter {...props} />
    </>
  );

}

export default MyBookings;