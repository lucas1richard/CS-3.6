(function() {
  angular
    .module("app")
    .controller("modsCtrl", modsCtrl);

    modsCtrl.$inject = ['$scope','getJSON'];

    function modsCtrl($scope, getJSON) {
      var vm = $scope;

      vm.isNew = isNew;
      vm.v = parseFloat(chrome.runtime.getManifest().version);

      activate();

      function isNew(m) {
        if(m.version == vm.v) {
          return {
            q: true,
            style: {"color":"#2b73b7"}
          };
        } else {
          return { 
            q:false,
            style: {}
          };
        }
      }


      
      function activate() {
        return getJSON.getdata("json/modifications.json").then(function(r) {
          vm.mods = r.data;
          return vm.mods;
        });
      }
    
    }
})();