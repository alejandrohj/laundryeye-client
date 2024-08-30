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

    let mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Nombiembre','Diciembre']


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
    <div style={{margin:"10px", maxWidth:"100%", overflow:"auto", maxHeight:"500px"}}>
        <Table striped bordered hover>
            <thead style={{textAlign:"center"}}>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Día</th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Consumo Caldera AT 1 (Grande)</th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Consumo Caldera AT 2 </th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Consumo Caldera VAPOR</th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Total</th>
            </thead>
            <tbody>
            {
                boilersComsData.map((boildata)=>{
                    let numMes = Number(boildata.fecha.slice(5,7))
                    let elmes = mes[numMes-1];
                    let totalDayComsumption = boildata.boilersData[0].oilData.dayConsumption + 
                    boildata.boilersData[1].oilData.dayConsumption + 
                    boildata.boilersData[2].oilData.dayConsumption;
                    return(
                        <tr style={{textAlign:"center"}}>
                            <td style={{width:"24%"}}>{boildata.fecha.slice(8,10) + " de " + elmes + " de " + boildata.fecha.slice(0,4 )}</td>
                            <td style={{width:"18%"}}>{Number(boildata.boilersData[0].oilData.dayConsumption).toFixed(2)}</td>
                            <td style={{width:"18%"}}>{Number(boildata.boilersData[1].oilData.dayConsumption).toFixed(2)}</td>
                            <td style={{width:"18%"}}>{Number(boildata.boilersData[2].oilData.dayConsumption).toFixed(2)}</td>
                            <td style={{width:"22%"}}>{Number(totalDayComsumption).toFixed(2)}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    </div>
  )
}
