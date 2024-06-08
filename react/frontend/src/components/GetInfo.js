
import { useEffect, useState } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetInfo = (token) =>  {

	const [info, setInfo] = useState();
	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (err) {
		console.error(err.message);
	}
	const fetchInfo = async () => {
		try {
			const response = await fetch(URL + '/api/get-info', {
			  mode:  'cors',
			  method: 'POST',
			  credentials: 'include',
			  body: JSON.stringify({
				code: token
			  }),
			  headers: {
				"X-Csrftoken": csrf,
				'Content-Type': 'application/json'
			  },
			})
			const data = await response.json();
			setInfo(data);
		} catch (error) { 
			console.error(error) 
		}
	}

	useEffect(() => {
		fetchInfo();
	}, []);

	return { info }
}

export default GetInfo;

