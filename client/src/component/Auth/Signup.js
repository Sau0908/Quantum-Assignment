import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://quantum-task-9l39.onrender.com/signup",
        {
          username,
          dateOfBirth,
          email,
          password,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log("token ", token);
        setAuthenticated(true);
        console.log("Signup Successful!", response.data);
        toast.success("Signup Successful!");
        navigate("/user");
      } else {
        console.error("Signup failed:", response.data);

        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error.response.data);

      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#F0F8FF", minHeight: "100vh" }}>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <h3>Signup</h3>
              </div>
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicdateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setdateOfBirth(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  style={{ width: "100%" }}
                  variant="primary"
                  type="submit"
                  block
                  className="mt-2"
                >
                  Signup
                </Button>

                <h6 className="text-center mt-2">
                  Already have an account?{" "}
                  <Link to="/" className="text-decoration-underline">
                    Login Here
                  </Link>
                </h6>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
