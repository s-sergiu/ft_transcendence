var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const ChangeMatchData = (info) => {
	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const modifyInfo = async (body) => {
		try {
			const response = await fetch(URL + '/api/change-info', {
				mode:  'cors',
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					matchData : body.data,
				}),
				headers: {
					"X-CSRFToken": csrf,
					'Content-Type': 'application/json'
				},
			})
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
	}
	modifyInfo(info)	

}

export default ChangeMatchData;
