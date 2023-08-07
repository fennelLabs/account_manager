import React, {useState} from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function RegisterForm(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlePasswordConfirmChange = (event) => setPasswordConfirm(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            alert("Passwords do not match!");
            return;
        }
        props.onSubmit(username, password, email);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirm">
                <Form.Label htmlFor="passwordConfirm">Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                />
            </Form.Group>
            <Button type="submit">Register</Button>
        </Form>
    );
}