import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

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
          <Router>
            <Switch>

              <Route exact path={["/", "/home"]}>
                <Home />
              </Route>

              <Route exact path="/quiz">>
              <Quiz />
              </Route>

              <Route path="*">
                <h1>no match</h1>
              </Route>
              
            </Switch>
          </Router>
        </Container>
      </div >
    );
  }
}

export default App;

