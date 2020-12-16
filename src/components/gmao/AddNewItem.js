import React,{useEffect, useState} from 'react'
import {Form, Button, Row, Col, Modal, Card, Accordion} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../../config';
import CreateNewItem from './CreateNewItem';

export default function AddNewItem(props) {

    let categories = ['repuesto','consumible'];
    let subcategories = ['electrico','mecanico','correa','protección','filtro'];

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

    const handleCreateNewItem = (e)=> {
        e.preventDefault();
        const {name,branch,ref,category,subcategory,unit,commentary,price} = e.currentTarget;
        console.log(name.value,branch.value,ref.value, category.value, subcategory.value, unit.value, commentary.value, price.value)
        axios.post(`${API_URL}/gmao/item/create`,{name: name.value,branch: branch.value,ref:ref.value, category:category.value,
        subcategory:subcategory.value,unit: unit.value, commentary: commentary.value, price: price.value },
         {withCredentials: true})
            .then((result)=>{
                window.location.reload(false);
            })
    }

    if(!items){return <p>Loging...</p>}
    return (
        <div>
         <div style={{textAlign: 'center'}} className="create-laundryitem-btn">
            <Button onClick={handleOpen} className="general-btn createbtn">Añadir nuevo artículo</Button>
        </div>
         <Modal centered show={showCreate} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Añadir nuevo artículo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form onSubmit={props.onCreate} >
                <Form.Group>
                <Form.Label className="admin-card-title">Artículo</Form.Label>
                <Form.Control name="item" as="select">
                  <option>Elige el artículo</option>
                  {
                    items.map((elem, i) => {
                    return <option key={'items' + i} value={elem._id}>{elem.name}  {elem.brach}  {elem.ref} {elem.commentary}</option>
                    })
                  }
                </Form.Control>
                </Form.Group>
                {
                props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
                } 
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                Añadir
                </Button>
                {
                props.createSucces ? <Button className="general-btn" onClick={handleClose}>Volvera listas</Button>: <></>
                }
                </div>
            </Form>
            </Modal.Body>
            <p style={{textAlign: 'center'}}>Tambien puedes crear uno nuevo:</p>
            <CreateNewItem onCreate={handleCreateNewItem}/>
            </Modal>
            
        </div>
    )
}
