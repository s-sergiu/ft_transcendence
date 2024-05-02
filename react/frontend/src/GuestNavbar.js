

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Content from './Content';

function GuestNavbar(props) {
	async function getMessage(e) {
		const response = await props.client.get("http://127.0.0.1:8000/api/");
		console.log(response);
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
            <Button onClick = { e => getMessage(e) } variant="outline-success">API</Button>
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
