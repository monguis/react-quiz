import React from "react"
import Toast from "react-bootstrap/Toast";
import "./assets/styles.css"

function AnswerSpan(props) {

    const { onCloseProp, source, show } = props;

    return (
        <Toast className="spanWrapper" 
            onClose={() => { onCloseProp() }}
            show={show}
            delay={700}
            autohide>
            <img className="spanImg"
                alt=""
                src={source} />
        </Toast>

    );
}

export default AnswerSpan;
