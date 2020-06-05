import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StartButton from "../../components/StartButton";
import "./assets/styles.css";

const Home = () => {

    const [storedProgress, setStoreProgress] = useState(null);

    useEffect(() => {
        setStoreProgress(JSON.parse(localStorage.getItem("QuizProgress")) || null)
    }, [])
    return (<>
        <Row id="homeContainer">
            <Col>
                <Row>
                    <Col>
                        <h2>Welcome</h2>
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