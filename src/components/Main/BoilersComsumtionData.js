import React,{useState, useEffect} from 'react'
import {Table,Button,Nav} from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {API_URL, PUBLIC_URL} from '../../config';
import LoadingPage from './LoadingPage';

export default function BoilersComsumtionData() {

    const [boilersComsData, setboilersComsData] = useState(null);
    const[loggedInUser,setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);



    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
          axios.get(`${API_URL}/boilers/cdata/all`, {withCredentials: true})
          .then((boilDataRes)=>{
            setboilersComsData(boilDataRes.data)
          })
          
        }).catch(() => {
            setRedirecting(true)
        })
    },[])


  if(redirecting) return <Redirect to={'/signin'}/>
  if(!boilersComsData || !loggedInUser) return <LoadingPage/>
  return (
    <>
        <Table>
            <thead>
                <th>Día</th>
                <th>Consumo Caldera AT 1 (Grande)</th>
                <th>Consumo Caldera AT 2 </th>
                <th>Consumo Caldera VAPOR</th>
                <th>Total</th>
            </thead>
            <tbody>
            {
                boilersComsData.map((boildata)=>{
                    let totalDayComsumption = boildata.boilersData[0].oilData.dayConsumption + 
                    boildata.boilersData[1].oilData.dayConsumption + 
                    boildata.boilersData[2].oilData.dayConsumption;
                    return(
                        <tr>
                            <td>{boildata.fecha}</td>
                            <td>{boildata.boilersData[0].oilData.dayConsumption}</td>
                            <td>{boildata.boilersData[1].oilData.dayConsumption}</td>
                            <td>{boildata.boilersData[2].oilData.dayConsumption}</td>
                            <td>{totalDayComsumption}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    </>
  )
}
