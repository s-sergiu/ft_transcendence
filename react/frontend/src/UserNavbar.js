
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from 'react';
//import Content from './Content';

function UserNavbar(props) {


	function Logout() {
		localStorage.clear();
		props.loginStatus(false);
		props.setLoginDetails(false);
		props.setToken('');
	}

	useEffect(() => {

	const HOST_IP = process.env.REACT_APP_HOST_IP;

	async function getInfo() {
		let csrf;
		if (document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)")) == null)
			return({ "error" : "csrftoken" })
		else
			csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
		let token = localStorage.getItem("token");
		const response = await fetch('http://' + HOST_IP + ':8000/api/get-info', {
		  mode:  'cors',
		  method: 'POST',
		  credentials: 'include',
		  body: JSON.stringify({
			code: token
		  }),
		  headers: {
			"X-CSRFToken": csrf,
			'Content-Type': 'application/json'
		  },
		})
		return response.json();
	}

		getInfo().then( function(res) { 
			if (res['error'] === 'csrftoken') {
				console.log("Error: ", res.error);
			} else if (res['error'] === 'Not authorized') {
				console.log("Error : Not authorized - ", res.message)
			} else {
				res = res[0]['fields']
				props.setLoginDetails(res);
				//console.log("result", res)
			}	
		});
	}, []);
	

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
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Profile</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Chat</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Play
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick = { e => Logout()} variant="outline-success">Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	 <h1> LOGGED IN </h1> 
	  <ul>
		<ol>{ props.login.email }</ol>
		<ol>{ props.login.username }</ol>
		<ol>{ props.login.first_name }</ol>
		<ol>{ props.login.last_name }</ol>
	  </ul>
    </div>
  );
}

export default UserNavbar;
