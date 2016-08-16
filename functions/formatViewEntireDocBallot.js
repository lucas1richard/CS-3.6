function formatViewEntireDocBallot() {
	window.onload = function() {
		var record = document.querySelector("#BallotInfo > tbody > tr:nth-child(3) > td").innerText;
		if(window.location.href.indexOf("CheckPublished") != -1) {
			if(document.querySelector("#PublicationsLevel > tbody > tr:nth-child(4) > td:nth-child(2)") || document.querySelector("#ANSILevel > tbody > tr:nth-child(2) > td:nth-child(2)")) {
				var recordNum = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(2) > td:nth-child(1)").innerText;
				var year = recordNum.split("-")[0];
				var num = recordNum.split("-")[1];
				window.open('UpdateRecordForm.cfm?Action=Update&TrackingNumber='+num+'&YearOpened='+year+'&NoToolbar=yes&CheckPublished=yes');
				window.close();
			} else {
				window.close();
			}
		}
		if(window.location.href.indexOf("SendReminder") != -1) {
			chrome.storage.sync.get({remindersSent:[]}, function(r) {
				for(var i=0; i<r.remindersSent.length; i++) {
					if(r.remindersSent[i] == record) {
						alert("Reminder was already sent today");
						return;
					}
				}
				document.querySelector("input[name=EmailReminder]").click();
				r.remindersSent.push(record);
				chrome.storage.sync.set({remindersSent:r.remindersSent}, function() {
					window.close();
				});
			});
		}
	}
}