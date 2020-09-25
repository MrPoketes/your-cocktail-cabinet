import React, { Component } from "react";
import "../css/styles.css";
import { getById } from "../actions";
import { connect } from "react-redux";
import { Container, Row, Col,Image } from "react-bootstrap";
import NavBar from "../components/NavBar";
import CocktailInfo from "../components/CocktailInfo";
import {NavLink} from "react-router-dom";

// Global variables
var drinkId = "";

class Cocktail extends Component {
    constructor(props) {
        super(props);
        drinkId = this.props.match.params.id;
        drinkId = drinkId.replace(":", "");
    }
    async componentDidMount() {
        await this.props.getById(drinkId);
    }
    render() {
        return (
            <Container className="App" style={{paddingTop:"1%"}}>
                <h1 style={{ marginBottom: "1%" }}>Navigation</h1>
                <hr className="line"/>
                <NavLink style={{fontSize:"26px"}} className="navigation" exact to="/">Home</NavLink>
                <div style={{marginTop:"1%"}}></div>
                <NavBar />
                {this.props.drink ?
                    <div style={{ marginTop: "2%" }}>
                        <hr className="line" />
                        <h1>{this.props.drink.name}</h1>
                        <hr className="line" />
                        <Row style={{marginTop:"4%"}}>
                            <Col>
                                <Image rounded className="drinkImage" src={this.props.drink.image}/>
                            </Col>
                            <Col style={{marginRight:"1%"}}>
                                <CocktailInfo ingredients={this.props.drink.ingredients} measures={this.props.drink.measures} glass={this.props.drink.glass} category={this.props.drink.category} alcoholic={this.props.drink.alcoholic} instructions={this.props.drink.instructions}/>
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
        drink: state.cocktails.fullDrink
    }
};
const mapDispatchToProps = {
    getById
}

export default connect(mapStateToProps, mapDispatchToProps)(Cocktail);