import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Table,Button,Nav} from 'react-bootstrap';
import {API_URL} from '../../config';


import AddNewItem from './AddNewItem';

export default function WarehouseItems(props) {
    const [warehousetoDisplay, setWarehousetoDisplay] = useState(props.warehouse);
    //Add the new item to the warehouse documment 
    const handleAddNewItemToWarehouse = (e)=>{
        e.preventDefault();
        const {item} = e.currentTarget; //Almacenamos el item que queremos añadir al almacen
        const{_id, stock} = warehousetoDisplay; //Almacenamos el id y el array stock del alamcen actual
        let newStock =[];
        console.log(stock)
        const newItem = {itemId:item.value, quantity: 1}
        if(stock.length !==0){
            const stockClone = JSON.parse(JSON.stringify(stock));
            console.log(stockClone)
            stockClone.push(newItem);
            newStock = stockClone;
            console.log(stockClone)
            console.log('if')
        }
        else{
            newStock = [newItem]
        }
        console.log(newStock);
        axios.post(`${API_URL}/gmao/warehouse/${_id}/update`,{stock: newStock},{withCredentials: true})
            .then((response)=>{
                window.location.reload(false);
        })
    }

    const handleCreateNewItem = (e)=> {
        e.preventDefault();
        const {name,branch,ref,category,subcategory,unit,commentary,price} = e.currentTarget;
        console.log(name.value,branch.value,ref.value, category.value, subcategory.value, unit.value, commentary.value, price.value)
        axios.post(`${API_URL}/gmao/item/create`,{name: name.value,branch: branch.value,ref:ref.value, category:category.value,
        subcategory:subcategory.value,unit: unit.value, commentary: commentary.value, price: price.value },
         {withCredentials: true})
            .then((result)=>{
                //Check to create a component, cause its used two times
                const item =result.data;
                const{_id, stock} = warehousetoDisplay; //Almacenamos el id y el array stock del alamcen actual
                let newStock =[];
                console.log(item)
                const newItem = {itemId:item, quantity: 1} //Cuidado en este caso no hace falta acceder a value
                if(stock.length !==0){
                    const stockClone = JSON.parse(JSON.stringify(stock));
                    console.log(stockClone)
                    stockClone.push(newItem);
                    newStock = stockClone;
                    console.log(stockClone)
                    console.log('if')
                }
                else{
                    newStock = [newItem]
                }
                console.log(newStock);
                axios.post(`${API_URL}/gmao/warehouse/${_id}/update`,{stock: newStock},{withCredentials: true})
                    .then((response)=>{
                        //window.location.reload(false);
                })
            })
    }
    
    const handleAmountChange = (change,name) =>{
        let cloneOfItems = JSON.parse(JSON.stringify(warehousetoDisplay.stock));
        let ItemsModified = cloneOfItems.map((elem)=>{
            if(elem.itemId.name === name){
                console.log(elem.name)
                change === 'more'? elem.quantity ++ : elem.quantity --;
                return elem
            }
            else{
                return elem
            }
        })
        let updatedWarehouse  = warehousetoDisplay;
        updatedWarehouse.stock = ItemsModified;
        console.log(updatedWarehouse)
        axios.post(`${API_URL}/gmao/warehouse/${warehousetoDisplay._id}/update`,{stock: ItemsModified},{withCredentials: true})
            .then((response)=>{
                setWarehousetoDisplay(response.data) //WHYYYYYYY HAHAHAH can change it with a get request of the warehouses and actualizate the state
                setWarehousetoDisplay(updatedWarehouse)
        })
        // let orderItems = localStorage.getItem('order')
        // let parseOrder = JSON.parse(orderItems)
        // console.log(parseOrder)
    }
    const handleDeleteItemFromWarehouse = (id) =>{
        let itemsModified = warehousetoDisplay.stock.filter((elem)=>{
            return elem.itemId._id !== id
        })
        let updatedWarehouse  = warehousetoDisplay;
        updatedWarehouse.stock = itemsModified;
        axios.post(`${API_URL}/gmao/warehouse/${warehousetoDisplay._id}/update`,{stock: itemsModified},{withCredentials: true})
        .then((response)=>{
            setWarehousetoDisplay(response.data)
            setWarehousetoDisplay(updatedWarehouse)
    })
    }

    if(!warehousetoDisplay){return <p>Loging...</p>}
    console.log(warehousetoDisplay)
    return (
        <>
            <h6>STOCK</h6>
            <Table style={{marginTop:'10px'}} id='StocksTable'  striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>Nombre/Marca-Modelo,ref</th>
                            <th>Categorías</th>
                            <th>Cantidad</th>
                            </tr>
                        </thead>
            {
                warehousetoDisplay.stock.map((elem,i)=>{
                    return(
                        <tbody key={i+'item'}>
                            <tr>
                            <td><Nav.Link style={{color: 'white'}} href={`/gamo/item/${elem.itemId._id}/details`}><b>
                            {elem.itemId.name}</b>/ {elem.itemId.branch} - {elem.itemId.ref}</Nav.Link> </td>
                            <td><b>{elem.itemId.category}</b> <small>{elem.itemId.subcategory}</small></td>
                            <td style={{}}>
                                {
                                elem.quantity===0 ? <><Button id='quitItemBtn' onClick={(e)=>handleDeleteItemFromWarehouse(elem.itemId._id)}> Quitar</Button>
                                <Button disabled={true} className='lbtn' onClick={() =>handleAmountChange('less',elem.itemId.name)} variant="danger">-</Button>
                                </> : 
                                <Button className='lbtn' onClick={() =>handleAmountChange('less',elem.itemId.name)} variant="danger">-</Button>
                                }
                                <label style={{border: 'none', margin: '0px 8px'}}>{elem.quantity}</label>
                                <Button className="general-btn lbtn" onClick={() =>handleAmountChange('more',elem.itemId.name)} >+</Button>
                            </td>
                            </tr>
                        </tbody>
                        
                    )
                })
            }
            </Table>
            <AddNewItem onCreate={handleAddNewItemToWarehouse} onCreateNewItem={handleCreateNewItem}/>
        </>
    )
}
