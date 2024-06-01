
var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const ChangeInfo = (info) => {
	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const modifyInfo = async (body) => {
		try {
			console.log("info: ", body)
			const response = await fetch(URL + '/api/change-info', {
				mode:  'cors',
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					info : body,
				}),
				headers: {
					"X-CSRFToken": csrf,
					'Content-Type': 'application/json'
				},
			})
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}
	modifyInfo(info)	

}

export default ChangeInfo;
