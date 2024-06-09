
import Game3D from './3d-game/3DGame';
import Mode from './game/mode.js';
import Profile from './profile';
import Tournament from './tournaments';

function MainContent (props) {
	const { content, login } = props;

	if (content === 'profile') {
		return (<Profile login = { login } />);
	} else if (content === 'game') {
		return (<Mode login = { login } />);
	} else if (content === 'tourn') {
		return (<Tournament />);
	} else if (content === '3dgame') {
		return (<Game3D />);
	}
}

export default MainContent;
