import React, {useState} from 'react';
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';


export default function CreateLaundry(props) {

  const [showCreate, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  console.log(props.RTData)
    return (!props.RTData || props.RTData === undefined)? (<p>Loading...</p>):
  (
    <>
      <div className="create-laundryitem-btn">
      <Button onClick={handleOpen} className="general-btn createbtn">Modificar</Button>
      </div>
      <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title className="admin-card-title">Modificar tiempos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={props.onModify} >
            <Form.Group>
              <Form.Label className="admin-card-title">Tiempo de Lavado</Form.Label>
              <Form.Control name="timeToWash" type="number" defaultValue={props.RTData.timeToWash} />
            </Form.Group>

            <Form.Group>
              <Form.Label className="admin-card-title">Tiempo de secado</Form.Label>
              <Form.Control name="timeToDry" type="number" defaultValue={props.RTData.timeToDry}/>
            </Form.Group>

            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button className="general-btn" variant="primary" type="submit">
              Modificar
            </Button>
            </div>
          </Form>

        </Modal.Body>
        
      </Modal>
    </>
  )
}
