import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import Quiz from "./components/Quiz"

class App extends Component {
  render() {
    return (

      <div className="App">
        <Container fluid>
          <Row>
            <Col>
              <h1>
                DWD quiz Game!
              </h1>
            </Col>
          </Row>
          <Quiz />



        </Container>
      </div>
    );
  }
}

export default App;

