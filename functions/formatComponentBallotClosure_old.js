(function() {
  overlay
    .set("formatComponentBallotClosure", formatComponentBallotClosure);

  function formatComponentBallotClosure() {
    if(document.querySelector('#FinalStatus > tbody > tr:nth-child(2) > td:nth-child(2) > label:nth-child(1) > input[type="Radio"]')) {
      return;
    }

    makePageSmall();

    var BallotedTable = document.querySelector("[name=CommitteesBalloted]").tBodies[0];
    var BallotInfoTables = document.querySelectorAll("[name=BallotInfo]");
    var ballotNum = document.querySelectorAll("#BallotInfo > tbody > tr:nth-child(2) > td:nth-child(1)")[1].innerText;
    var VotingResultsArea = document.querySelector("[name=VotingResults]");
    var ClosingRemarksArea = document.querySelector("[name=ClosingRemarks]");

    var commentsTables = document.querySelectorAll("[name=CommitteesForReview]");

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    VotingResultsArea.setAttribute("rows","8");
    VotingResultsArea.value = "";
      
    committeeBalloted = getBalloted();

    var BallotInfo = {
      RecordNumber: BallotedTable.rows[1].children[0].innerText.replace(/\n/gi, " "),
      Board: BallotInfoTables[2].rows[2].innerText,
      StdzCommittee: BallotInfoTables[2].rows[4].innerText,
      Subcommittee: BallotInfoTables[2].rows[6].innerText
    };

    var records = {};

    for(var i=1; i<BallotedTable.rows.length; i+=2) {
      var proposedrecord = BallotedTable.rows[i].children[0].innerText.replace(/\n/g, "");
      var currentRow = BallotedTable.rows[i];
      var nextRow = BallotedTable.rows[i+1];

      records[proposedrecord] = {
        approved:             getStatArr(1),
        disapproved:          getStatArr(2),
        disapprovednocomment: getStatArr(3),
        abstain:              getStatArr(4),
        notVoting:            getStatArr(5),
        notReturned:          getStatArr(6),
        votingmembers:        parseInt(nextRow.children[1].innerText) + parseInt(nextRow.children[2].innerText) + parseInt(nextRow.children[6].innerText)
      }
    }

    for(record in records) {
      if(records[record].approved) {
        VotingResultsArea.value += committeeBalloted + ":\n";
        VotingResultsArea.value += "Record(s): " + record + "\n";
        VotingResultsArea.value += records[record].approved[0] + " Approved\n";
        comp_showStat("disapproved","Disapproved");
        comp_showStat("disapprovednocomment","Disapproved w/out Comment");
        comp_showStat("abstain", "Abstain");
        comp_showStat("notVoting", "Not Voting");
        comp_showStat("notReturned", "Not Returned");
        VotingResultsArea.value += "\n";

        if(isapproved(record)) {
          ClosingRemarksArea.value += "Record " + record + " was approved by the " + committeeBalloted + "\n";
        } else {
          ClosingRemarksArea.value += "Record " + record + " was disapproved by the " + committeeBalloted + "\n";
        }
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    function comp_showStat(stat, txt) {
      VotingResultsArea.value += records[record][stat][0] + " " + txt + " ";
      if(parseInt(records[record][stat][0]) > 0) VotingResultsArea.value += "(" + records[record][stat][1] + ")";
      VotingResultsArea.value += "\n";
    }

    function isapproved(name) {
      if(parseFloat(records[name].approved[0])/parseFloat(records[name].votingmembers) >= 0.6666) {
        if(ballotNum.indexOf("RC") == -1) {
          if(parseInt(records[name].disapproved) == 0) {
            return true;
          }
        }
        if(ballotNum.indexOf("RC") != -1) {
          return true;
        }
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

    function getBalloted() {

      var committeeLevels = {
        subtier:null,
        standards:null,
        board:null,
        review:null
      };

      var k=3;
      for(tier in committeeLevels) {
        if(document.querySelector("#BallotInfo > tbody > tr:nth-child("+k+") > td > div")) {
          if(document.querySelector("#BallotInfo > tbody > tr:nth-child("+k+") > td > div").innerText != "") {
            var allSubtiers = document.querySelectorAll("#BallotInfo > tbody > tr:nth-child("+k+") > td > div");
            committeeLevels[tier] = [];
            for (var i=0; i<allSubtiers.length; i++) {
              committeeLevels[tier].push(allSubtiers[i].innerText);
            }
          }
        }
        k+=2;  
      }

      var committeeBalloted = [];
      var c = 0;
      for(tier in committeeLevels) {
        if(committeeLevels[tier] && committeeLevels[tier][0]) {
          committeeBalloted = committeeBalloted.concat(committeeLevels[tier]);
        }
      }

      if(committeeBalloted.length == 1) {
        return committeeBalloted[0];
      } else {
        var topCommittees = committeeBalloted.slice(0,committeeBalloted.length-1).join(", ");
        var lastCommittee = " and " + committeeBalloted.slice(-1)[0];
        return topCommittees + lastCommittee;
      }
    }

  }

})();