import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";

class App extends Component {
  componentDidMount(){
    document.title = "Cyber Hacker WiFi"
  }

  constructor(props) {
    super(props);
    this.state = {
      User: {
        name: "",
        group: "",
        team_name: "",
      }
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const User = { ...this.state.User, [name]: value };

    this.setState({ User });
  };

  handleSubmit = (user) => {
    axios.post("/api/user/", user)
  }

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={this.state.User.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="group">Group</Label>
              <Input
                type="text"
                id="group"
                name="group"
                value={this.state.User.group}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="team_name">Team Name</Label>
              <Input
                type="text"
                id="team_name"
                name="team_name"
                value={this.state.User.team_name}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => this.handleSubmit(this.state.User)}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default App;
