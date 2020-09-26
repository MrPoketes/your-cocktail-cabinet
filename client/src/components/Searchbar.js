import React, { Component } from "react";
import ReactDOM from "react-dom";
import { FormControl, Button, InputGroup } from "react-bootstrap";
import "../css/styles.css";


export default class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }
    // Activates when clicked on the button
    handleClick() {
        var inputValue = ReactDOM.findDOMNode(this.refs.input).value;
        this.props.search(inputValue, this.props.by);
    }
    // Activates when user pressess the enter button on the form
    handlePress(target) {
        if (target.key === "Enter") {
            var inputValue = ReactDOM.findDOMNode(this.refs.input).value;
            this.props.search(inputValue, this.props.by);
        }
    }
    render() {
        return (
            <div>
                <InputGroup onKeyPress={this.handlePress} className="mb-3 search">
                    <FormControl ref="input" placeholder={this.props.by} aria-label="Search" aria-describedby="basic-addon2" />
                    <InputGroup.Append>
                        <Button onClick={this.handleClick} variant="dark"><i className="fas fa-search"></i></Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}