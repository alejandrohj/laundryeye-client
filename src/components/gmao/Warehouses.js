import React,{useEffect,useState} from 'react'
import {Form, Button, Row, Col, Modal, Card, Accordion} from 'react-bootstrap';

import WarehouseItems from './WarehouseItems';

export default function Warehouses(props) {

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    return (
        <div>
            <p style={{textAlign: 'center', marginTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '24px'}}>Almacenes</p>
            <div style={{textAlign: 'center'}} className="create-laundryitem-btn">
            <Button onClick={handleOpen} className="general-btn createbtn">Crear nuevo almacen</Button>
            </div>
            <hr/>
            {
                props.warehouses?(
                    props.warehouses.map((elem)=>{
                        return (<Card key ={elem.i,'ware'} style={{margin: '5px 10px', textAlign: 'center' }}>
                                <Card.Body>
                                    <Card.Title>{elem.name}</Card.Title>
                                    <Card.Text>
                                        <p>Localización: {elem.floor}</p>
                                    </Card.Text>
                                    <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Desplegar
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <WarehouseItems warehouse = {elem}/>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                    </Accordion>
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
                <Form onSubmit={props.onCreate} >
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
