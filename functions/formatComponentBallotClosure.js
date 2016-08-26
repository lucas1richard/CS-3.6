(function() {
  overlay
    .set("formatComponentBallotClosure", formatComponentBallotClosure);

  function formatComponentBallotClosure() {
    if(document.querySelector('#FinalStatus > tbody > tr:nth-child(2) > td:nth-child(2) > label:nth-child(1) > input[type="Radio"]')) {
      return;
    }

    makePageSmall();

    var ballotNum = document.querySelectorAll("#BallotInfo > tbody > tr:nth-child(2) > td:nth-child(1)")[1].innerText;
    var VotingResultsArea = document.querySelector("[name=VotingResults]");
    var ClosingRemarksArea = document.querySelector("[name=ClosingRemarks]");

    var commentsTables = document.querySelectorAll("[name=CommitteesForReview]");
    var votesTables = document.querySelectorAll("[name=CommitteesBalloted]");

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Make two object of committees, the first for voting, and the second for comments
    var votingCommittees = {};
    var commentCommittees = {};
    var closingRemarks = {};
    var records = {};

    for(var j=0; j<votesTables.length; j++) {
      var committee = votesTables[j].parentNode.parentNode.parentNode.parentNode.previousSibling.textContent.replace(/\t/g,"").replace(/\n/g,"").replace("-","");
      votingCommittees[committee] = [];


      for(var i=1; i<votesTables[j].rows.length; i+=2) {
        var proposedrecord = votesTables[j].rows[i].children[0].innerText.replace(/\n/g, "");
        var individualRecords = proposedrecord.replace(/ /g, "").split(",");
        var currentRow = votesTables[j].rows[i];
        var nextRow = votesTables[j].rows[i+1];
        
        votingCommittees[committee].push({"record": proposedrecord, "votes":  []});

        var tmp = {
          approved:             getStatArr(1),
          disapproved:          getStatArr(2),
          disapprovednocomment: getStatArr(3),
          abstain:              getStatArr(4),
          notVoting:            getStatArr(5),
          notReturned:          getStatArr(6),
          votingmembers:        parseInt(nextRow.children[1].innerText) + parseInt(nextRow.children[2].innerText) + parseInt(nextRow.children[6].innerText)
        };

        var last = votingCommittees[committee].length - 1;

        votingCommittees[committee][last].votes.push("Record(s): " + proposedrecord);
        votingCommittees[committee][last].votes.push(tmp.approved[0] + " Approved");
        votingCommittees[committee][last].votes.push(comp_showStat("disapproved","Disapproved"));
        votingCommittees[committee][last].votes.push(comp_showStat("disapprovednocomment","Disapproved w/out Comment"));
        votingCommittees[committee][last].votes.push(comp_showStat("abstain", "Abstain"));
        votingCommittees[committee][last].votes.push(comp_showStat("notVoting", "Not Voting"));
        votingCommittees[committee][last].votes.push(comp_showStat("notReturned", "Not Returned"));

        // Maintain a list of which records are approved/disapproved by which committees
        for(var k=0; k<individualRecords.length; k++) {
          if(!records[individualRecords[k]]) {
            records[individualRecords[k]] = {};
          }
          records[individualRecords[k]][committee] = isapproved(tmp);
        }
      }
    }

    for(var j=0; j<commentsTables.length; j++) {
      var committee = commentsTables[j].firstElementChild.firstElementChild.firstElementChild.childNodes[2].textContent.replace(/\t/g,"").replace(/\n/g,"").replace(" - ","");
      commentCommittees[committee] = [];

      for(var i=2; i<commentsTables[j].rows.length; i+=2) {
        var proposedrecord = commentsTables[j].rows[i].children[0].innerText.replace(/\n/g, "");
        var currentRow = commentsTables[j].rows[i];
        var nextRow = commentsTables[j].rows[i+1];
        var individualRecords = proposedrecord.replace(/ /g, "").split(",");

        commentCommittees[committee].push({"record": proposedrecord, "votes":  []});

        var tmp = {comment: getStatArr(1)};
        var last = commentCommittees[committee].length - 1;

        commentCommittees[committee][last].votes.push(comp_showStat("comment","Comment"));

        // Maintain a list of which records are approved/disapproved by which committees
        for(var k=0; k<individualRecords.length; k++) {
          if(!records[individualRecords[k]]) {
            records[individualRecords[k]] = {};
          }
          if(tmp.comment[0] > 0) records[individualRecords[k]][committee] = tmp.comment[0] + " comment";
          if(tmp.comment[0] > 1) records[individualRecords[k]][committee] += "s";
        }
      }
    }

    var results = [];
    // Display results
    for(key in votingCommittees) {
      var txt = key + "\n";
      for(var i=0; i<votingCommittees[key].length; i++) {
        txt += votingCommittees[key][i].votes.join("\n");
      }
      results.push(txt);
    }

    var delimiter = "\n-------------------\n";

    VotingResultsArea.value = results.join(delimiter);

    var results = [];
    if(commentsTables.length > 0) {
      VotingResultsArea.value += delimiter;
      for(key in commentCommittees) {
        var txt = key;
        for(var i=0; i<commentCommittees[key].length; i++) {
          txt += "\nRecord(s): " + commentCommittees[key][i].record + "\n";
          txt += commentCommittees[key][i].votes.join("\n");
        }
        results.push(txt);
      }
      VotingResultsArea.value += results.join(delimiter);
    }

    var out = [];
    // Summarize results
    for(key in records) {
      var voteTxt = [];
      var commentTxt = [];
      var outTxt = "Record " + key + " was ";

      for(c in records[key]) {
        if(typeof records[key][c] == "string") {
          commentTxt.push(records[key][c] + " from " + c);
        } else {
          if(records[key][c]) {
            voteTxt.push("approved by the " + c);
          } else {
            voteTxt.push("disapproved by the " + c);
          }
        }
      }
      if(commentTxt.length > 0) {
        outTxt += joinWithCommas(voteTxt) + "and received " + joinWithCommas(commentTxt);
      } else {
        outTxt += joinWithCommas(voteTxt);
      }
      out.push(outTxt);
    }

    ClosingRemarksArea.value += out.join(delimiter);

    var numRows = VotingResultsArea.value.split("\n").length;
    VotingResultsArea.setAttribute("rows",numRows);
    var numRows = ClosingRemarksArea.value.split("\n").length;
    ClosingRemarksArea.setAttribute("rows",numRows);

    console.log(records);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Closure is dependent on context
    function comp_showStat(stat, txt) {
      var outTxt = tmp[stat][0] + " " + txt + " ";
      if(parseInt(tmp[stat][0]) > 0) outTxt += "(" + tmp[stat][1] + ")";
      return outTxt;
    }

    // Closure is dependent on context
    function isapproved(tmp) {
      if(parseFloat(tmp.approved[0])/parseFloat(tmp.votingmembers) >= 0.6666) {
        if(ballotNum.indexOf("RC") == -1) {
          if(parseInt(tmp.disapproved) == 0) {
            return true;
          }
        } else {
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
  }

})();