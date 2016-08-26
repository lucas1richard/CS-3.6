(function() {
  overlay
    .set("replaceNavBar", replaceNavBar);

  // Performs the actual navbar replacement referencing the constructors above
  function replaceNavBar() {
    var tbl = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(8)");
      tbl.parentNode.parentNode.removeChild(tbl.parentNode);

    var tr = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(1)");

    var replacementTr = document.createElement("tr");
    var replacementTd = document.createElement("td");

    replacementTd.appendChild(overlay.navbar);
    replacementTr.appendChild(replacementTd);

    tr.parentNode.replaceChild(replacementTr,tr);
  }

  overlay.quickViewTool = (function() {
    var div = document.createElement("div");
    div.setAttribute("class","form-inline");
    div.style.height = "34px";
    div.style.paddingTop = "7px";

    var inp = document.createElement("input");
      inp.id = "quickView";
      inp.placeholder = "Quick View";
      inp.setAttribute("class","form-control input-sm flat-right");
      inp.setAttribute("style","height:22px; padding:1px; margin:0px; max-width:90px;");
      inp.addEventListener("keypress", function(e) {
        if(e.keycode==13 || e.which==13) {
          openRecord(inp.value);
        }
      });
      inp.addEventListener("click", function() { this.value = ""; });

    function openRecord(txt) {
         if(txt.toLowerCase().search("rx") != -1) {
           window.open("https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=Search&Ballot=" + txt);
           return;
         }
         record = txt.split("-");
         window.open("https://cstools.asme.org/csconnect/SearchAction.cfm?TrackingNumber="+record[1]+"&YearOpened="+record[0]+"&NoToolbar=yes");
    }
    function openBallot(txt) {
         ballot = txt.split("-");
         if(txt.toLowerCase().search("rc") != -1) {
           window.open("https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=Search&Ballot=" + txt);
           return;
         }
         window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber="+ballot[1]+"&BallotYearOpened="+ballot[0]+"&NoToolbar=yes");
    }

    var recordBtn = document.createElement("button");
      recordBtn.setAttribute("class","btn btn-xs btn-default flat-left flat-right");
      recordBtn.addEventListener("click", function(){ openRecord(inp.value); });
      recordBtn.innerText = "Record";

    ballotBtn = document.createElement("button");
    ballotBtn.setAttribute("class","btn btn-xs btn-default flat-left");
    ballotBtn.addEventListener("click",function() { openBallot(inp.value); });
    ballotBtn.innerText = "Ballot";

    div.appendChild(inp);
    div.appendChild(recordBtn);
    div.appendChild(ballotBtn);

    return div;
  })();

  overlay.committeePageNav = (function() {
    var div = document.createElement("div");
    var inp = document.createElement("input");
    var searchList = document.createElement("ul");
    var li = document.createElement("li");
    var a = document.createElement("a");

    div.setAttribute("class","form-inline");
    div.style.height = "34px";
    div.style.paddingTop = "7px";
    div.setAttribute("ng-controller", "navCommitteePageCtrl");

    inp.id = "committeePage";
    inp.placeholder = "Committee Page";
    inp.setAttribute("class","form-control input-sm flat-right");
    inp.setAttribute("style","height:22px; padding:1px; margin:0px; max-width:120px;");
    inp.setAttribute("ng-model","searchCommittee");
    inp.setAttribute("ng-click","searchCommittee = ''");

    searchList.setAttribute("ng-if","searchCommittee");
    searchList.className = "drop-options"

    li.setAttribute("ng-repeat", "c in committees | filter:searchCommittee | orderBy:'committee'");
    li.setAttribute("ng-click","openPage(c)");

    a.innerHTML = "{{ c.committee }}";
    a.target = "_blank";

      li.appendChild(a);
      searchList.appendChild(li);

      div.appendChild(inp);
      div.appendChild(searchList);

      angular.bootstrap(div, ["navCommitteePage"]);

      return div;
  })();

  overlay.navbar = (function() {
    var navbardiv = document.createElement("div");
      navbardiv.id = "navbardiv";

    // Build the prerow with uncommon links and the Quick View Tool
    var prerow = document.createElement("div");
    window.ul = document.createElement("ul");
      ul.className = "nav nav-pills";

    var prelinks = {
      "ASME":"http://www.asme.org/",
      "Logout":"index.cfm?DelCookie=True&amp;Action=CommitteePage&amp;NoToolbar=yes",
      "Publications":"https://www.asme.org/shop/standards",
      "C&S Connect":"/csconnect/index.cfm",
      "Committee Central":overlay.committeePageNav,
      "Meetings":"http://calendar.asme.org/home.cfm?EventTypeID=4",
      "Staff":"/csconnect/CommitteePages.cfm?view=CFStaffSearch",
      "ASME Directory":"http://intranet.asmestaff.org/forms/files/ASME_Staff_Directory.pdf",
      "ADP":"https://workforcenow.adp.com/public/index.htm"
    }

    for(m in prelinks) {
      var li = document.createElement("li");
      if(m == "Committee Central") {
        li.appendChild(prelinks[m]);
        ul.appendChild(li);
        continue;
      }
      var a = document.createElement("a");
        a.href = prelinks[m];
        a.innerText = m;
        a.style.color = "#337ab7";
        a.setAttribute("target","_blank");

      li.appendChild(a);
      ul.appendChild(li);
    }

    var li = document.createElement("li");
      li.appendChild(overlay.quickViewTool);

      ul.appendChild(li);
      prerow.appendChild(ul);

    function MenuItem(obj) {
      var divObj = document.createElement("a");
        divObj.setAttribute("href","https://cstools.asme.org/csconnect/" + obj.href);
        divObj.appendChild(document.createTextNode(obj.txt));

      if(!obj.width) obj.width = 2;
      if(window.location.href == "https://cstools.asme.org/csconnect/" + obj.href) { 
        divObj.setAttribute("class","text-center btn btn-primary col-xs-"+obj.width+" btn-sm"); 
        divObj.setAttribute("style","box-shadow:#000066 0px 0px 8px inset;");
      } else {
        divObj.setAttribute("class","text-center btn btn-default col-xs-"+obj.width+" active btn-sm");
        divObj.setAttribute("style","box-shadow:#999999 0px 0px 8px inset;");
      }
      return divObj;
    }

    var links = {
      myCommitteePage: MenuItem({txt:"Committee Page",href:"CommitteePages.cfm?ChooseCommittee=yes",width:2}),
      search: MenuItem({txt:"Search",href:"index.cfm?ViewTabMode=Search",width:1}),
      ansi: MenuItem({txt:"ANSI",href:"index.cfm?ViewTabMode=ANSISubmittals",width:1}),
      staff: MenuItem({txt:"Staff",href:"index.cfm?ViewTabMode=Staff",width:2}),
      vcc: MenuItem({txt:"VCC",href:"vcc.cfm",width:1}),
      as11: MenuItem({txt:"AS-11",href:"CommitteePages.cfm?View=AS11",width:1}),
      reports: MenuItem({txt:"Reports",href:"reports.cfm",width:1}),
      news: MenuItem({txt:"News",href:"News.cfm?AnnouncementFormID=1",width:1}),
      
      myProfile: MenuItem({txt:"My Profile",href:"index.cfm?ViewTabMode=ContactInformation",width:2}),
      ballots: MenuItem({txt:"Ballots",href:"index.cfm?ViewTabMode=OpenBallots",width:2}),
      negativesResponses: MenuItem({txt:"Negatives & Responses",href:"index.cfm?ViewTabMode=SummaryofNegatives",width:2}),
      myItems: MenuItem({txt:"My Items",href:"index.cfm?ViewTabMode=ProjectManagerRecords",width:2}),
      customTracking: MenuItem({txt:"Custom Tracking",href:"index.cfm?ViewTabMode=CustomTracking",width:2}),
      help: MenuItem({txt:"Help",href:"News.cfm?AnnouncementFormID=2",width:2})
    }

    var toprow = document.createElement("div");
      toprow.className = "row";

    var optsURL = chrome.extension.getURL('options.html');
    var optionslink = new MenuItem({txt:"Extension Options ",href:optsURL,width:2});
      optionslink.href = optsURL;
    var manifest = chrome.runtime.getManifest();

    var smll = document.createElement("small");
    smll.innerText = "(v"+manifest.version+")";
    optionslink.appendChild(smll);

    optionslink.setAttribute("target","_blank");
    optionslink.setAttribute("style","background-color:#ffffcc; box-shadow:#666600 0px 0px 8px inset;");

    toprow.appendChild(optionslink);
    toprow.appendChild(links.myCommitteePage);
    toprow.appendChild(links.search);
    toprow.appendChild(links.ansi);
    toprow.appendChild(links.staff);
    toprow.appendChild(links.vcc);
    toprow.appendChild(links.as11);
    toprow.appendChild(links.reports);
    toprow.appendChild(links.news);

    var bottomrow = document.createElement("div");
      bottomrow.className = "row";

    bottomrow.appendChild(links.myProfile);
    bottomrow.appendChild(links.ballots);
    bottomrow.appendChild(links.negativesResponses);
    bottomrow.appendChild(links.myItems);
    bottomrow.appendChild(links.customTracking);
    bottomrow.appendChild(links.help);

    navbardiv.appendChild(prerow);
    navbardiv.appendChild(toprow);
    navbardiv.appendChild(bottomrow);

    return navbardiv;
  })();
})();