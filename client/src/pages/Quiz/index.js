import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/OptionButton";
import API from "../../utils/API.js";
import "./assets/styles.css";
import incorrectSpan from "./assets/images/incorrect.png";
import correctSpan from "./assets/images/correct.png";
import AnswerSpan from "../../components/AnswerSpan/";
import AnswerButton from "../../components/AnswerButton";
import { Link } from "react-router-dom"

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
            loadSession(storedProgress)
        } else {
            createNewSession()
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

    const createNewSession = () => {
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

    const loadSession = (storedProgress) => {
        setQuestions(storedProgress.questions);

        let questionToSet = storedProgress.questions[storedProgress.currentQuestionPosition];

        setCurrentSession({
            ...questionToSet,
            options: randomize(questionToSet.options),
            currentQuestionPosition: storedProgress.currentQuestionPosition,
            userAnswer: null,
            score: storedProgress.score
        })
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

    const renderOptionButtons = (array) => {
        const halfIndex = Math.ceil(array.length / 2);
        const toRenderArray = [array.slice(0, halfIndex), array.slice(halfIndex)];
        return (
            toRenderArray.map((column, ColIndex) =>
                < Col key={"column-" + ColIndex} md={6} xs={12} >
                    {
                        column.map((option, optionIndex) =>
                            <OptionButton key={"option-" + optionIndex} handleClick={() => { handleOptionClick(option) }} text={option} selected={option === userAnswer} />)
                    }
                </Col >
            )
        );
    }

    return (
        currentSession.end ? <>
            <h1>{"Your Score is " + currentSession.score}</h1>
            <button onClick={() => { createNewSession() }}>again</button>
            <Link to="/home"><button>go jom</button> </Link>
        </>
            :
            <>
                <Row style={{ height: "12.5vw" }} >
                    <Col>
                        <h3 >{currentSession.question}</h3>
                    </Col>
                </Row>
                <Row>
                    {renderOptionButtons(currentSession.options)}
                </Row>
                <Row >
                    <Col style={{ height: "13vh" }} xs={{ order: 1 }} xs={12} md={{ order: 12 }}>
                        <AnswerButton disabled={!userAnswer} onClick={answerQuestionHandler}>Answer</AnswerButton>
                    </Col>
                    <Col style={{ height: "13vh" }} xs={{ order: 12 }} xs={12} md={{ order: 1 }}>
                        <AnswerSpan show={displaySpan} onCloseProp={closeSpanHandler} source={spanSource} />
                    </Col>


                </Row>

            </>
    )
}

export default Quiz;

