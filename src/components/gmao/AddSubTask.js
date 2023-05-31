import React, {useEffect,useState} from 'react'
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';

import Loading from '../Main/LoadingPage';

export default function AddSubTask(props) {

    const [showCreateST, setShowST] = useState(false);
    const handleCloseST = () => setShowST(false);
    const handleOpen = () => setShowST(true);
    return (
      <>
        {/* <p style={{textAlign: 'center', marginTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Clientes</p> */}
        <div className="create-laundryitem-btn" style={{textAlign: 'center'}}>
        <Button onClick={handleOpen} className="general-btn" variant="secondary" style={{margin:"10px"}}> + Añadir</Button>
        </div>
        <Modal centered show={showCreateST} onHide={handleCloseST}>
  
          <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Nueva Subtarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={props.handleAddSubTask} >
            <Form.Group>
            <Form.Label className="admin-card-title">Titulo</Form.Label>
            <Form.Control name="subTaskTitle" type="text" placeholder="Limpieza del tanque 1 del tunel" />
            </Form.Group>
            <Form.Group>
            <Form.Label className="admin-card-title">Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} name="subTaskDescription" type="text" placeholder="Vaciar, enjuagar, retirar incrustaciones y chequear corrosiones"/>
            </Form.Group>
              
              {/* <Form.Group>
                <Form.Label className="admin-card-title">Add an image</Form.Label>
                <Form.File name="image" id="exampleFormControlFile1" />
              </Form.Group> */}
              {
              props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
              } 
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Button onClick={handleCloseST} className="general-btn" variant="success" type="submit">
                Añadir Subtarea
              </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
}