import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../OptionButton"
import questions from "../questions.json"

const Quiz = () => {

    const [state, setState] = useState({
        userAnswer: null,
        currentQuestion: 0,
        questionText: "",
        options: []
    })

    const { currentQuestion, questionText, options } = state;

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

    useEffect(() => {
        randomize(questions);
    }, [])

    useEffect(() => {
        loadCurrentQuestion();
    }, [currentQuestion])

    const loadCurrentQuestion = () => {
        setState({
            ...state,
            questionText: questions[state.currentQuestion].question,
            options: randomize(questions[state.currentQuestion].options)
        })
    }
    const nextQuestionHandler = () => {
        setState({
            ...state,
            currentQuestion: currentQuestion + 1
        })
    }

    return (
        questionText ?
            <>
                <Row>
                    <h3>{questionText}</h3>
                </Row>
                <Row>
                    <Col md={6} xs={12}>
                        <OptionButton text={options[0]} />
                        <OptionButton text={options[1]} />
                    </Col>
                    <Col md={6} xs={12}>
                        <OptionButton text={options[2]} />
                        <OptionButton text={options[3]} />
                    </Col>
                </Row>
                <Row><button onClick={nextQuestionHandler}>answer</button></Row>
            </>
            :
            <h3>{"Connection Lost :'("}</h3>
    )
}

export default Quiz


// localStorage.setItem("Todaytodo", JSON.stringify(daySchedule));

// var storedSchedule = JSON.parse(localStorage.getItem("Todaytodo"));
// if (storedSchedule) {
//     if (storedSchedule.date !== currentdate.getDay() + "/" + currentdate.getMonth()) {
//       localStorage.clear();
//       localStorage.setItem("Todaytodo", JSON.stringify(daySchedule));
//     } else {
//       daySchedule = storedSchedule;
//     }
//   } else {
//     localStorage.setItem("Todaytodo", JSON.stringify(daySchedule));
//   }