import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Table,Button,Nav,Accordion,Card,InputGroup,FormControl} from 'react-bootstrap';
import {API_URL} from '../../config';

import CreateNewItem from './CreateNewItem';

export default function Items(props) {

    const [items, setItems] = useState(props.items);
    const [filteredItems, setFilteredItems] = useState(props.items);

    const handleDeleteItem = (id) =>{
        axios.delete(`${API_URL}/gmao/item/${id}/delete`,{withCredentials: true})
            .then(()=>{
                let cloneOfItems = JSON.parse(JSON.stringify(items));
                let ItemsModified = cloneOfItems.filter((elem)=>{
                        return elem._id !== id
                })
                setItems(ItemsModified)
                setFilteredItems(ItemsModified)
            })
    }
    const handleAmountChange = (change,id) =>{
        let cloneOfItems = JSON.parse(JSON.stringify(items));
        let itemToUpdate;
        let ItemsModified = cloneOfItems.map((elem)=>{
            if(elem._id === id){
                console.log(elem.name)
                change === 'more'? elem.quantity ++ : elem.quantity --;
                itemToUpdate = elem;
                return elem
            }
            else{
                return elem
            }
        })

        axios.put(`${API_URL}/gmao/item/${id}/update/quantity`,{itemToUpdate},{withCredentials: true})
            .then((response)=>{
                setItems(ItemsModified)
                setFilteredItems(ItemsModified)
                 //WHYYYYYYY HAHAHAH can change it with a get request of the warehouses and actualizate the state          
        })
            .catch(()=>{

            })

    }
    const handleSearchItem = (query) =>{
        let cloneOfItems = JSON.parse(JSON.stringify(items));
        let ItemsFiltered = cloneOfItems.filter((elem)=> {
            return elem.name.toUpperCase().includes(query.currentTarget.value.toUpperCase())
        });
        setFilteredItems(ItemsFiltered)
    }
    const handleCreateNewItem = (e) =>{
        e.preventDefault();
        const {name,branch,ref,category,subcategory,unit,commentary,price,warehouse} = e.currentTarget;
        console.log(name.value,branch.value,ref.value, category.value, subcategory.value, unit.value, commentary.value, price.value)
        axios.post(`${API_URL}/gmao/item/create`,{name: name.value,branch: branch.value,ref:ref.value, category:category.value,
        subcategory:subcategory.value,unit: unit.value, commentary: commentary.value, price: price.value, warehouse: warehouse.value },
         {withCredentials: true})
         .then((response)=>{
            let itemsClone = JSON.parse(JSON.stringify(items));
            itemsClone.push(response.data)
            setItems(itemsClone)
         })
    }
    if(!items) return <p>Loading...</p>
    console.log(items)
    return (
        <div id='stocks'>
            <h5 style={{textAlign: 'center', margin: '20px'}}>STOCK</h5>
            <div id='searchCard'>
            <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                Filtrar
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                <input onChange={handleSearchItem}/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
            </div>
            <CreateNewItem onCreate={handleCreateNewItem}/>
            <Table style={{marginTop:'10px'}} id='StocksTable'  striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>Nombre/Marca Modelo - ref || Almacen</th>
                            <th>Categorías</th>
                            <th>Cantidad</th>
                            </tr>
                        </thead>
            {
                filteredItems.map((elem,i)=>{
                    return(
                        <tbody key={i+'item'}>
                            <tr>
                            <td><Nav.Link id='tbleItemName' style={{color: 'white'}} href={`/gamo/item/${elem._id}/details`}><b>
                            {elem.name}</b>/ {elem.branch} - {elem.ref} || {elem.warehouse? elem.warehouse.name: ''}</Nav.Link> </td>
                            <td><b>{elem.category}</b> <small>{elem.subcategory}</small></td>
                            <td id='quitSumSubCell'>
                                {
                                elem.quantity===0 ? <><div><Button id='quitItemBtn' onClick={(e)=>handleDeleteItem(elem._id)}> Quitar</Button></div>
                                <div>
                                <Button disabled={true} className='lbtn' onClick={() =>handleAmountChange('less',elem._id)} variant="danger">-</Button>
                                <label style={{border: 'none', margin: '0px 8px'}}>{elem.quantity}</label>
                                <Button className="general-btn lbtn" onClick={() =>handleAmountChange('more',elem._id)} >+</Button>
                                </div>
                                </> : 
                                <div>
                                <Button className='lbtn' onClick={() =>handleAmountChange('less',elem._id)} variant="danger">-</Button>
                                <label style={{border: 'none', margin: '0px 8px'}}>{elem.quantity}</label>
                                <Button className="general-btn lbtn" onClick={() =>handleAmountChange('more',elem._id)} >+</Button>
                                </div>
                                }
                                
                            </td>
                            </tr>
                        </tbody>
                        
                    )
                })
            }
            </Table>
        </div>
    )
}
