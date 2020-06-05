import React from "react";
import "./assets/styles.css"

const StartButton = (props) => {

    const { children } = props
//renders a button that triggers a function passed by props.
    return (
        <button
            onClick={props.onClick}
            className="startButton">
            <div className="childrenContainer">{children}</div></button>
    )
}

export default StartButton;