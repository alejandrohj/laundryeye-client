import React, { Component, useState, useEffect } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {API_URL} from './config';

//#region Components
import Navbar from './components/Main/Navbar';
import Main from './components/Main/Main';
import CagesWasher from './components/cageWasher/CageWasher';
import SignIn from './components/auth/SignIn';
import Gmao from './components/gmao/GMAO';
import Stock from './components/gmao/Stock';
import ItemDetails from './components/gmao/ItemDetails';
import UsersAdmin from './components/Main/UsersAdministracion';
import Warehouses from './components/gmao/Warehouses';

//#endregion Components

function App() {
  const [loggedInUser, setLoggednUser] = useState(null);
  const [err, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [IronsData, setIronsData] = useState(null);
  
  const handleSignIn = (e) =>{
    e.preventDefault();
    const {email, password} = e.currentTarget;

    axios.post(`${API_URL}/signin`,{email: email.value, password: password.value},  {withCredentials: true})
      .then((res)=>{
        setLoggednUser(res.data)
        window.location.reload(false);
      })
      .catch((err) => {
        setError(true);
        let error = err.response.data.error;
        console.log(error)
        setErrorMessage(error);
      })
  }

  const handleLogOut = () =>{
    console.log('loggingOut')
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
    .then(()=>{
      setLoggednUser(null)
    })
    .then(()=>{
      window.location.reload(false);
    })
  }
  // cleanRealTimeData = () =>{
  //   console.log('cleaning rt')
  //   axios.get(`${API_URL}/rtdata/delete`,{withCredentials: true})
  //     .then((response)=>{
  //       console.log(response)
  //     })
  // }

  useEffect(() => {
    if(!loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggednUser(result.data)
        })
    }
  }, [])

    return (
      <>
      <Navbar handleLogOut={handleLogOut} loggedInUser = {loggedInUser}/>
      <Switch>
        <Route exact path="/" render={()=>{
          return <Main/>
        }}/>
        <Route path="/signin" render={()=>{
          return <SignIn 
            loggedInUser ={loggedInUser} 
            onSignIn = {handleSignIn}
            err= {err}
            errorMessage={errorMessage}
            />
        }}/>
        <Route path="/cageswasher" render={()=>{
          return <CagesWasher/>
        }}/>
        <Route exact path="/gmao" render={()=>{
          return <Gmao/>
        }}/>
        <Route path="/gmao/stock" render={()=>{
          return <Stock/>
        }}/>
        <Route path="/gmao/users" render={()=>{
          return <UsersAdmin/>
        }}/>
        <Route path="/gamo/item/:id/details" render={(routeProps) => {
          return <ItemDetails 
                    {...routeProps} 
                    loggedInUser={loggedInUser}
                  />
        }}/>
        <Route path="/gmao/warehouses" render={()=>{
          return <Warehouses/>
        }}/>
      </Switch>
      </>
    )
}

export default withRouter(App)