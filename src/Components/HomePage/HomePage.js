import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage() {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro">
            <div>
              <h1 className="heading">Welcome to Schedule Helper</h1>
              <p className="subtitle">Managing timelines can be hard, but it doesn't have to be anymore!</p>
            </div>
            <div className="buttonContainer">
              <Link to="/Login">
                <Button size="lg" className="button">
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="button">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;