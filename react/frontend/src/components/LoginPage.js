import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './css/LoginPage.css'

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const LoginPage = (props) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [message, setMessage] = useState('');
  const { setLogin } = props
	

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
	  console.log("console", loginForm);
	  const response = await sendLoginData(loginForm);
	  setLogin(response);
	  console.log(response);
    // Handle login logic here
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
	console.log(registerForm);
	const reply = await sendRegistrationForm(registerForm);
	toggleLoginForm(true);
	console.log(reply.Message)
	setMessage(reply.Message)
    // Handle registration logic here
  };

	async function getMessage() {
		const response = await fetch(URL + '/api/get-csrf', {
			mode:  'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		})
		return response.json();
	}

	async function sendLoginData(data) {
		let resp = await getMessage();
		document.cookie = "csrftoken=" + resp.token;
		let csrf;
		if (document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)")) == null) {
			return({ "error" : "csrftoken" })
		} else
			csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
		const response = await fetch(URL + '/api/login', {
		  mode:  'cors',
		  method: 'POST',
		  credentials: 'include',
		  body: JSON.stringify({
			username: data.email,
			password: data.password
		  }),
		  headers: {
			"X-CSRFToken": csrf,
			'Content-Type': 'application/json'
		  },
		})
		return response.json();
	}

	async function sendRegistrationForm(data) {
		let csrf;
		if (document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)")) == null) {
			return({ "error" : "csrftoken" })
		} else
			csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
		const response = await fetch(URL + '/api/register', {
		  mode:  'cors',
		  method: 'POST',
		  credentials: 'include',
		  body: JSON.stringify({
			username: data.username,
			email: data.email,
			password: data.password
		  }),
		  headers: {
			"X-CSRFToken": csrf,
			'Content-Type': 'application/json'
		  },
		})
		return response.json();
	}

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
                    type="username"
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
				{ message } 
                </div>
              </Form>
            </>
          )}
          {!showLoginForm && (
            <>
              <h2>Register</h2>
              <Form onSubmit={handleRegisterSubmit}>

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
