
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Game3D from './3d-game/3DGame';
import Mode from './game/mode.js';
import Game from './game/Ping';
import Profile from './profile';
import { useEffect, useState } from 'react';
import Tournament from './tournaments';
//import Content from './Content';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME 

function UserNavbar(props) {

	const { setLoginDetails, setToken } = props
	const [ gameToggle, setGameToggle ] = useState('');
	const [ game3dToggle, set3dToggle ] = useState('');
	const [ tournToggle, setTournToggle ] = useState('');
	const [ profileToggle, setProfileToggle ] = useState('profile');

	function toggleNav(string) {

		if (string === 'game') {
			setGameToggle(true);
			setTournToggle(false);
			setProfileToggle(false);
			set3dToggle(false);
		}
		else if (string === 'tourn') {
			setGameToggle(false);
			setTournToggle(true);
			setProfileToggle(false);
			set3dToggle(false);
		}
		else if (string === 'profile') {
			setGameToggle(false);
			setTournToggle(false);
			setProfileToggle(true);
			set3dToggle(false);
		}
		else if (string === '3dgame') {
			setGameToggle(false);
			setTournToggle(false);
			setProfileToggle(false);
			set3dToggle(true);
		}
	}
	function Logout() {
		localStorage.clear();
		setLoginDetails(false);
		setToken('');
	}

	useEffect(() => {

	async function getInfo() {
		let csrf;
		if (document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)")) == null) {
			return({ "error" : "csrftoken" })
		} else
			csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
		let token = localStorage.getItem("token");
		const response = await fetch(URL + '/api/get-info', {
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
				setLoginDetails(false);
				setToken('');
				return undefined
			} else if (res['error'] === 'Not authorized') {
				console.log("Error : Not authorized - ", res.message)
			} else {
				res = res[0]['fields']
				setLoginDetails(res);
				//console.log("result", res)
				window.history.pushState("home", "ReactApp", "/")
			}	
		});
	}, [setLoginDetails, setToken]);
	

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
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link onClick = { e => toggleNav('game') } >Game</Nav.Link>
            <Nav.Link onClick = { e => toggleNav('3dgame') } >3D Game</Nav.Link>
            <Nav.Link onClick = { e => toggleNav('profile') } >Profile</Nav.Link>
            <Nav.Link onClick = { e => toggleNav('tourn') } >Tournaments</Nav.Link>

            
          </Nav>
		  <Form className="d-flex">
            <Button onClick = { e => Logout()} variant="outline-success">Logout</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
	<div>
	{	(() => { 
		if (gameToggle) { 
			return ( <Mode /> )
		} else if (tournToggle) {
			return ( <Tournament /> )
		} else if (profileToggle) {
			return (
				<Profile 
					loginData = { props.login } 
				/>
			)
		} else if (game3dToggle) {
			return ( <Game3D /> )
		}
	})
	() }
	  </div>
    </div>
  );
}

export default UserNavbar;
