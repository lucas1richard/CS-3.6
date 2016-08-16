function formatComponentBallotClosure() {
  if(document.querySelector('#FinalStatus > tbody > tr:nth-child(2) > td:nth-child(2) > label:nth-child(1) > input[type="Radio"]')) {
    return;
  } else {
    makePageSmall();
    var ballotNum = document.querySelectorAll("#BallotInfo > tbody > tr:nth-child(2) > td:nth-child(1)")[1].innerText;

    var txtArea = document.getElementsByTagName("textarea");
    for(var i=0; i<txtArea.length; i++) {
      txtArea[i].setAttribute("class","form-control");
      txtArea[i].setAttribute("cols","100");
      txtArea[i].setAttribute("rows","5");
    }

    var VotingResultsArea = document.getElementsByName("VotingResults")[0];
      VotingResultsArea.setAttribute("rows","8");
      VotingResultsArea.value = "";
    var ClosingRemarksArea = document.getElementsByName("ClosingRemarks")[0];
    // var committeeBalloted;

    var committeeLevels = {
      subtier:null,
      standards:null,
      board:null,
      review:null
    };

    committeeLevels.getBalloted = function() {
      
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
        console.log(committeeLevels);
        var topCommittees = committeeBalloted.slice(0,committeeBalloted.length-1).join(", ");
        var lastCommittee = " and " + committeeBalloted.slice(-1)[0];
        return topCommittees + lastCommittee;
      }
    }

    var k=3;
    for(tier in committeeLevels) {
      if(tier != "getBalloted") {
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
    }
    
    committeeBalloted = committeeLevels.getBalloted();
    var BallotedTable = document.getElementsByName("CommitteesBalloted")[0].tBodies[0];

    var BallotInfoTables = document.getElementsByName("BallotInfo");
    var BallotInfo = {
      RecordNumber: BallotedTable.rows[1].children[0].innerText.replace(/\n/gi, " "),
      Board: BallotInfoTables[2].rows[2].innerText,
      StdzCommittee: BallotInfoTables[2].rows[4].innerText,
      Subcommittee: BallotInfoTables[2].rows[6].innerText
    };

    var records = {};

    for(var i=1; i<BallotedTable.rows.length; i+=2) {
      var proposedrecord = BallotedTable.rows[i].children[0].innerText.replace(/\n/g, "");
      records[proposedrecord] = {
        approved:[BallotedTable.rows[i+1].children[1].innerText, BallotedTable.rows[i].children[1].innerText],
        disapproved:[BallotedTable.rows[i+1].children[2].innerText, BallotedTable.rows[i].children[2].innerText],
        disapprovednocomment:[BallotedTable.rows[i+1].children[3].innerText, BallotedTable.rows[i].children[3].innerText],
        abstain:[BallotedTable.rows[i+1].children[4].innerText, BallotedTable.rows[i].children[4].innerText],
        notVoting:[BallotedTable.rows[i+1].children[5].innerText, BallotedTable.rows[i].children[5].innerText],
        notReturned:[BallotedTable.rows[i+1].children[6].innerText, BallotedTable.rows[i].children[6].innerText],
        votingmembers:parseInt(BallotedTable.rows[i+1].children[1].innerText) + parseInt(BallotedTable.rows[i+1].children[2].innerText) + parseInt(BallotedTable.rows[i+1].children[6].innerText)
      }
    }

    records.isapproved = function(name) {
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

        if(records.isapproved(record)) {
          ClosingRemarksArea.value += "Record " + record + " was approved by the " + committeeBalloted + "\n";
        } else {
          ClosingRemarksArea.value += "Record " + record + " was disapproved by the " + committeeBalloted + "\n";
        }
      }
    }
  }
}


function comp_showStat(stat, txt) {
  VotingResultsArea.value += records[record][stat][0] + " " + txt + " ";
  if(parseInt(records[record][stat][0]) > 0) VotingResultsArea.value += "(" + records[record][stat][1] + ")";
  VotingResultsArea.value += "\n";
}