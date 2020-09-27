import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "../css/styles.css";
import Search from "./Search";
import UserProfile from "./UserProfile";
import Home from "./Home";
import Cocktail from "./Cocktail";
import Authentication from "./Authentication";
import Register from "./Register";
import { connect } from "react-redux";

class Navigation extends Component {
    render() {
        return (
            <div style={{ marginTop: "2%" }}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/cocktail/:id" render={(props) => <Cocktail {...props} />} />
                        <Route exact path="/search">
                            <Search />
                        </Route>
                        <Route exact path="/user" render={
                            // If the user successfully is loged in he will be able to access the user page, otherwise it will redirect to the login page
                            () => {
                                if (this.props.userLogin !== null && this.props.userLogin.data === "Successfully Authenticated") {
                                    return <UserProfile />
                                }
                                else {
                                    return <Redirect to="/user/login" />
                                }
                            }
                        }>
                        </Route>
                        <Route exact path="/user/login" render={
                            // If the user is successfully authenticated it will redirect him to the home page, if not he will go to the authentication page
                            () => {
                                if (this.props.userLogin !== null && this.props.userLogin.data === "Successfully Authenticated") {
                                    return <Redirect to="/" />
                                }
                                else {
                                    return <Authentication />
                                }
                            }
                        } />
                        <Route exact path="/user/register" render={
                            // If the user successfully registerd, he will be redirected to the login page, otherwise he will be able to go to the register page
                            () => {
                                if (this.props.userRegister !== null && this.props.userRegister.data === "User created") {
                                    return <Redirect to="/user/login" />
                                }
                                else {
                                    return <Register />
                                }
                            }
                        }>
                        </Route>
                        <Route render={
                            // Any page that is not routed will route to this as a default Page not found page
                            () => <h3 style={{ color: "white", marginTop: "2%", textAlign: "center" }}>Page Not Found</h3>
                        } />
                    </Switch>
                </Router>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userLogin: state.user.login,
        userRegister: state.user.register
    }
};

export default connect(mapStateToProps)(Navigation);