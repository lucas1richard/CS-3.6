function formatNewMemberBallot() {
  makePageSmall();
  
  document.getElementById("ProspectMemberID").parentElement.setAttribute("class","form form-inline");
  var DATECLOSED = document.getElementById("DateClosed");
    DATECLOSED.value = dateInput(14);

  DATECLOSED.parentElement.setAttribute("class","form form-inline");
  DATECLOSED.setAttribute("class","form-control");

  var ProspectMemberID = document.getElementById("ProspectMemberID");
  var DeleteProspectMemberID = document.getElementById("DeleteProspectMemberID");
  var BoardCommittee = document.getElementById("BoardCommittee");
  var StandardsCommittee = document.getElementById("StandardsCommittee");
  var Subcommittee = document.getElementById("SubCommittee");
  var Description = document.querySelector("[name=Description]");
  var Explanation = document.querySelector("[name=Explanation]");
  var Remarks = document.querySelector("[name=Remarks]");
  ProspectMemberID.addEventListener("click", newmember);
  //var checkNew = window.setInterval(newmember, 1000);
  var addbtns = document.querySelectorAll("[name=Add], [name=Remove]");

  for(var i=0; i<addbtns.length; i++) {
    addbtns[i].addEventListener("click", newmember);
  }

  function newmember() {
    Description.value = "";
    Remarks.value = "";
    if(checkComplete()) {
      window.committeeBalloted = {board:[], standards:[], sub:[], committees: 0};
      for(var i=0; i<BoardCommittee.children.length; i++) {
        var sub = BoardCommittee.children[i].innerHTML.replace(/&nbsp;/g, "").replace(/  - /g, "").replace(/amp;/g, "");
        committeeBalloted.board.push(sub);
        committeeBalloted.committees++;
      }
      for(var i=0; i<StandardsCommittee.children.length; i++) {
        var sub = StandardsCommittee.children[i].innerHTML.replace(/&nbsp;/g, "").replace(/  - /g, "").replace(/amp;/g, "");
        committeeBalloted.standards.push(sub + " Standards Committee");
        committeeBalloted.committees++;
      }
      for(var i=0; i<Subcommittee.children.length; i++) {
        var sub = Subcommittee.children[i].innerHTML.replace(/&nbsp;/g, "").replace(/  - /g, "").replace(/amp;/g, "");
        committeeBalloted.sub.push(sub);
        committeeBalloted.committees++;
      }

      Description.value = "Two week " + writeCommittees() + " membership ballot for the following:\n";
      Remarks.value = "Two week " + writeCommittees() + " membership ballot for the following:\n";

      for(var i=0; i<DeleteProspectMemberID.children.length; i++) {
        var sub = DeleteProspectMemberID.children[i].innerHTML.replace(/&nbsp;/g, "").replace(/  - /g, "").replace(/amp;/g, "");

        Description.value += " - " + sub + "\n";
        Remarks.value += " - " + sub + "\n";
      }
    }
  } 
  function checkComplete() {
    if(!DeleteProspectMemberID.children[0]) {
      return false;
    }
    if(!BoardCommittee.children[0] && !StandardsCommittee.children[0] && !Subcommittee.children[0]) {
      return false;
    }
    return true;
  } 

  function writeCommittees() {
    var out = "";
    for(committee in committeeBalloted) {
      if(committeeBalloted[committee].length > 0 && committee != "committees") {
        out += committeeBalloted[committee].join(" and ");
        if(committeeBalloted["committees"] > 1 && committee != "sub") out += ", ";
      }
    }
    return out;
  };
}

