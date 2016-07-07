(function(){
	var mainModule = angular.module('main');
	mainModule.directive('mainContent', [function(){
		var arr = {
				restrict: 'E',
				templateUrl: '/views/main-content.html'
		};
		return arr;
	}]);
	mainModule.directive('landingPage',[function(){
		var arr = {
				restrict: 'E',
				templateUrl: 'views/landing-page.html'
		}
		return arr;
	}]);
	mainModule.directive('questionnarePage', ['$rootScope','$http','$timeout','$mdDialog', '$mdMedia', function($rootScope, $http, $timeout, $mdDialog, $mdMedia){
		var arr = {
				restrict: 'E',
				templateUrl : 'views/questionnare-page.html',
				link: function($scope,$element,$attrs){
					$scope.testQ = "";
					$scope.savedSuccess = "";
					$scope.newQuestion = {};
					$scope.newQuestion.value = "";
					$scope.previouslySelectedIndex = "";
					
					$scope.saveQuestionnare = function(ev){
						var questions = [];
						angular.forEach($scope.addedQuestions, function(obj, i){
							questions.push(obj.value);
						});
						reqData = {
								 _id: $scope.selectedCourseName._id,
								  instructor: $scope.selectedCourseName.instructor,
								  questions: questions,
								  averageScore: 0,
								  individualScore: {}
						};
						var promise = $http.post('http://localhost:3000/saveQuestions', reqData);
						promise.success(function(data, status, headers, config){
							if(data){
								$scope.savedSuccess = "Questions Updated Successfully";
								$mdDialog.show(
									      $mdDialog.alert()
									        .parent(angular.element(document.querySelector('#popupContainer')))
									        .clickOutsideToClose(true)
									        .title('Save Status')
									        .textContent($scope.savedSuccess)
									        .ariaLabel('Alert Dialog Demo')
									        .ok('Ok')
									        .targetEvent(ev)
									    );
								$timeout(function(){
									$mdDialog.hide();	
								},5000);
							}else{
								
							}
						});
					};
					$scope.removeQuestion = function(index){
						$scope.addedQuestions.splice(index,1);
						$scope.addedQuestions[index]['state_edit'] = false;
						$scope.previouslySelectedIndex == "remove";
					};
					$scope.editQuestion = function(index){
						$scope.index = index;
						$scope.addedQuestions[index]['state_edit'] = true;
						$scope.previouslySelectedIndex = "edit";
					};
					$scope.performUpdate = function(index){
						$scope.addedQuestions[index]['state_edit'] = false;
						/*$scope.previouslySelectedIndex = index;
						$scope.previouslySelectedIndex = "editSuccess";*/
					};
					$scope.questionClick = function(index){
							$scope.testQ = index;
							if(index == 'new'){
								if($scope.index!=undefined){
									$scope.addedQuestions[$scope.index]['state_edit'] = false;
								}
							}else{
								if($scope.index == index){
									if($scope.addedQuestions[index]['state_edit']){
										$scope.addedQuestions[index]['state_edit'] = true;
									}
								}else{
									angular.forEach($scope.addedQuestions, function(obj,i){
										$scope.addedQuestions[i]['state_edit'] = false;
									});
								}
							}
							
					};
					$scope.addQuestion = function(){
						//$scope.newQuestion.id = angular.copy($scope.addedQuestions.length);
						var tempLen =angular.copy($scope.addedQuestions.length);
						tempLen--;
						
						var tempArr = {/*id:tempLen,*/
								state_edit: false,
								value: $scope.newQuestion.value
									};
						$scope.newQuestion.value = "";
						$scope.addedQuestions.push(tempArr); 
					}
				}
		};
		return arr;
	}]);
	mainModule.directive('courseEvaluatePage',function(){
		var arr = {
				restrict: 'E',
				templateUrl : 'views/course-evaluate-page.html'
		};
		return arr;
	})
})();