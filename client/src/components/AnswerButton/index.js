import React from "react";
import "./assets/styles.css";

const AnswerButton = (props) => {
//this component renders a button that disables depending on props conditional, it also takes a function to execute once the button is clicked 
// when not disable.
    return (
        <button
            className="answerButton"
            disabled={props.disabled}
            onClick={props.onClick}>

            {props.children}</button>)
}

export default AnswerButton;