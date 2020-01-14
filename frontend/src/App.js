import React, {useState} from 'react';
import axios from 'axios'
import url from './djangoURL'
import cookie from 'react-cookies'
import {Form,Label, Input,FormGroup} from 'reactstrap'
import Blur from 'react-blur'
import Image from './assets/city.jpeg'

import { Typography, Card, Divider, AppBar, Toolbar, Button } from '@material-ui/core';

function App() {
  const [text, setText] = useState('')
  const [id,setId] = useState('')
  
  const api =  ()=> {
    axios.post(url+'/new-user', {
      name:'dhakal'
    })
    .then((resp) => setText(resp.data))
    .catch((err) => console.log(err))
  }

  const saveCookie = ()=> {
    cookie.save('userID', '563255', {path:'/'})
  }


  const getCookie = ()=> {
    setId(cookie.load('userID'))
  }

  return (
    <div>
      <div style={{ width:'100%', backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Image})`, height:900, filter:'blur(3px)'}}>
      </div>
      {/* <img src={Image} /> */}
      <LogIn />
    </div>
  );
}

export default App;

const LogIn = (props)=>{
  const [user,setUser] = useState({name:''})
  console.log(Image)
  return(
    <div style={{position:'absolute', top:'30%', left:'30%', width:400}}>
      {/* <div style={{ width:'100%', backgroundImage:`url(${Image})`, filter:'blur(5px)', height:800}} ></div> */}
        {/* <Blur img='assets/city.jpeg' blurRadius={5} > */}
        <AppBar style={{backgroundColor:'rgba(0,0,0,0.5)'}} >
          <Toolbar>
            <Typography style={{margin:'auto', width:'30%', color:'#fff'}} variant='h4'>Native Guide</Typography>
          </Toolbar>
        </AppBar>
          <Typography style={{margin:'auto', width:'50%', color:'#fff'}} variant='h4'>Login</Typography>
          <Form style={{margin:'auto', width:'70%'}}>
              <FormGroup style={{marginBottom:20}}>
                  <Label style={{color:'#fff'}} for="exampleEmail">Email</Label>
                  <Divider/>
                  <Input type="email" name="email"  placeholder="email" style={{height:30, borderRadius:10, backgroundColor:'rgba(0,0,0,0.5)', width:'100%', color:'#fff'}} />
              </FormGroup>
              
              <FormGroup style={{marginBottom:20}}  >
                  <Label style={{color:'#fff'}} for="examplePassword">Password</Label>
                  <Divider/>
                  <Input type="password" name="password" placeholder="password" style={{height:30, borderRadius:10, backgroundColor:'rgba(0,0,0,0.5)', width:'100%', color:'#fff'}} />
              </FormGroup>
              <Button variant='contained' style={{backgroundColor:'#0C84CC', color:'#fff'}}>
                LogIn
              </Button>
          </Form>
        {/* </Blur> */}
    </div>
  )
}