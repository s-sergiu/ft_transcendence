import './App.css';
import React from 'react';
import { useState } from 'react';
import GuestNavbar from './GuestNavbar.js';
import LoginPage from './LoginPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [userLogged, setUserLogged] = useState(false);

	if (userLogged) {
		return (
			<LoginPage/>
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
