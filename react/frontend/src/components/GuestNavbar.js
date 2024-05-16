
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginPage from './LoginPage';
import Content from './Content';
import { useEffect, useState } from 'react';
import data from './users.json';


var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME 

function GuestNavbar(props) {
	const { setToken } = props;
	const [login, showLogin] = useState(false);

    function getCode() {
		window.open(process.env.REACT_APP_REDIRECT_URI, "_self")
	}

	async function getResponse() {
		let response = await getMessage();
		document.cookie = "csrftoken=" + response.token;
		getCode()
	}

	async function generateDB() {
		console.log(data);
		let res = await getMessage();
		document.cookie = "csrftoken=" + res.token;
		let csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];

		const response = await fetch(URL + '/api/send-info', {
		  mode:  'cors',
		  method: 'POST',
		  credentials: 'include',
			body: JSON.stringify({
				user1 : data[0],
				user2 : data[1],
				user3 : data[2],
				user4 : data[3],
				user5 : data[4],
				user6 : data[5],
				user7 : data[6],
				user8 : data[7],
			}),
		  headers: {
			"X-CSRFToken": csrf,
			'Content-Type': 'application/json'
		  },
		})
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
					console.log("Error: ", res.error)
					return undefined
				}
				else {
					res = res[0]['fields']
					//console.log("guest: ", res)
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
        <Navbar.Brand onClick = { e => showLogin(false) } href="#">Inception</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Form className="d-flex">
            <Button onClick = { e => generateDB() } variant="outline-success">Generate DB</Button>
          </Form>
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
	  {
	  (login) ? ( < LoginPage /> ) : ( <Content /> )
	  }
    </div>
  );
}

export default GuestNavbar;
