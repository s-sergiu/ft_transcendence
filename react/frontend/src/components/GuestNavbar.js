
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Chat from './Chat/Xat.js';
import Mode from './game/mode.js';
import LoginPage from './LoginPage';
import Content from './Content';
import { useEffect, useState } from 'react';
import data from './users.json';
import Game3D from './3d-game/3DGame.js';


var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

function GuestNavbar(props) {
	const { setToken, set42Login, setLogin } = props;
	const [login, showLogin] = useState(false);

    function getCode() {
		window.open(process.env.REACT_APP_REDIRECT_URI, "_self")
	}

	async function getResponse() {
		let response = await getMessage();
		document.cookie = "csrftoken=" + response.token;
		getCode()
	}

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

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		async function getToken(code) {
			let csrf;
			if (document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)")) == null) {
				return({ "error" : "csrftoken" })
			} else
				csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
			const response = await fetch(URL + '/api/get-token', {
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

		if (urlParams.get('code')) {
			getToken(urlParams.get('code')).then( (res) => {
				if (res.error) {
					return undefined
				}
				else {
					res = res[0]['fields']
					setToken(res.access_token)
					localStorage.setItem("token", res.access_token);
					window.history.pushState("home", "ReactApp", "/")
				}
			})
		}
	}, [setToken]);

  return (
    <div className="App">
	<Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick = { e => showLogin(false) } href="#">transcendence</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
            <Button onClick = { e => showLogin(true) } variant="outline-success">Login</Button>
          </Form>
          <Form className="d-flex">
            <Button onClick = { e => getResponse() } variant="outline-success">Login 42</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	  <h1>NOT LOGGED</h1>
	  { (login) ? (<LoginPage setLogin = { props.setLogin } />)
		  : (<Mode />)
	   }
    </div>
  );
}

export default GuestNavbar;
