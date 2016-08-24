(function() {
  overlay
    .set("formatCommitteePage", formatCommitteePage);

  function formatCommitteePage() {
    var committeename = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(8) > tbody > tr > td:nth-child(2) > div").innerText;
    
    $(ul).before("<h4>"+committeename+"</h4>");
    overlay.doToAll("a", {"style": "font-size:13px;"});
    overlay.doToAll("[alt='Click to Update']", {"style": "height:20px; width:25px;"});
    overlay.doToAll("[alt='Click to Delete']", {"style": "height:20px; width:25px;"});

    
    var headers = document.querySelectorAll(".LeftMenu .Header");
    var LeftMenu = document.querySelector(".LeftMenu");
      LeftMenu.setAttribute("class","LeftMenu table table-condensed");
    var Links = document.querySelectorAll(".Link a");
    var links = document.querySelectorAll(".Detail");
    
    for(var i=0; i<headers.length; i++) {
      if(headers[i].children[1]) {
        for(j=0;j<2;j++) {
          addCSS(headers[i].children[j], {
            padding:"0.5em",
            background:"linear-gradient("+borderColor+","+thColor+","+borderColor+")",
            color:"#000000"
          });
        }
      }
    }

    for(var i=0; i<links.length; i++) {
      for(j=0;j<3;j++) {
        addCSS(links[i].children[j], {padding:"0.2em", backgroundColor:"#ffffff", border:"0px solid white"});
      }
    }

    var staffLinks = LeftMenu.rows[0];

    document.querySelector("table tbody tr td table tbody tr").removeChild(document.querySelector("table tbody tr td table tbody tr td"));

    
    // Make the button group for staff edits
    var staffEdits = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td");
    var staffEditsTxt = ["Home","Modify","File Maintenance"];
    for(var i=0; i<staffEditsTxt.length; i++) {
      staffEdits.children[i].removeChild(staffEdits.children[i].children[0]);
      staffEdits.children[i].innerText = staffEditsTxt[i];
      staffEdits.children[i].className = "btn btn-default btn-xs";
      if(i == 0) staffEdits.children[i].className += " flat-right";
      if(i == 1) staffEdits.children[i].className += " flat-left flat-right";
      if(i == 2) staffEdits.children[i].className += " flat-left";
    }
    staffEdits.innerHTML = staffEdits.innerHTML.replace(/\n/g,"");
    staffEdits.innerHTML = staffEdits.innerHTML.replace(/\t/g,"");
    staffEdits.className = "text-center";


    var upNAdd = [
      {sel:"[alt='Click to Delete']",inHTML:"&#8855;", color:"red", title:"Click to Delete"},
      {sel:"[alt='Click to Update']",inHTML:"&#8859;", color:"blue", title:"Click to Update"},
      {sel:"[alt='Click to Add to this menu']",inHTML:"&#8853;", color:"green", title:"Click to Add to this menu"},
    ];

    for(var i=0; i<upNAdd.length; i++) {
      var upbtns = document.querySelectorAll(upNAdd[i].sel);
      for(var p=0; p<upbtns.length; p++) {
        var span = document.createElement("span");
        span.innerHTML = upNAdd[i].inHTML;
        addCSS(span, {color:upNAdd[i].color, fontSize:"15px"});
        upbtns[p].parentNode.appendChild(span);
        span.setAttribute("title",upNAdd[i].title);
        upbtns[p].parentNode.removeChild(upbtns[p]);
      }
    }
    
    overlay.replaceNavBar();

    var mainTable = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table");
    addCSS(mainTable, {
      maxWidth: "1200px",
      boxShadow: "0px 0px 8px",
      backgroundColor:"#ffffff"
    });

    document.body.style.backgroundColor = "#f2f2f2";

    addCSS(LeftMenu, { borderRight:"1px solid #dedede" });
  }
})();