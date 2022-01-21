import React, { Component } from 'react';
import axios from 'axios';

import Menu from './menu';
import Content from './content';
import Team from './team';

import './App.css';


axios.interceptors.request.use( request =>{
  /** 
   * Qui è possibile editare qualsiasi request in uscita
   * ad esempio aggiungere headers variable 
   * */ 


   return (request)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in spedizione di requests
   */

   console.log("Errore nella spedizione della request. E' possibile gestirla globalmente da index.js")
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})

axios.interceptors.response.use( response =>{
  /**
   * Qui è possibile editare qualsiasi response in entrata
   * */ 


   return (response)
}, error => {
  /** 
   * Qui è possibile gestire centralmente tutti gli errori
   * in ricezione di response
   */
        

   
   // Rimando il controllo al componente locale
   return Promise.reject(error);
})



class App extends Component {

  state = {
    wellcome:"Ciao Mondo!",
    currentPage:"Contents"
  }

  getContents = () =>{
    return new Promise ( (fulfill, reject) => {
      axios('/api/contents/')
      .then( result => fulfill(result.data.contents))
      .catch(error => console.log(error))
    })
  }

  saveContents = (id, content) =>{
    return new Promise ( (fulfill, reject) => {
      axios.put('/api/contents/',{id:id, content:content})
      .then( result => fulfill(result.data.contents))
      .catch(error => console.log(error))
    })
  }  

  getCourses = () =>{
    return new Promise ( (fulfill, reject) => {
      axios('/api/courses/')
      .then( result => fulfill(result.data.contents))
      .catch(error => console.log(error))
    })
  }
  
  getTeam = () =>{
    return new Promise ( (fulfill, reject) => {
      axios('/api/team/')
      .then( result => fulfill(result.data.contents))
      .catch(error => console.log(error))
    })
  }  

  saveTeam = (teamMember) => {
    console.log(teamMember)
    return new Promise ( (fulfill, reject) => {
      axios.put('/api/team/',teamMember)
      .then( result => fulfill(result.data.contents))
      .catch(error => console.log(error))
    })    
  }

  setCurrentPage = (page) => { this.setState({currentPage:page})}


  showCurrentPage = () => {
    switch(this.state.currentPage) {
      case "Contents" : return(        <Content getContents={this.getContents} 
                                                saveContents={this.saveContents}/>)
                        break;

      case "Team" :       return(       <Team getTeam={this.getTeam}
                                              saveTeam={this.saveTeam}/>)
                        break;
    }
  }

  render() {
    return(
      <div>
        <Menu setCurrentPage={this.setCurrentPage}/>
        {this.showCurrentPage()}
      </div>

    )
  }

}

export default App;
