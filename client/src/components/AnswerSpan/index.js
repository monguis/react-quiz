import React from "react"
import Toast from "react-bootstrap/Toast";


function AnswerSpan(props) {

    const { onCloseProp, source, show } = props;

    return (
        <Toast style={{maxWidth: "100%", backgroundColor: "transparent" }}
            onClose={() => { onCloseProp() }}
            show={show}
            delay={700}
            autohide>
            <img style={{ maxWidth: "100%", maxHeight: "20vh", backgroundColor: "transparent" }}

                src={source} />
        </Toast>

    );
}

export default AnswerSpan;
