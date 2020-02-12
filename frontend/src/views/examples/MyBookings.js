import React, { useEffect, useContext } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import { bookings } from 'api';
import Context from 'context/context';
import { Redirect } from 'react-router';

const MyBookings = (props) => {
  const {user, setUser} = useContext(Context)  
  useEffect(()=>{
      bookings(0).then(res=> {
        // console.log(res)
        let data = res.bookings.replace('\'','"')
        let me = JSON.loads(data)
      })
    })
  if(!user.isLoggedIn){
    setUser({...user,afterLogin:'/my-bookings/'}) 
    return <Redirect to='/register' />
  }
  return (
    <>
        <ExamplesNavbar/>
        <div>
          <ListGroup>
            <h5>Companions</h5>
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
        </div>
    </>
  );

}

export default MyBookings;