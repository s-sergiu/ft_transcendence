import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar.js';
import GuestNavbar from './GuestNavbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
	baseURL: "http://127.0.0.1:8000"
});

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
				client = { client }
			/>
		);
	}
}

export default App;
