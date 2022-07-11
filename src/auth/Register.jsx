import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Alert, Stack } from "react-bootstrap";
import Contain from "../components/Contain";

export default function Register() {
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (regPass !== confPass) {
      setError("Passwords don't match!");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, regEmail, regPass);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <Contain>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setRegPass(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfPass(e.target.value)}
                required
              />
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
              <Button className="w-50 mt-4" type="submit">
                Register
              </Button>
              <Button
                variant="dark"
                onClick={() => navigate("/")}
                className="w-50 mt-4"
              >
                Login
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Contain>
  );
}
