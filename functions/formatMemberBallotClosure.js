/*

  This function counts/summarizes the voting tally for each member and committee on the ballot.

*/

(function() {

  overlay
  	.set("formatMemberBallotClosure", formatMemberBallotClosure);

  function formatMemberBallotClosure() {
    makePageSmall();

    // Do nothing if the ballot page is at the final stage
    if(document.querySelector('#FinalStatus > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="Radio"]:nth-child(1)')) {
      return;
    }

    var closingRemarksArea = document.querySelector("[name=ClosingRemarks]");
    var closingTxt = [];
    var committee, currentlyVoting, currentRow;
    var members;
    var nextRow;
    var proposedMembership;
    var votesTables = document.querySelectorAll(".DetailPage");
    var votingResultsArea = document.querySelector("[name=VotingResults]");
    var txtToDisplay = [];

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    votingResultsArea.rows = "7";

    // Loop through each table which displays the vote tally
    for(j=5;j<votesTables.length; j++) {
      members = {};
      currentlyVoting = votesTables[j];
      committee = votesTables[j].previousSibling.textContent.replace(/\t/g,"").replace(/\n/g,"");
      if(committee.charAt(0) == "-") {
        committee = committee.replace("-", "");
      }

      for(var i=1; i<currentlyVoting.rows.length; i+=2) {
        proposedMembership = currentlyVoting.rows[i].children[0].innerText;
        currentRow = currentlyVoting.rows[i];
        nextRow = currentlyVoting.rows[i+1];
        members[proposedMembership] = {
          approved:getStatArr(1),
          disapproved:getStatArr(2),
          abstain:getStatArr(3),
          notVoting:getStatArr(4),
          notReturned:getStatArr(5),
          votingmembers:parseInt(currentlyVoting.rows[i+1].children[1].innerText) + parseInt(currentlyVoting.rows[i+1].children[3].innerText) + parseInt(currentlyVoting.rows[i+1].children[5].innerText)
        }
      }

      for(member in members) {
        if(members[member].approved) {
          var outArr = [];

          outArr.push(member + ":");
          outArr.push(committee);
          outArr.push(members[member].approved[0] + " Approved");
          outArr.push(showStat("disapproved","Disapproved"));
          outArr.push(showStat("abstain","Abstain"));
          outArr.push(showStat("notVoting","Not Voting"));
          outArr.push(showStat("notReturned","Not Returned"));

          txtToDisplay.push(outArr.join("\n"));

          if(isapproved(member)) {
            closingTxt.push(member + " was approved by "+committee);
          } else {
            closingTxt.push(member + " was not approved by "+committee);
          }
        }
      }
    }

    closingRemarksArea.value = closingTxt.join("\n");
    votingResultsArea.value = txtToDisplay.join("\n");

   function isapproved(name) {
      if(parseFloat(members[name].approved[0])/parseFloat(members[name].votingmembers) >= 0.5) {
        return true;
      }
      return false;
    }

    // Closure is dependent on context
    function getStatArr(n) {
      return [
        nextRow.children[n].innerText,
        currentRow.children[n].innerText
      ];
    }

    // Closure is dependent on context
    function showStat(stat, txt) {
      var outTxt;
      outTxt = members[member][stat][0] + " " + txt + " ";
      if(parseInt(members[member][stat][0]) > 0) {
        outTxt += "(" + members[member][stat][1] + ")";
      }
      return outTxt;
    }
  }
})();