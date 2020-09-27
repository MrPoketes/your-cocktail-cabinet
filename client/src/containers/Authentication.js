import React, { Component } from "react";
import "../css/styles.css";
import { Container, Alert } from "react-bootstrap";
import AuthenticationForm from "../components/AuthenticationForm";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions";

class Authentication extends Component {
    constructor(props) {
        super(props);
        // Handle functions
        this.handleLogin = this.handleLogin.bind(this);
    }
    async handleLogin(username, password) {
        await this.props.login(username, password);
    }
    render() {
        return (
            <Container className="App" style={{ paddingTop: "1%" }}>
                {/* Navigation section */}
                <h1 style={{ marginBottom: "1%" }}>Navigation</h1>
                <hr className="line" />
                <NavLink style={{ fontSize: "26px" }} className="navigation" exact to="/">Home</NavLink>
                <div style={{ marginTop: "1%" }}></div>
                <NavBar />

                {/* Login section */}

                <h2 style={{ marginTop: "2%" }}>Login</h2>
                <hr className="line" />
                {/* Alert if user is not found */}
                {this.props.userLogin !== null && this.props.userLogin.data === "No User Found" ?
                    <Alert variant="danger">No user found. Please check your username and/or password</Alert>
                    : <div></div>
                }
                {/* Alert if the user is successfully registered */}
                {this.props.userRegister !== null && this.props.userRegister.data === "User created" ?
                    <Alert variant="success">Successfully registered! Now you can login</Alert>
                    : <div></div>
                }
                {/* Alert when the user logs out */}
                {this.props.userLogin !== null && this.props.userLogin === "Loged out" ?
                    <Alert variant="success">Successfully loged out</Alert>
                    : <div></div>
                }
                {/* Login form */}
                <AuthenticationForm handleSubmit={this.handleLogin} button="Login" />
                {/* If the user has registered there is no need to give him an option to register */}
                {this.props.userRegister !== null && this.props.userRegister.data === "User created" ?
                    <div></div> :
                    <div>
                        <h3 style={{ marginTop: "2%" }}>Don't have an account?</h3>
                        <NavLink className="navigation" exact to="/user/register">Register here</NavLink>
                    </div>
                }
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userLogin: state.user.login,
        userRegister: state.user.register
    }
};
const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);