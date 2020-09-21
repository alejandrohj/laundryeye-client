import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {API_URL} from './config';

//#region Components
import Main from './components/Main/Main';
//#endregion Components


export default class App extends Component {

  state = {
    IronsData: []
  }
  componentDidMount(){
    axios.get(`${API_URL}/ironsdata`)
      .then((res)=>{
        this.setState({
          IronsData : res.data
        })
      })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={()=>{
          return <Main IronsData = {this.state.IronsData}/>
        }}/>
      </Switch>
    )
  }
}
