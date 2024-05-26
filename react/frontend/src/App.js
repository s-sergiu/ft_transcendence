import './App.css';
import React from 'react';
import { useState } from 'react';
import GuestNavbar from './components/GuestNavbar.js';
import UserNavbar from './components/UserNavbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

	const [login42, set42Login] = useState(false);
	const [login, setLogin] = useState(false);
	const [user, setUser] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token"));

	 if (user || login || login42 || token ) {
		return (
			<UserNavbar 
				login = { login }
				login42 = { login42 }
				setToken = { setToken }
				setLogin = { setLogin } 
				set42Login = { set42Login } 
			/>
		);
	 } else {
	 	return (
	 		<GuestNavbar 
	 			setToken = { setToken }
	 			set42Login = { set42Login } 
	 			setLogin = { setLogin } 
	 		/>
	 	);
	 }
}

export default App;
