import './App.css';
import React from 'react';
import { useState } from 'react';
import GuestNavbar from './components/GuestNavbar.js';
import UserNavbar from './components/UserNavbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

	const [login, setLogged] = useState(false);
	const [userData, setUserData] = useState();

	 if (login) {
		return (
			<UserNavbar 
				setLogged = { setLogged } 
				userData = { userData } 
			/>
		);
	 } else {
	 	return (
	 		<GuestNavbar 
	 			setLogged = { setLogged } 
				setUserData = { setUserData }
	 		/>
	 	);
	 }
}

export default App;
