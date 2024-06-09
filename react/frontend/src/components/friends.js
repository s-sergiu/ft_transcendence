
import Button from 'react-bootstrap/Button';
import GetUserList from './GetUserList';
import GetFriendList from './GetFriendList';
import RemoveFriend from './RemoveFriend';
import AddFriend from './AddFriend';
import { useEffect } from 'react';

function Friends (props) {
	
	const { login } = props;
	var test;
	var friends_list;
	const { list } = GetUserList();
	const { friends } = GetFriendList(login);
	if (list) {
		test = JSON.parse(list);
	}

	const object = { 
		login : login.login,
		friend : 0,
	}

	if (friends) {
		friends_list = JSON.parse(friends);
	}
	
	const removeFriendFromList = (id) => {
		object.friend = id;	
		console.log(object);
		RemoveFriend(object);
	}

	const addFrienToList = (id) => {
		object.friend = id;	
		console.log(object);
		AddFriend(object);
	}

	if ( test && friends_list )  {
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
				{ test.map((res) => (
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
					<th>Username</th>
					<th>Email</th>
				  </tr>
				</thead>
				<tbody>
				{ friends_list.map((res) => (
					<tr>
					  <td>{res['pk']}</td> 
					  <td>{res['fields'].username}</td> 
					  <td>{res['fields'].email}</td> 
					  <Button onClick = { e => removeFriendFromList(res['pk']) } > <td>Remove Friend</td> </Button>
					</tr>
				))}
				</tbody>
			  </table>
			</div>
			</div>
		);
	} else if (test) { 
		return (
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
				{ test.map((res) => (
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
		);
	} else { 
		return ( <h1> test </h1> ); 
	} 
}

export default Friends;
