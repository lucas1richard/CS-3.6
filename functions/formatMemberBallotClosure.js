function formatMemberBallotClosure() {
	votesTables = document.querySelectorAll(".DetailPage");
	console.log(votesTables);
	var tables = [];
	for(var n=5; n < votesTables.length; n++) {
		tables.push(votesTables[n]);
	}
	console.log(tables);
	

	for(j=0;j<tables.length; j++) {
		window.members = {};
		votesTables = tables[j];
		var committee = tables[j].previousSibling.textContent.replace("			","");
		console.log(committee);
		for(var i=1; i<votesTables.rows.length; i+=2) {
			var proposedMembership = votesTables.rows[i].children[0].innerText;
			members[proposedMembership] = {
				approved:[votesTables.rows[i+1].children[1].innerText, votesTables.rows[i].children[1].innerText],
				disapproved:[votesTables.rows[i+1].children[2].innerText, votesTables.rows[i].children[2].innerText],
				abstain:[votesTables.rows[i+1].children[3].innerText, votesTables.rows[i].children[3].innerText],
				notVoting:[votesTables.rows[i+1].children[4].innerText, votesTables.rows[i].children[4].innerText],
				notReturned:[votesTables.rows[i+1].children[5].innerText, votesTables.rows[i].children[5].innerText],
				votingmembers:parseInt(votesTables.rows[i+1].children[1].innerText) + parseInt(votesTables.rows[i+1].children[3].innerText) + parseInt(votesTables.rows[i+1].children[5].innerText)
			}
		}


		members.isapproved = function(name) {
			if(parseFloat(members[name].approved[0])/parseFloat(members[name].votingmembers) >= 0.5) {
				return true;
			}
			return false;
		}

		window.votingResultsArea = document.querySelectorAll("[name=BallotInfo] > tbody > tr:nth-child(2) > td > textarea")[1];
		window.closingRemarksArea = document.querySelectorAll("#BallotInfo > tbody > tr:nth-child(5) > td > textarea")[0];

		for(member in members) {
			if(members[member].approved) {
				votingResultsArea.value += member + ":\n";
				votingResultsArea.value += committee;
				votingResultsArea.value += members[member].approved[0] + " Approved\n";
				showStat("disapproved","Disapproved");
				showStat("abstain", "Abstain");
				showStat("notVoting", "Not Voting");
				showStat("notReturned", "Not Returned");
				votingResultsArea.value += "\n";

				if(members.isapproved(member)) {
					closingRemarksArea.value += member + " was approved by "+committee;
				} else {
					closingRemarksArea.value += member + " was not approved by "+committee;
				}
			}
		}
	}
}

function showStat(stat, txt) {
	votingResultsArea.value += members[member][stat][0] + " " + txt + " ";
	if(parseInt(members[member][stat][0]) > 0) votingResultsArea.value += "(" + members[member][stat][1] + ")";
	votingResultsArea.value += "\n";
}