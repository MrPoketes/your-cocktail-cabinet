import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";
import "../css/styles.css";
import SearchName from "./SearchName";
import SearchIngredient from "./SearchIngredient";
import UserProfile from "./UserProfile";
import Home from "./Home";
import Cocktail from "./Cocktail";

export default class Navigation extends Component {
    render() {
        return (
            <div style={{ marginTop: "2%" }}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/cocktail/:id" render={(props) => <Cocktail {...props}/>}/>
                        <Route exact path="/searchName">
                            <SearchName/>
                        </Route>
                        <Route exact path="/searchIngredient">
                            <SearchIngredient/>
                        </Route>
                        <Route exact path="/user">
                            <UserProfile/>
                        </Route>
                        <Route render={
                            () => <h3 style={{color:"white",marginTop:"2%",textAlign:"center"}}>Page Not Found</h3>
                        }/>
                    </Switch>
                </Router>
            </div>
        )
    }
}