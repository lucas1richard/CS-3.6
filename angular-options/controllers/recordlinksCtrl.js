(function() {
  angular
    .module("app")
    .controller("recordlinksCtrl", recordlinksCtrl);

  recordlinksCtrl.$inject = ['$scope']

  function recordlinksCtrl($scope) {
    var vm = $scope;

    vm.records = "";
    vm.showLink = showLink;

    function showLink(records) {
      var allrecords = records.split("\n");

      for(var i=allrecords.length-1; i>=0; i--) {
        if(allrecords[i].search("-") == -1) {
          allrecords.splice(i,1);
        }
      }

      return allrecords;
    }
  }
})();