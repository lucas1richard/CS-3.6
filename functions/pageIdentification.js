function pageIdentification() {
	if(document.querySelector(".pagehdg")) {
		var pagehdg = document.querySelector(".pagehdg");
		if(pagehdg.innerText.search("Recirculate Component") != -1) {
			formatNewRecirculationBallot();
			console.log("formatNewRecirculationBallot()");
			return;
		}
		if(pagehdg.innerText.search("Update Component Ballot") != -1) {
			formatComponentBallotClosure();
			return;
		}
		if(pagehdg.innerText.search("Ballots") != -1) {
			formatSearchBallots();
			return;
		}
		if(pagehdg.innerText.search("Update Membership Ballot") != -1) {
			formatMemberBallotClosure();
			return;
		}
		if(pagehdg.innerText.search("New Membership Ballot") != -1) {
			formatNewMemberBallot();
			return;
		}
		if(pagehdg.innerText.search("New Component Ballot") != -1) {
			formatNewComponentBallot();
			return;
		}
		if(pagehdg.innerText.search("New Entire Document Ballot") != -1) {
			formatNewEntireDocumentBallot();
			return;
		}
		if(pagehdg.innerText.search("Update Component Record") != -1) {
			formatUpdateComponentRecord();
			return;
		}
		if(pagehdg.innerText.search("New Component Record") != -1) {
			formatNewComponentRecord();
			return;
		}
		if(pagehdg.innerText.search("View Component Ballot") != -1) {
			formatViewComponentBallot();
			return;
		}
		if(pagehdg.innerText.search("View Component Record") != -1) {
			formatViewComponentRecord();
			return;
		}
		if(pagehdg.innerText.search("View Membership Ballot") != -1) {
			formatViewMemberBallot();
			return;
		}
		if(pagehdg.innerText.search("View Entire Document Ballot") != -1) {
			formatViewEntireDocBallot();
			return;
		}
		if(pagehdg.innerText.search("New BSR-8") != -1) {
			formatNewBSR8();
			return;
		}
		if(pagehdg.innerText.search("New Entire Document Record") != -1) {
			formatNewEntireDocumentRecord();
			return;
		}
		if(pagehdg.innerText.search("View Entire Document Record") != -1) {
			formatViewEntireDocumentRecord();
			return;
		}
		if(pagehdg.innerText.search("Update Interpretations Record") != -1) {
			formatUpdateInterpretationRecord();
			return;
		}
		if(pagehdg.innerText.search("Update Interpretations Ballot") != -1) {
			formatUpdateInterpretationBallot();
			return;
		}
		if(pagehdg.innerText.search("Update Board Procedural") != -1) {
			console.log("Update Board Procedural Ballot page");
			return;
		}
		if(pagehdg.innerText.search("Record Search Results") != -1) {
			formatRecordSearchResults();
			return;
		}
		if(pagehdg.innerText.search("Advanced Record Search") != -1) {
			formatAdvancedRecordSearch();
			return;
		}
	}
	if(window.location.href.search("OpenBallots") != -1) { 
		formatOpenBallots(); 
		return; 
	}
	if(window.location.href.search("ContactInformation") != -1) {
		formatHomePage();
		return;
	}
	if(window.location.href.search("SummaryofNegatives") != -1) { console.log("Negatives & Responses"); return; }
	if(window.location.href.search("ProjectManagerRecords") != -1) { console.log("My Items"); return; }
	if(window.location.href.search("CustomTracking") != -1) { console.log("Custom Tracking"); return; }
	if(window.location.href.search("AnnouncementFormID=1") != -1) { console.log("News"); return; }
	if(window.location.href.search("AnnouncementFormID=2") != -1) { console.log("Help page"); return; }
	if(window.location.href.search("Committee=") != -1) {
		formatCommitteePage();
		console.log("format committee page");
		return;
	}
	if(window.location.href.search("vcc.cfm") != -1) {
		formatVCC(); 
		return;
	}
	if(window.location.href.search("ANSISubmittals") != -1) {console.log("ANSI"); return;}
	if(window.location.href.search("Staff") != -1) {
		formatStaff(); 
		return;
	}
	if(window.location.href.search("reports.cfm") != -1) {console.log("Reports"); return;}
	if(window.location.href.search("AS11") != -1) {
		formatAS11(); 
		return;
	}
	
	if(window.location.href.search("Search") != -1) {
		if(window.location.href.search("SendEmail") != -1) {
			createEmailList();
		}
		if(document.querySelector(".pagehdg")){
			if(document.querySelector(".pagehdg").innerText.search("View Interpretations") != -1) {
				viewInterp();
				return;
			}
		}
		formatSearch(); 
		return;
	}
}