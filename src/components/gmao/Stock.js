import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {API_URL} from '../../config';

import GmaoNavbar from './GmaoNavbar';
import Warehouses from './Warehouses';

export default function Stock(props) {
    const[loggedInUser,setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [warehouses,setWarehouses] = useState (null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/gmao/warehouses`)
        .then((result)=>{
            console.log(result.data)
            setWarehouses(result.data)
        })
    },[])

    const handleCreateWarehouse = (e) =>{
        e.preventDefault();
        const {name, floor} = e.currentTarget;
        console.log('creating')
        axios.post(`${API_URL}/gmao/warehouses/create`,{name: name.value,floor: floor.value}, {withCredentials: true})
            .then((result)=>{
                window.location.reload(false);
            })
    }

    if(redirecting) return <Redirect to={'/signin'}/>
    if(!loggedInUser || !warehouses)return <p>Loading...</p>
    return (
        <div>
            <GmaoNavbar loggedInUser= {loggedInUser}/>
            <Warehouses warehouses = {warehouses} onCreate ={handleCreateWarehouse}/>
        </div>
    )
}
