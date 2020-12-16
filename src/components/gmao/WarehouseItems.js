import React from 'react'
import axios from 'axios';
import {Table} from 'react-bootstrap';
import {API_URL} from '../../config';


import AddNewItem from './AddNewItem';

export default function WarehouseItems(props) {

    //Add the new item to the warehouse documment 
    const handleAddNewItemToWarehouse = (e)=>{
        e.preventDefault();
        const {item} = e.currentTarget;
        const{_id, stock} = props.warehouse;
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
    if(!props.warehouse){return <p>Loging...</p>}
    return (
        <div>
            <h4>STOCK</h4>
            <Table style={{marginTop:'20px'}} striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Marca/Modelo</th>
                            <th>Referencia</th>
                            <th>Categoría</th>
                            <th>SubCategoría</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                            <th>Comentario</th>
                            </tr>
                        </thead>
            {
                props.warehouse.stock.map((elem,i)=>{
                    return(
                        <tbody key={i,'item'}>
                            <tr>
                            <td>{i}</td>
                            <td>{elem.itemId.name}</td>
                            <td>{elem.itemId.branch}</td>
                            <td>{elem.itemId.ref}</td>
                            <td>{elem.itemId.category}</td>
                            <td>{elem.itemId.subcategory}</td>
                            <td>{elem.itemId.price}</td>
                            <td>{elem.quantity}</td>
                            <td></td>
                            <td>{elem.itemId.commentary}</td>
                            </tr>
                        </tbody>
                        
                    )
                })
            }
            </Table>
            <AddNewItem onCreate={handleAddNewItemToWarehouse}/>
        </div>
    )
}
