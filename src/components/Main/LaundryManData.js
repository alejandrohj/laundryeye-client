import React,{useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import LAL1 from './Lal_1';
import LAL2 from './Lal_2';
import Navbar from './Navbar';
import Footer from './footer';
import {Card,ListGroup} from 'react-bootstrap'
import axios from 'axios';
import {API_URL} from '../../config';

export default function LaundryManData() {

    const [BoilerN2Temperature, setBoilerN2Temperature] = useState(null)
    const [BoilerN3Temperature, setBoilerN3Temperature] = useState(null)
    const[loggedInUser,setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);

    let clientesDías = ["Valle, Lago, Costa","Valle, Lago, Costa","Radisson Blu","Radisson Blu","Hotel y Aptos. Puerto Mogán",
    "Hotel y Aptos. Puerto Mogán", "", "", "OBC","OBC","Escorial","Escorial","Dorado","Dorado","Eugenia","Eugenia","Jardín Dorado , Maspalomas Resort",
    "Jardín Dorado, Maspalomas Resort", "Gacelas y Las Rosas", "", "", "Hotel Gold", "Hotel Gold", "","", "Hotel Silken y Hotel Lumm","Hotel Silken y Hotel Lumm",
    "","",""];
    let today = new Date().getDate();

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
          axios.get(`${API_URL}/gmao/boilers/temperature`)
          .then((res)=>{
            setBoilerN3Temperature(res.data[0])
            setBoilerN2Temperature(res.data[1])
              setInterval(loadData,2000)
          })
          .catch(()=>{
              setInterval(loadData,2000)
          })
        }).catch(() => {
            setRedirecting(true)
        })
    },[])
    const loadData = () =>{
        axios.get(`${API_URL}/gmao/boilers/temperature`)
            .then((res)=>{

                setBoilerN3Temperature(res.data[0])
                setBoilerN2Temperature(res.data[1])
            })
    }
    if(redirecting) return <Redirect to={'/signin'}/>
    //if(!) return <p>Loading...</p>
    return (
        <>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:"center"}}>
        <Card style={{ margin:"150px 100px" }}>
            <Card.Body>
            <Card.Title>Temperatura Caldera de Aceite Grande (nº2)</Card.Title>
            <Card.Text style={{textAlign:"center", padding:"10px",border: '1px solid black'}}>
            <h2>{BoilerN2Temperature}ºC</h2>
            </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ margin:"150px 100px"  }}>
            <Card.Body>
            <Card.Title>Temperatura Caldera de Aceite Pequeña (nº3)</Card.Title>
            <Card.Text style={{textAlign:"center", padding:"10px",border: '1px solid black'}}>
            <h2>{BoilerN3Temperature}ºC</h2>
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
        <div>
            <Card>
                <Card.Body>
                    <Card.Title style={{textAlign:"center"}}> Lavar Forros Interiores de las Jaulas de:</Card.Title>
                    <Card.Text style={{textAlign:"center", padding:"10px",border: '1px solid black'}}>
                        
                            <h4 style={{color:"blue"}}>{(clientesDías[today-1])?(clientesDías[today-1]):""}</h4>
                        
                    </Card.Text>
                    <Card.Text style={{textAlign:"center", padding:"10px"}}>
                        
                        <h3 style={{color: "red"}}>Recordar que cuando se lavan los forros de las jaulas hay que limpiar también la basura del fondo de la jaula</h3>
                    
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
        <Footer/>
        </>
    )
}
