function formatUpdateComponentRecord() {
	
	document.body.style.backgroundColor = "#f2f2f2";
	var largestTable = document.querySelector("body > table");
	largestTable.style.maxWidth = "1200px";
	largestTable.style.backgroundColor = "#ffffff";
	largestTable.style.boxShadow = "0px 0px 8px";

	window.onload = function() {
		if(window.location.href.indexOf("CheckPublished") != -1) {
			document.getElementById("ItemLevelID").value = 11;
			document.querySelector("body > table > tbody > tr:nth-child(2) > td > form > input.btn.btn-primary.btn-xs").click();
		}
	}
}