import { Button } from '@material-ui/core'
import React from 'react'

const Locate = ({panTo}) => {
    const LocateHandler = ()=>{
        navigator.geolocation.getCurrentPosition((position)=> panTo({lat: position.coords.latitude,lng: position.coords.longitude}),()=> null)
     
        
    }
    return (
        <Button style={{width: "25px",height: "50px"}} variant="contained" onClick={LocateHandler}>
            Locate!
        </Button>
    )
}

export default Locate
