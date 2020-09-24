import React from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css";

const NavBar = () => {
    return (
        <div>
            <div>
                <NavLink className="navigation" exact to="/searchName" style={{ display: "inline-block", marginRight: "2%" }}>Search by Name</NavLink>
                <NavLink className="navigation" exact to="/searchIngredient" style={{ display: "inline-block", marginLeft: "2%" }}>Search by Ingredient</NavLink>
            </div>
            <hr className="navLine" />
            <div>
                <NavLink className="navigation" exact to="/user">Your Cocktails</NavLink>
            </div>
        </div>
    )
}
export default NavBar;