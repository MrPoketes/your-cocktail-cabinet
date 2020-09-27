import React, { Component } from "react";
import "../css/styles.css";
import { getById, unmountById, saveCocktail, unmountSaved } from "../actions";
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import NavBar from "../components/NavBar";
import CocktailInfo from "../components/CocktailInfo";
import { NavLink } from "react-router-dom";

// Global variables
var drinkId = "";
var username = "";

class Cocktail extends Component {
    constructor(props) {
        super(props);
        // Getting the username for saving
        if (this.props.userLogin && this.props.userLogin.data === "Successfully Authenticated") {
            username = JSON.parse(this.props.userLogin.config.data).username;
        }
        // Getting the id of a specific coctail
        drinkId = this.props.match.params.id;
        drinkId = drinkId.replace(":", "");
        // Handle functions
        this.handleSave = this.handleSave.bind(this);
    }
    async componentDidMount() {
        await this.props.getById(drinkId);
    }
    async componentWillUnmount() {
        await this.props.unmountById();
        await this.props.unmountSaved();
    }
    async handleSave() {
        await this.props.saveCocktail(username, this.props.drink.name, this.props.drink.id, this.props.drink.image);
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

                {/* Drink showcase section */}

                {this.props.drink ?
                    <div style={{ marginTop: "2%" }}>
                        <hr className="line" />
                        <h1>{this.props.drink.name}</h1>
                        <hr className="line" />
                        {/* Alert for successfully saved cocktail*/}
                        {this.props.saved !== null && this.props.saved.data === "Successfully posted" ?
                            <Alert variant="success">Successfully saved!</Alert>
                            : <div></div>
                        }
                        {/* Alert if something went wrong saving */}
                        {this.props.saved !== null && this.props.saved.data === "No data provided" ?
                            <Alert variant="danger">Cocktail not saved, something was wrong</Alert>
                            : <div></div>
                        }
                        <Row style={{ marginTop: "4%" }}>
                            <Col>
                                {/* Image */}
                                <Image rounded className="drinkImage" src={this.props.drink.image} />
                            </Col>
                            <Col style={{ marginRight: "1%" }}>
                                {/* Cocktail info section */}
                                <CocktailInfo ingredients={this.props.drink.ingredients} measures={this.props.drink.measures} glass={this.props.drink.glass} category={this.props.drink.category} alcoholic={this.props.drink.alcoholic} instructions={this.props.drink.instructions} />
                                {/* If the user is loged in a save button will appear, so he can save it to his saved cocktails */}
                                {this.props.userLogin !== null && this.props.userLogin.data === "Successfully Authenticated" ?
                                    <Button style={{ marginTop: "2%" }} variant="dark" onClick={this.handleSave}>Save</Button>
                                    : <div></div>
                                }
                            </Col>
                        </Row>
                    </div>
                    : <div></div>
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        drink: state.cocktails.fullDrink,
        userLogin: state.user.login,
        saved: state.user.saved,
    }
};
const mapDispatchToProps = {
    getById,
    unmountById,
    saveCocktail,
    unmountSaved
}

export default connect(mapStateToProps, mapDispatchToProps)(Cocktail);