
import { useEffect, useState } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetMatchWins = (body) =>  {

	let csrf;
	const [ wins, setWins ] = useState();

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (err) {
		console.error(err.message);
	}
	const fetchWins = async () => {
		try {
			const response = await fetch(URL + '/api/get-match-wins', {
			  mode:  'cors',
			  method: 'POST',
			  credentials: 'include',
			  body: JSON.stringify({
				code: body
			  }),
			  headers: {
				"X-Csrftoken": csrf,
				'Content-Type': 'application/json'
			  },
			})
			const resp = await response.json();
			setWins(resp);
		} catch (error) { 
			console.error(error) 
		}
	}
	useEffect (() => {
		fetchWins()
	}, [])
	return { wins }
}

export default GetMatchWins;

