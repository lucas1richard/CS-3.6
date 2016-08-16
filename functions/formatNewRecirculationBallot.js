function formatNewRecirculationBallot() {
	var DATECLOSED = document.getElementById("DateClosed");
    DATECLOSED.value = dateInput(14);
    if(document.querySelector(".pagehdg").innerText.search("Recirculate Component Ballot Form") != -1) {
		var descriptionArea = document.querySelector("[name=Description]");
		var desc = descriptionArea.value;
		desc = desc.replace("first consideration", "recirculation");
		desc = desc.replace("Four week", "Two week");
		descriptionArea.value = desc;
		
		var remarksArea = document.querySelector("[name=Remarks]");
		remarksArea.value = desc;

		var explanationArea = document.querySelector("[name=Explanation]");
		explanationArea.setAttribute("rows","8");

		explanationArea.value += "\n\nVotes on this recirculation ballot shall be based upon review of unresolved disapproved votes, public review objections, and/or substantive supervisory board comments and the related responses, as well as any revisions to the proposal. Disapproved votes shall be limited to:";
		explanationArea.value += "\n1) support of unresolved first consideration disapproved votes, unresolved Public Review objections and/or substantive supervisory board comments";
		explanationArea.value += "\n2) disagreement with any changes introduced to the proposal from the previously balloted proposal.";
		explanationArea.value += "\n\nIn those cases in which a disapproved vote on a recirculation ballot is not based on this criteria, the vote will be recorded as “disapproved without comment”, and will be considered for a future proposal.";
		explanationArea.value += "\n\nIf you voted on the first consideration ballot, and do not wish to change your vote for this recirculation ballot, no response is necessary. Your vote will remain the same.";
		explanationArea.value += "\nIf you voted on the first consideration ballot and wish to change your vote based on the criteria above, you may do so by recording your new vote.";
		explanationArea.value += "\nIf you did not cast a vote in the previous ballot, you may take this opportunity to register your vote. All disapproved votes and comments shall fulfill the same criteria as stated above.";
	}
	DATECLOSED.parentElement.setAttribute("class","form form-inline");
	DATECLOSED.setAttribute("class","form-control");	
}