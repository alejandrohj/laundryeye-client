import React,{useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import Footer from '../Main/footer';
import axios from 'axios';
import {API_URL, PUBLIC_URL} from '../../config';

import {Button} from 'react-bootstrap';
import ModifyTimes from './ModifyTimes';

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
    const handleModify = (e) =>{
        e.preventDefault();
        const {status, orders} = RTData
        const {timeToWash, timeToDry} = e.currentTarget
        axios.post(`${API_URL}/tlc/add`,{status,orders, timeToWashRemoteModifiyed: timeToWash.value, timeToDryRemoteModifiyed: timeToDry.value}, {withCredentials: true})
            .then((res)=>{
                console.log(res.data)
            })

    }

    return (
        <div style={{margin: '30px'}}>
        <h1>Tunel de lavado de jaulas</h1>
        <div style={{display:'flex', flexWrap : 'wrap'}}>
            <div>
                <img src={`${PUBLIC_URL}/tunelLavJaulas.jpg`} alt={'img_lavJaulas'} width ={'300px'}/>
                
            </div>
            <div style={{margin: '40px'}}>
            <h5>Estado:{RTData.status}</h5>
                <div style={{display:'flex', flexWrap : 'wrap', alignItems:'center', border: '1px solid', padding: '15px', margin: '10px 0px'}}>
                    <div style={{marginRight: '20px'}}>
                        <p><b>Tiempo lavado: </b>{RTData.timeWashing}/{RTData.timeToWash} min</p>
                        <p><b>Tiempo secado: </b>{RTData.timeDrying}/{RTData.timeToDry} min</p>
                    </div>
                    <ModifyTimes RTData ={RTData} onModify ={handleModify}/>
                </div>
                <h6>Control remoto</h6>
                <Button variant="success" onClick={handleStartTLC}>Marcha</Button>
                <Button variant="danger" style={{marginLeft: '10px'}} onClick={handleStopTLC}>Paro</Button>  
            </div>
        </div>
        </div>
    )
}
