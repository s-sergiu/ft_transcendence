
import OpenURI from './OpenURI';
import GetToken from './GetToken';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginPage from './LoginPage';
import { useEffect, useState } from 'react';

const urlParams = new URLSearchParams(window.location.search);

function GuestNavbar(props) {
	let token_code;
	const { setLogged, setUserData } = props;
	const [ login, showLogin ] = useState(false);
	const { token } = GetToken(urlParams.get('code'));

	useEffect(() => {
		if (token && !token.error) {
			token_code = token[0]['fields'];
			token_code = token_code.access_token;
			localStorage.setItem("token", token_code);
			window.history.pushState("home", "ReactApp", "/")
			setLogged(token_code)
		}
	}, [token])

  return (
    <div className="App">
	<Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick = { e => showLogin(false) } href="#">transcendence</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
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
		{ 
			(login) ? (<LoginPage setLogged = { setLogged } setUserData = { setUserData } />) : (<h1> test </h1>)
		}
    </div>
  );

}

export default GuestNavbar;
