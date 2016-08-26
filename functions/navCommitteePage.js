(function() {
  angular
    .module("navCommitteePage", [])
    .controller("navCommitteePageCtrl", navCommitteePageCtrl);

    navCommitteePageCtrl.$inject = ["$scope", "$http"]
    function navCommitteePageCtrl($scope, $http) {
      var vm = $scope;

      vm.searchCommittee = "";
      vm.committees = [];
      vm.openPage = openPage;

      activate();

      function activate() {
        var committees = chrome.extension.getURL("json/committees.json");
        return $http.get(committees).then(function (res) {
          vm.committees = res.data;
          return vm.committees;
        });
      }

      function openPage(c) {
        vm.searchCommittee = '';
        window.open("https://cstools.asme.org/csconnect/CommitteePages.cfm?Committee=" + c.num);
      }
    }
})();