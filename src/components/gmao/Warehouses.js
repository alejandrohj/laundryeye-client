import React,{useEffect,useState,Redirect} from 'react'
import {Form, Button, Row, Col, Modal, Card, Accordion} from 'react-bootstrap';
import axios from 'axios'
import {API_URL} from '../../config';

import WarehouseItems from './WarehouseItems';
import GmaoNavbar from './GmaoNavbar';

export default function Warehouses(props) {

    const[loggedInUser,setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [warehouses,setWarehouses] =useState(null)
    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/gmao/warehouses`, {withCredentials: true})
        .then((response)=>{
            setWarehouses(response.data)
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
            <p id='wareousesTitle' style={{textAlign: 'center', color: '#328CB6', fontWeight: '600'}}>Almacenes</p>
            <div style={{textAlign: 'center'}} className="create-laundryitem-btn">
            <Button id='createBtn' onClick={handleOpen} className="general-btn createbtn">Crear nuevo almacen</Button>
            </div>
            <hr/>
            {
                warehouses?(
                    warehouses.map((elem,i)=>{
                        return (<Card id='itemsCard' bg='light' border="dark" key ={i+'warehouses'} style={{textAlign: 'center' }}>
                                <Card.Body style={{padding: '0px'}}>
                                    <Card.Title>{elem.name}</Card.Title>
                                    <Card.Text>
                                        <p>Localización: {elem.floor}</p>
                                    </Card.Text>
                                    {/* <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Desplegar
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                    <Card.Body id='stockView'>
                                        <WarehouseItems id='warehouseItemsComponent' warehouse = {elem} />
                                    </Card.Body>
                                    </Accordion.Collapse>
                                    </Accordion> */}
                                </Card.Body>
                        </Card>)
                    })
                ):('')
            }
            <Modal centered show={showCreate} onHide={handleClose}>

                <Modal.Header closeButton>
                <Modal.Title className="admin-card-title">Create a new item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form onSubmit={handleCreateWarehouse} >
                    <Form.Group>
                    <Form.Label className="admin-card-title">Nombre</Form.Label>
                    <Form.Control name="name" type="text" placeholder="p.e. almacén de repuestos" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label className="admin-card-title">Zona</Form.Label>
                    <Form.Control name="floor" type="text" placeholder="p.e. planta alta" />
                    </Form.Group>
                    {
                    props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
                    } 
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                    Crear almacen
                    </Button>
                    {
                    props.createSucces ? <Button className="general-btn" onClick={handleClose}>Volvera listas</Button>: <></>
                    }
                    </div>
                </Form>
                </Modal.Body>
                
            </Modal>
        </div>
    )
}
