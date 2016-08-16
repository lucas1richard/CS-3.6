// Changes appearance for all pages
function generalCSSChanges() {
	doToAll("[type=submit]", {"class": "btn btn-primary btn-xs"});
	doToAll("[type=Button]", {"class": "btn btn-default btn-xs"});
	doToAll("[type=Reset]", {"class": "btn btn-info btn-xs"});
	doToAll("select", {"class": "form-control"});
	doToAll("textarea", {"class": "form-control"});
	doToAll("[type=Text]", {"class": "form-control"});
	doToAll("textarea", {"rows": "5"});
	doToAll("[validate=date]", {"class": "form-control"});
	doToAll("[bgcolor]", {"bgcolor":"remove"});
	document.body.setAttribute("class","bootstrap");

	changeCSSofAll("th", {
		"background":"linear-gradient("+borderColor+","+thColor+","+borderColor+")",
		"border":"0px",
		"font-size":"11pt",
		"color":"black",
		// "padding-top":"6px",
		// "padding-bottom":"6px",
	});
	changeCSSofAll("select, input[type=text], input[type=number], textarea", {
		"background-color":inpColor,
		"border": "1px solid "+ inpBorderColor,
		"color": inptxtColor
	});
	changeCSSofAll(".borderbottom", {"padding":"0.7em", "border-bottom":"1px solid gray"});
	changeCSSofAll(".ReportLink", {"font-size":"10pt", "font-weight":"initial", "padding":"0.5em"});
	changeCSSofAll("[type=Checkbox]", {"height":"20px", "width":"20px"});
	changeCSSofAll(".pagehdg", {
		"background":"linear-gradient("+borderColor+","+thColor+","+borderColor+")",
		"font-weight":"bold",
		"font-size":"1.2em",
		"color":"black"
	});
	changeCSSofAll("a:not(.btn)",{color:"#337ab7"});
	changeCSSofAll("table",{"border-collapse":"collapse"})
	if(threed) {
		changeCSSofAll("select, input[type=text], input[type=number], textarea", {
			"boxShadow":"0 2px 5px 0 " + inpBorderColor
		});
	}
	pageIdentification();
}

