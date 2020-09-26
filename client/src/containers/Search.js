import React, { Component } from "react";
import "../css/styles.css";
import { Container, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import { connect } from "react-redux";
import { getByIngredient, getByName, unmountByIngredient, unmountByName } from "../actions";
import CocktailShowcase from "../components/CocktailShowcase";
// Global variables

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            padding: "15%",
            searchBy: "Search by name"
        };
        this.handleClickName = this.handleClickName.bind(this);
        this.handleClickIng = this.handleClickIng.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleClickName() {
        this.setState({
            searchBy: "Search by name"
        });
    }
    handleClickIng() {
        this.setState({
            searchBy: "Search by ingredient"
        });
    }
    async handleSearch(input, by) {
        this.setState({
            padding: "2%"
        });
        if (by === "Search by name") {
            await this.props.getByName(input);
        }
        else if (by === "Search by ingredient") {
            await this.props.getByIngredient(input);
        }
    }
    async componentWillUnmount() {
        await this.props.unmountByIngredient();
        await this.props.unmountByName();
    }
    render() {
        const styles = {
            containerStyle: {
                paddingTop: "1%",
                paddingBottom: this.state.padding
            }
        }
        return (
            <Container className="App" style={styles.containerStyle}>
                <h1 style={{ marginBottom: "1%" }}>Navigation</h1>
                <hr className="line" />
                <NavLink style={{ fontSize: "26px" }} className="navigation" exact to="/">Home</NavLink>
                <div style={{ marginTop: "1%" }}></div>
                <NavBar />
                <hr className="line" />
                <h1 style={{ marginTop: "2%" }}>Search Section</h1>
                <hr className="line" />
                <div style={{ marginTop: "2%" }}>
                    <Button onClick={this.handleClickName} variant="dark" style={{ marginRight: "1%" }}>Search by name</Button>
                    <Button onClick={this.handleClickIng} variant="dark" style={{ marginLeft: "1%" }}>Search by ingredient</Button>
                </div>
                <Searchbar search={this.handleSearch} by={this.state.searchBy} />

                {(this.props.name !== null) || (this.props.ingredient !== null) ?
                    <div>
                        {this.props.name ?
                            <div>
                                {this.props.name.drinks.map((data, i) =>
                                    <NavLink key={i} className="navigation" exact to={`/cocktail/:${data.idDrink}`}><CocktailShowcase key={i} image={data.strDrinkThumb} name={data.strDrink} id={data.idDrink} /></NavLink>
                                )}
                            </div> : <div></div>
                        }
                        {this.props.ingredient ?
                            <div>
                                {this.props.ingredient.drinks.map((data, i) =>
                                    <NavLink key={i} className="navigation" exact to={`/cocktail/:${data.idDrink}`}><CocktailShowcase key={i} image={data.strDrinkThumb} name={data.strDrink} id={data.idDrink} /></NavLink>
                                )}
                            </div> : <div></div>
                        }
                    </div> : <div></div>
                }
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ingredient: state.cocktails.byIngredient,
        name: state.cocktails.byName
    }
};
const mapDispatchToProps = {
    getByIngredient,
    getByName,
    unmountByIngredient,
    unmountByName
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);