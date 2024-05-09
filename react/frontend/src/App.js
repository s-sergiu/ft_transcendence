import './App.css';
import React from 'react';
import { useState } from 'react';
import GuestNavbar from './GuestNavbar.js';
import UserNavbar from './UserNavbar.js';
//import LoginPage from './LoginPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [userLogged, setUserLogged] = useState(false);
	const [login, setLogin] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token"));

	if (userLogged || token ) {
		return (
			<UserNavbar 
				loginStatus = { setUserLogged } 
				login = { login }
				setToken = { setToken }
				setLoginDetails = { setLogin } 
			/>
		);
	} else {
		return (
			<GuestNavbar 
				loginStatus = { setUserLogged } 
				setToken = { setToken }
				setLoginDetails = { setLogin } 
			/>
		);
	}
}

export default App;
