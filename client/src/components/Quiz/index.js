import React from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../OptionButton"
import questions from "../questions.json"

const Quiz = () => {


    const quess = questions;
    console.log(quess)


    const randomize = arr => {
        let newPos, temp;

        for (let i = arr.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr;
    }
    
    randomize(quess);

    const test = quess[0];

    return (
        <>
            <Row>
                <h3>{test.question}</h3>
            </Row>
            <Row>
                <Col md={6} xs={12}>
                    <OptionButton text={test.options[0]} />
                    <OptionButton text={test.options[1]} />
                </Col>
                <Col md={6} xs={12}>
                    <OptionButton text={test.options[2]} />
                    <OptionButton text={test.options[3]} />
                </Col>
            </Row>
            <Row><button>answer</button></Row>
        </>
    )
}

export default Quiz
