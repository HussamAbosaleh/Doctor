import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/LogReg.css';

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(response.data.message);
      console.log(response.data.user);

      navigate('/login');

    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="container-login">
      <Card className="login-card">
        <h3 className="text-center login-title mb-5">Create Account</h3>

        <Form onSubmit={handleSubmit}>
          {/** First Name **/}
          <Form.Group className="mb-3">
            <Row className="align-items-center">
              <Col sm={4}><Form.Label className="login-label">First Name</Form.Label></Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          {/** Last Name **/}
          <Form.Group className="mb-3">
            <Row className="align-items-center">
              <Col sm={4}><Form.Label className="login-label">Last Name</Form.Label></Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          {/** Email **/}
          <Form.Group className="mb-3">
            <Row className="align-items-center">
              <Col sm={4}><Form.Label className="login-label">Email</Form.Label></Col>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          {/** Password **/}
          <Form.Group className="mb-3">
            <Row className="align-items-center">
              <Col sm={4}><Form.Label className="login-label">Password</Form.Label></Col>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </Col>
            </Row>
          </Form.Group>

          {/** Confirm Password **/}
          <Form.Group className="mb-3">
            <Row className="align-items-center">
              <Col sm={4}><Form.Label className="login-label">Confirm Password</Form.Label></Col>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm your password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
          </Form.Group>

          {/** Phone **/}
          <Form.Group className="mb-4">
            <Row className="align-items-center">
              <Col sm={4}><Form.Label className="login-label">Phone</Form.Label></Col>
              <Col sm={8}>
                <Form.Control
                  type="tel"
                  name="phone_number"
                  placeholder="Enter your phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Button type="submit" className="login-btn w-100 mb-3">Register</Button>

          <p className="text-center register-text">
            Already have an account?{" "}
            <Link to="/login" className="register-link">Log in</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}