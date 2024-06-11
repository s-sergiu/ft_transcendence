
import Button from 'react-bootstrap/Button';
import GetUserList from './GetUserList';
import GetFriendList from './GetFriendList';
import RemoveFriend from './RemoveFriend';
import AddFriend from './AddFriend';
import { useEffect, useState } from 'react';
import Status from './Status/statusDisplay';
// import './css/friends.css';

function Friends (props) {
	
	const { login } = props;
	const [ users, setUsers ] = useState();
	const [ friends, setFriends ] = useState();
	const [ refresh, setRefresh ] = useState(0);

	const { user_list } = GetUserList(login)
	const { friend_list } = GetFriendList(login)
	const object = { 
		login : login.login,
		friend : 0,
	}

	const setFriendList = () => {
		friend_list = GetFriendList(login);
	}

	function removeFriendFromList(id) {
		object.friend = id;	
		RemoveFriend(object);
		setRefresh(refresh + 1);
	}

	function addFrienToList(id) {
		object.friend = id;	
		AddFriend(object);
		setRefresh(refresh + 1);
	}

	useEffect (() => {
		console.log(refresh);
		if (user_list) {
			setUsers(JSON.parse(user_list))
		}
		if (friend_list) {
			// console.log(friend_list);
			setFriends(JSON.parse(friend_list))
		}
	}, [refresh, user_list, friend_list])

		return (
			<div> 
			<div className="suggested-info">
			  <h2>Suggested Friends</h2>
			  <table className="table">
				<thead>
				  <tr>
					<th>id</th>
					<th>Username</th>
					<th>Email</th>
				  </tr>
				</thead>
				<tbody>
				{ users && friends && users.filter(res => res['fields'].username !== login.login && !friends.some(friend => friend['fields'].username === res['fields'].username)).map(res => (
					<tr>
					  <td>{res['pk']}</td> 
					  <td>{res['fields'].username}</td> 
					  <td>{res['fields'].email}</td> 
					  <Button onClick = { e => addFrienToList(res['pk']) } > <td>Add Friend</td> </Button>
					</tr>
				))}
				</tbody>
			  </table>
			</div>
			<div className="friends-list">
			  <h2>Actual Friends List</h2>
			  <table className="table">
				<thead>
				  <tr>
					<th>id</th>
					<th>Status</th>
					<th>Username</th>
					<th>Email</th>
				  </tr>
				</thead>
				<tbody>
				{ friends && friends.map((res) => (
					<tr>
					  <td>{res['pk']}</td>
					  <td><div><Status userName={res['fields'].username}/></div></td>
					  <td>{res['fields'].username}</td>
					  {/* <td><Status userName={res['fields'].username}/></td> */}
					  <td>{res['fields'].email}</td> 
					  <td><Button onClick = { e => removeFriendFromList(res['pk']) } > <td>Remove Friend</td> </Button> </td>
					</tr>
				))}
				</tbody>
			  </table>
			</div>
			</div>
		);
}

export default Friends;
