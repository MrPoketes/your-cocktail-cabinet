import React, { Component } from "react";
import "../css/styles.css";
import { Container } from "react-bootstrap";

// TODO: implement login and register, if the user is not logged in
// if he is show all his saved cocktails
// Let him see more info about them when clicked on a specific cocktail
// Let the user delete cocktails from his saved ones
export default class UserProfile extends Component {
    render() {
        return (
            <Container className="App">
                <h1>This is the user profile page. Will implement after adding backend to the website</h1>
            </Container>
        )
    }
}