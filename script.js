var thColor = "rgb(235, 243, 249)";
var borderColor = "#d8e7f3";
var inptxtColor = "#000000";
inpBorderColor:"#f2f2f2"
var threed = false;

(function() {
  chrome.storage.sync.get({
    "accessEnabled":false
  }, function(a) {
    // if(a.accessEnabled == false) {
    //   console.log("Access Not Enabled");
    // } else 
    {
      chrome.storage.sync.get({
        backgroundColor:"rgb(235, 243, 249)", 
        // borderColor:"rgb(195, 218, 238)",
        borderColor:"#d8e7f3",
        inpBorderColor:"gray",
        inpColor:"white",
        inptxtColor:"black",
        threed:false,
        changeStyles:true
      }, function(item) { 
        thColor = item.backgroundColor; 
        borderColor = item.borderColor; 
        inpColor = item.inpColor; 
        inptxtColor = item.inptxtColor; 
        inpBorderColor = item.inpBorderColor; 
        threed = item.threed; 
        generalCSSChanges();
      });
      if(window.location.href.search("index.cfm") != -1 || document.querySelectorAll("[name=SearchCommitteePages]")[1] ||
        window.location.href.search("vcc.cfm") != -1 || window.location.href.search("reports.cfm") != -1 || 
        window.location.href.search("News.cfm") != -1) {
        replaceNavBar();
      }
    }
  });
})();










// Changes attributes of all elements with a specified attribute
function doToAll(selector, obj) {

  var tmp = document.querySelectorAll(selector);
  for(key in obj) {
    for(var i=tmp.length-1;i>-1;i--){
      tmp[i].setAttribute(key,obj[key]);
      if(obj[key] == "remove") tmp[i].removeAttribute(key);
    }
  }

}








function changeCSSofAll(selector, obj) {

  var tmp = document.querySelectorAll(selector);
  for(key in obj) {
    for(var i=tmp.length-1;i>-1;i--){
      tmp[i].style[key] = obj[key];
    }
  }

}









function formatViewComponentBallot() {

  var record = document.querySelectorAll("#BallotInfo > tbody > tr:nth-child(2) > td:nth-child(1)")[1].innerText;
  setTimeout(function() {
    if(window.location.href.indexOf("SendReminder") != -1) {
      chrome.storage.sync.get({remindersSent:[]}, function(r) {
        for(var i=0; i<r.remindersSent.length; i++) {
          console.log(r.remindersSent[i]);
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
  },500);

}










function formatViewMemberBallot() {

  var record = document.querySelector("#BallotInfo > tbody > tr:nth-child(2) > td:nth-child(1)").innerText;
  document.body.onload = function() {
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





function AddAutoCompleteOption(value, text, TargetObject, maxSize, maximumNumberOfValues) {

var found=false;
var ObjectName = document.getElementById(TargetObject);

if (maximumNumberOfValues == null || ObjectName.length < maximumNumberOfValues)
{
  for (var i=0; i < ObjectName.length; i++)
  {
    if (ObjectName.options[i].value==value) {
      found=true;
      break; 
    } else
      found=false;
    }
    if (!found) {
      ObjectName.options[ObjectName.length]= new Option (text, value);
      ObjectName.options[i].selected =true;
      if (ObjectName.size < maxSize) ObjectName.size++;
    }
  }
}





function formatNewComponentRecord() {

  var subType = document.querySelector("select");
  var str = document.getElementById("CommitteeResponsibleField").value;
  var boardSelect = document.querySelector("select[name=Committee]");
  var boardOption = document.querySelector("option[value=" + str.slice(0,3).concat("000000") + "]");
  
  subType.value = "2";
  document.querySelectorAll("select[name=Committee]")[1].style.backgroundColor = "#ffffe5";
  document.querySelectorAll("select[name=Committee]")[1].value = str.slice(0,5).concat("0000");

  if(boardOption.text.search("Board") == -1) {
    var PTCS = ["100182214", "N20090000", "N20060000", "N20100000", "N20050000", "N20110000", "N20150000", "N20120000"];
    var Nuclear = ["N20070000", "N20140000"];
    for(var i=0; i<PTCS.length; i++) {
      if(str == PTCS[i]) {
        boardOption = document.querySelector("option[value=N10000000]");
        break;
      }
    }
    for(var i=0; i<Nuclear.length; i++) {
      if(str == Nuclear[i]) {
        boardOption = document.querySelector("option[value=O10000000]");
        break;
      }
    }
  }

  boardOption.style.backgroundColor = "#ffffe5";
  
  AddAutoCompleteOption(
    boardOption.value,
    boardOption.text,
    'txtCommittee',10, null
  );
}

function insertScript(actualCode) {

  var script = document.createElement('script');
  script.textContent = actualCode;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);

}



function onlyUnique(value, index, self) {

  return self.indexOf(value) === index;

}

function countComments(unique, commentArray) {

  var count = 0;
  for(var i=0; i<commentArray.length; i++) {
    if(commentArray[i] == unique) {
      count++;
    }
  }
  return count;

}

function dateInput(numDays) {

  if(!numDays) numDays = 0;
  var day = new Date();
  var dat = new Date(day.valueOf());
    var addedDays = new Date(dat.setDate(dat.getDate() + numDays));
    
    var dd = "" + addedDays.getDate();
    var mm = addedDays.getMonth()+1;

    if(dd < 10) dd = "0" + addedDays.getDate();
    if(mm < 10) mm = "0" + (addedDays.getMonth() + 1);

    return(mm + "/" + dd + "/" + addedDays.getFullYear());

}







function addCSS(element, cssObj) {

  if(typeof element == "string") {
    element = document.querySelector(element);
  }

  if(cssObj) {
    for(key in cssObj) {
      element.style[key] = cssObj[key];
    }
  }

}







function formatSearch() {

    var FirstTable = document.querySelectorAll(".HomePage")[0];
    var MainTable = document.querySelectorAll(".HomePage")[1];
    var SearchTable = document.querySelectorAll(".HomePage")[2];

    addCSS(FirstTable, { maxWidth:"8000px", minWidth:"800px", margin:"auto" });
    addCSS(MainTable, { maxWidth:"1000px", minWidth:"800px", margin:"auto" });
    addCSS(SearchTable, { maxWidth:"1000px", minWidth:"800px", margin:"auto" });

    document.querySelector("[name=QuickSearch]").setAttribute("action","SearchAction.cfm?QuickSearch=yes&NoToolbar=yes");
    document.querySelector("[name=AdvancedSearch]").setAttribute("action","SearchForm.cfm");
    document.querySelector("[name=SearchType]").children[0].selected = true;
    document.querySelector("[name=AdvancedSearchType]").children[0].selected = true;
    document.querySelector("select[name=Search]").children[2].selected = true;
    document.querySelector("[name=QuickSearchKeyword]").focus();

    if(window.location.href.search("Ballot") != -1) {
      var str = window.location.href;
      str = str.substring(str.lastIndexOf("&Ballot=")+8,str.length);
      document.querySelector("[name=QuickSearch]").setAttribute("action","NewBallotForm.cfm?Update=no&QuickSearch=yes&NoToolbar=yes&Ballot=" + str);
      document.querySelector("[name=QuickSearchKeyword]").value = str;
      document.querySelector("[name=Search]").click();
      setTimeout(function() {
        window.close();
      }, 10);
    }

}



function formatVCC() {

  var committeeSel = document.getElementById("Committee");

  changeCSSofAll("select",{"width":"100%"});
  if(window.location.href.search("SendEmail") != -1) {
    addEmailListBtn();
    return;
  }

  appendShortList(document.querySelector("#Committee"));

  committeeSel.style.width = "100%";

}



function formatAS11() {

  changeCSSofAll(".CommitteePage tr td", {"padding":"0.5em"});
  doToAll(".CommitteePage tr td", {"onmouseover":"this.style.backgroundColor = '#f2f2f2'"});
  doToAll(".CommitteePage tr td", {"onmouseleave":"this.style.backgroundColor = 'white'"});
  doToAll("td div",{"style":"remove"});
  
}





function formatStaff() {

  var ItemTypeID = document.getElementById("ItemTypeID");
  var ANSIBallotType = document.getElementById("AnsiBallotType");
  var BallotType = document.querySelector("[name=BallotType]");
  var HomePageTables = document.querySelectorAll(".HomePage");
  var committeeResponsible = document.getElementById("SelectedCommitteeResponsible");
  
  ItemTypeID.firstElementChild.selected = true;
  BallotType.firstElementChild.selected = true;
  ANSIBallotType.firstElementChild.selected = true;
  changeCSSofAll(".Homepage th", {
    "textAlign":"center"
  });

  appendShortList(committeeResponsible);

}




function formatAdvancedRecordSearch() {

  var committeeList = document.getElementById("CommitteeList");
  var mainbody = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > form > table.SearchPage > tbody");
  
  committeeList.style.width = "100%";
  committeeList.style.height = "300px";
  for(var i=0; i<mainbody.rows.length; i++) {
    if(mainbody.rows[i].children[2])
      mainbody.rows[i].removeChild(mainbody.rows[i].children[2]);
    if(mainbody.rows[i].children[0])
      mainbody.rows[i].children[0].style.textAlign = "right";
  }
  mainbody.parentNode.className = "table";
  mainbody.parentNode.style.maxWidth = "1200px";
  mainbody.parentNode.style.margin = "auto";
  
  appendShortList(committeeList);

}





function appendShortList(target) {

  var thisCommittee = document.getElementById("thisCommitteeResponsible");

  chrome.storage.sync.get({committees:[]}, function(item) {
    if(item.committees.length > 0) {
      target.firstElementChild.innerText = "----------------------------------------------------";
      target.firstElementChild.setAttribute("disabled",true);

      for(var j=item.committees.length-1; j>-1; j--) {
        var option = document.createElement("option");
        var indent = ""
        if(item.committees[j].indent) indent = "&nbsp; &nbsp; - ";
        option.value = item.committees[j].num;
        option.innerHTML = indent + item.committees[j].committee;
        $(target).prepend(option);
        if(thisCommittee) thisCommittee.value = item.committees[j].num;
      }

      target.firstElementChild.selected = true;
      var option = document.createElement("option");
        option.innerText = "Select Committee:";
      $(target).prepend(option);
    }
  });

}


function addEmailListBtn() {

  var committeeName = document.querySelector("#Search > table.DetailPage > tbody > tr:nth-child(1) > th > b");
  var btn = document.createElement("span");

  btn.innerText = "Create Email List";
  btn.setAttribute("class","btn btn-primary btn-xs");
  btn.addEventListener("click", function() {
    var reloadBTN = document.createElement("button");
    reloadBTN.innerText = "Back";
    reloadBTN.className = "btn btn-default";
    reloadBTN.style.marginLeft = "100px";
    reloadBTN.style.marginTop = "50px";
    reloadBTN.addEventListener("click", function() {
      location.reload();
    });
    var uniqueEmails = {};
    var emails = document.querySelectorAll("a[href^='mailto']");
    var myList = "";
    for(var i=0; i<emails.length; i++) {
      if(!uniqueEmails[emails[i].innerHTML]) {
        uniqueEmails[emails[i].innerHTML] = 1;
        myList += emails[i].innerHTML + ";<br/>";
      }
    }
    document.body.innerHTML = "";
    document.body.appendChild(reloadBTN);
    var div = document.createElement("div");
    div.style.paddingLeft = "100px";
    div.style.paddingTop = "100px";
    div.innerHTML = myList;
    document.body.appendChild(div);
  });
  committeeName.appendChild(btn);

}






function formatSearchBallots() {

  var str = window.location.href;
  if(str.search("Ballot=") == -1) return;

  var str = document.querySelector("[type=Button]").onclick.toString();
  var ballotnum = str.substring(str.lastIndexOf("BallotNumber")+13,str.lastIndexOf("&BallotYearOpened"));
  var yearnum = str.substring(str.lastIndexOf("YearOpened=")+11,str.lastIndexOf("&NoToolbar"));
  
  window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber="+ballotnum+"&BallotYearOpened="+yearnum+"&NoToolbar=yes");
  setTimeout(function() {
    window.close();
  }, 10);

}


function formatNewEntireDocumentRecord() {

  document.querySelector("#ItemDescription > tbody > tr:nth-child(6) > td:nth-child(1)").className = "form form-inline";

}

function formatViewEntireDocumentRecord() {

  var reformatDiv = document.createElement("div");
  var updateBtn = document.createElement("button");
    updateBtn.className = "btn btn-default btn-xs";
    updateBtn.innerText = "Update Record";
    updateBtn.addEventListener("click",function() {
      var currentHref = window.location.href;
      currentHref = currentHref.replace("SearchAction", "UpdateRecordForm");
      currentHref += "&Action=Update";
      window.location.href = currentHref;
    });
  reformatDiv.appendChild(updateBtn);
  document.querySelector(".pagehdg").appendChild(reformatDiv);
  
}

function makePageSmall() {

  document.body.style.backgroundColor = "#f2f2f2";
  var largestTable = document.querySelector("body > table");
  largestTable.style.maxWidth = "1200px";
  largestTable.style.backgroundColor = "#ffffff";
  largestTable.style.boxShadow = "0px 0px 8px";
  
}