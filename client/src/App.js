import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./App.css";
import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

class App extends Component {
  //the App component is our main app structure, where we declare the way our site is organized. 
  // It also includes routes to access different location inside our site.
  render() {
    return (

      <div className="App">
        <Router>
          {/* This header will be present through out our app, it has the app title and a home button to go back. */}
          <header className="d-flex align-items-center">
            <Container fluid>
              <Row>
                <Col xs={6} className="d-flex justify-content-start align-items-center">
                  <h1 id="headerText">
                    Quiz Game!
              </h1>
                </Col>
                <Col xs={6} className="d-flex flex-row-reverse align-items-center">
                  <div className="NavLink">
                    <Link to="/home">
                      <i className="fas fa-home"></i>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </header>
          {/* We create another container which renders our multiple site locations, we also define our routes to easy redirection*/}
          <Container fluid >
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
          </Container>
        </Router>
      </div >
    );
  }
}

export default App;

