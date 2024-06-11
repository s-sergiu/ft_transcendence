
var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const SendPhoto = (file) => {
	let csrf;

	try {
		csrf = document.cookie.match(("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)"))[2];
	} catch (error) {
		console.error(error.message);
	}
	const sendPicture = async () => {
		try {
			const response = await fetch(URL + '/api/send-photo', {
				mode:  'cors',
				method: 'POST',
				credentials: 'include',
				body: file,
				headers: {
					"X-CSRFToken": csrf,
				},
			})
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
	}
	sendPicture()	
}

export default SendPhoto;
