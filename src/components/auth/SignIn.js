import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
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
    console.log(loggedInUser)
    if(loggedInUser){
        if(loggedInUser.userType ==='admin') return <Redirect to='/'/>
    }
    return (
        <>
        <div className="signin" >
        <p style={{textAlign: 'center', padding: '30px', marginLeft:'5%', marginRight:'5%',color: '#036C9C', fontWeight:'600', fontSize: '25px'}}><em>Ordena y organiza tu lencería con myLinen</em></p>
        <Form noValidate className="admin-signinform" onSubmit={props.onSignIn} style={{display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center' ,textAlign: 'center'}}>
            <Form.Group style={{width:'50%'}} controlId="formBasicEmail">
            <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Dirección de correo</Form.Label>
            <Form.Control  name="email" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                Tu email
            </Form.Text>
            </Form.Group>

            <Form.Group style={{width:'50%'}} controlId="formBasicPassword">
            <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Contraseña</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
            <Form.Text className="text-muted">
                Si no recuerdas tu contraseña, llamanos
            </Form.Text>
            </Form.Group>
            {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
            }
            <Button style={{fontSize: '20px'}} className="general-btn" variant="primary" type="submit">
            Registrarse
            </Button>
        </Form>
        </div>
        </>
    )
}
