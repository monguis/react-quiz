import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import OptionButton from "../OptionButton";

const Home = () => {

    const [storedProgress, setStoreProgress] = useState(null);

    useEffect(() => {
        setStoreProgress(JSON.parse(localStorage.getItem("QuizProgress"))||null)
    }, [])
    return (<>

        <Row>
            <Col>
                <h3>Welcome</h3>
            </Col>
        </Row>
        {storedProgress ? <>
            <h3>We loaded your data successfully, Continue?</h3>
            <Row>
                <Col xs={6}>
                    <Link to="/quiz">
                        <OptionButton text={"Continue"} />
                    </Link>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3 >Or would you like to start over?</h3>
                </Col>
            </Row></> : ""}
        <Row>
            <Col>

                <Link to="/quiz">
                    <OptionButton handleClick={() => {  localStorage.clear() }} text={"Play"} />
                </Link>
            </Col>
        </Row>

    </>)
}

export default Home;