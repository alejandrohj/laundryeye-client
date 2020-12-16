import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {API_URL, PUBLIC_URL} from '../../config';

import GmaoNavbar from './GmaoNavbar'

export default function GMAO() {
    const[loggedInUser,setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
            console.log(result.data)
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
    },[])
    if(redirecting) return <Redirect to={'/signin'}/>
    if(!loggedInUser)return <p>Loading...</p>
    return (
        <div>
            <GmaoNavbar loggedInUser= {loggedInUser}/>
            <p style={{margin:'50px', fontSize: '20px', textAlign: 'center'}}>Esta es la zona de gestion del mantenimiento de Lavandería Mogán,
            debe gestionar el stock(piezas, repuestos, almacenes,etc) desde stock. Para gestionar el mantenimiento de la maquinaria
            de la fábrica(reparaciones, cambios de piezas, etc) debe ir a mantenimiento.</p>
        </div>
    )
}
