import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import OptionButton from "../OptionButton";
import API from "../../utils/API.js";

const Quiz = () => {


    const [questions, setQuestions] = useState([]);
    const [currentSession, setCurrentSession] = useState({
        id: 0,
        question: "",
        options: [],
        currentQuestionPosition: 0,
        userAnswer: null,
        score: 0,
        end: false
    });

    const { currentQuestionPosition, userAnswer } = currentSession;


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
            console.log(storedProgress)
            let questionToSet = storedProgress.questions[storedProgress.currentQuestionPosition];
            console.log(questions)
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
        
        console.log(currentQuestionPosition)
        console.log(questions.length)
        if (currentSession.end) {
            localStorage.clear()
        } else {
            loadNextQuestion();
            saveProgress();
        }
    }, [currentQuestionPosition])



    const loadNextQuestion = () => {
        if (currentQuestionPosition) {
            setCurrentSession({
                ...currentSession,
                ...questions[currentQuestionPosition],
                options: randomize(questions[currentQuestionPosition].options)
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
                    end: currentQuestionPosition + 1 === questions.length
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

    return (
        currentSession.end ? <>
            <h1>{currentSession.score}</h1>
        </>
            :
            <>
                <Row>
                    <h3>{currentSession.question}</h3>
                </Row>
                <Row>
                    <Col md={6} xs={12}>
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[0]} selected={currentSession.options[0] === userAnswer} />
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[1]} selected={currentSession.options[1] === userAnswer} />
                    </Col>
                    <Col md={6} xs={12}>
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[2]} selected={currentSession.options[2] === userAnswer} />
                        <OptionButton handleClick={handleOptionClick} text={currentSession.options[3]} selected={currentSession.options[3] === userAnswer} />
                    </Col>
                </Row>
                <Row><button disabled={!userAnswer} onClick={answerQuestionHandler}>answer</button></Row>
            </>

    )
}

export default Quiz;