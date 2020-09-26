import React from "react";
import "../css/styles.css";

const CocktailInfo = (props) => {
    return (
        <div>
            <h2>Ingredients</h2>
            <hr className="line" />
            <ul style={{ textAlign: "left" }}>
                <li>Served in {props.glass}</li>
                {props.ingredients.map((data, i) =>
                    <li key={i}>{props.measures[i]} {data}</li>
                )}
            </ul>
            <h2 style={{ marginTop: "3%" }}>Instructions</h2>
            <hr className="line" />
            <p>{props.instructions}</p>
            <h2 style={{ marginTop: "3%" }}>Info</h2>
            <hr className="line" />
            <h6>{props.alcoholic}</h6>
            <h6>{props.category}</h6>
        </div>
    )
}
export default CocktailInfo;