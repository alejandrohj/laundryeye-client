import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Table,Button} from 'react-bootstrap';
import {API_URL} from '../../config';


import AddNewItem from './AddNewItem';

export default function WarehouseItems(props) {
    const [warehousetoDisplay, setWarehousetoDisplay] = useState(props.warehouse);
    //Add the new item to the warehouse documment 
    const handleAddNewItemToWarehouse = (e)=>{
        e.preventDefault();
        const {item} = e.currentTarget;
        const{_id, stock} = warehousetoDisplay;
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
                setWarehousetoDisplay(response.data) //WHYYYYYYY HAHAHAH
                setWarehousetoDisplay(updatedWarehouse)
        })
        // let orderItems = localStorage.getItem('order')
        // let parseOrder = JSON.parse(orderItems)
        // console.log(parseOrder)
    }

    if(!warehousetoDisplay){return <p>Loging...</p>}
    console.log(warehousetoDisplay)
    return (
        <>
            <h4>STOCK</h4>
            <Table id='StocksTable' style={{marginTop:'20px'}} striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre/Marca-Modelo,ref</th>
                            <th>Categorías</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            </tr>
                        </thead>
            {
                warehousetoDisplay.stock.map((elem,i)=>{
                    return(
                        <tbody key={i+'item'}>
                            <tr>
                            <td>{i}</td>
                            <td>{elem.itemId.name} {elem.itemId.branch} {elem.itemId.ref}</td>
                            <td>{elem.itemId.category} {elem.itemId.subcategory}</td>
                            <td>{elem.itemId.price}</td>
                            <td style={{}}>
                                {
                                elem.quantity===0 ? <Button disabled={true} className='lbtn' onClick={() =>handleAmountChange('less',elem.itemId.name)} variant="danger">-</Button> : 
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
            <AddNewItem onCreate={handleAddNewItemToWarehouse}/>
        </>
    )
}
