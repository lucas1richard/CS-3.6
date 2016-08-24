function formatUpdateComponentRecord() {
  
  makePageSmall();

  window.onload = function() {
    if(window.location.href.indexOf('CheckPublished') != -1) {
      document.getElementById('ItemLevelID').value = 11;
      document.querySelector('body > table > tbody > tr:nth-child(2) > td > form > input.btn.btn-primary.btn-xs').click();
    }
  }

  var date = new Date();

  var staffNotesTxtArea = document.querySelector('[name=SCNotes]');
  var subjectTxtArea = document.querySelector('[name=Subject]');
  var proposalTxtArea = document.querySelector('[name=Proposal]');
  var explanationTxtArea = document.querySelector('[name=Explanation]');
  var summaryTxtArea = document.querySelector('[name=SummaryOfChanges]');
  var projectManagerSelect = document.querySelector('#ProjectManager');
  var updateBtn = document.querySelectorAll('[name=UpdateButton]');

  var totalSummary = [];

  var msgDiv = (function() {
    var div = document.createElement("div");
        div.className = "text-danger";
        div.style.fontSize = "12px";
        div.innerHTML = "<span id='rArr' style='font-weight:bold; font-size:16px;'>&rArr;</span> This field updates when you make a change to the Subject, Proposal, Explanation, Summary of Changes, or Project Manager. <b>Any additional comments you add must be added after updating those fields, or your comment will be overwritten</b>";
    return div;
  })();
  $("#rArr").hide();
  staffNotesTxtArea.parentNode.insertBefore(msgDiv, staffNotesTxtArea);

  var initialData = {
    explanation: explanationTxtArea.value,
    proposal: proposalTxtArea.value,
    subject: subjectTxtArea.value,
    summary: summaryTxtArea.value,
    projectManager: projectManagerSelect.firstElementChild.text,
    staffNotes: staffNotesTxtArea.value
  };

  subjectTxtArea.addEventListener('change', function() {
    var str = 'The subject was updated';
    addToStaffNotes(initialData.subject, subjectTxtArea.value, str);
  });

  proposalTxtArea.addEventListener('change', function() {
    var str = 'The proposal was updated';
    addToStaffNotes(initialData.proposal, proposalTxtArea.value, str);
  });

  explanationTxtArea.addEventListener('change', function() {
    var str = 'The explanation was updated';
    addToStaffNotes(initialData.explanation, explanationTxtArea.value, str);
  });

  summaryTxtArea.addEventListener('change', function() {
    var str = 'The summary of changes was updated';
    addToStaffNotes(initialData.summary, summaryTxtArea.value, str);
  });

  staffNotesTxtArea.addEventListener("keydown", function() {
    msgDiv.style.fontSize = "14px";
    $("#rArr").show();
    blink("#rArr");
  });

  var addTPMbtn = document.querySelector("#ProjectManagerLevel > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > div:nth-child(3) > input");
  addTPMbtn.addEventListener('click', function() {
    var str = 'The project manager was changed from ' + initialData.projectManager + ' to ' + projectManagerSelect.firstElementChild.text;
    if(initialData.projectManager != projectManagerSelect.firstElementChild.text) {
      addToStaffNotes(initialData.projectManager, projectManagerSelect.firstElementChild.text, str);
    }
  });

  

  function addToStaffNotes(initial, newdata, summary) {
    if(initial != newdata) {
      totalSummary.push(summary);
    } else {
      for(var i=0; i<totalSummary.length; i++) {
        console.log(i);
        if(totalSummary[i].search(summary) != -1) {
          totalSummary.splice(i,1);
          break;
        }
      }
    }
    staffNotesTxtArea.value = initialData.staffNotes;
    var beginning;
    if(staffNotesTxtArea.value.length > 0) beginning = '\n-------------------------------\n';
    if(totalSummary.length > 0) {
      if(totalSummary.length == 1) {
        beginning += date.toLocaleDateString() + ': ';
      } else {
        beginning += date.toLocaleDateString() + ': The following changes were made on behalf of the TPM:\n   - ';
      }
      staffNotesTxtArea.value += beginning + totalSummary.join('\n   - ');
    }
  }

  function blink(element) {
    $(element).fadeOut(700, function() {
      $(element).fadeIn(400, blink(element));
    });
  }
}