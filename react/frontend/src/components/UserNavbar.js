
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
import ChangeStatus from './Status/statusChange';
import io from 'socket.io-client';

var URL;
var socket;
if (process.env.REACT_APP_HTTP_METHOD === 'http') {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":4000";
	socket = io(URL);
} else {
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME 
	socket = io(URL, {   path: "/socket.io" });
}

function UserNavbar(props) {

	var profileInfo;
	const [ toggle, setNavToggle ] = useState('content');
	const [ login, setLogin ] = useState();
	const { userData, setLogged } = props;
	const { info } = GetInfo(localStorage.getItem("token"));

	function Logout() {
		if (userData)
			socket.emit('changeStatus', "Offline", userData[0]['fields']);
		else
			socket.emit('changeStatus', "Offline", login);
		localStorage.clear();
		setLogged(false);
	}
	
	useEffect(() => {
		if (userData) {
			profileInfo = userData[0]['fields']
			setLogin(profileInfo);
			socket.emit('changeStatus', "Online", userData[0]['fields']);
		}	
	}, [userData]);

	useEffect(() => {
		if (info && info.Message === 'User already exists!') {
			alert(info.Message)
			setLogged(false);
		} else if  (info && !info.Message) {
			profileInfo = info[0]['fields']
			socket.emit('changeStatus', "Online", profileInfo);
			setLogin(profileInfo);
		}	
	}, [profileInfo, info]);

  return (
    <div className="App">
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" onClick = { e => setNavToggle('content') }>transcendence</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link onClick = { e => setNavToggle('friends') } >Friends</Nav.Link>
            <Nav.Link onClick = { e => setNavToggle('game') } >Game</Nav.Link>
            <Nav.Link onClick = { e => setNavToggle('3dgame') } >3D Game</Nav.Link>
            <Nav.Link onClick = { e => setNavToggle('profile') } >{login && login.login} Profile</Nav.Link>

            
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
