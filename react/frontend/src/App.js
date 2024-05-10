import './App.css';
import React from 'react';
import { useState } from 'react';
import GuestNavbar from './GuestNavbar.js';
import UserNavbar from './UserNavbar.js';
//import LoginPage from './LoginPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [login, setLogin] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token"));

	if (login || token ) {
		return (
			<UserNavbar 
				login = { login }
				setToken = { setToken }
				setLoginDetails = { setLogin } 
			/>
		);
	} else {
		return (
			<GuestNavbar 
				setToken = { setToken }
				setLoginDetails = { setLogin } 
			/>
		);
	}
}

export default App;
