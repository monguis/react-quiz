import React from "react";
import "./assets/styles.css";

const OptionButton = (props) => {
    const { handleClick, text, selected } = props
    return (
        <div onClick={handleClick ? (() => handleClick()) : null} data-value={text}>
            <div className={"buttonSprite " + (selected ? "selected" : "")}>
                {text}
            </div>
        </div>
    )
}

export default OptionButton;