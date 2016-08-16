(function() {
	angular
		.module("app")
		.controller("styleCtrl", styleCtrl);

	styleCtrl.$inject = ['$scope'];
	
	function styleCtrl($scope) {
		vm = $scope;

		vm.formatStyle = formatStyle;
		vm.inputbackground = "#ffffff";
		vm.inputborder = "#000000";
		vm.inputtext = "#000000";
		vm.saveStyles = saveStyles;
		vm.tablebackground = "#ebf3f9";
		vm.tableborder = "#d8e7f3";
		vm.threed = false;

		activate(); // Get saved values from Chrome storage

		function activate() {
			return chrome.storage.sync.get({
		    "backgroundColor": "#ebf3f9",
		    "borderColor": "#d8e7f3",
		    "inpColor": "#ffffff",
		    "inpBorderColor": "#dedede",
		    "inptxtColor":"#000000",
		    "threed":false
		  }, function(obj) {
		  	vm.tablebackground = obj.backgroundColor;
		  	vm.tableborder = obj.borderColor;
		  	vm.inputbackground = obj.inpColor;
		  	vm.inputborder = obj.inpBorderColor;
		  	vm.inputtext = obj.inptxtColor;
		  	vm.threed = obj.threed;	
			});
		}

		

		function formatStyle() {
			if(vm.threed) {
				return {
					'background-color':vm.inputbackground,
					'border':'1px solid '+vm.inputborder,
					'color':vm.inputtext,
					'box-shadow':vm.inputborder+' 0px 2px 5px 0px'
				}
			}
			return {
				'background-color':vm.inputbackground,
				'border':'1px solid '+vm.inputborder,
				'color':vm.inputtext
			}
		};

		function saveStyles() {
			chrome.storage.sync.set({
		    "backgroundColor": vm.tablebackground,
		    "borderColor": vm.tableborder,
		    "inpColor": vm.inputbackground,
		    "inpBorderColor": vm.inputborder,
		    "inptxtColor":vm.inputtext,
		    "threed":vm.threed
		  }, function() {
		  	alert("Saved");
		  });
		}
		
	}
})();