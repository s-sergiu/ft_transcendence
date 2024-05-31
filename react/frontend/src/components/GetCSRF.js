
var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const GetCSRF = async () => {

	async function getResponse() {
		let response = await getMessage();
		document.cookie = "csrftoken=" + response.token;
	}

	async function getMessage() {
		const response = await fetch(URL + '/api/get-csrf', {
			mode:  'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		})
		return response.json();
	}
	getResponse();
}

export default GetCSRF;
