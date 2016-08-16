function formatOpenBallots() {

	  window.ballotsTable = document.querySelector(".HomePage");
	  var labelType = {
			"Membership":"label label-danger",
			"Component":"label label-primary",
			"Interpretation":"label label-default",
			"Board Procedural":"label label-success"
		};
		for (var i=4; i < ballotsTable.rows.length; i++) {
			if(ballotsTable.rows[i].children[1]){
				var actionsTD = ballotsTable.rows[i].children[1];

				if(actionsTD.children[0])actionsTD.children[0].firstElementChild.style.fontWeight = "bold";
				if(actionsTD.children[1])actionsTD.children[1].firstElementChild.style.fontSize = "8px";
				if(actionsTD.children[2])actionsTD.children[2].firstElementChild.style.fontSize = "8px";
				var ballotType = ballotsTable.rows[i].children[4].innerText;
				ballotType = ballotType.replace(/\n/g,"");
				
				ballotsTable.rows[i].children[4].style.fontSize = "10pt";

				if(labelType[ballotType]) {
					if(ballotsTable.rows[i].children[4].firstElementChild) {
						ballotsTable.rows[i].children[4].firstElementChild.className = labelType[ballotType];
					}
				}
				if(ballotsTable.rows[i].querySelectorAll("td")[6]) {
					ballotsTable.rows[i].removeChild(ballotsTable.rows[i].querySelectorAll("td")[6]);
				}
				if(ballotsTable.rows[i].querySelectorAll("th")[6]) {
					ballotsTable.rows[i].removeChild(ballotsTable.rows[i].querySelectorAll("th")[6]);
				}

				var tableMods = {};
	
				// Check closing date and highlight if ballot should close
				if(checkClosure(ballotsTable.rows[i].children[5].innerText)) {

					tableMods = {
						title:"Due to Close",
						css: "color:#cd4c4c; font-weight:bold;",
						class: "btn btn-xs btn-danger"
					};
					
					actionsTD.children[0].firstElementChild.style.backgroundColor = "#ffffcc";
					actionsTD.children[0].firstElementChild.style.color = "#1c4263";
				}

				// Check if a voting reminder should be sent
				if(checkReminder(ballotsTable.rows[i].children[5].innerText)) {

					tableMods = {
						title:"Send reminder",
						css: "color:blue; font-weight:bold;",
						class: "btn btn-xs btn-primary"
					};

					ballotsTable.rows[i].children[0].children[0].setAttribute("class", tableMods.class);
					
					var addorNot = true;

					if(addorNot) {
						// Create the reminder button and append next to date
						var reminderBtn = document.createElement("span");
						reminderBtn.innerText = "Send reminder";
						reminderBtn.setAttribute("class","btn btn-xs btn-default");
						reminderBtn.style.fontSize = "7pt";
						var str = ballotsTable.rows[i].children[0].firstElementChild.getAttribute("onclick").toString();
						var ballotnum = str.substring(str.lastIndexOf("BallotNumber")+13,str.lastIndexOf("&BallotYearOpened"));
						var yearnum = str.substring(str.lastIndexOf("YearOpened=")+11,str.lastIndexOf("&NoToolbar"));

						reminderBtn.setAttribute("onclick",'window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber='+ballotnum+'&BallotYearOpened='+yearnum+'&NoToolbar=yes&votesubmitted=0&SendReminder=yes");');
						ballotsTable.rows[i].children[5].innerHTML += "<br/>";
						ballotsTable.rows[i].children[5].appendChild(reminderBtn);
					}
				}
				if(tableMods.css) {
					ballotsTable.rows[i].children[5].setAttribute("style", tableMods.css);
					ballotsTable.rows[i].children[5].setAttribute("title", tableMods.title);
					ballotsTable.rows[i].children[3].setAttribute("style", tableMods.css);
					ballotsTable.rows[i].children[3].setAttribute("title", tableMods.title);
					ballotsTable.rows[i].children[2].setAttribute("style", tableMods.css);
					ballotsTable.rows[i].children[2].setAttribute("title", tableMods.title);
				}
			}
		}
		if(ballotsTable.rows[2].querySelectorAll("th")[6]) {
			ballotsTable.rows[2].removeChild(ballotsTable.rows[2].querySelectorAll("th")[6]);
		}
		if(ballotsTable.rows[ballotsTable.rows.length-3].querySelectorAll("th")[6]) {
			ballotsTable.rows[ballotsTable.rows.length-3].removeChild(ballotsTable.rows[ballotsTable.rows.length-3].querySelectorAll("th")[6]);
		}
		ballotsTable.style.maxWidth = "1200px";
		ballotsTable.style.margin = "auto";
	
	function createReminderForm(Ballot) {
		var year = Ballot.split("-")[0];
		var num = Ballot.split("-")[1];
		window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber="+num+"&BallotYearOpened="+year+"&NoToolbar=yes&votesubmitted=0&SendReminder=yes");
	}

	function checkReminder(fut) {

		var future = new Date(fut);
		var today = new Date();

		return (Math.floor((future-today)/60/60/24/1000) == 6);

	}
	
	function checkClosure(dat) {

		var future = new Date(dat);
		var today = new Date();

		return (Math.floor((future-today)/60/60/24/1000) <= -2);

	}
}