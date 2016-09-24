(function() {
  var app = angular.module('spexy', ['chart.js']);
 
  
  app.controller('homeController',['$scope', function($scope){
	    $scope.homeTxt = "Login";
	  
	    this.registerOn = function(){
			$scope.homeTxt = "Register";
		}
		
		this.loginOn = function(){
			$scope.homeTxt = "Login";
		}
  }]);
  
  app.controller('formController', ['$scope','$http',function($scope,$http){
		$scope.status = "Submit";
		$scope.success = false;
		$scope.register = false;

		$scope.auth = {
			username: "",
			password: "",
		};

		this.submitForm = function(){
			$scope.status = "Submitting...";
			$http.post('http://nisarg.me/auth', $scope.auth).
                        success(function(data, status) {
                            if(data.success === true){
							    $scope.status = "Submit";
							    $scope.success = true;
								console.log("OK", data);
						    }
						    else{
							    $scope.status = "Try Again";
								console.log(data);
						    }
                        })
		
	
		};
		
		
		
	}]);
	
	app.controller('DoughnutCtrl', ['$scope', function ($scope) {
	  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	  $scope.data = [300, 500, 100];
	}]);

  })();

