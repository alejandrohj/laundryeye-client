import React,{useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import Footer from '../Main/footer';
import axios from 'axios';
import {API_URL} from '../../config';

import {Button} from 'react-bootstrap';

export default function CageWasher() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [cagesWasherData, setCagesWasherData] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
            console.log(result.data)
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/tlc`,{withCredentials: true})
            .then((res)=>{
                console.log(res.data)
                setCagesWasherData(res.data)
        })
    },[])
    if(redirecting)return <Redirect to={'/signin'}/>
    if(!cagesWasherData) return <p>Loading...</p>
    let RTData = cagesWasherData[cagesWasherData.length-1];

    const handleStartTLC =()=>{
        axios.post(`${API_URL}/tlc/add`,{status: RTData.status, orders: 'start'}, {withCredentials: true})
        .then((res)=>{
            console.log(res.data)
        })
    }
    const handleStopTLC = () =>{
        axios.post(`${API_URL}/tlc/add`,{status: RTData.status, orders: 'stop'}, {withCredentials: true})
        .then((res)=>{
            console.log(res.data)
        })
    }
    return (
        <div style={{margin: '30px'}}>
        <h1>Tunel de lavado de jaulas</h1>
        <h5>Estado:{RTData.status}</h5>
        <div>
        <h6>Control remoto</h6>
        <Button variant="success" onClick={handleStartTLC}>Marcha</Button>
        <Button variant="danger" style={{marginLeft: '10px'}} onClick={handleStopTLC}>Paro</Button>  
        </div> 
        </div>
    )
}
