
import OpenURI from './OpenURI';
import GetToken from './GetToken';
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
	const urlParams = new URLSearchParams(window.location.search);

	var code;
	if (urlParams.get('code')) {
		code = urlParams.get('code')	
	}
	const { token } = GetToken(code);

	useEffect(() => {
		let token_code;
		console.log("test")
		console.log("outside", token)
		if (token && token.error)
			console.log("error", token);
		else if (token) {
			console.log(token[0]['fields']);
			token_code = token[0]['fields'];
			token_code = token_code.access_token;
			localStorage.setItem("token", token_code);
			console.log(token_code);
			window.history.pushState("home", "ReactApp", "/")
			setToken(token_code)
		}
	}, [token])

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
            <Button onClick = { e => OpenURI() } variant="outline-success">Login 42</Button>
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
