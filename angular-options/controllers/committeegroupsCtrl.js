(function() {
  angular
    .module("app")
    .controller("committeegroupsCtrl", committeegroupsCtrl);

    committeegroupsCtrl.$inject = ['$scope', 'getJSON'];

    function committeegroupsCtrl($scope, getJSON) {

      var vm = $scope;

      vm.allCommittees = [];
      vm.addGroup = addGroup;
      vm.checkTitle = checkTitle;
      vm.complete = complete;
      vm.removeCommittee = removeCommittee;
      vm.removeGroup = removeGroup;
      vm.retrieveGroups = retrieveGroups;
      vm.saveGroups = saveGroups;

      activate();

      //////////////////////////////////////

      function activate() {
        return getJSON.getdata("json/committees.json").then(function(r) {
          vm.allCommittees = r.data;
          return vm.allCommittees;
        });
      }

      function addGroup() {
        vm.committeegroups.push({title:"", committees:[]});
        vm.updated = false;
      };

      function checkTitle(title) {
        var count = 0;
        for(var i=0; i<vm.committeegroups.length; i++) {
          if(vm.committeegroups[i].title == title) {
            count++;
          }
        }
        if(count > 1) {
          return {
            css:{
              "border":"1px solid red"
            },
            error:true
          };
        } else {
          return {
            css: {},
            error:false
          };
        }
      }

      function removeGroup(index) {
        vm.committeegroups.splice(index,1);
        vm.updated = false;
      };

      function removeCommittee(committees, com) {
        var ind = committees.indexOf(com);
        committees.splice(ind,1);
        vm.updated = false;
      }

      function saveGroups() {
        var toSave = {};
        for(var i=0; i<vm.committeegroups.length; i++) {
          toSave[vm.committeegroups[i].title] = vm.committeegroups[i].committees;
        }
        console.log(toSave);
        chrome.storage.local.set({"committeeGroups":toSave}, function() {});
        vm.updated = true;
      }

      

      function retrieveGroups() {
        vm.committeegroups = [];
        chrome.storage.local.get("committeeGroups", function(g) {
          for(group in g.committeeGroups) {
            vm.committeegroups.push({"title":group, "committees":g.committeeGroups[group]});
          }
          vm.updated = true;
        });
      };

      function complete(group, newCommittee, ind) {
        group.committees.push(newCommittee);
        vm.updated = false;
      }

      vm.retrieveGroups();
    
    }
})();