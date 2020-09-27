import React, { Component } from 'react';
import "../css/styles.css";
import { Container, Image, Alert } from "react-bootstrap";
import image from "../images/cocktails.jpg";
import { getByIngredient, unmountByIngredient } from "../actions";
import { connect } from "react-redux";
import CocktailShowcase from "../components/CocktailShowcase";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import config from "../config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupLogin: false
    }
  }
  async componentDidMount() {
    await this.props.getByIngredient("Tequila");

    // An alert will popup if the user just loged in and been redirected to the home page
    if (this.props.userLogin !== null && this.props.userLogin.data === "Successfully Authenticated") {
      if (config.popup) {
        this.setState({ popupLogin: true }, () => {
          window.setTimeout(() => {
            this.setState({ popupLogin: false })
          }, 2000)
        })
        config.popup = false;
      }
    }
  }
  async componentWillUnmount() {
    await this.props.unmountByIngredient();
  }
  render() {
    return (
      <Container className="App">
        {/* Alert to notify the user he successfully loged in */}
        {this.state.popupLogin ?
          <Alert style={{ position: "absolute", zIndex: 1, width: "75%" }} variant="success">Successfully loged in</Alert> : <div></div>
        }
        <Image style={{ width: "100%", height: "31.25rem" }} src={image} fluid />
        <h1 style={{ marginTop: "2%" }}>Welcome to Your Cocktail Cabinet</h1>
        <NavBar />
        <hr style={{ marginTop: "3%" }} className="line" />

        {/* Tequila cocktail showcase section */}

        {this.props.ingredient ?
          <div style={{ marginTop: "2%" }}>
            <h2>Tequila cocktails</h2>
            <hr className="line" />
            {this.props.ingredient.drinks.map((data, i) =>
              <NavLink className="navigation" key={i} exact to={`/cocktail/:${data.idDrink}`}><CocktailShowcase key={i} image={data.strDrinkThumb} name={data.strDrink} id={data.idDrink} /></NavLink>
            )}
          </div> : <div></div>
        }
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ingredient: state.cocktails.byIngredient,
    userLogin: state.user.login
  }
};
const mapDispatchToProps = {
  getByIngredient,
  unmountByIngredient
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);