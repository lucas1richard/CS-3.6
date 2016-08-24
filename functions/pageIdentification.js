(function() {
  overlay
    .set("pageIdentification", pageIdentification);

  function pageIdentification() {
    if(document.querySelector(".pagehdg")) {
      var pagehdg = document.querySelector(".pagehdg");

      var pgToFunction = [
        {term: "Advanced Record Search",        fn: overlay.formatAdvancedRecordSearch},
        {term: "Ballots",                       fn: overlay.formatSearchBallots},
        {term: "New Membership Ballot",         fn: formatNewMemberBallot},
        {term: "New Component Ballot",          fn: formatNewComponentBallot},
        {term: "New Entire Document Ballot",    fn: formatNewEntireDocumentBallot},
        {term: "New Component Record",          fn: overlay.formatNewComponentRecord},
        {term: "New BSR-8",                     fn: formatNewBSR8},
        {term: "New Entire Document Record",    fn: overlay.formatNewEntireDocumentRecord},
        {term: "Recirculate Component",         fn: formatNewRecirculationBallot},
        {term: "Record Search Results",         fn: formatRecordSearchResults},
        {term: "Set Membership Options",        fn: function() {appendShortList(document.querySelector("#Committee1"));}},
        {term: "Update Component Ballot",       fn: overlay.formatComponentBallotClosure},
        {term: "Update Component Record",       fn: formatUpdateComponentRecord},
        {term: "Update Interpretations Record", fn: overlay.formatUpdateInterpretationRecord},
        {term: "Update Interpretations Ballot", fn: overlay.formatUpdateInterpretationBallot},
        {term: "Update Membership Ballot",      fn: overlay.formatMemberBallotClosure},
        {term: "View Entire Document Record",   fn: overlay.formatViewEntireDocumentRecord},
        {term: "View Component Ballot",         fn: overlay.formatViewComponentBallot},
        {term: "View Component Record",         fn: overlay.formatViewComponentRecord},
        {term: "View Entire Document Ballot",   fn: formatViewEntireDocBallot},
        {term: "View Interpretations",          fn: overlay.viewInterp},
        {term: "View Membership Ballot",        fn: overlay.formatViewMemberBallot},
      ];

      for(var i=0; i<pgToFunction.length; i++) {
        if(pagehdg.innerText.search(pgToFunction[i].term) != -1) {
          pgToFunction[i].fn();
          return;
        }
      }
      
    } else {

      var pgToFunction = [
        {term: "OpenBallots",         fn: formatOpenBallots},
        {term: "ContactInformation",  fn: overlay.formatHomePage},
        {term: "Committee=",          fn: overlay.formatCommitteePage},
        {term: "vcc.cfm",             fn: overlay.formatVCC},
        {term: "Staff",               fn: overlay.formatStaff},
        {term: "AS11",                fn: overlay.formatAS11},
        {term: "Search",              fn: overlay.formatSearch}
      ];

      for(var i=0; i<pgToFunction.length; i++) {
        if(window.location.href.search(pgToFunction[i].term) != -1) {
          pgToFunction[i].fn();
          return;
        }
      }

      if(window.location.href.search("ANSISubmittals") != -1) { console.log("ANSI"); return;}
      if(window.location.href.search("reports.cfm") != -1) { console.log("Reports"); return;}
      if(window.location.href.search("SummaryofNegatives") != -1) { console.log("Negatives & Responses"); return; }
      if(window.location.href.search("ProjectManagerRecords") != -1) { console.log("My Items"); return; }
      if(window.location.href.search("CustomTracking") != -1) { console.log("Custom Tracking"); return; }
      if(window.location.href.search("AnnouncementFormID=1") != -1) { console.log("News"); return; }
      if(window.location.href.search("AnnouncementFormID=2") != -1) { console.log("Help page"); return; }
    }
  }
})();