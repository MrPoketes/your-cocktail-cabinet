import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Button, Alert } from "react-bootstrap";

export default class AuthenticationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correct: true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        let username = ReactDOM.findDOMNode(this.refs.username).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        if (username !== "" && password !== "") {
            this.setState({
                correct: true
            });
            this.props.handleSubmit(username, password);
        }
        else {
            this.setState({
                correct: false
            })
        }
    }
    render() {
        return (
            <div style={{ marginTop: "2%" }}>
                {this.state.correct ?
                    <div></div>
                    : <Alert variant="danger">Please fill out every section</Alert>
                }
                <Form style={{ width: "30%", marginLeft: "35%", marginRight: "33%" }}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label style={{ fontFamily: "Nunito Sans" }}>Username</Form.Label>
                        <Form.Control style={{ fontFamily: "Nunito Sans" }} ref="username" type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{ fontFamily: "Nunito Sans" }}>Password</Form.Label>
                        <Form.Control style={{ fontFamily: "Nunito Sans" }} ref="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button onClick={this.handleClick} variant="dark">{this.props.button}</Button>
                </Form>
            </div>
        )
    }
}