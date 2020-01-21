import React from 'react'
import {Footer, Navigator} from './Common'
import {Paper, Typography, Button, Grid, Divider, ButtonBase} from '@material-ui/core'
import backImg from '../assets/city.jpeg'
import guideImg from '../assets/guide.jpg'
import festivalImg from '../assets/festival.jpg'
import dinnerImg from '../assets/dinner.jpg'

const DashBoard = (props)=> {
    const {setComp } = props
    return(
      <div>
        {/* <AppBar style={{backgroundColor:"#1A6C06"}} >
          <Toolbar style={{color:"#1A6C06"}}>
            <Typography style={{margin:'auto', width:'30%', color:'#fff'}} variant='h4'>SahaYatri</Typography>
          </Toolbar>
        </AppBar> */}
        <Navigator />
        {/* <div style={{ width:'100%', backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backImg})`, height:600, filter:'blur(3px)'}}></div> */}
        <div style={{marginTop:100, marginLeft:50}}>
          {/* <Paper>
            
            <Typography>text</Typography>
            <Button onClick = {() => setComp('login') } >
                button
            </Button>
          </Paper> */}
          <div style={{display:'flex', width:'70%', margin:'auto'}}>
                <div style={{flex:1, flexDirection:'column'}} >
                  <ButtonBase >
                    <img  alt='' src={guideImg} className='hvr-float-shadow hvr-glow ' style={CSS.circleImage} />
                  </ButtonBase>  
                    <Divider />
                    {/* <Typography style={{textAlign:'center'}}>Hire Guide</Typography> */}
                </div>
                <div style={{flex:1}}>
                <ButtonBase >
                    <img alt='' src={festivalImg} className='hvr-float-shadow hvr-glow ' style={CSS.circleImage} />
                  </ButtonBase>  
                    <Divider />
                    {/* <Typography >Hire Guide</Typography> */}
                </div>
                <div style={{flex:1}}>
                  <ButtonBase >
                    <img alt='' src={dinnerImg} className='hvr-float-shadow hvr-glow ' style={CSS.circleImage} />
                  </ButtonBase>  
                  <Divider />
                    {/* <Typography >Hire Guide</Typography> */}
                </div>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
const CSS = {
    dashPaper: {backgroundColor:"#1A6C06", color:'white', height:100,width:100},
    circleImage: {borderRadius:'50%', height:200, margin:50, width:200}
}

  export default DashBoard