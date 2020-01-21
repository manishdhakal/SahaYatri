import React, {useState} from 'react'
import {Form,Label, Input,FormGroup} from 'reactstrap'
import {AppBar,Toolbar,Typography, Button, Divider, Link} from '@material-ui/core'
import Image from '../assets/city.jpeg'
// import {Link} from 'react-router-dom'

const LogIn = (props)=>{
    // const [user,setUser] = useState({name:''})
    return(
      <div>
        <div style={{ width:'100%', backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Image})`, height:900, filter:'blur(3px)'}}></div>
        <div style={{position:'absolute', top:'30%', left:'30%', width:400}}>
          <AppBar style={{backgroundColor:'rgba(0,0,0,0.5)'}} >
            <Toolbar>
              <Typography style={{margin:'auto', width:'30%', color:'#fff'}} variant='h4'>SahaYatri</Typography>
            </Toolbar>
          </AppBar>
              
          <Form style={{margin:'auto', width:'70%'}}>
            <Typography style={{  color:'#fff', marginBottom:20}} variant='h4'>Login</Typography>
            <FormGroup style={{marginBottom:20}}>
                <Label style={{color:'#fff'}} for="exam ">Email</Label>
                <Divider/>
                <Input type="email" name="email"  placeholder="email" style={CSS.formInput} />
            </FormGroup>
              
            <FormGroup style={{marginBottom:20}}  >
              <Label style={{color:'#fff'}} for="examplePassword">Password</Label>
              <Divider/>
              <Input type="password" name="password" placeholder="password" style={CSS.formInput} />
            </FormGroup>
            <Button variant='contained' style={CSS.formButton}>
              LogIn
            </Button>
            <Typography style={{ color:'#fff'}}>Dont Have an Account ?</Typography>
            <Link to="/">
              <Typography style={{ color:'#0C84CC'}}>SignUp/Register</Typography>
            </Link>
          </Form>
        </div>
      </div>
    )
}

const CSS = {
    formInput : {height:40, borderRadius:10, backgroundColor:'rgba(0,0,0,0.5)', width:'100%', color:'#fff', paddingLeft:10},
    formButton : {backgroundColor:'#0C84CC', color:'#fff', marginBottom:30},
}
export default LogIn

