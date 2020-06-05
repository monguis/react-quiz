import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StartButton from "../../components/StartButton";
import "./assets/styles.css";

const Home = () => {

    const [storedProgress, setStoreProgress] = useState(null);
 //this useEffect hook is triggered once every time we mount this component it checks for localStorage sessions, If there was no saved session
 //it assigns null to state

    useEffect(() => {
        setStoreProgress(JSON.parse(localStorage.getItem("QuizProgress")) || null)
    }, []);

    // render Function: If we have a saved session it renders a button to continue and a button to start over, if no session was found,
    // it only renders one button to create a new session. 

    //We create a new session clearing the localStorage, since our quiz page component is smart enough to respond accordingly
    return (<>
        <Row id="homeContainer">
            <Col>
                <Row>
                    <Col>
                        <h1>Welcome</h1>
                    </Col>
                </Row>
                {storedProgress ?
                    <>
                        <Row className="homeRow">
                            <Col xs={12}>
                                <h3>We loaded your data successfully, Continue?</h3>
                                <Link to="/quiz">
                                    <StartButton>Yes!</StartButton>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="homeRow">
                            <Col>
                                <h3 >Or would you like to start over?</h3>
                                <Link to="/quiz">
                                    <StartButton onClick={() => { localStorage.clear() }}>Start Over</StartButton>
                                </Link>
                            </Col>
                        </Row></>
                    : <>
                        <Row className="homeRow">
                            <Col>
                                <Link to="/quiz">
                                    <StartButton onClick={() => { localStorage.clear() }}>Play Quiz</StartButton>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Remember, You can recover your progress</h3>
                            </Col>
                        </Row>
                    </>}





            </Col>

        </Row>
    </>)
}

export default Home;