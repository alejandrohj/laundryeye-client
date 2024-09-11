import React,{useState, useEffect} from 'react'
import {Table,Button,Nav} from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {API_URL, PUBLIC_URL} from '../../config';
import LoadingPage from './LoadingPage';


import AddBoilderFuel from './AddBoilerFuel'

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

    const AddLitersToDeposit = (liters)=>{
        axios.post(`${API_URL}/boilers/deposit/load/add`,{liters:liters}, {withCredentials: true})
        .then((boilDataRes)=>{
            console.log(boilDataRes)
            let now = new Date();
            let boilersComsDataClone = JSON.parse(JSON.stringify(boilersComsData));
            boilersComsDataClone.push({load:true, totalLoaded:Number(liters), fecha:now.toString(), boilersData:[]})
            setboilersComsData(boilersComsDataClone)

        })

    }

    let rowStyle = {
        textAlign:"center"
    }


  if(redirecting) return <Redirect to={'/signin'}/>
  if(!boilersComsData || !loggedInUser) return <LoadingPage/>
  let accDepósit = 0;
  return (
    <div style={{margin:"10px", maxWidth:"100%", overflow:"auto", maxHeight:"750px"}}>
        <Table striped bordered hover id="boilersConmsumtionTable">
            <thead style={{textAlign:"center"}}>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Día</th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Aporte <br/> <AddBoilderFuel AddLitersToDeposit = {AddLitersToDeposit}/></th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Consumo Caldera AT 1 (Grande)</th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Consumo Caldera AT 2 </th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Consumo Caldera VAPOR</th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Total Consumo</th>
                <th style={{position:"sticky", top:0, zIndex:"1", backgroundColor:"white"}}>Estado depósito</th>
            </thead>
            <tbody>
            {
                boilersComsData.map((boildata)=>{
                    let numMes = Number(boildata.fecha.slice(5,7))
                    let elmes = mes[numMes-1];
                    let totalDayComsumption = Number(boildata.boilersData[0]?boildata.boilersData[0].oilData.dayConsumption:0) + 
                    Number(boildata.boilersData[1]?boildata.boilersData[1].oilData.dayConsumption:0) + 
                    Number(boildata.boilersData[2]?boildata.boilersData[2].oilData.dayConsumption:0);
                    if(boildata.load) {
                        accDepósit = accDepósit + boildata.totalLoaded;
                        rowStyle = {
                            textAlign:"center",
                            backgroundColor: "rgba(50, 168, 82, 0.2)"
                        }
                        }
                    else accDepósit = accDepósit - totalDayComsumption;
                    if(accDepósit <0)accDepósit = 0;
                    if(accDepósit >5000) accDepósit = 5000;
                    return(
                        <tr style={rowStyle}>
                            <td style={{width:"18%"}}>{boildata.fecha.slice(8,10)  +" "+ elmes +" "+ boildata.fecha.slice(0,4 )}</td>
                            <td style={{width:"12%"}}>{boildata.load?("+" + boildata.totalLoaded):"-"}</td>
                            <td style={{width:"12%"}}>{Number(boildata.boilersData[0]?(boildata.boilersData[0].oilData.dayConsumption).toFixed(2):0)}</td>
                            <td style={{width:"12%"}}>{Number(boildata.boilersData[1]?(boildata.boilersData[1].oilData.dayConsumption).toFixed(2):0)}</td>
                            <td style={{width:"12%"}}>{Number(boildata.boilersData[2]?(boildata.boilersData[2].oilData.dayConsumption).toFixed(2):0)}</td>
                            <td style={{width:"12%"}}>{Number(totalDayComsumption).toFixed(2)}</td>
                            <td style={{width:"12%"}}>{Number(accDepósit).toFixed(2)}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    </div>
  )
}
