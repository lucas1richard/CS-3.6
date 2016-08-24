(function() {
  overlay
    .set("formatHomePage", formatHomePage);

  function formatHomePage() {

    // Cache DOM
    var ContactTable = document.querySelectorAll(".HomePage")[1];
    var SurveyTable = document.querySelectorAll(".HomePage")[2];

    // Remove Tables
    SurveyTable.parentNode.removeChild(SurveyTable);
    ContactTable.parentNode.removeChild(ContactTable);

    // Handle reformatting the main table
    var MainTable = (function() {
      var table = document.querySelector(".HomePage");
      table.removeAttribute("border");
      table.setAttribute("class","HomePage table table-condensed");
      table.tBodies[0].removeChild(table.rows[1]);

      for(var i=0; i<table.rows.length; i++) {
        table.rows[i].removeChild(table.rows[i].children[1]);
        table.rows[i].mainIndex = i;
        var committee = table.rows[i].firstElementChild.innerText.split(" - ")[0];

        // Cache row TDs
        var TDs = table.rows[i].querySelectorAll("td");

        if(TDs[4]) {
          table.rows[i].addEventListener("dragstart", function(ev) {
            var row = this;
            ev.dataTransfer.setData("obj", row.rowIndex);
          });
          table.rows[i].addEventListener("dragover", function(ev) {
            ev.preventDefault();
          });
          table.rows[i].addEventListener("dragleave", function(ev) {
            ev.target.removeAttribute("style");
          });
          table.rows[i].addEventListener("drop", function(ev) {
            var self=this;
            ev.preventDefault();
            var obj = ev.dataTransfer.getData("obj");
            if(ev.offsetY >= table.rows[obj].offsetHeight/2) {
              insertAfter(table.rows[obj], self);
            } else {
              insertBefore(table.rows[obj], self);
            }
            chrome.storage.sync.set({"committeeIndexMap":indexMap()}, function() {});
          });

          // Move the link of to committee page to the first column, and remove the original column
          if(TDs[4].firstElementChild) {
            var button = TDs[4].firstElementChild;
            button.value = committee;
            table.rows[i].firstElementChild.removeChild(table.rows[i].firstElementChild.firstChild);
            table.rows[i].firstElementChild.appendChild(button);
          } else {
            table.rows[i].firstElementChild.innerText = committee;
          }

          // Remove the Expiration Year and rename buttons
          table.rows[i].removeChild(TDs[4]);
          if(TDs[1].firstElementChild) TDs[1].firstElementChild.value = "Ballots";
          if(TDs[2].firstElementChild) TDs[2].firstElementChild.value = "Records";
        }

        if(table.rows[i].querySelectorAll("th")[4]) {
          table.rows[i].removeChild(table.rows[i].querySelectorAll("th")[4]);
        }
      }

      addCSS(table, {
        background: "#fff",
        boxShadow : "0px 0px 8px",
        margin    : "auto",
        maxWidth  : "1000px"
      });

      return table;
    })();

    // Put the main table in a new div under the sorting label
    var MainDiv = document.createElement("div");
    var labelDiv = document.createElement("div");
        labelDiv.className = "text-center";
    var noticeDiv = document.createElement("div");
        noticeDiv.className = "hidden";
        noticeDiv.innerText = "You can change the order of the table rows by dragging and dropping them";

    MainDiv.appendChild(labelDiv);
    MainDiv.appendChild(noticeDiv);

    var sortLabel = (function() {
      var label = document.createElement("label");
      var option = document.createElement("input");
          label.innerText = "Sort Committees: ";
          label.appendChild(option);
          option.type = "checkbox";
      option.addEventListener("change", function() {
        if(this.checked == true) {
          noticeDiv.className = "text-center text-danger";
          for(var i=0; i<MainTable.rows.length; i++) {
            if(MainTable.rows[i].querySelectorAll("td")[4]) {
              MainTable.rows[i].draggable = true;
            }
          }
        } else {
          noticeDiv.className = "hidden";
          for(var i=0; i<MainTable.rows.length; i++) {
            if(MainTable.rows[i].querySelectorAll("td")[4]) {
              MainTable.rows[i].removeAttribute("draggable");
            }
          }
        }
      });
      return label;
    })();


    labelDiv.appendChild(sortLabel);
    insertBefore(MainDiv, MainTable);

    MainDiv.appendChild(MainTable);

    // Reorder the MainTable
    chrome.storage.sync.get({"committeeIndexMap":[]}, function(m) {
      reOrder(m.committeeIndexMap);
    });

    function indexMap() {
      var map = [];

      for(var i=0; i<MainTable.rows.length; i++) {
        if(MainTable.rows[i].querySelectorAll("td")[4]) {
          map.push(MainTable.rows[i].mainIndex);
        }
      }
      return map;
    }

    function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    function insertBefore(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    }
    function reOrder(map) {
      if(map.length == 0) return;
      var nmap = [];
      for(var i=0; i<map.length; i++) {
        nmap.push(MainTable.rows[map[i]]);
      }
      for (var i=MainTable.rows.length-1; i>0; i--){
        MainTable.tBodies[0].removeChild(MainTable.rows[i]);
      }
      for(var i=0; i<map.length; i++) {
        MainTable.tBodies[0].appendChild(nmap[i]);
      }
    }
  }
})();