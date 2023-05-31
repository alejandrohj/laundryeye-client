import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {API_URL} from '../../config';

import GmaoNavbar from './GmaoNavbar';
import Warehouses from './Warehouses';
import WarehouseItems from './WarehouseItems';
import Items from './Items';
import CreateMaintenanceTask from './CreateNewMaintenanceTask';

export default function Stock(props) {

    const[loggedInUser,setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [Tasks,setTaks] = useState (null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/gmao/tasks`)
        .then((result)=>{
            console.log(result.data)
        })
    },[])

    const handleCreateTask = (e,subTasks) =>{
        e.preventDefault();
        const {taskTitle,taskDescription,daily,dayToBeCompleted,hoursToMustBeDone,timeToBeCompleted} = e.currentTarget;
        axios.put(`${API_URL}/gmao/tasks/create`,{taskTitle,taskDescription,subTasks,daily,dayToBeCompleted,hoursToMustBeDone,timeToBeCompleted},{withCredentials: true})
        .then((response)=>{
            console.log(response)
        })

    }

    if(redirecting) return <Redirect to={'/signin'}/>
    if(!loggedInUser)return <p>Loading...</p>
    return (
        <div>
            <GmaoNavbar loggedInUser= {loggedInUser}/>
            <CreateMaintenanceTask loggedInUser={loggedInUser} handleCreateTask={handleCreateTask}/>
            {/* <WarehouseItems id='warehouseItemsComponent' items = {items} /> */}
            {/* <Warehouses warehouses = {warehouses} onCreate ={handleCreateWarehouse}/> */}
        </div>
    )
}
