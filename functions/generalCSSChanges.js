(function() {
	overlay
		.set("generalCSSChanges", generalCSSChanges);

	// Changes appearance for all pages
	function generalCSSChanges() {
		overlay.doToAll("[type=submit]", {"class": "btn btn-primary btn-xs"});
		overlay.doToAll("[type=Button]", {"class": "btn btn-default btn-xs"});
		overlay.doToAll("[type=Reset]", {"class": "btn btn-info btn-xs"});
		overlay.doToAll("select", {"class": "form-control"});
		overlay.doToAll("textarea", {"class": "form-control"});
		overlay.doToAll("[type=Text]", {"class": "form-control"});
		overlay.doToAll("textarea", {"rows": "5"});
		overlay.doToAll("[validate=date]", {"class": "form-control"});
		overlay.doToAll("[bgcolor]", {"bgcolor":"remove"});
		document.body.setAttribute("class","bootstrap");

		overlay.changeCSSofAll("th", {
			"background":"linear-gradient("+borderColor+","+thColor+","+borderColor+")",
			"border":"0px",
			"font-size":"11pt",
			"color":"black",
			// "padding-top":"6px",
			// "padding-bottom":"6px",
		});
		overlay.changeCSSofAll("select, input[type=text], input[type=number], textarea", {
			"background-color":inpColor,
			"border": "1px solid "+ inpBorderColor,
			"color": inptxtColor
		});
		overlay.changeCSSofAll(".borderbottom", {"padding":"0.7em", "border-bottom":"1px solid gray"});
		overlay.changeCSSofAll(".ReportLink", {"font-size":"10pt", "font-weight":"initial", "padding":"0.5em"});
		overlay.changeCSSofAll("[type=Checkbox]", {"height":"20px", "width":"20px"});
		overlay.changeCSSofAll(".pagehdg", {
			"background":"linear-gradient("+borderColor+","+thColor+","+borderColor+")",
			"font-weight":"bold",
			"font-size":"1.2em",
			"color":"black"
		});
		overlay.changeCSSofAll("a:not(.btn)",{color:"#337ab7"});
		overlay.changeCSSofAll("table",{"border-collapse":"collapse"})
		if(threed) {
			overlay.changeCSSofAll("select, input[type=text], input[type=number], textarea", {
				"boxShadow":"0 2px 5px 0 " + inpBorderColor
			});
		}
		overlay.pageIdentification();
	}


})();