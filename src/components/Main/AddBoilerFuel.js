import React,{useEffect,useState} from 'react'
import {Form, Button, Row, Col, Modal, Card, Accordion} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../../config';

export default function AddBoilderFuel(props) {

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const addLiters = (e) =>{
        e.preventDefault();
        const {newOil} = e.currentTarget;
        props.AddLitersToDeposit(newOil.value)
        handleClose()
    }

    return (
        <>
        <Button onClick={handleOpen} className="boxShadowS">Cargar</Button>

        <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
        <Modal.Title className="admin-card-title">Añadir entrada</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={(e)=>addLiters(e)} >
        <label>
          Litros:
          <input type="number" name="newOil" />
          L
        </label>

            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button className="boxShadowS" variant="primary" type="submit">
            Añadir
            </Button>
            <Button variant="secondary" className="boxShadowS"  onClick={handleClose}>Volver</Button>
            
            </div>
        </Form>

        </Modal.Body>
        
    </Modal>
    </>
    )
}