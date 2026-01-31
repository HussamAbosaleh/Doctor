import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../css/LogReg.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(`/api/auth/login`, {
        email,
        password
      });


      localStorage.setItem("token", res.data.token);

      const tokenPayload = JSON.parse(atob(res.data.token.split('.')[1]));
      const isDoctor = tokenPayload.role === "Doctor";
      localStorage.setItem("isDoctor", isDoctor);

      alert(res.data.message);

      if (isDoctor) {
        navigate('/my-services')
      } else{
          navigate('/');
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server error");
      }
      console.error(err);
    }
  };

  return (
    <div className="container-login">
      <Card className="login-card">
        <h3 className="text-center login-title mb-5">Welcome Back</h3>

        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-4">
            <Row className="align-items-center">
              <Col sm={4}>
                <Form.Label className="login-label">Email</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4">
            <Row className="align-items-center">
              <Col sm={4}>
                <Form.Label className="login-label">Password</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          <Button type="submit" className="login-btn w-100 mb-3">
            Log in
          </Button>

          <p className="text-center register-text mt-4 mb-0">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Sign Up
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}

export default Login;