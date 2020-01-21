import React from 'react'
import {Footer, Navigator} from './Common'
import {Paper, Typography, Button, Grid, Divider, ButtonBase, Card} from '@material-ui/core'
import backImg from '../assets/city.jpeg'
import guideImg from '../assets/dp.jpg'
import festivalImg from '../assets/festival.jpg'
import dinnerImg from '../assets/dinner.jpg'


const Guides = (props)=> {
    const {setComp } = props
    return(
      <div>

        <Navigator />
        {/* <div style={{ width:'100%', backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backImg})`, height:600, filter:'blur(3px)'}}></div> */}
        <div style={{marginTop:100, marginLeft:50}}>
          <div style={{display:'flex', width:'70%', margin:'auto'}}>
                <Card style={{flex:1, flexDirection:'column'}} >
                  <ButtonBase >
                    <img alt='' src={guideImg} className='hvr-float-shadow hvr-glow ' style={CSS.circleImage} />
                  </ButtonBase>
                  <Divider/>  
                    <Typography style={CSS.profileText}>Aman Gupta</Typography>
                </Card>
                <Card style={{flex:1}}>
                <ButtonBase >
                    <img alt='' src={guideImg} className='hvr-float-shadow hvr-glow ' style={CSS.circleImage} />
                  </ButtonBase>  
                    <Divider />
                    <Typography style={CSS.profileText}>Arman Chhetri</Typography>
                </Card>
                <Card style={{flex:1}}>
                  <ButtonBase >
                    <img alt='' src={guideImg} className='hvr-float-shadow hvr-glow ' style={CSS.circleImage} />
                  </ButtonBase>  
                  <Divider />
                    <Typography style={CSS.profileText} >Rabin Adhikari</Typography>
                </Card>
            </div>
            
        </div>
        <Footer />
      </div>
    )
  }
const CSS = {
    circleImage: {borderRadius:'50%', height:200, margin:50, width:200},
    profileText: {textAlign:'left', marginLeft:100}
}

  export default Guides