(function() {
	angular
		.module("app")
		.controller("parseminutesCtrl", parseminutesCtrl);

	parseminutesCtrl.$inject = ['$scope'];

	function parseminutesCtrl($scope) {

		var vm = $scope;

		vm.actiondelimiter = " will ";
		vm.delimiter = ": ";
		vm.helpfulmembers = [];
		vm.minutesText = minutesText();
		vm.motionkey = "Motion:";
		vm.motions = [];
		vm.parse = parse;

		////////////////////////////////////

		function minutesText() {
			return [
				"This is a test",
				"Action: The Staff Secretary will do something very important before the next meeting",
				"THIS IS A TITLE",
				"Motion: The committee agrees for the Staff Secretary to do something important",
				"Action: The Staff Secretary will do something else that is slightly less important",
				"Another title",
				"Motion: The committee voted to approve a motion",
				"Some notes which will undoubtedly cause a big commotion later",
				"Action: Someone else will do something else",
				"Action: A third guy will do some more research on an item",
				"Action: The Staff Secretary will do a third thing"
			].join("\n")
		} 

		function parse() {
			var lines = vm.minutesText.split("\n");
			var numLines = lines.length;
			var actions = {};
			var thearray = [];
			
			vm.motions = [];

			for(var i=0; i<numLines; i++) {
				if(lines[i].indexOf("Action" + vm.delimiter) != -1) {
					var member = lines[i].split(vm.delimiter)[1];
					var themember = member.split(vm.actiondelimiter)[0];
					var theaction = member.split(vm.actiondelimiter)[1];
					if(!actions[themember]) {
						actions[themember] = [];
					}
					actions[themember].push(theaction)
				}
				if(lines[i].toLowerCase().indexOf(vm.motionkey.toLowerCase()) != -1) {
					vm.motions.push(lines[i]);
				}
			}

			for(member in actions) {
				thearray.push({"member":member, "actions":actions[member]})
			}

			vm.helpfulmembers = thearray;
		};
	
	}

	angular
		.module("app")
		.directive("memberactions", function() {
		return {
			scope: {
				member: "="
			},
			link: function(scope, element, attrs) {},
			templateUrl: "templates/directives/memberactions.html"
		}
	});
})();