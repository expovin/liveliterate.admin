import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

class Menu extends Component {

    state = {
        page:"Contents",
        teamPage:"active"
    }

    navClick = (page) => {
        console.log("Hai cliccato su un link : "+page);
        this.setState({page:page});
        this.props.setCurrentPage(page);
    }

  
    render() {
      return(
          <Container>
            <Nav variant="tabs">
                <Nav.Item>
                    {this.state.page === 'Contents' ? <Nav.Link onClick={() => this.navClick('Contents')} active >Contents</Nav.Link> : <Nav.Link onClick={() => this.navClick('Contents')} >Contents</Nav.Link>}
                </Nav.Item>
                <Nav.Item>
                    {this.state.page === 'Team' ? <Nav.Link onClick={() => this.navClick('Team')} active>Team</Nav.Link> : <Nav.Link onClick={() => this.navClick('Team')}>Team</Nav.Link>}
                </Nav.Item>
                <Nav.Item>
                    {this.state.page === 'Courses' ? <Nav.Link onClick={() => this.navClick('Courses')} active >Courses</Nav.Link> : <Nav.Link onClick={() => this.navClick('Courses')}>Courses</Nav.Link>}
                </Nav.Item>
            </Nav>   
          </Container>
    
      )
    }
  
  }
  
  export default Menu;