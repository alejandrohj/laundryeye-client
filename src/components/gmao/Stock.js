import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {API_URL} from '../../config';

import GmaoNavbar from './GmaoNavbar';
import Warehouses from './Warehouses';
import WarehouseItems from './WarehouseItems';
import Items from './Items';

export default function Stock(props) {

    const[loggedInUser,setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [items,setItems] = useState (null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/gmao/items`)
        .then((result)=>{
            console.log(result.data)
            setItems(result.data)
        })
    },[])



    if(redirecting) return <Redirect to={'/signin'}/>
    if(!loggedInUser || !items)return <p>Loading...</p>
    console.log(items)
    return (
        <div>
            <GmaoNavbar loggedInUser= {loggedInUser}/>
            <Items id='warehouseItemsComponent' items = {items}/>
            {/* <WarehouseItems id='warehouseItemsComponent' items = {items} /> */}
            {/* <Warehouses warehouses = {warehouses} onCreate ={handleCreateWarehouse}/> */}
        </div>
    )
}
