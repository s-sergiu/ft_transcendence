
import { useEffect } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const AddFriend = (id) =>  {

	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const addFriend = async () => {
		try {
			const response = await fetch(URL + '/api/add-friend', {
				mode:  'cors',
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					login: id.login,
					friend: id.friend
				}),
				headers: {
					"X-Csrftoken": csrf,
					'Content-Type': 'application/json'
				},
			})
		} catch (error) {
			console.error(error);
		}
	}

	addFriend();
}

export default AddFriend;
