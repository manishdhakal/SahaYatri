import React,{useState} from 'react'
import {Footer, Navigator} from './Common'
import {Paper, Typography, Button, Grid, Divider, InputBase, ButtonBase, AppBar, Toolbar, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import backImg from '../assets/city.jpeg'
import guideImg from '../assets/guide.jpg'
import festivalImg from '../assets/festival.jpg'
import dinnerImg from '../assets/dinner.jpg'
import Media from 'react-media'

const DeskDash = (props)=> {
    const {setComp } = props
    return(
      <div>
        {/* <AppBar style={{backgroundColor:"#1A6C06"}} >
          <Toolbar style={{color:"#1A6C06"}}>
            <Typography style={{margin:'auto', width:'30%', color:'#fff'}} variant='h4'>SahaYatri</Typography>
          </Toolbar>
        </AppBar> */}
        <Navigator setComp={setComp} />
        <div style={{ width:'100%', backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backImg})`, height:600, filter:'blur(3px)'}}></div>
        <div style={{position:'absolute',width:'100%', top:100, left:0}}>
          <div style={{display:'flex', marginLeft:200}}>
            <div style={{flex:1}} >
              <ButtonBase onClick={()=>setComp('guides')} >
                <img  alt='' src={guideImg} className='hvr-float-shadow hvr-glow ' style={DeskCSS.circleImage} />
              </ButtonBase>  
                <Divider />
                <Typography style={DeskCSS.profileText} >Hire Guide</Typography>
            </div>
            <div style={{flex:1}}>
            <ButtonBase onClick={()=>setComp('guides')}>
                <img alt='' src={festivalImg} className='hvr-float-shadow hvr-glow ' style={DeskCSS.circleImage} />
              </ButtonBase>  
                <Divider />
                <Typography style={DeskCSS.profileText} >Local Events</Typography>
            </div>
            <div style={{flex:1}}>
              <ButtonBase onClick={()=>setComp('guides')}>
                <img alt='' src={dinnerImg} className='hvr-float-shadow hvr-glow ' style={DeskCSS.circleImage} />
              </ButtonBase>  
              <Divider />
              <Typography style={DeskCSS.profileText} >Cook {'&'} Dine</Typography>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
}
const DeskCSS = {
    dashPaper: {backgroundColor:"#1A6C06", color:'white', height:100,width:100},
    profileText: {textAlign:'left', marginLeft:70, color:'#fff',fontSize:25, fontFamily:'bold', fontWeight:'bold'},
    circleImage: {borderRadius:'50%', height:200, margin:50, width:200}
}
const MobCSS = {
  circleImage: {borderRadius:'50%', height:200,  width:200, marginTop:50},
  profileText: {marginLeft:50, color:'#fff',fontSize:18, fontFamily:'bold', fontWeight:'bold'},
}

const MobDash = (props) => {
  const [isSearchOpen,setIsSearchOpen] = useState(false)
  const {setComp} = props
  return(
    <div>
        <Navigator setComp={setComp} />
        <div style={{ width:'100%', backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backImg})`}}>
            <div style={{display:'flex', margin:'auto', width:'30%', flexDirection:'column', alignItems:'center'}}>
              <div style={{flex:1}} >
                <ButtonBase onClick={()=>setComp('guides')} >
                  <img  alt='' src={guideImg} style={MobCSS.circleImage} />
                </ButtonBase>
                  <Typography style={MobCSS.profileText} >Hire Guide</Typography>
              </div>
              <div style={{flex:1}}>
              <ButtonBase onClick={()=>setComp('guides')}>
                  <img alt='' src={festivalImg}  style={MobCSS.circleImage} />
                </ButtonBase>  
                  <Typography style={MobCSS.profileText} >Local Events</Typography>
              </div>
              <div style={{flex:1}}>
                <ButtonBase onClick={()=>setComp('guides')}>
                  <img alt='' src={dinnerImg} style={MobCSS.circleImage} />
                </ButtonBase>
                <Typography style={MobCSS.profileText} >Cook {'&'} Dine</Typography>
              </div>
            </div>
        </div>
        <Footer setComp={setComp} />
    </div>
  )
}

const DashBoard = (props)=>{
  const {setComp} = props
  return(
    <Media query={{ maxWidth: 800 }}>
      {(matches) =>
        matches ? (
          <MobDash setComp={setComp} />
        ) : (
          <DeskDash setComp={setComp} />
        )
      }
    </Media>
  )
}
export default DashBoard