var URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME + ":" + process.env.REACT_APP_DJANGO_PORT
if (process.env.REACT_APP_HTTP_METHOD === 'https')
	URL = process.env.REACT_APP_HTTP_METHOD + "://" + process.env.REACT_APP_HOST_NAME

const OpenURI = async () => {
	let response = await getMessage();
	document.cookie = "csrftoken=" + response.token;

    function getCode() {
		window.open(process.env.REACT_APP_REDIRECT_URI, "_self")
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
	getCode();
}

export default OpenURI
