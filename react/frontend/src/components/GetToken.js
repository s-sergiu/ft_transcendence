
import { useEffect, useState } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.react_app_http_method === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetToken = (code) =>  {

	const [token, setToken] = useState();
	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.log(error);
	}
	const fetchToken = async () => {
		const response = await fetch(URL + '/api/get-token', {
			mode:  'cors',
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				code: code
			}),
			headers: {
				"X-CSRFToken": csrf,
				'Content-Type': 'application/json'
			},
		})
		const data = await response.json();
		setToken(data);
	}

	useEffect(() => {
		fetchToken();
	}, []);

	return { token }
}

export default GetToken;
