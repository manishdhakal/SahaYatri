import React from 'react'
import {Footer, Navigator} from './Common'
import guideImg from '../assets/dp.jpg'
import backImg from '../assets/city.jpeg'
import Rating from 'react-star-ratings'
import {Paper, Typography,Table, TableCell,TableRow, TableBody,TableContainer} from '@material-ui/core'

const createData = (prop,data) => ({ prop,data })

let rows = [
    createData('Name ','Manish Dhakal'),
    createData('Email ','mns.dkl19@gmail.com'),
    createData('Phone ','9860687860'),
    createData('Location ','Pulchowk'),
]
const Profile = (props)=> {
    const {setComp } = props
    return(
        <div>
            <Navigator setComp={setComp} />
            <div style={{ width:'100%', backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backImg})`, height:600, filter:'blur(3px)'}}></div>
            <div style={{position:'absolute', top:100, left:0, display:'flex'}}>
                <div style={{flex:1}}>
                    <img alt='' src={guideImg}  style={CSS.circleImage} />
                </div>
                <div style={{flex:3}}>
                    <Typography variant='h5'> Aman Gupta</Typography>
                    {/* <SvgIcon style={{color:"#0000ff"}}>
                        <path d="m216.210938 0c-122.664063 0-222.460938 99.796875-222.460938 222.460938 0 154.175781 222.679688 417.539062 222.679688 417.539062s222.242187-270.945312 222.242187-417.539062c0-122.664063-99.792969-222.460938-222.460937-222.460938zm67.121093 287.597656c-18.507812 18.503906-42.8125 27.757813-67.121093 27.757813-24.304688 0-48.617188-9.253907-67.117188-27.757813-37.011719-37.007812-37.011719-97.226562 0-134.238281 17.921875-17.929687 41.761719-27.804687 67.117188-27.804687 25.355468 0 49.191406 9.878906 67.121093 27.804687 37.011719 37.011719 37.011719 97.230469 0 134.238281zm0 0"/>
                    </SvgIcon> */}
                    <Typography style={{color:'#1d1e21'}} > Ratings</Typography>
                    <Rating rating={3.6} numberOfStars={5} changeRating={()=> console.log("nothing")} starRatedColor='#039D9D' starDimension='25px' />
                    <Typography > 3.6</Typography>
                    <TableContainer style={{width:600}} component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.prop}>
                            <TableCell align="right" component="th" scope="row">
                                {row.prop}
                            </TableCell>
                            <TableCell align="left">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const CSS = {
    circleImage: {borderRadius:'50%', height:200, margin:50, width:200},
    profileText: {textAlign:'left', marginLeft:100},
}


export default  Profile