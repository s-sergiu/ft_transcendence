
import { useEffect, useState } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetToken = (code) =>  {

	const [token, setToken] = useState();
	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const fetchToken = async () => {
		try {
			if (code != null) {
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
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchToken();
	}, []);

	return { token }
}

export default GetToken;
