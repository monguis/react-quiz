import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../../components/OptionButton";
import API from "../../utils/API.js";
import "./assets/styles.css";
import incorrectSpan from "./assets/images/incorrect.png";
import correctSpan from "./assets/images/correct.png";
import AnswerSpan from "../../components/AnswerSpan/";
import AnswerButton from "../../components/AnswerButton";
import { Link } from "react-router-dom";
import StartButton from "../../components/StartButton";

const Quiz = () => {

    // Declared page states, we have a state where we save our questions to iterate through and another state that represents the current 
    // state of the quiz
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
    // We destructure for easier access 
    const { currentQuestionPosition, userAnswer, spanSource, displaySpan } = currentSession;

    // I use this function to randomize arrays.
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

    //this useEffect hook is triggered once every time we mount this component it checks for localStorage sessions and responds accordingly;
    useEffect(() => {
        const storedProgress = JSON.parse(localStorage.getItem("QuizProgress")) || null;
        if (storedProgress) {
            loadSession(storedProgress)
        } else {
            createNewSession()
        }
    }, []);

    //this useEffect hook is triggered every time currentQuestionPosition changes, here is where I render the next question and check if we reached the end of the 
    //questions array 
    useEffect(() => {
        if (currentSession.end) {
            localStorage.clear()
        } else {
            loadNextQuestion();
            saveProgress();
        }
    }, [currentQuestionPosition]);

    //This function mutates the state to render the next question on DOM
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
    //This function overwrites localStorage with the current state.
    const saveProgress = () => {
        if (questions.length > 0) {
            localStorage.setItem("QuizProgress", JSON.stringify({
                questions: questions,
                score: currentSession.score,
                currentQuestionPosition: currentQuestionPosition
            }))
        }
    }

    //This block of code makes an API call to fetch the questions to be asked and then 
    //randomizes the array order and initialize state values accordingly.
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

    //Looks inside localStorage and assigns values to our state to recover our last session.
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

    //Sends an API post request with the user selected answer and the id of the question, 
    //then, it uses the response to change the values of the state accordingly.
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
    // changes the state answer key value pair to a passed answer argument
    const handleOptionClick = (answer) => {
        setCurrentSession({
            ...currentSession,
            userAnswer: answer
        })
    }
    // changes the state displaySpan key value pair which is used to render an image that notifies
    // the user if the answer is correct of not
    const closeSpanHandler = () => {
        setCurrentSession({
            ...currentSession,
            displaySpan: false
        })
    }

    // this function splits the options array in half to later render it in 2 columns, 
    // rendering an optionButton component for each element.
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

    // this return is actually our render method, here state values are injected, that way our site responds based on state changes.
    return (
        // if we reached the end of the quiz, the site shows the achieved score and 2 buttons, one that takes you back to home, and a
        // another one that allows you to play again
        currentSession.end ? 
            <>
                <Row>
                    <Col>
                        <h1>{`Finished! You Scored ${currentSession.score}`}</h1>
                        <h1>Think you can do better?</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <StartButton onClick={() => { createNewSession() }}>
                            Play Again
                    </StartButton>
                        <Link to="/home">
                            <StartButton>
                                Home
                    </StartButton>
                        </Link>
                    </Col>
                </Row>

            </>
            :
                  // if we haven't reached the end of the quiz, a big question text followed by 4 option buttons and 
                  // an answer button next to a space for our notification image.
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
                        <AnswerButton disabled={!userAnswer} onClick={()=>{answerQuestionHandler()}}>Answer</AnswerButton>
                    </Col>
                    <Col style={{ height: "13vh" }} xs={{ order: 12 }} xs={12} md={{ order: 1 }}>
                        <AnswerSpan show={displaySpan} onCloseProp={closeSpanHandler} source={spanSource} />
                    </Col>



                </Row>


            </>
    )
}

export default Quiz;

