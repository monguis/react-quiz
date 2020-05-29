import React from "react";
import "./assets/styles.css";

const OptionButton = (props) => {
    return (
        <div>
            <div className="buttonSprite">
                {props.text}
            </div>
        </div>
    )
}

export default OptionButton;