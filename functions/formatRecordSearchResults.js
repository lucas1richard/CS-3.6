function formatRecordSearchResults() {
	var results = document.querySelector(".ResultsPage").tBodies[0];
	for(var i=1; i<results.children.length; i++) {
		if(results.children[i].children[1]) {
			var level = results.children[i].children[1];
			if(level.innerText.search("Approved") != -1 && level.innerText.search("Board") != -1) {
				level.style.fontWeight = "bold";
				level.style.color = "#1aa3ff";
			}
			if(level.innerText.search("Approved") != -1 && level.innerText.search("Board") == -1) {
				level.style.fontWeight = "bold";
				level.style.color = "red";
			}
		}
	}

	var results = document.querySelector(".ResultsPage").tBodies[0];
	var links = [];
	var subjects = [];
	if(!results) return;
	for(var i=1; i<results.children.length; i++) {
		if(results.children[i].children[1]) {
			var level = results.children[i].children[1];
			var link = results.children[i].children[0].firstElementChild.firstElementChild;
			var recordNum = link.value;
			var year = recordNum.split("-")[0];
			var num = recordNum.split("-")[1];
			var a = document.createElement("a");
			
			a.innerText = recordNum;
			a.href = 'SearchAction.cfm?TrackingNumber='+num+'&YearOpened='+year+'&NoToolbar=yes';
			a.target = "_blank";
			a.setAttribute("style","font-weight:bold");
			links.push(recordNum);

			var subject = results.children[i].children[2].innerText;
			subjects.push(subject);
		}
	}

	chrome.storage.local.get({"allrecords":{}},function(ar) {
		for(records in ar.allrecords) {
			if(Math.floor((new Date(ar.allrecords[records].date) - new Date())/60/60/24/1000) <= -14) {
				delete ar.allrecords[records];
			}
		}
		for(var i=0; i<links.length; i++) {
			ar.allrecords[links[i]] = {"subject":subjects[i], "date":new Date().toLocaleDateString()};
		}
		chrome.storage.local.set({"allrecords":ar.allrecords}, function() {});
	});

	console.log(subjects)

	var ListOpenRecords = (function() {
		var span = document.createElement("span");
		span.className = "btn btn-primary btn-xs";
		span.innerText = "List Open Records";

		var makeList = function() {
			var results = document.querySelector(".ResultsPage").tBodies[0];
			var links = [];
			var subjects = [];
			if(!results) return;
			for(var i=1; i<results.children.length; i++) {
				if(results.children[i].children[1]) {
					var level = results.children[i].children[1];
					if(level.innerText.search("Proposal") != -1) {
						var link = results.children[i].children[0].firstElementChild.firstElementChild;
						var recordNum = link.value;
						var year = recordNum.split("-")[0];
						var num = recordNum.split("-")[1];
						var a = document.createElement("a");
						
						a.innerText = recordNum;
						a.href = 'SearchAction.cfm?TrackingNumber='+num+'&YearOpened='+year+'&NoToolbar=yes';
						a.target = "_blank";
						a.setAttribute("style","font-weight:bold");
						links.push(a);

						var subject = results.children[i].children[2].innerText;
						subjects.push(subject);
					}
				}
			}

			var parent = results.parentNode;
			parent.removeChild(results);

			for(var j=0; j<links.length; j++) {
				var div = document.createElement("div");
				var subjNode = document.createTextNode(" "+subjects[j]);
				div.appendChild(links[j]);
				div.appendChild(subjNode);
				parent.appendChild(div);
			}
			//RecordsList.addRecord("Hello");
		}
		span.addEventListener("click", makeList);
		return span;
	})();

	var RecordsList = (function() {
		var div = document.createElement("div");
		var addRecord = function(record) {
			div.innerText += record +"\n";
		}

		return {
			div:div,
			addRecord:addRecord
		};
	})();

	document.body.appendChild(RecordsList.div);

	var heading = document.querySelector(".pagehdg");
	var div = document.createElement("div");
	heading.appendChild(div);
	div.appendChild(ListOpenRecords);
}