import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {Form, Row, Col, Button, Nav} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../../config';

import GmaoNavbar from './GmaoNavbar';

export default function ItemDetails(props) {

    let categories = ['repuesto','consumible'];
    let subcategories = ['electrico','mecanico','correa','protección','filtro'];
    let units = ['metros','unidades','litros','kilos'];
    let id = props.match.params.id;

    const [Item, setItem] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [redirecting, setRedirecting] = useState(null)
    
    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/gmao/item/${id}`)
            .then((response)=>{
                setItem(response.data)
                console.log(response.data)
            })
        
    },[])

    const handleUpdateItem =(e)=>{
        e.preventDefault();
        console.log(e.currentTarget)
        const {name,branch,ref,category,subcategory,unit,commentary,price} = e.currentTarget;
        console.log(name.value,branch.value,ref.value, category.value, subcategory.value, unit.value, commentary.value, price.value)
        axios.post(`${API_URL}/gmao/item/${id}/update`,{name: name.value,branch: branch.value,ref:ref.value, category:category.value,
        subcategory:subcategory.value,unit: unit.value, commentary: commentary.value, price: price.value },
         {withCredentials: true})
            .then((result)=>{
                console.log(result.data)
            })
    }
    const handleDeleteItem = () =>{
        axios.delete(`${API_URL}/gmao/item/${id}/delete`)
            .then(()=>{
                return <Redirect to={'/gmao/stock'}/>
            })
    }

    if(redirecting) return <Redirect to={'/signin'}/>
    if(!Item) return <p>Loading..</p>
    return (
        <>
        <GmaoNavbar loggedInUser= {loggedInUser}/>
        <Form onSubmit={handleUpdateItem} style={{margin: '5px'}}>
            <Form.Group>
            <Form.Label className="admin-card-title">Nombre</Form.Label>
            <Form.Control name="name" type="text" defaultValue={Item.name}/>
            </Form.Group>
            <Row>
              <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="admin-card-title">Categoría</Form.Label>
                <Form.Control name="category" as="select" defaultValue={Item.category}>
                  <option></option>
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
                  <Form.Control name="subcategory" as="select" defaultValue={Item.subcategory}>
                  <option></option>
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
                <Form.Control name="branch" type="text" defaultValue={Item.branch}/>
              </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="admin-card-title">Referencia</Form.Label>
                  <Form.Control name="ref" type="text" defaultValue={Item.ref} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="admin-card-title">Unidad de medida</Form.Label>
                <Form.Control name="unit" as="select" defaultValue={Item.unit}>
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
                    <Form.Control name="price" type="number" defaultValue={Item.price} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
            <Form.Label className="admin-card-title">Descripción</Form.Label>
            <Form.Control name="commentary" type="text" defaultValue={Item.commentary} />
            </Form.Group>
            {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
            } 
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button className="general-btn" variant="primary" type="submit">
            Actualizar
            </Button>
            </div>
        </Form>
        <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '50px'}}>
            <Nav.Link href={'/gmao/stock'}><Button className="general-btn" variant="primary">Volver a Stocks</Button></Nav.Link>
        </div>
        </>
    )
}
