import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../OptionButton";
import API from "../../utils/API.js";

const Quiz = () => {


    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({})

    const { questionNumber, userAnswer } = currentQuestion

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

        API.getQuestionList().then(({ data }) => {
            randomize(data);
            setQuestions(data)
            setCurrentQuestion({
                ...data[0],
                options: randomize(data[0].options),
                questionNumber: 0,
                userAnswer: null
            })
        })

    }, [])

    useEffect(() => {
        loadNextQuestion();
    }, [questionNumber])

    const loadNextQuestion = () => {
        if (questionNumber) {
            setCurrentQuestion({
                ...currentQuestion,
                ...questions[questionNumber],
                options: randomize(questions[questionNumber].options)
            })
        }
    }

    
    const nextQuestionHandler = () => {
        
        API.postAnswer({
            id: currentQuestion.id,
            answer: userAnswer
        }).then(({ data }) => console.log(data));

        setCurrentQuestion({
            ...currentQuestion,
            questionNumber: questionNumber + 1,
            userAnswer: null
        });
    }



    const handleOptionClick = (answer) => {
        setCurrentQuestion({
            ...currentQuestion,
            userAnswer: answer
        })
    }

    return (
        currentQuestion.question ?
            <>
                <Row>
                    <h3>{currentQuestion.question}</h3>
                </Row>
                <Row>
                    <Col md={6} xs={12}>
                        <OptionButton handleClick={handleOptionClick} text={currentQuestion.options[0]} selected={currentQuestion.options[0] === userAnswer} />
                        <OptionButton handleClick={handleOptionClick} text={currentQuestion.options[1]} selected={currentQuestion.options[1] === userAnswer} />
                    </Col>
                    <Col md={6} xs={12}>
                        <OptionButton handleClick={handleOptionClick} text={currentQuestion.options[2]} selected={currentQuestion.options[2] === userAnswer} />
                        <OptionButton handleClick={handleOptionClick} text={currentQuestion.options[3]} selected={currentQuestion.options[3] === userAnswer} />
                    </Col>
                </Row>
                <Row><button onClick={nextQuestionHandler}>answer</button></Row>
            </>
            :
            <h3>{"Connection Lost :'("}</h3>
    )
}

export default Quiz;


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