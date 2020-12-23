import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Card} from 'react-bootstrap';
import {API_URL} from '../../config';

import CreateNewUser from './CreateNewUser';

export default function UsersAdministracion() {

    const[loggedInUser,setLoggedInUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/user/all`,{withCredentials: true})
            .then((response)=>{
                setAllUsers(response.data)
            })
    },[])
    const handleCreateUser = (e) =>{
        e.preventDefault();
        const {userName, firstName, lastName, email, password, userType} = e.currentTarget;
        axios.post(`${API_URL}/signup`,{userName:userName.value, firstName: firstName.value, lastName: lastName.value,
            email: email.value,password: password.value, userType: userType.value },
        {withCredentials:true})
            .then((response)=>{
                window.location.reload(false);
            })
    }
    if(redirecting) return <Redirect to={'/signin'}/>
    if(!loggedInUser || !allUsers)return <p>Loading...</p>
    return (
        <>
            <CreateNewUser loggedInUser ={loggedInUser} onCreate={handleCreateUser}/>
            <div>
                {
                        allUsers.map((elem,i)=>{
                            return(
                                <Card style={{margin: '20px'}}>
                                    <Card.Header>
                                        {elem.userName}
                                    </Card.Header>
                                    <Card.Body>
                                        <p>Nombre: {elem.firstName}</p>
                                        <p>Apellidos: {elem.lastName}</p>
                                        <p>Email: {elem.email}</p>
                                        <p>Acceso: {elem.userType}</p>
                                    </Card.Body>
                                </Card>
                            )
                        })
                }
            </div>
        </>
    )
}
