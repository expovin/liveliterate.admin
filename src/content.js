import React, { Component } from 'react';
import {Form, Button, ButtonGroup, Container, Card, Col, Row, Alert} from 'react-bootstrap';


class Content extends Component {

    state = {
        contents:[],
        data : {
        },
        log:{
            variant:null,
            message:null,
            show:false
        }     
    }


    componentDidMount() {
        let data={};
        this.props.getContents()
        .then(contents => {
            this.setState({contents:contents})
            contents.forEach(ele => ele.Content ? data[ele.id]=ele.Content : data[ele.id]="");
            this.setState({data:data});
        })
        .catch(error => console.log("Error while getting contents "+error));        
    }

    handleChange= (e) => {
        console.log(e.target.id+":"+e.target.value);
        let data = this.state.data;
        data[e.target.id] = e.target.value;
        this.setState({data:data});

    }

    saveToDB = (id) => {
        console.log("Id to save : "+id);
        this.props.saveContents(id, this.state.data[id])
        .then(result => {
            let log={};
            log['variant']='success';
            log['message']="Success, change "+result.affectedRows+" rows";
            log['show']=true;
            log['id']=id;
            this.setState({log:log})
        })
        .catch(error => {
            let log={};
            log['variant']='danger';
            log['message']="Error: "+error;
            log['show']=true;
            log['id']=id;
            this.setState({log:log})            
        })
    }

    resetLog = () => {
        let log={
            variant:null,
            message:null,
            show:false
        };

        this.setState({log:log})
    }

    

    property = () => {
        let snippet = this.state.contents.map(c => {

            //this.data[c.Lable]=c.Content;
            return(
                <Card key={c.id}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group key={c.id} className="mb-3" controlId={c.id}>
                                <Form.Label>{c.Lable}</Form.Label>
                                {c.type == 'textarea' ? <Form.Control as="textarea" rows={3} value={this.state.data[c.id]} onChange={this.handleChange}/> : 
                                                        <Form.Control type={c.type} value={this.state.data[c.id]} onChange={this.handleChange}/>}                
                                </Form.Group> 
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Text>
                        {c.Help}
                    </Card.Text>
                    <Card.Footer>
                        <Row>
                        <Col>
                                <ButtonGroup aria-label="Actions">
                                    <Button variant="success" onClick={() => this.saveToDB(c.id)}>Save</Button>
                                    <Button variant="warning">Cancel</Button>
                                </ButtonGroup>   
                            </Col>
                            <Col>
                                {this.state.log.show && this.state.log.id === c.id? 
                                    <Alert variant={this.state.log.variant} onClose={this.resetLog} dismissible >
                                        {this.state.log.message}
                                    </Alert>

                                : null}
                                
                            </Col>
                        </Row>

                    </Card.Footer>
  
                 
                </Card>
               
            )
        })
        return (snippet);
    }
  
    render() {
      return(
          <Container>
              {this.property()}
          </Container>
    
      )
    }
  
  }
  
  export default Content;