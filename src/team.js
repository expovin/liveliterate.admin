import React, { Component } from 'react';
import {Form, Button, ButtonGroup, Container, Card, Col, Row, Alert} from 'react-bootstrap';

class Team extends Component {

    state = {
        team:[],
        data:{}
    }

    team=[];

    manageData = (e) => {
        if(e.target.type ==="file") {
            console.log("Processing file");
            this.saveFile(e.target.files[0])
            .then(result => console.log(result))
            .catch(error => console.error(error))
        } else {
            console.log(e.target.id+") "+e.target.getAttribute('name')+":"+e.target.value);
            this.team[e.target.id-1][e.target.name]=e.target.value;
            this.setState({team:this.team});
        }

    }

    saveFile = (file) => {
        
        //const file = e.target.files[0];

        return new Promise ((fulfill, reject) => {
            let reader = new FileReader();

            reader.onload = (event) => {
                fulfill(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsBinaryString(file)
        })

    }

    saveTeamMember = (id) => {
        console.log("Selezionato : "+id);
        let teamMember = this.state.team.filter(member => member.id===id);
        console.log(teamMember[0]);

        this.props.saveTeam(teamMember[0])
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

    teamMembers = () => {

        let team=null;
        if(this.state.team){
            team = this.state.team.map((ele) => 
                    <Card key={ele.id}>
                        <Card.Body>
                            <Card.Title>{ele.name}</Card.Title>
                            <Card.Text>
                                <Row>
                                    <Col>
                                        <Card.Img variant="top" src={ele.picture} high="100px"/>
                                        <Form.Group controlId={ele.id} className="mb-3">
                                            <Form.Label>Select Picture</Form.Label>
                                            <Form.Control type="file" name="new_picture" onChange={this.manageData} accept="image/png, image/jpeg"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId={ele.id} >
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={ele.name} name="name" onChange={this.manageData}/>
                                            </Form.Group>  

                                            <Form.Group className="mb-3" controlId={ele.id} >
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" value={ele.title} name="title" onChange={this.manageData}/>
                                            </Form.Group>        

                                            <Form.Group className="mb-3" controlId={ele.id}>
                                                <Form.Label>Quote</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={ele.quote} name="quote" onChange={this.manageData}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId={ele.id} >
                                                <Form.Label>twitter</Form.Label>
                                                <Form.Control type="text" value={ele.twitter} name="twitter" onChange={this.manageData}/>
                                            </Form.Group>        

                                            <Form.Group className="mb-3" controlId={ele.id} >
                                                <Form.Label>facebook</Form.Label>
                                                <Form.Control type="text" value={ele.facebook} name="facebook" onChange={this.manageData}/>
                                            </Form.Group>        

                                            <Form.Group className="mb-3" controlId={ele.id} >
                                                <Form.Label>instagram</Form.Label>
                                                <Form.Control type="text" value={ele.instagram} name="instagram" onChange={this.manageData}/>
                                            </Form.Group>        

                                            <Form.Group className="mb-3" controlId={ele.id} >
                                                <Form.Label>linkedin</Form.Label>
                                                <Form.Control type="text" value={ele.linkedin} name="linkedin" onChange={this.manageData}/>
                                            </Form.Group>        

                                            <Form.Group className="mb-3" controlId={ele.id} >
                                                <Form.Label>email</Form.Label>
                                                <Form.Control type="email" value={ele.email} name="email" onChange={this.manageData}/>
                                            </Form.Group> 

                                        </Form>                                
                                    </Col>
                                </Row>

                            </Card.Text>
                            <Button variant="primary" onClick={() => this.saveTeamMember(ele.id)}>Save</Button>
                        </Card.Body>
                    </Card>            
            )
        }


        return(team);
    }

    componentDidMount() {
        this.props.getTeam()
        .then(team => {
            this.team=team;
            this.setState({team:team})
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <Container>
                {this.teamMembers()}
            </Container>

        )
    }

}

export default Team;