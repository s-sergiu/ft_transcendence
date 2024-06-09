
import { useState } from 'react';

var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetUserList = (body) =>  {

	const [user_list, setUsers] = useState();

	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const fetchUsers = async () => {
		try {
			const response = await fetch(URL + '/api/get-userlist', {
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
			setUsers(data);
		} catch (error) {
			console.error(error);
		}
	}

	fetchUsers();

	return { user_list }

}

export default GetUserList;
