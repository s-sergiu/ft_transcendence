
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import GetUserList from './GetUserList';
import GetFriendList from './GetFriendList';
import RemoveFriend from './RemoveFriend';
import AddFriend from './AddFriend';
import { useEffect, useState } from 'react';

function Friends (props) {
	
	const { login } = props;
	const [ users, setUsers ] = useState();
	const [ friends, setFriends ] = useState();
	const [ refresh, setRefresh ] = useState(0);
	const { friend_list } = GetFriendList(login)
	const { user_list } = GetUserList(login)
	const object = { 
		login : login.login,
		friend : 0,
	}

	const removeFriendFromList = (id) => {
		object.friend = id;	
		RemoveFriend(object);
		setRefresh(refresh + 1);
	}

	const addFrienToList = (id) => {
		object.friend = id;	
		AddFriend(object);
		setRefresh(refresh + 1);
	}

	useEffect (() => {
		if (user_list) {
			setUsers(JSON.parse(user_list))
		}
		if (friend_list) {
			setFriends(JSON.parse(friend_list))
		}
	}, [refresh, user_list, friend_list])

		return (
			<div> 
			  <h2>Suggested Friends</h2>
			  <Table striped bordered hover >
				<thead>
				  <tr>
					<th>id</th>
					<th>Username</th>
					<th>Email</th>
					<th>Action</th>
				  </tr>
				</thead>
				<tbody>
				{ users && users.map((res) => (
					<tr>
					  <td>{res['pk']}</td> 
					  <td>{res['fields'].username}</td> 
					  <td>{res['fields'].email}</td> 
					  <Button onClick = { e => addFrienToList(res['pk']) } > <td>Add Friend</td> </Button>
					</tr>
				))}
				</tbody>
			  </Table>
			  <h2>Actual Friends List</h2>
			  <Table striped bordered hover >
				<thead>
				  <tr>
					<th>id</th>
					<th>Username</th>
					<th>Email</th>
					<th>Action</th>
				  </tr>
				</thead>
				<tbody>
				{ friends && friends.map((res) => (
					<tr>
					  <td>{res['pk']}</td> 
					  <td>{res['fields'].username}</td> 
					  <td>{res['fields'].email}</td> 
					  <Button onClick = { e => removeFriendFromList(res['pk']) } > <td>Remove Friend</td> </Button>
					</tr>
				))}
				</tbody>
			  </Table>
			</div>
		);
}

export default Friends;
