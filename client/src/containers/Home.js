import React, { Component } from 'react';
import "../css/styles.css";
import { Container,Image } from "react-bootstrap";
import image from "../images/cocktails.jpg";
import { getByIngredient } from "../actions";
import { connect } from "react-redux";
import CocktailShowcase from "../components/CocktailShowcase";
import NavBar from "../components/NavBar";
import {NavLink} from "react-router-dom";

class Home extends Component {
  async componentDidMount() {
    await this.props.getByIngredient("Tequila");
  }
  render() {
    return (
      <Container className="App">
        <Image style={{ width: "100%", height: "31.25rem" }} src={image} fluid />
        <h1 style={{ marginTop: "2%" }}>Welcome to Your Cocktail Cabinet</h1>
        <NavBar />
        <hr style={{marginTop:"3%"}} className="line"/>
        {this.props.ingredient ?
          <div style={{ marginTop: "2%" }}>
            <h2>Tequila cocktails</h2>
            <hr className="line"/>
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
    ingredient: state.cocktails.byIngredient
  }
};
const mapDispatchToProps = {
  getByIngredient
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
