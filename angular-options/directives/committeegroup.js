(function() {
  angular
    .module("app")
    .directive("committeegroup", function($rootScope) {
      return {
        scope:{
          comdata: "=",
          ind: "=",
          rmv: "=",
          allCommittees:"="
        },
        templateUrl:"templates/directives/committeegroup.html",
        link: function(scope, el, attrs, controller) {
          console.log(scope);
        }
      }
    });
})();