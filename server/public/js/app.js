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
	      colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
	    });
	    // Configure all doughnut charts
	    ChartJsProvider.setOptions('doughnut', {
	      cutoutPercentage: 60
	    });
	    
	  });
	  
	app.controller("LineCtrl", function ($scope) {

	  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	  ];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };
	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	  $scope.options = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        },
	        {
	          id: 'y-axis-2',
	          type: 'linear',
	          display: true,
	          position: 'right'
	        }
	      ]
	    }
	  };
	});
	
	app.controller('DoughnutCtrl', ['$scope', function ($scope) {
	    $scope.labels = ['Used', 'Free'];
	    $scope.data = [300, 500];
	    

	}]);

 })();

