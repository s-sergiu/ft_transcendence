
import { useState } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetFriendList = (body) =>  {

	const [friend_list, setFriends] = useState();
	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const fetchFriendList = async () => {
		try {
			const response = await fetch(URL + '/api/get-friendlist', {
				mode:  'cors',
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					login: body
				}),
				headers: {
					"X-Csrftoken": csrf,
					'Content-Type': 'application/json'
				},
			})
			const data = await response.json();
			setFriends(data);
		} catch (error) {
			console.error(error);
		}
	}

	fetchFriendList();

	return { friend_list }

}

export default GetFriendList;
