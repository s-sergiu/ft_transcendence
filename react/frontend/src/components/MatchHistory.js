
import GetMatchData from './GetMatchData';
import { useState, useEffect } from 'react';

function MatchHistory () {
	const { data }= GetMatchData('sergiu123');
	if (data) {
		console.log(data);
		var test = JSON.parse(data);
		console.log(test)
	}

	if (data) {
	return (
				<div className="matches-info">
				  <h2>Matches History</h2>
				  <table className="table">
					<thead>
					  <tr>
						<th>Player1</th>
						<th>Player2</th>
						<th>Score1</th>
						<th>Score2</th>
						<th>Timenow</th>
						<th>Winner</th>
					  </tr>
					</thead>
					<tbody>
					{ test.map((res) => (
						<tr>
						  <td>{res['fields'].player1}</td>
						  <td>{res['fields'].player2}</td>
						  <td>{res['fields'].score1}</td>
						  <td>{res['fields'].score2}</td>
						  <td>{res['fields'].timenow}</td>
						  <td>{res['fields'].winner}</td>
						</tr>
					))}
					</tbody>
				  </table>
				</div>
	);
	} else {
		return ( <h1> empty </h1> )
	}
}

export default MatchHistory;
