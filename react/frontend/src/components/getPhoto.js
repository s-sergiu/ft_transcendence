
import { useState, useEffect } from 'react';
var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetPhoto = (name) => {
	let csrf;
	const [ photo ,setPhoto ] = useState();

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const getPic = async () => {
		try {
			const response = await fetch(URL + '/api/get-photo', {
				mode:  'cors',
				method: 'POST',
				credentials: 'include',
				body: name,
				headers: {
					"X-CSRFToken": csrf,
				},
			})
			const data = await response.json();
			setPhoto(data);
		} catch (error) {
			console.error(error);
		}
	}
	useEffect (() => {
		getPic()	
	}, [])
	return { photo }
}

export default GetPhoto;
