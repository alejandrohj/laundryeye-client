import React, { Component, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import LoadingPage from './LoadingPage';
import axios from 'axios';
import {API_URL} from '../../config';

export default function AutoSignIn() {

    const [loggedInUser, setLoggednUser] = useState(null);
    const [err, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [redirecting,setRedirecting] = useState (false);

        const email = "alba@laundryeye.com";
        const password = "123456Aa@";
        console.log("autosigning")
    
        axios.post(`${API_URL}/signin`,{email: email, password: password},  {withCredentials: true})
          .then((res)=>{
            setLoggednUser(res.data)
            setRedirecting(true)
          })
          .catch((err) => {
            setError(true);
            let error = err.response.data.error;
            console.log(error)
            setErrorMessage(error);
          })
    if(redirecting) return <Redirect to={'/gmao/laundryMan'}/>
    return (
        <div style={{textAlign:'center', marginTop:'200px'}}>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}
