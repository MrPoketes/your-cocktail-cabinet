import React from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css";

// A component to visually represent navigation

const NavBar = () => {
    return (
        <div style={{ marginTop: "1%" }}>
            <NavLink className="navigation" exact to="/search">Search </NavLink>
            <hr className="navLine" />
            <div>
                <NavLink className="navigation" exact to="/user">Your Cocktails</NavLink>
            </div>
        </div>
    )
}
export default NavBar;