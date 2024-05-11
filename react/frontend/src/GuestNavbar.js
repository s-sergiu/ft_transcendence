
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import Content from './Content';
import { useEffect } from 'react';


function GuestNavbar(props) {

	const { setToken } = props;

    function getCode() {
		window.open(process.env.REACT_APP_REDIRECT_URI, "_self")
	}

	async function getResponse() {
		let response = await getMessage();
		document.cookie = "csrftoken=" + response.token;
		getCode()
	}

	async function getMessage() {
		const response = await fetch('http://' + process.env.REACT_APP_HOST_NAME + ':' + process.env.REACT_APP_DJANGO_PORT + '/api/', {
			mode:  'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		})
		return response.json();
	}

	useEffect(() => {

	async function getToken(code) {
		let csrf;
		if (document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)")) == null) {
			return({ "error" : "csrftoken" })
		} else
			csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];

		const response = await fetch('http://' + process.env.REACT_APP_HOST_NAME + ':' + process.env.REACT_APP_DJANGO_PORT + '/api/get-token', {
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

		const urlParams = new URLSearchParams(window.location.search);

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
            <Button onClick = { e => getResponse() } variant="outline-success">Login 42</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	  <h1>NOT LOGGED</h1>
    </div>
  );
}

export default GuestNavbar;
