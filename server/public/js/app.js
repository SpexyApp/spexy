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
		
		var subData = $.param({username: $scope.auth.username, password: $scope.auth.password});

		this.submitForm = function(){
			$scope.status = "Submitting...";
			$http.post('/auth', $scope.auth).
                success(function(data, status) {
                    if(data.success == true){
					    $scope.status = "Submit";
					    $scope.success = true;
						document.location.href = '/';
				    }
				    else{
					    $scope.status = "Try Again";
					    alert(data);
						console.log(data);
				    }
				})
				.error(function(data, status, headers, config) {
					alert( "failure message: " + JSON.stringify({data: data}));
				});
				
			
		
	
		};
		
		
		
	}]);
	
	app.controller('DoughnutCtrl', ['$scope', function ($scope) {
	  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	  $scope.data = [300, 500, 100];
	}]);

  })();

