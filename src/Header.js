import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap';

class Header extends Component {

  
    render() {
      return(
        <Jumbotron>
            <h1>Regular, Jumbotron!</h1>
            <p>
            This is a simple Jumbotron example.
            </p>
        
      </Jumbotron>
    
      )
    }
  
  }
  
  export default Header;