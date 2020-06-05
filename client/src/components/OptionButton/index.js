import React from "react";
import "./assets/styles.css";

const OptionButton = (props) => {
    //renders a button that can change styling depending on passed props conditionals.
    const { handleClick, text, selected } = props
    return (
        <div onClick={handleClick} data-value={text}>
            <div className={"buttonSprite " + (selected ? "selected" : "")}>
                {text}
            </div>
        </div>
    )
}

export default OptionButton;