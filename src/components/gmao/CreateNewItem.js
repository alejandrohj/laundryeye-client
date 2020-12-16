import React,{useEffect,useState} from 'react'
import {Form, Button, Row, Col, Modal, Card, Accordion} from 'react-bootstrap';

export default function CreateNewItem(props) {
    let categories = ['repuesto','consumible'];
    let subcategories = ['electrico','mecanico','correa','protección','filtro'];
    let units = ['metros','unidades','litros','kilos'];

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <>
            <div style={{textAlign: 'center'}} className="create-laundryitem-btn">
            <Button onClick={handleOpen} className="general-btn createbtn">Crear un nuevo artículo</Button>
            </div>
            <hr/>
        <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
        <Modal.Title className="admin-card-title">Crear un nuevo item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={props.onCreate} >
            <Form.Group>
            <Form.Label className="admin-card-title">Nombre</Form.Label>
            <Form.Control name="name" type="text" placeholder="p.e. almacén de repuestos" />
            </Form.Group>
            <Row>
              <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="admin-card-title">Categoría</Form.Label>
                <Form.Control name="category" as="select">
                  <option>Elige una categoría</option>
                  {
                    categories.map((elem, i) => {
                    return <option key={'category' + i} value={elem}>{elem}</option>
                    })
                  }
                </Form.Control>
              </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="admin-card-title">SubCategoría</Form.Label>
                  <Form.Control name="subcategory" as="select">
                  <option>Elige una subcategoría</option>
                  {
                    subcategories.map((elem, i) => {
                    return <option key={'subcategory' + i} value={elem}>{elem}</option>
                    })
                  }
                </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="admin-card-title">Marca y modelo</Form.Label>
                <Form.Control name="branch" type="text" placeholder="Marca y modelo" />
              </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="admin-card-title">Referencia</Form.Label>
                  <Form.Control name="ref" type="text" placeholder="referencia" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="admin-card-title">Unidad de medida</Form.Label>
                <Form.Control name="unit" as="select">
                  <option>Unidad de medida</option>
                  {
                    units.map((elem, i) => {
                    return <option key={'unit' + i} value={elem}>{elem}</option>
                    })
                  }
                </Form.Control>
              </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                    <Form.Label className="admin-card-title">Precio</Form.Label>
                    <Form.Control name="price" type="number" placeholder="Precio" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
            <Form.Label className="admin-card-title">Descripción</Form.Label>
            <Form.Control name="commentary" type="text" placeholder="Comentario" />
            </Form.Group>
            {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
            } 
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
            Crear
            </Button>
            {
            props.createSucces ? <Button className="general-btn" onClick={handleClose}>Volvera listas</Button>: <></>
            }
            </div>
        </Form>

        </Modal.Body>
        
    </Modal>
    </>
    )
}
