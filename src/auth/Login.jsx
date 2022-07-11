import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Contain from "../components/Contain";

import { Form, Button, Card, Alert, Stack } from "react-bootstrap";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await signInWithEmailAndPassword(auth, loginEmail, loginPass);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Contain>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setLoginPass(e.target.value)}
                required
              />
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
              <Button className="w-50 mt-4" type="submit">
                Log In
              </Button>
              <Button
                variant="success"
                onClick={() => navigate("/register")}
                className="w-50 mt-4"
              >
                Register
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Contain>
  );
}
