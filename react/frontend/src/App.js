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
	let token = localStorage.getItem("token");

	if (userLogged || token ) {
		console.log("logg");
		return (
			<UserNavbar 
				loginStatus = { setUserLogged } 
				login = { login }
				setLoginDetails = { setLogin } 
			/>
		);
	} else {
		console.log("not logg");
		return (
			<GuestNavbar 
				loginStatus = { setUserLogged } 
				setLoginDetails = { setLogin } 
			/>
		);
	}
}

export default App;
