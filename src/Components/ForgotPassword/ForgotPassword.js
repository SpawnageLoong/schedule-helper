import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";


function ForgotPassword() {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setMessage("Passwords do not match");
        }
    }

        return (
            <div className="Container">
                <h3> Reset Password </h3>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Enter New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

    export default ForgotPassword