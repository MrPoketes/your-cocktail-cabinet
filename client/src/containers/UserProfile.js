import React, { Component } from "react";
import "../css/styles.css";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import { getCocktails, deleteCocktail, logout, unmountLogin } from "../actions";
import CocktailShowcase from "../components/CocktailShowcase";
import config from "../config";

// Global variables
var username = "";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        // Getting the username needed to fetch data and also show
        if (this.props.userLogin && this.props.userLogin.data === "Successfully Authenticated") {
            username = JSON.parse(this.props.userLogin.config.data).username;
        }
        // Handle functions
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    async componentDidMount() {
        await this.props.getCocktails(username);
        await console.log(this.props.userCocktails);
    }
    async handleDelete(id) {
        // Deleting cocktail and then getting the rest of cocktails without the deleted record
        await this.props.deleteCocktail(username, id);
        setTimeout(async () => {
            await this.props.getCocktails(username);
        }, 500);
    }
    async handleLogout() {
        await this.props.logout();
        setTimeout(async () => {
            await this.props.unmountLogin();
        }, 1000);
        config.popup = true;
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

                {/* User profile section */}

                <hr className="line" />
                <h2 style={{ marginTop: "2%" }}>Hello {username}!</h2>
                <Button style={{ marginBottom: "1%" }} variant="outline-dark" onClick={this.handleLogout}>Logout</Button>
                <h3>These are your saved cocktails</h3>
                <hr className="line" />
                {/* If the user has any saved cocktails, they will be showcased.If not it will print out that there are no saved cocktails */}
                {this.props.userCocktails !== null && this.props.userCocktails[0].cocktails.length !== 0 ?
                    <div>
                        {this.props.userCocktails[0].cocktails.map((data, i) =>
                            <div key={i} style={{ marginTop: "1%", display: "inline-block" }}>
                                <NavLink className="navigation" key={i} exact to={`/cocktail/:${data.id}`}><CocktailShowcase key={i} image={data.image} name={data.name} /></NavLink>
                                <Button className="deleteButton" variant="dark" onClick={() => this.handleDelete(data.id, data.name)}>Delete</Button>
                            </div>
                        )}
                    </div>
                    : <h5 style={{ marginTop: "2%" }}>You have not saved any cocktails</h5>
                }
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userLogin: state.user.login,
        userCocktails: state.user.userCocktails,
        deleted: state.user.deleted
    }
};
const mapDispatchToProps = {
    getCocktails,
    deleteCocktail,
    logout,
    unmountLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);