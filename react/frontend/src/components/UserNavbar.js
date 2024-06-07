
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MainContent from './MainContent';
import GetInfo from './GetInfo';
import { useEffect, useState } from 'react';
import './css/navbar.css'
import ChatIcon from './Chat/ChatIcon';
import App from '../App';
import ChatPage from './Chat/ChatPage';

function UserNavbar(props) {

	var profileInfo;
	const [ toggle, setNavToggle ] = useState('profile');
	const [ login, setLogin ] = useState();
	const { userData, setLogged } = props;
	const { info } = GetInfo(localStorage.getItem("token"));

	function Logout() {
		localStorage.clear();
		setLogged(false);
	}
	
	useEffect(() => {
		if (userData) {
			profileInfo = userData[0]['fields']
			setLogin(profileInfo);
		}	
	}, [userData]);

	useEffect(() => {
		if (info && info.Message === 'User already exists!') {
			alert(info.Message)
			setLogged(false);
		} else if  (info && !info.Message) {
			profileInfo = info[0]['fields']
			setLogin(profileInfo);
		}	
	}, [info]);

  return (
    <div className="App">
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">transcendence</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link onClick = { e => setNavToggle('game') } >Game</Nav.Link>
            <Nav.Link onClick = { e => setNavToggle('3dgame') } >3D Game</Nav.Link>
            <Nav.Link onClick = { e => setNavToggle('profile') } >Profile</Nav.Link>
            <Nav.Link onClick = { e => setNavToggle('tourn') } >Tournaments</Nav.Link>

            
          </Nav>
		  <Form className="d-flex">
            <Button onClick = { e => Logout()} variant="outline-success">Logout</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
	<ChatPage />
	<MainContent content = { toggle } login = { login } />
    </div>
  );
}

export default UserNavbar;
