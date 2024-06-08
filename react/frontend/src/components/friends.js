
import GetUserList from './GetUserList';

function Friends () {
	
	const { list } = GetUserList();
	if (list) {
		var test = JSON.parse(list);
	}
	console.log(test);
	return (
		<div className="matches-info">
		  <h2>Matches History</h2>
		  <table className="table">
			<thead>
			  <tr>
				<th>pk</th>
				<th>username</th>
				<th>email</th>
			  </tr>
			</thead>
			<tbody>
			{ test.map((res) => (
				<tr>
				  <td>{res['pk']}</td>
				  <td>{res['fields'].username}</td>
				  <td>{res['fields'].email}</td>
				</tr>
			))}
			</tbody>
		  </table>
		</div>
	);
}

export default Friends;
