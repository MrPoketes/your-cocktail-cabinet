import React from "react";
import { Card } from "react-bootstrap";
import "../css/styles.css";

const CocktailShowcase = (props) => {
    return (
        <div style={{display:"inline-block",margin:"1%"}}>
            <Card className="card" border="dark" style={{ width: "16rem" }}>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title style={{fontSize:"13px",margin:0, fontFamily:'Nunito Sans'}}>{props.name}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}
export default CocktailShowcase;