import React, { Component } from 'react';
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
//#endregion Components


class App extends Component {

  state = {
    IronsData: [],
    loggedInUser: null
  }
  

  handleSignIn = (e) =>{
    e.preventDefault();
    const {email, password} = e.currentTarget;

    axios.post(`${API_URL}/signin`,{email: email.value, password: password.value},  {withCredentials: true})
      .then((res)=>{
        this.setState({
          loggedInUser: res.data
        })
        window.location.reload(false);
      })
  }

  handleLogOut = () =>{
    console.log('loggingOut')
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
    .then(()=>{
      this.setState({
        loggedInUser: null
      }, ()=>{
        this.props.history.push('/')
      })
    })
  }
  // cleanRealTimeData = () =>{
  //   console.log('cleaning rt')
  //   axios.get(`${API_URL}/rtdata/delete`,{withCredentials: true})
  //     .then((response)=>{
  //       console.log(response)
  //     })
  // }

  componentDidMount = () =>{
    //setInterval(this.cleanRealTimeData,86400000)
    console.log('mounted')
    if(!this.loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          console.log(result.data)
          this.setState({
            loggedInUser: result.data
          })
        })
    }
  }

  render() {
    console.log(this.loggedInUser)
    return (
      <>
      <Navbar handleLogOut={this.handleLogOut} loggedInUser = {this.loggedInUser}/>
      <Switch>
        <Route exact path="/" render={()=>{
          return <Main/>
        }}/>
        <Route path="/signin" render={()=>{
          return <SignIn loggedInUser ={this.loggedInUser} onSignIn = {this.handleSignIn}/>
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
      </Switch>
      </>
    )
  }
}

export default withRouter(App)