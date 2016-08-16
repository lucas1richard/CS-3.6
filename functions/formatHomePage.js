function formatHomePage() {

  var HomepageTable = (function() {

    // Cache DOM
    var MainTable = document.querySelector(".HomePage");
    var ContactTable = document.querySelectorAll(".HomePage")[1];
    var SurveyTable = document.querySelectorAll(".HomePage")[2];

    // Remove Tables
    SurveyTable.parentNode.removeChild(SurveyTable);
    ContactTable.parentNode.removeChild(ContactTable);

    MainTable.removeAttribute("border");
    MainTable.setAttribute("class","HomePage table table-condensed");
    MainTable.tBodies[0].removeChild(MainTable.rows[1]);
    for(var i=0; i<MainTable.rows.length; i++) {
      MainTable.rows[i].removeChild(MainTable.rows[i].children[1]);
      MainTable.rows[i].mainIndex = i;
      var committee = MainTable.rows[i].firstElementChild.innerText.split(" - ")[0];

      // Cache row TDs
      var TDs = MainTable.rows[i].querySelectorAll("td");

      if(TDs[4]) {
        //MainTable.rows[i].draggable = true;
        MainTable.rows[i].addEventListener("dragstart", function(ev) {
          var row = this;
          ev.dataTransfer.setData("obj", row.rowIndex);
        });
        MainTable.rows[i].addEventListener("dragover", function(ev) {
            ev.preventDefault();
        });
        MainTable.rows[i].addEventListener("dragleave", function(ev) {
              ev.target.removeAttribute("style");
        });


        MainTable.rows[i].addEventListener("drop", function(ev) {
          var self=this;
          ev.preventDefault();

          var obj = ev.dataTransfer.getData("obj");
          if(ev.offsetY >= MainTable.rows[obj].offsetHeight/2) {
            insertAfter(MainTable.rows[obj],self);
          } else {
            insertBefore(MainTable.rows[obj],self);
          }

          
          chrome.storage.sync.set({"committeeIndexMap":indexMap()}, function() {});
        });

        if(TDs[4].firstElementChild) {
          var button = TDs[4].firstElementChild;
          button.value = committee;

          MainTable.rows[i].firstElementChild.removeChild(MainTable.rows[i].firstElementChild.firstChild);
          MainTable.rows[i].firstElementChild.appendChild(button);
        }

        // Remove the Expiration Year
        MainTable.rows[i].removeChild(TDs[4]);

        if(TDs[1].firstElementChild) {
          TDs[1].firstElementChild.value = "Ballots";
        }
        if(TDs[2].firstElementChild) {
          TDs[2].firstElementChild.value = "Records";
        }
      }
      if(MainTable.rows[i].querySelectorAll("th")[4]) {
        MainTable.rows[i].removeChild(MainTable.rows[i].querySelectorAll("th")[4]);
      }
    }
    MainTable.style.maxWidth = "1000px";
    MainTable.style.margin = "auto";
    
    


    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    function insertBefore(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    }


    var sortOption = document.createElement("input");
      sortOption.type = "checkbox";
    var sortLabel = document.createElement("label");
      sortLabel.innerText = "Sort Committees: ";
      sortLabel.appendChild(sortOption);

      sortOption.addEventListener("change", function() {
        if(this.checked == true) {
          for(var i=0; i<MainTable.rows.length; i++) {
            if(MainTable.rows[i].querySelectorAll("td")[4]) {
              MainTable.rows[i].draggable = true;
            }
          }
          alert("You can change the order of the table rows by dragging and dropping them");
        } else {
          for(var i=0; i<MainTable.rows.length; i++) {
            if(MainTable.rows[i].querySelectorAll("td")[4]) {
              MainTable.rows[i].removeAttribute("draggable");
            }
          }
        }
      });

      insertBefore(sortLabel, MainTable);

      function indexMap() {
        var map = [];

        for(var i=0; i<MainTable.rows.length; i++) {
          if(MainTable.rows[i].querySelectorAll("td")[4]) {
            map.push(MainTable.rows[i].mainIndex);
          }
        }
        return map;
      }

      // Reorder the MainTable
      chrome.storage.sync.get({"committeeIndexMap":[]}, function(m) {
        reOrder(m.committeeIndexMap);
      });
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
  })();
}












  