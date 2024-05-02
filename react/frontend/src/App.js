import './App.css';
import React from 'react';
import { useState } from 'react';
import UserNavbar from './UserNavbar.js';
import GuestNavbar from './GuestNavbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [userLogged, setUserLogged] = useState(false);

	if (userLogged) {
		return (
			<UserNavbar 
				loginStatus = { setUserLogged }
			/>
		);
	} else {
		return (
			<GuestNavbar 
				loginStatus = { setUserLogged } 
			/>
		);
	}
}

export default App;
