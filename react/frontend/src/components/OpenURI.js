
const OpenURI = async () => {

    function getCode() {
		window.open(process.env.REACT_APP_REDIRECT_URI, "_self")
	}

	getCode();
}

export default OpenURI
