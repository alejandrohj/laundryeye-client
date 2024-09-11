import React, {useState, useEffect} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import {PUBLIC_URL, API_URL} from '../../config';
import axios from 'axios';


export default function SignIn(props) {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`,{withCredentials: true})
            .then((res)=>{
                setLoggedInUser(res.data);
            })
    },[props.loggedInUser])
    
    function myFunction() {
        console.log("jdw")
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }
    
    if(loggedInUser){
        if(loggedInUser.userType ==='admin') return <Redirect to='/'/>
        if(loggedInUser.userType ==='operator') return <Redirect to='/'/>
    }
    return (
        <>
        <div className="signin">
        <p style={{textAlign: 'center', padding: '30px', marginLeft:'5%', marginRight:'5%',color: '#036C9C', fontWeight:'600', fontSize: '25px'}}><em>LaundryEye - Aplicación de gestión de lavanderías</em></p>
        <Card id='siginCard' style={{backgroundColor:'#FEFEFE'}}>
            <Form noValidate className="admin-signinform" onSubmit={props.onSignIn} style={{display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center' ,textAlign: 'center'}}>

                <Form.Group style={{width:'100%'}} controlId="formBasicEmail">
                <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Dirección de correo</Form.Label>
                <Form.Control style={{textAlign: 'center'}} name="email" type="email" placeholder="mantenimiento@lavanderiamogan.com"/>
                <Form.Text className="text-muted">
                    Tu email
                </Form.Text>
                </Form.Group>

                <Form.Group style={{width:'80%'}} controlId="formBasicPassword">
                <Form.Label  style={{color: '#036C9C', fontWeight:'600'}}>Contraseña</Form.Label>
                <Form.Control style={{textAlign: 'center'}} name="password" type="password" placeholder="Contraseña" id="myInput"/>
                <br/>
                <input type="checkbox" onChange={()=>myFunction()}/> Mostrar contraseña
                </Form.Group>
                {
                props.err ? <p style={{color: '#ff2b2b'}}>{props.errorMessage}</p> : <></>
                }
                <Button className="general-btn" type="submit">
                Acceder
                </Button>
            
            </Form>
        </Card>
        </div>
        </>
    )
}
