function formatUpdateInterpretationBallot() {
	if(document.querySelector("#FinalStatus > tbody > tr:nth-child(2) > td:nth-child(2) > label:nth-child(1) > input[type='Radio']")) {

	} else {
		var membersBallotedTable = document.getElementById("MembersBalloted");
		var committeeResponsible = document.getElementById("CommitteeResponsibleField").firstElementChild.text + " Interpretations Committee";
		window.VotingResultsArea = document.querySelector("[name=VotingResults]");
		window.ClosingRemarksArea = document.getElementsByName("ClosingRemarks")[0];
		window.records = {};
		for(var i=1; i<membersBallotedTable.rows.length; i+=2) {
			var row = membersBallotedTable.rows[i];
			var nextRow = membersBallotedTable.rows[i+1];
			var proposedrecord = row.children[0].innerText.replace(/\n/g,"");
			records[proposedrecord] = {
				objection:[nextRow.children[1].innerText, row.children[1].innerText],
				no_objection:[nextRow.children[2].innerText, row.children[2].innerText],
				not_voting:[nextRow.children[3].innerText, row.children[3].innerText],
				not_returned:[nextRow.children[4].innerText, row.children[4].innerText],
				votingmembers:parseInt(nextRow.children[1].innerText) + parseInt(nextRow.children[2].innerText)
			}
		}
	
		records.isapproved = function(name) {
			if(parseInt(records[name].not_returned[0]) > 0) return [false, "insufficient participation"];
			if(parseFloat(records[name].objection[0]) > 0) return [false, "an objection"];
			else return [true];
		}
	
		for(record in records) {
			if(records[record].objection) {
				VotingResultsArea.value += committeeResponsible + ":\n";
				VotingResultsArea.value += "Record(s): " + record + "\n";
				comp_showStat("objection","Objection");
				comp_showStat("no_objection","No Objection");
				comp_showStat("not_voting", "Not Voting");
				comp_showStat("not_returned", "Not Returned");
				VotingResultsArea.value += "\n";
	
				if(records.isapproved(record)[0]) {
					ClosingRemarksArea.value += "Record " + record + " was approved by the " + committeeResponsible + "\n";
				} else {
					ClosingRemarksArea.value += "Record " + record + " was disapproved by the " + committeeResponsible + " because of " + records.isapproved(record)[1] + "\n";
				}
			}
		}
	}
}