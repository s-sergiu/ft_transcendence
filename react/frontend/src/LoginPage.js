import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './LoginPage.css'
const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  const toggleLoginForm = () => {
    setShowLoginForm(true);
  };

  const toggleRegisterForm = () => {
    setShowLoginForm(false);
  };

  return (
    <div className='component'>
    <Container>
      <Row className="justify-content-md-center ss">
        <Col md="6">
          
          <Button variant="primary" onClick={toggleLoginForm} className="mb-3">
            Login
          </Button>
          <Button variant="primary" onClick={toggleRegisterForm} className="mb-3">
            Register
          </Button>
          {showLoginForm && (
            <>
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </Form.Group>
                <br></br><br></br>
                <div className='logbutton'>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <br></br><br></br>
                <Button variant="primary" type="submit">
                  Authentification
                </Button>
                </div>
              </Form>
            </>
          )}
          {!showLoginForm && (
            <>
              <h2>Register</h2>
              <Form onSubmit={handleRegisterSubmit}>

              <Form.Group controlId="formBasicRegisterPassword">
                  <Form.Label>fullname</Form.Label>
                  <Form.Control
                    type="fullname"
                    placeholder="fullname"
                    name="fullname"
                    value={registerForm.fullname}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRegisterEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRegisterPassword">
                  <Form.Label>username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="username"
                    name="username"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRegisterPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>
                <br></br>
                <div className='logbtn1'>
                <Button variant="primary" type="submit">
                  Register
                </Button>
                </div>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default LoginPage;
