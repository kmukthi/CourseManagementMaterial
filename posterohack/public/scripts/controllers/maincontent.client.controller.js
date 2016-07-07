
var mainModule = angular.module('main');
mainModule.controller('AppCtrl', ['$scope', '$timeout', '$mdSidenav', '$log','$http','$timeout', '$mdDialog', '$mdMedia',function ($scope, $timeout, $mdSidenav, $log, $http, $timeout, $mdDialog, $mdMedia) {
	$scope.rightSideContentUrl = "landing";
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.courseNames = [];
    $scope.chooseCourse = true;
    $scope.navigationStatus = true;
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    $scope.handleMenu = function(data,$event) {
    	  $event.preventDefault();
    };
    $scope.removeCourse = function(course,ev){
		$scope.navigationStatus = false;
		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('#popupContainer')))
			        .clickOutsideToClose(true)
			        .title('Oops')
			        .textContent("Feature in progress")
			        .ariaLabel('Alert Dialog Demo')
			        .ok('Ok')
			        .targetEvent(ev)
			    );
		$timeout(function(){
			$mdDialog.hide();	
		},3000);
	};
	$scope.editCourse = function(course,ev){
		$scope.navigationStatus = false;
		$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Oops')
				.textContent("Feature in progress")
				.ariaLabel('Alert Dialog Demo')
				.ok('Ok')
				.targetEvent(ev)
		);
		$timeout(function(){
			$mdDialog.hide();	
		},3000);
	};
    /*
     * The side nav operations
     * */
    $scope.courseClick = function(course){
    	if($scope.navigationStatus){
    		$scope.addedQuestions = [];
    		$scope.selectedCourseName = course;
    		angular.forEach($scope.selectedCourseName.questions, function(obj, i){
    			var tempArr = {/*id:tempLen,*/
    					state_edit: false,
    					value: obj
    			};
    			$scope.addedQuestions.push(tempArr);
    		});
    		$scope.chooseCourse = false;
    	}
    	$scope.navigationStatus = true;
    };
    $scope.selectExaminerOperation = function(selectedIndex){
			$scope.rightSideContentUrl = selectedIndex;
			if(selectedIndex == 'add-questionnare'){
				$scope.courseNames = [];
				$scope.chooseCourse = true;
				var promise = $http.get('http://localhost:3000/getAllCourseNames');
				promise.success(function(data, status, headers, config){
					angular.forEach(data.data, function(obj, i){
						$scope.courseNames.push({
													"_id" : obj._id,
													"instructor": obj.instructor,
													"questions": obj.questions,
													"averageScore": obj.averageScore,
													"individualScore": obj.individualScore
													});
					});
				});
			}
	};
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  }]);
mainModule.controller('LeftCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });
      };
    }]);
mainModule.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };
});
