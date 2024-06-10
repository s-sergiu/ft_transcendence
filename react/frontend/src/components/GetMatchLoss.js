
import { useEffect, useState } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetMatchLoss = (body) =>  {

	let csrf;
	const [ loss, setLoss ] = useState();

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (err) {
		console.error(err.message);
	}
	const fetchLoss = async () => {
		try {
			const response = await fetch(URL + '/api/get-match-loss', {
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
			setLoss(resp);
		} catch (error) { 
			console.error(error) 
		}
	}
	useEffect (() => {
		fetchLoss()
	}, [])
	return { loss }
}

export default GetMatchLoss;

