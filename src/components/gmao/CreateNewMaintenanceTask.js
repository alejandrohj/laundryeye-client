import React, {useEffect,useState} from 'react'
import {Form, Button, Row, Col, Modal,InputGroup} from 'react-bootstrap';

import Loading from '../Main/LoadingPage';
import AddSubTask from '../gmao/AddSubTask'

export default function CreateMaintenanceTask(props) {

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const [showDayToRepeat, setShowDayToRepeat] = useState(null);
    const [subTasks, setSubTasks] = useState([]);

    if(!props.loggedInUser ) return(<Loading/>)
    const loggedInUser = props.loggedInUser;

    const handleChange = (a) =>{
      console.log(a.currentTarget.value)
      setShowDayToRepeat(a.currentTarget.value);
    }

    const handleAddSubTask = (e) =>{
      e.preventDefault();
      const {subTaskTitle,subTaskDescription} = e.currentTarget;
      let subTasksClone = JSON.parse(JSON.stringify(subTasks));
      let newSubTaskTitle = subTaskTitle.value
      let newSubTaskDescription = subTaskDescription.value
      subTasksClone.push({subTaskTitle:newSubTaskTitle,newSubTaskDescription: newSubTaskDescription})
      console.log(subTasksClone)
      setSubTasks(subTasksClone)
    }
    console.log("rerendering")
    return (
      <>
        {/* <p style={{textAlign: 'center', marginTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Clientes</p> */}
        <div className="create-laundryitem-btn" style={{textAlign: 'center'}}>
        <Button onClick={handleOpen} className="general-btn createbtn">CREAR TAREA</Button>
        </div>
        <Modal centered show={showCreate} onHide={handleClose}>
  
          <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Nueva tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e)=>props.handleCreateTask(e,subTasks)} >
            <Form.Group>
            <Form.Label className="admin-card-title">Titulo</Form.Label>
            <Form.Control name="taskTitle" type="text" placeholder="Limpieza y mantenimiento tuneles" />
            </Form.Group>
            <Form.Group>
            <Form.Label className="admin-card-title">Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} name="taskDescription" type="text" placeholder="Realizar checklist mantenimiento tunel 1, limpiar depositos de recuperación tunel 1, limpiar instrumentos de tuneles, limpiar bajos del tunel"/>
            </Form.Group>
              <Row>
              <Col>
              <Form.Group>
                <Form.Label className="admin-card-title">Tarea Diaria</Form.Label>
                <Form.Control name="daily" as="select" onChange={handleChange} >
                    <option value={false}>No</option>
                    <option value={true}>Sí</option>
                  </Form.Control>
              </Form.Group>
              </Col>
              {
                showDayToRepeat=="true"?(
                  <Col>
                  <Form.Group>
                      <Form.Label className="admin-card-title">Repetir</Form.Label>
                      <Form.Control name="dayToBeCompleted" as="select">
                        <option>Nunca</option>
                        <option value={0}>Lunes</option>
                        <option value={1}>Martes</option>
                        <option value={2}>Miercoles</option>
                        <option value={3}>Jueves</option>
                        <option value={4}>Viernes</option>
                        <option value={5}>Sábado</option>
                        <option value={6}>Domingo</option>
                        </Form.Control>
                    </Form.Group>
                  </Col>
                ):(
                  <Col>
                  <Form.Group>
                  <Form.Label className="admin-card-title">Horas para realizar</Form.Label>
                  <Form.Control name="hoursToMustBeDone" type="number" placeholder="48"/>
                  </Form.Group>
                  </Col>
                )
              }
              </Row>
              <h6>Subtareas</h6>
              {
                subTasks?(
                  subTasks.map((elem,i)=>{
                    return <p>{i+1} - {elem.subTaskTitle}</p>
                  })
                ):("")
              }
              <AddSubTask handleAddSubTask={handleAddSubTask}/>
              <hr/>
              <Form.Group>
                  <Form.Label className="admin-card-title">Tiempo de ejecución</Form.Label>
                  <InputGroup className="mb-3">
                  <Form.Control name="timeToBeCompleted" type="number" placeholder="1.5"/>
                  <InputGroup.Text>Horas</InputGroup.Text>
                  </InputGroup>
                  </Form.Group>
              {/* <Form.Group>
                <Form.Label className="admin-card-title">Add an image</Form.Label>
                <Form.File name="image" id="exampleFormControlFile1" />
              </Form.Group> */}
              {
              props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
              } 
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Button onClick={handleClose} className="general-btn" variant="success" type="submit">
                Crear servicio
              </Button>
              </div>
            </Form>
          </Modal.Body>
          
        </Modal>
      </>
    )
}