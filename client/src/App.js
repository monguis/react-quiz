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
            <h1>
              Game Title
            </h1>
          </Row>
          <Quiz />



        </Container>
      </div>
    );
  }
}

export default App;

{/* <div className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<h2>Welcome to React</h2>
</div>
<p className="App-intro">
To get started, edit <code>src/App.js</code> and save to reload.
</p> */}