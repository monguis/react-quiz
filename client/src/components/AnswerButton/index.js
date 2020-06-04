import React from "react";
import "./assets/styles.css";

const AnswerButton = (props) => {

    return (
        <button
            className="answerButton"
            disabled={props.disabled}
            onClick={props.onClick}>

            {props.children}</button>)
}

export default AnswerButton;