(function() {
		angular
		.module("app")
		.controller("userinfoCtrl", userinfoCtrl);

		userinfoCtrl.$inject = ['$scope', '$timeout'];

		function userinfoCtrl($scope, $timeout) {

			var vm = $scope;

			vm.email = "";
			vm.firstname = "";
			vm.lastname = "";
			vm.message = "";
			vm.phone = "";
			vm.saveInfo = saveInfo;

			activate();

			function activate() {
				return chrome.storage.sync.get({"userInfo":false}, function(item) {
					if(item.userInfo) {
						vm.firstname = item.userInfo.firstName;
						vm.lastname = item.userInfo.lastName;
						vm.phone = item.userInfo.phone;
						vm.email = item.userInfo.email;
					}
				});
			}

			function saveInfo() {
				vm.message = "Saved";
				var userInfo = {
					firstName:vm.firstname,
					lastName:vm.lastname,
					phone:vm.phone,
					email:vm.email,
				};
				return chrome.storage.sync.set({"userInfo": userInfo}, function() {
					return $timeout(function() {
						vm.message = "";
					}, 1000);
				});
			}
		
		}
})();