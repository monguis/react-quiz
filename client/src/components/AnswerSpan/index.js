import React from "react"
import Toast from "react-bootstrap/Toast";


function AnswerSpan(props) {

    const { onCloseProp, source, show } = props;

    return (
        <Toast
            onClose={() => { onCloseProp() }}
            show={show}
            delay={700}
            autohide
            style={{ backgroundColor: "transparent" }}>
            <img
                style={{ maxHeight: "20vh", maxWidth: "100%" }}
                src={source} />
        </Toast>

    );
}

export default AnswerSpan;
