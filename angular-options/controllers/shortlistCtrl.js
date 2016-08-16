(function() {
  angular
    .module("app")
    .controller("shortlistCtrl", shortlistCtrl);

  shortlistCtrl.$inject = ['$scope','$http'];

  function shortlistCtrl($scope, $http) {

    var vm = $scope;

    vm.addIndent = addIndent;
    vm.addStyle = addStyle;
    vm.allCommittees = [];
    vm.checkMatch = checkMatch;
    vm.checkStyle = checkStyle;
    vm.complete = complete;
    vm.moveDown = moveDown;
    vm.moveUp = moveUp;
    vm.removeCommittee = removeCommittee;
    vm.save = save;
    vm.shortlist = [];
    
    activate();

    function activate() {
      // Load Committees
      $http.get('json/committees.json').then(function(res){
        vm.allCommittees = res.data;                
      });

      // Load Current List
      chrome.storage.sync.get({"committees":[]}, function(c) {
        vm.shortlist = c.committees;
      });
    }


    function addStyle(obj) {
      var w = "0px";
      if(obj.indent) w = "20px";
      return {
        "text-indent":w
      }
    };

    function removeCommittee(committee) {
      var ind = vm.shortlist.indexOf(committee);
      vm.shortlist.splice(ind,1);
    };

    function complete(com) {
      vm.newCommittee = "";
      for(var i=0; i<vm.shortlist.length; i++) {
        if(vm.shortlist[i].committee == com.committee) return false;
      }
      vm.shortlist.push(com);
    };

    function checkMatch(obj) {
      if(!obj) return false;
      for(var i=0; i<vm.shortlist.length; i++) {
        if(vm.shortlist[i].committee == obj) return false;
      }
      return obj.length > 0;
    };
    

    function checkStyle() {
      if(vm.enableModify) {
        return {
          "background-color": "#ffffcc",
          "box-shadow": "#666600 0px 0px 8px inset",
          "cursor": "pointer",
          "border": "1px solid #666600",
          "border-radius":"3px",
          "padding": "5px"
        }
      } else {
        return {
          "cursor": "pointer",
          "border": "1px solid black",
          "border-radius":"3px",
          "padding": "5px"
        };
      }
    };
    
    function addIndent(obj) {
      if(obj.indent) {
        delete obj.indent;
      } else {
        obj.indent = true;
      }
    };
    function save() {
      chrome.storage.sync.set({"committees":vm.shortlist}, function() {
        alert("Saved");
      });
    };
    function moveUp(s) {
      var newS = {committee: s.committee, num:s.num};
      if(s.indent) newS.indent = true;

      var original = vm.shortlist.indexOf(s);

      vm.shortlist.splice(original,1);
      vm.shortlist.splice(original-1,0,newS);
    };
    function moveDown(s) {
      var newS = {committee: s.committee, num:s.num};
      if(s.indent) newS.indent = true;

      var original = vm.shortlist.indexOf(s);

      vm.shortlist.splice(original,1);
      vm.shortlist.splice(original+1,0,newS);
    };
  
  }
})();