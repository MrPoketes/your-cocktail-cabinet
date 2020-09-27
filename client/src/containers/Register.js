import React, { Component } from "react";
import "../css/styles.css";
import { Container, Alert } from "react-bootstrap";
import AuthenticationForm from "../components/AuthenticationForm";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import { register } from "../actions";

class Register extends Component {
    constructor(props) {
        super(props);
        // Handle functions
        this.handleRegister = this.handleRegister.bind(this);
    }
    async handleRegister(username, password) {
        await this.props.register(username, password);
    }
    render() {
        return (
            <Container className="App" style={{ paddingTop: "1%" }}>
                {/* Navigation */}
                <h1 style={{ marginBottom: "1%" }}>Navigation</h1>
                <hr className="line" />
                <NavLink style={{ fontSize: "26px" }} className="navigation" exact to="/">Home</NavLink>
                <div style={{ marginTop: "1%" }}></div>
                <NavBar />

                {/* Register section */}

                <h2 style={{ marginTop: "2%" }}>Register</h2>
                <hr className="line" />
                {/* Alert if the user already exists */}
                {this.props.registerUser !== null && this.props.registerUser.data === "User Already exists" ?
                    <Alert variant="danger">User already exists</Alert>
                    : <div></div>
                }
                <AuthenticationForm handleSubmit={this.handleRegister} button="Register" />
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        registerUser: state.user.register
    }
};
const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);