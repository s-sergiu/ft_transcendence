

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Content from './Content';

const urlParams = new URLSearchParams(window.location.search);

function GuestNavbar(props) {
	function getCodeURL(e) {
		  const code = urlParams.get("code");
		  return code;
	}

	async function getToken(e) {
	  e.preventDefault();
	  let key = "csrftoken";
	  let csrf = document.cookie.match(("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"))[2];
	  console.log("csrf : " + csrf);
	  let code = getCodeURL(e);

		const response = await fetch('http://127.0.0.1:8000/api/get-token', {
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

	async function displayToken(e) {
		console.log(await getToken(e));
	}

  function getCode(e) {
		let uid='u-s4t2ud-17c3d06c29a63f052756d513ba06d6d98b92ee95cb7b6a9dd4e66465af2477ab'
		let scope='public'
	    let url='https://api.intra.42.fr/oauth/authorize?client_id=' + uid + 
			'&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&response_type=code&scope=' + scope;
		e.preventDefault();
		window.open(url, "_self")
	}
	async function getMessage(e) {
		const response = await fetch('http://127.0.0.1:8000/api/', {
		  mode:  'cors',
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json'
		  },
		})
		return response.json();
	}

	async function getResponse(e) {
		let response = await getMessage(e);
		document.cookie = "csrftoken=" + response.token;
	}
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
            <Button onClick = { e => displayToken(e) } variant="outline-success">Token</Button>
          </Form>
          <Form className="d-flex">
            <Button onClick = { e => getCode(e) } variant="outline-success">Code</Button>
          </Form>
          <Form className="d-flex">
            <Button onClick = { e => getResponse(e) } variant="outline-success">API</Button>
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
