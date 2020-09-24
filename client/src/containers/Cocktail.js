import React, { Component } from "react";
import "../css/styles.css";

// Global variables
var drinkId = "";
export default class Cocktail extends Component{
    constructor(props){
        super(props);
        drinkId = this.props.match.params.id;
        drinkId = drinkId.replace(":","");
    }
    componentDidMount(){
        console.log(drinkId);
    }
    render(){
        return(
            <div className="App">
                <h1>This is a specific cocktail section</h1>
            </div>
        )
    }
}