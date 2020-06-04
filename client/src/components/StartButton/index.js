import React from "react";
import "./assets/styles.css"

const StartButton = (props) => {

    const { children } = props

    return (
        <button onClick={props.onClick ? (() => props.onClick()): null} class="startButton">{children}</button>
    )
}

export default StartButton;