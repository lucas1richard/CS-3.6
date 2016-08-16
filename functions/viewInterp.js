function viewInterp() {
	var backgroundURL = chrome.extension.getURL('interps.footer.png');
	var inp = document.createElement("input");
		inp.id = "theImage";
		inp.type = "hidden";
		inp.value = backgroundURL;

	chrome.storage.sync.get({userInfo:false}, function(item) {
		if(item.userInfo) {
			var br = document.createElement("br");
			var btn = document.createElement("button");
			btn.setAttribute("onclick","generateIssuanceLetter();");
			btn.innerText = "Generate Issuance Letter";
			btn.setAttribute("class","btn btn-primary");
			document.querySelector(".pagehdg").appendChild(btn);

			var nameInp = document.createElement("textarea");
			nameInp.id = "nameInp";
			nameInp.value = item.userInfo.firstName + " " + item.userInfo.lastName + "\nSecretary\n" + item.userInfo.phone + "\n" + item.userInfo.email;
			nameInp.style.display = "none";
			document.body.appendChild(nameInp);
		} else {
			var br = document.createElement("br");
			var txtNode = document.createElement("span");
			txtNode.style.color = "red";

			txtNode.innerText = "To enable auto issuance letter, enter your user information into the extension options page";
			document.querySelector(".pagehdg").appendChild(txtNode);

		}
	});
	document.body.appendChild(inp);
	var div = document.createElement("div");
	var emailSel = document.createElement("select");
	var types = {
		"Create Email to Inquirer:":"",
		"I'll write it myself":" ",
		"--------------------":"",
		"Approval of Specific Design":"specific_design",
		"Basis or Rationale":"basis_or_rational",
		"Consulting":1,
		"Indefinite Question":"indefinite_question",
		"Semi-Commercial Question":"semi_commercial",
		"Suggestion for Revision":"suggestion",
	};
	for(key in types) {
		var opt = document.createElement("option");
		opt.value = types[key];
		opt.innerText = key;
		emailSel.appendChild(opt);
	}

	emailSel.className = "form-control";
	emailSel.setAttribute("onchange","newMail(this.value);");
	div.style.width = "300px";
	div.style.marginLeft = "auto";
	div.style.marginRight = "auto";
	div.appendChild(emailSel);
	document.querySelector(".pagehdg").appendChild(div);
	var updateBtn = document.createElement("button");
		updateBtn.className = "btn btn-default";
	    updateBtn.innerText = "Update Record";
	    updateBtn.setAttribute("onclick","openUpdateWindow();");
	    document.querySelector(".pagehdg").appendChild(updateBtn);

	var actualCode = '(' + function() {
		var inquirerRows = document.getElementById("InquirerInformation").rows;
		window.firstName = toTitleCase(inquirerRows[1].innerText.split("\t")[0]);
		window.lastName = toTitleCase(inquirerRows[1].innerText.split("\t")[1]);
		window.company = toTitleCase(inquirerRows[3].firstElementChild.innerText);
		window.email = document.querySelector("#InquirerInformation > tbody > tr:nth-child(16) > td").innerText;

		window.street1 = toTitleCase(inquirerRows[3].children[1].innerText);
		window.street2 = toTitleCase(inquirerRows[5].children[0].innerText);
		window.street3 = toTitleCase(inquirerRows[5].children[1].innerText);

		window.country = toTitleCase(inquirerRows[7].children[0].innerText);
		window.state = toTitleCase(inquirerRows[7].children[1].innerText);
		window.town = toTitleCase(inquirerRows[9].children[0].innerText);
		window.zip = inquirerRows[9].children[1].innerText;

		var itemRows = document.getElementById("ItemDescription").rows;
		window.QA = itemRows[3].children[0].innerText;
		var standardInfo = itemRows[1].firstElementChild.firstElementChild.rows;
		window.standard = standardInfo[1].children[0].innerText;
		window.edition = standardInfo[1].children[1].innerText;

		window.paragraph = standardInfo[1].children[2].innerText;
		window.subject = standardInfo[3].children[0].innerText;
		window.established = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(10) > td:nth-child(1)").innerText;
		window.item = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(2) > td:nth-child(1)").innerText;
		window.committee = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(2) > td:nth-child(2)").innerText;
		window.para = document.querySelector("#ItemDescription > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(3)").innerText;
		window.originalInquiry = document.querySelector("#InquirerInformation > tbody > tr:nth-child(20) > td").innerText;

	} + ')();' + function generateIssuanceLetter() {
			var inpSrc = document.getElementById("theImage").value;
			window.nameTxt = document.getElementById("nameInp").value;
			document.body.innerHTML = "";
			var background = document.createElement("img");
				background.src = inpSrc;
				background.width = "850";
				background.height = "1100";
				background.style.width = "850px";
				background.style.height = "1100px";
				background.style.position = "absolute";
				document.body.appendChild(background);
			var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
			var thisDay = new Date();
			var today = months[thisDay.getMonth()] + " " + thisDay.getDate() + ", " + thisDay.getFullYear();
			
			var main = document.createElement("div");
				document.body.appendChild(main);
				main.style.fontFamily = "initial";
				main.style.lineHeight = "initial";
				main.style.width = "850px";
				main.style.paddingTop = "180px";
				main.style.paddingLeft = "110px";
				main.style.paddingRight = "100px";
				main.style.paddingBottom = "150px";
				main.style.fontSize = "11pt";
				main.style.position = "absolute";
				main.id = "main";
				main.style.backgroundSize = "cover";

			var dateP = document.createElement("p");
				dateP.innerText = today;
				dateP.style.marginBottom = "20px";
			var addressFull = document.createElement("div");
			var addressName = document.createElement("div");
				addressName.innerText = firstName + " " + lastName;
			var addressCompany = document.createElement("div");
				if(company != "" && company != "None") addressCompany.innerText = company;
			var addressStreet1 = document.createElement("div");
			var addressStreet2 = document.createElement("div");
			var addressStreet3 = document.createElement("div");
				addressStreet1.innerText = street1;
				if(street2 != "" && street2 != "None") addressStreet2.innerText = street2;
				if(street3 != "" && street3 != "None") addressStreet3.innerText = street3;
			var addressCity = document.createElement("div");
				if(town != "" && town != "None") addressCity.innerText = town;
				if(state != "" && state != "None") addressCity.innerText += ", " + state;
				if(zip != "" && zip != "None") addressCity.innerText += " " + zip;
			var addressCountry = document.createElement("div");
				if(country != "" && country != "United States" && country != "None") addressCountry.innerText = country;
			var reference = document.createElement("div");
				main.appendChild(dateP);
				main.appendChild(addressFull);
				addressFull.appendChild(addressName);
				addressFull.appendChild(addressCompany);
				addressFull.appendChild(addressStreet1);
				addressFull.appendChild(addressStreet2);
				addressFull.appendChild(addressStreet3);
				addressFull.appendChild(addressCity);
				addressFull.appendChild(addressCountry);
			var br = document.createElement("br");
				main.appendChild(br);
			var subjP = document.createElement("p");
				subjP.innerHTML = "Standard Designation: ASME " + standard + 
				"<br/>Edition/Addenda: " + edition + 
				"<br/>Paragraph/Fig./Table No: " + para;
				main.appendChild(subjP);
			var refP = document.createElement("p");
				refP.innerText = "Reference: Your inquiry dated " + established;
				main.appendChild(refP);
			var itemP = document.createElement("p");
				itemP.innerText = "Item: " + item;
				main.appendChild(itemP);
			var introP = document.createElement("p");
				introP.innerText = "\nOur understanding of the question in your inquiry and our reply are as follows:";
				main.appendChild(introP);
			var interpP = document.createElement("p");
				interpP.innerText = QA + "\n\nSincerely,";
				main.appendChild(interpP);
			window.signatureP = document.createElement("div");
				signatureP.innerText = "Signature: ";

			var fileInp = document.createElement("input");
				fileInp.type = "file";
				fileInp.accept = ".jpg, .png, .jpeg, .gif, .pcd";
				fileInp.setAttribute("onchange","appendSignature(this)");
				main.appendChild(signatureP);
				signatureP.appendChild(fileInp);
			window.img = document.createElement("img");
				img.id = "blah";
				img.src = "#";
				img.alt = "Your signature";
				img.height = "50";
				img.width = "150";
				main.appendChild(img);
			var nameP = document.createElement("p");
				nameP.innerText = nameTxt;
				main.appendChild(nameP);
		} + "" + function toTitleCase(str) {
		    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		} + "" + function capitalizeFirstLetter(string) {
			    return string.charAt(0).toUpperCase() + string.slice(1);
			} + "" + function appendSignature(input) {
			if (input.files && input.files[0]) {
		        var reader = new FileReader();
		        reader.onload = function (e) {
		            $('#blah').attr('src', e.target.result);
		        }
		        reader.readAsDataURL(input.files[0]);
		    }
		    	img.removeAttribute("width");
		        signatureP.style.display = "none";
		} + "" + function writeMail(obj) {
			var ref = "";
			if(obj.email) ref += "mailto:" + obj.email + "?"; 
			if(obj.cc) ref += "cc=" + obj.cc + "&";
			if(obj.subject) ref += "subject=" + obj.subject + "&";
			if(obj.body) ref += "body=" + obj.body;
			console.log(ref);
			console.log(ref.length);
			window.location.href = ref;
		} + "" + function convertToEmail(msg) {
			var out = msg.replace(/\n/g,"%0D%0A");
			//out = out.replace(/\t/g,"      ");
			out = out.replace(/ /g,"%20");
			out = out.replace(/\&/g,"and");
			return out;
		} + "" + function newMail(type) {
			window.nameTxt = document.getElementById("nameInp").value;
			if(type != "") {
				var msg = "Dear Inquirer:\n\nRecord: " + item + "\n\n";
					msg += "Your inquiry of ASME "+standard+"-"+edition+" has been received. ";
					if(originalInquiry.length < 500) { // this has been added due to the length limits of chrome href
						msg += "\n-----------------------------\n"+ originalInquiry + "-----------------------------\n";
					} else {
						msg += "\n";
					}
				if(type == "indefinite_question") {
					msg += "In reply, we wish to advise ";
					msg += "you that your question is not sufficiently explicit to present to the Committee for consideration. The Committee ";
					msg += "requires all questions concerning applications of the Code rules to be clearly and explicitly outlined and that ";
					msg += "such question be confined strictly to the requirements of the Code.\n\n";
					msg += "Will you therefore, please reframe your question with specific reference to the Code requirement that is applicable?";
				}
				if(type == "semi_commercial") {
					msg += "In reply, we wish to advise you that there is a doubt as to whether you desire an interpretation of some particular ";
					msg += "requirement in the Code or a review (or approval) of the apparatus (or design) which you describe. If it is an ";
					msg += "interpretation of the Code requirement you seek, your question must be clearly and explicitly outlined and be confined ";
					msg += "strictly to the applications of the Code requirements.\n\n";
					msg += "As described in the Foreword of the ASME code, the rules established by the Committee are not to be ";
					msg += "interpreted as approving, recommending or endorsing any proprietary or specific design or as limiting the method ";
					msg += "of design or form of construction that conforms to Code rules.\n\n";
					msg += "Will you, therefore, please reframe the question with particular reference to the Code requirements that seem to ";
					msg += "apply to your design (or construction)?";
				}
				if(type == "specific_design") {
					msg += "This is to acknowledge your inquiry relative to the approval of your specific design. As described in the Foreword of the ";
					msg += "ASME Code, the rules established by the Committee are not to be interpreted as approving, recommending or endorsing any ";
					msg += "proprietary or specific design or as limiting the method of design or from of construction that conforms to Code rules.";
				}
				if(type == "basis_or_rational") {
					msg += "Please be advised that the ASME committees provide responses to requests for clarification and interpretation of the Code, ";
					msg += "and considers suggestions for revisions. ASME committees do not respond to questions seeking rationale for Code requirements ";
					msg += "since these are based upon consideration of technical data and the experience and expertise of the individual committee members.";
					msg += "\n\nShould you have suggestions for a revision to the Code, please submit them to this office with supportive technical reasons and/or data.";
					msg += "\n\nFor your information, all technical meetings during which Code requirements are considered are open to the public.";
				}
				if(type == 1) {
					msg += "Your letter has requested a response to a question, which is of a consulting nature. Please be advised that ASME committees ";
					msg += "provide responses to requests for clarification and interpretation of the Code, and considers suggestions for revisions. The ";
					msg += "committee does not address consulting questions. The Committee also does not respond to questions seeking rationale for Code ";
					msg += "requirements, nor whether specific designs or fabrications can meet the requirements of the Code.";
					msg += "\n\nIt is suggested that you may also wish to contact the services of a consulting agency that is familiar with ASME standard requirements and applications.";
				}
				if(type == "suggestion") {
					msg += "Your inquiry appears to be a suggestion for revision. We appreciate your suggestion and the committee will consider it for the next edition of " + standard + ".";
				}
				msg += "\n\nThank you and I look forward to assisting you.\n\nRegards,\n";
				msg += nameTxt;
				standard = convertToEmail(standard);
				edition = convertToEmail(edition);
				var body = convertToEmail(msg);
				if(body.length <= 1900) {
					writeMail({email:email, subject:"Your%20ASME%20"+standard+"-"+edition+"%20inquiry", body:body});
				} else {
					alert("The email is too long to be generated by Chrome.")
				}
			}
		} + "" + function openUpdateWindow() {
			var currentHref = window.location.href;
				currentHref = currentHref.replace("SearchAction", "UpdateRecordForm");
				console.log(currentHref);
				currentHref += "&Action=Update";
				window.location.href = currentHref;
		};
	insertScript(actualCode);
}