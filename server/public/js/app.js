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
  
  app.controller('formController', ['$scope','$http','$window',function($scope,$http,$window){
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
						$window.location.reload();
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
	
	app.config(function (ChartJsProvider) {
	    // Configure all charts
	    ChartJsProvider.setOptions({
	      colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']	   
	    });
	    // Configure all doughnut charts
	    ChartJsProvider.setOptions('doughnut', {
	      cutoutPercentage: 60
	    });
	    
	  });
	  
	app.controller("ProcCtrl", function ($scope) {

	  $scope.labels = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s"];
	  $scope.series = ['Core #0', 'Core #1', 'Core #2', 'Core #3'];
	  
	  $scope.cpu0check = true;
	  $scope.cpu1check = true;
	  $scope.cpu2check = true;
	  $scope.cpu3check = true;

	  
	  $scope.core0 = [88, 45, 41, 79, 26, 57, 30, 65, 59, 80];
	  $scope.core1 = [65, 59, 80, 81, 56, 55, 40, 79, 26, 57];
	  $scope.core2 = [28, 48, 40, 19, 86, 27, 90, 80, 81, 56];
	  $scope.core3 = [56, 23, 37, 21, 96, 25, 50, 28, 48, 40];
	  
	  $scope.data = [$scope.core0, $scope.core1, $scope.core2, $scope.core3];

	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	  $scope.options = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        }
	      ]
	    }
	  };
	  
	  this.updateData = function(){
		  console.log("working?");
		  $scope.data = [];
		  if($scope.cpu0check)
		  	$scope.data.push($scope.core0);
		  if($scope.cpu1check)
		  	$scope.data.push($scope.core1);
		  if($scope.cpu2check)
		  	$scope.data.push($scope.core2);
		  if($scope.cpu3check)
		  	$scope.data.push($scope.core3);
	  }
	});
	
	app.controller("NetworkCtrl", function ($scope) {

	  $scope.labels = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s"];
	  $scope.series = ['Upstream','Downstream'];

	  $scope.data = [ [56, 23, 37, 21, 96, 25, 50, 28, 48, 40]];

	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	  $scope.options = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        }
	      ]
	    }
	  };
	});
	
	app.controller('StorageCtrl', ['$scope', function ($scope) {
	    $scope.labels = ['Used', 'Free'];
	    $scope.data = [300, 500];
	    

	}]);
	
	app.controller("RamCtrl", function ($scope) {
	  $scope.labels = ["Unity", "Chrome", "Edge"];
	  $scope.data = [300, 500, 100];
	});
	
	app.controller('DashController', ['$scope', function($scope){
		$scope.screen = 0;
	}]);
              

 })();

