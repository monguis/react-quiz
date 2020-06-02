import React, { useState, useEffect } from "react";
import { Row, Col, Toast } from "react-bootstrap";
import OptionButton from "../OptionButton";
import API from "../../utils/API.js";
import "./assets/styles.css";
import incorrectSpan from "./assets/images/incorrect.png";
import correctSpan from "./assets/images/correct.png";
import AnswerSpan from "../AnswerSpan/"

const Quiz = () => {


    const [questions, setQuestions] = useState([]);
    const [currentSession, setCurrentSession] = useState({
        id: 0,
        question: "",
        options: [],
        currentQuestionPosition: 0,
        userAnswer: null,
        score: 0,
        end: false,
        spanSource: null
    });

    const { currentQuestionPosition, userAnswer, spanSource, displaySpan } = currentSession;


    const randomize = arr => {
        let newPos, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[newPos];
            arr[newPos] = temp;
        }
        return arr;
    };

    useEffect(() => {

        const storedProgress = JSON.parse(localStorage.getItem("QuizProgress")) || null;

        if (storedProgress) {
            setQuestions(storedProgress.questions);

            let questionToSet = storedProgress.questions[storedProgress.currentQuestionPosition];

            setCurrentSession({
                ...questionToSet,
                options: randomize(questionToSet.options),
                currentQuestionPosition: storedProgress.currentQuestionPosition,
                userAnswer: null,
                score: storedProgress.score
            })
        } else {

            API.getQuestionList().then(({ data }) => {
                randomize(data);
                setQuestions(data)
                localStorage.setItem("QuizProgress", JSON.stringify({
                    questions: data,
                    score: 0,
                    currentQuestionPosition: 0
                }));

                setCurrentSession({
                    ...data[0],
                    options: randomize(data[0].options),
                    currentQuestionPosition: 0,
                    userAnswer: null,
                    score: 0
                })
            })
        }

    }, []);


    useEffect(() => {

        if (currentSession.end) {
            localStorage.clear()

        } else {
            loadNextQuestion();
            saveProgress();
        }
    }, [currentQuestionPosition]);

    const loadNextQuestion = () => {
        if (currentQuestionPosition) {
            const questionToSet = questions[currentQuestionPosition]
            setCurrentSession({
                ...currentSession,
                ...questionToSet,
                options: randomize(questionToSet.options)
            })

        }
    }

    const saveProgress = () => {
        if (questions.length > 0) {
            localStorage.setItem("QuizProgress", JSON.stringify({
                questions: questions,
                score: currentSession.score,
                currentQuestionPosition: currentQuestionPosition
            }))
        }
    }

    const answerQuestionHandler = () => {
        API.postAnswer({
            id: currentSession.id,
            answer: userAnswer
        }).then(({ data }) => {
            const addPoints = data.correct ? 20 : 0;
            setCurrentSession({
                ...currentSession,
                currentQuestionPosition: currentQuestionPosition + 1,
                score: currentSession.score + addPoints,
                userAnswer: null,
                end: currentQuestionPosition + 1 === questions.length,
                spanSource: data.correct ? correctSpan : incorrectSpan,
                displaySpan: true
            });

        }).catch((err) => {
            console.log(err)
        })
    }



    const handleOptionClick = (answer) => {
        setCurrentSession({
            ...currentSession,
            userAnswer: answer
        })
    }

    const closeSpanHandler = () => {
        setCurrentSession({
            ...currentSession,
            displaySpan: false
        })
    }


    return (
        currentSession.end ? <>
            <h1>{"Your Score is " + currentSession.score}</h1>
        </>
            :
            <>
                <Row style={{height:"12.5vw"}} >
                    <Col>

                        <h3 style={{fontSize:"3.5vw"}}>{currentSession.question}</h3>

                    </Col>
                </Row>
                <Row >
                    <Col md={6} xs={12}>
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[0]} selected={currentSession.options[0] === userAnswer} />
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[1]} selected={currentSession.options[1] === userAnswer} />
                    </Col>
                    <Col md={6} xs={12}>
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[2]} selected={currentSession.options[2] === userAnswer} />
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[3]} selected={currentSession.options[3] === userAnswer} />
                    </Col>
                </Row>
                <Row style={{ height: "13vh" }}>
                    <Col xs={{ order: 1 }} xs={12} md={{ order: 12 }}>
                        <button disabled={!userAnswer} onClick={answerQuestionHandler}>answer</button>
                    </Col>
                    <Col xs={{ order: 12 }} xs={12} md={{ order: 1 }}>
                        <AnswerSpan show={displaySpan} onCloseProp={closeSpanHandler} source={spanSource} /> 
                    </Col>


                </Row>
            </>
    )
}

export default Quiz;