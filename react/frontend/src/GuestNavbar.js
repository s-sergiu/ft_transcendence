
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Content from './Content';
import { useState, useEffect } from 'react';

const urlParams = new URLSearchParams(window.location.search);

function GuestNavbar(props) {

	const [test, setTest] = useState(false);
	const URI = process.env.REACT_APP_REDIRECT_URI
	const HOST_IP = process.env.REACT_APP_HOST_IP

	async function getToken() {
	  let csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	  let code = getCodeURL();

		const response = await fetch('http://' + HOST_IP + ':8000/api/get-token', {
		  mode:  'cors',
		  method: 'POST',
		  credentials: 'include',
		  body: JSON.stringify({
			code: code
		  }),
		  headers: {
			"X-CSRFToken": csrf,
			'Content-Type': 'application/json'
		  },
		})
		return response.json();
	}

	function getCodeURL() {
		  const code = urlParams.get("code");
		  return code;
	}

  function getCode() {
		window.open(URI, "_self")
	}

	async function getMessage() {
		const response = await fetch('http://' + HOST_IP + ':8000/api/', {
		  mode:  'cors',
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json'
		  },
		})
		return response.json();
	}

	async function getInfo() {
		console.log(await getToken());
	}

	async function getResponse() {
		let response = await getMessage();
		document.cookie = "csrftoken=" + response.token;
		await getCode();
		setTest(true);
	}

	useEffect(() => {
		getInfo();
	}, [test]);

  return (
    <div className="App">
	<Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Inception</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
            <Button onClick = { e => getCode() } variant="outline-success">Code</Button>
          </Form>
          <Form className="d-flex">
            <Button onClick = { e => getResponse() } variant="outline-success">API</Button>
          </Form>
          <Form className="d-flex">
            <Button onClick = { e => props.loginStatus(true) } variant="outline-success">Login</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Content/>
    </div>
  );
}

export default GuestNavbar;
