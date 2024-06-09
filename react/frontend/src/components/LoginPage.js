import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './css/LoginPage.css'
import pic3 from './login.png'

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const LoginPage = (props) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', username: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [message, setMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const { setLogged, setUserData } = props
	

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
	  const response = await sendLoginData(loginForm);
	if (response.Message === 'error') {
		setMessage("Username or Password incorrect")
	} else {
		setUserData(response);
		setLogged(true);
		localStorage.clear()
	}
    // Handle login logic here
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
	if (!registerForm.email) {
		setRegisterMessage("Please provide an email!")
	} else if (!registerForm.password) {
		setRegisterMessage("Please provide a password!")
	} else if (!registerForm.username) {
		setRegisterMessage("Please provide a username!")
	} else {
		const reply = await sendRegistrationForm(registerForm);
		if (reply.Message === 3) {
			setRegisterMessage("Account with that email already exists")
		} else if (reply.Message === 2) {
			setRegisterMessage("Account with that username already exists")
		} else {
			toggleLoginForm(true);
			setMessage("Succesfully registered!")
		}
	}	
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
			username: data.username,
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
			first_name: data.first_name,
			last_name: data.last_name,
			location: data.location,
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
      <img src={pic3} className="img-thumbnail" alt="..."></img>
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
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    name="username"
                    value={loginForm.username}
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

                <Form.Group controlId="formBasicRegisterUsername">
                  <Form.Label>username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    name="username"
                    value={registerForm.username}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRegisterFirstName">
                  <Form.Label>first name</Form.Label>
                  <Form.Control
                    type="first_name"
                    placeholder="Enter your first name"
                    name="first_name"
                    value={registerForm.first_name}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRegisterLastName">
                  <Form.Label>last name</Form.Label>
                  <Form.Control
                    type="last_name"
                    placeholder="Enter your last name"
                    name="last_name"
                    value={registerForm.last_name}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRegisterLocation">
                  <Form.Label>location</Form.Label>
                  <Form.Control
                    type="location"
                    placeholder="Enter your location"
                    name="location"
                    value={registerForm.location}
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
				{ registerMessage } 
            </>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default LoginPage;
