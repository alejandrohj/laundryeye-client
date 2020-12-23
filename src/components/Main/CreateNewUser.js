import React,{useEffect, useState} from 'react'
import {Form, Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../../config';

export default function AddNewItem(props) {

    const [items, setItems] = useState(null);
    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(()=>{
        axios.get(`${API_URL}/gmao/items`,{withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                setItems(response.data)
            })
    },[])

    if(!items){return <p>Loging...</p>}
    return (
        <div>
         <div style={{textAlign: 'center'}} className="create-laundryitem-btn">
            <Button id='createBtn' onClick={handleOpen} className="general-btn createbtn">Añadir nuevo usuario</Button>
        </div>
         <Modal centered show={showCreate} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Añadir nuevo usuario</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form onSubmit={props.onCreate} >
                <Form.Group>
                <Form.Label className="admin-card-title">Nombre</Form.Label>
                <Form.Control name="firstName" type="text" placeholder="Alejandro" />
                </Form.Group>

                <Form.Group>
                <Form.Label className="admin-card-title">Apellidos</Form.Label>
                <Form.Control name="lastName" type="text" placeholder="Hernández Jorge" />
                </Form.Group>

                <Form.Group>
                <Form.Label className="admin-card-title">Nombre de usuario</Form.Label>
                <Form.Control name="userName" type="text" placeholder="Ale" />
                </Form.Group>

                <Form.Group>
                <Form.Label className="admin-card-title">Email</Form.Label>
                <Form.Control name="email" type="email" placeholder="user@laundryeye.com" />
                </Form.Group>

                <Form.Group>
                <Form.Label className="admin-card-title">Contraseña</Form.Label>
                <Form.Control name="password" type="password" placeholder="******" />
                </Form.Group>

                <Form.Group>
                <Form.Label className="admin-card-title">Acceso</Form.Label>
                <Form.Control name="userType" as="select">
                    <option>operator</option>
                    <option>admin</option>
                  
                </Form.Control>
                </Form.Group>

                <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                Añadir
                </Button>
            </Form>
            </Modal.Body>
            </Modal>
            
        </div>
    )
}