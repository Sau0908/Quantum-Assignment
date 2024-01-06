import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://quantum-task-9l39.onrender.com/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuthenticated(true);
        console.log("Login Successful!", response.data);
        toast.success("Login Successful!");

        navigate("/user");
      } else {
        console.error("Login failed:", response.data);

        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);

      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#F0F8FF", minHeight: "100vh" }}>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6} lg={4}>
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1704366441~exp=1704367041~hmac=5372217c331ee1d26bf931070f88ec94bc462341ef701b767fc67a87bfa8940c/150"
                  alt="Avatar"
                  style={{ width: "150px", height: "150px" }}
                  className="rounded-circle border"
                />
              </div>
              <Form onSubmit={handleLogin}>
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
                  className="mt-3"
                  variant="primary"
                  type="submit"
                  block
                >
                  Login
                </Button>

                <h6 className="text-center mt-3">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-decoration-underline">
                    Register Here
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

export default Login;
