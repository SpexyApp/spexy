(function() {
	var app = angular.module('spexy', ['chart.js']);
	var data = [];
	app.controller('homeController', ['$scope', function($scope) {
		$scope.homeTxt = "Login";
		this.registerOn = function() {
			$scope.homeTxt = "Register";
		}
		this.loginOn = function() {
			$scope.homeTxt = "Login";
		}
	}]);
	app.controller('DashController', ['$scope', '$http', function($scope, $http) {
		$scope.screen = 0;
		$scope.data = [];
		$http.get('data.json').then(function(res) {
			for (var i = 0; i < res.data.length; i++) {
				data.push(res.data[i]);
			}
			// console.log(data);
		});
	}]);
	app.controller('formController', ['$scope', '$http', '$window', function($scope, $http, $window) {
		$scope.status = "Submit";
		$scope.success = false;
		$scope.register = false;
		$scope.auth = {
			username: "",
			password: "",
		};
		var subData = $.param({
			username: $scope.auth.username,
			password: $scope.auth.password
		});
		this.submitForm = function() {
			$scope.status = "Submitting...";
			$http.post('/auth', $scope.auth).
			success(function(data, status) {
				if (data.success == true) {
					$scope.status = "Submit";
					$scope.success = true;
					$window.location.reload();
				} else {
					$scope.status = "Try Again";
				}
			}).error(function(data, status, headers, config) {
				$scope.status = "Try Again";

			});
		};
	}]);
	app.config(function(ChartJsProvider) {
		// Configure all charts
		ChartJsProvider.setOptions({
			colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
		});
		// Configure all doughnut charts
		ChartJsProvider.setOptions('doughnut', {
			cutoutPercentage: 60,
			colors: ['green', 'red', 'orange', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
		});
	});
	app.controller("ProcCtrl", ['$scope', '$http', function($scope, $http) {
		$scope.labels = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s"];
		$scope.series = ['Core #0', 'Core #1', 'Core #2', 'Core #3'];
		$scope.cpu0check = true;
		$scope.cpu1check = true;
		$scope.cpu2check = true;
		$scope.cpu3check = true;
		$scope.core0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		$scope.core1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		$scope.core2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		$scope.core3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		$scope.cpuName = "";
		$http.get('data.json').then(function(res) {
			$scope.cpuName = res.data.cpuName;
			for (var i = 0; i < res.data.length; i++) {
				$scope.core0 = $scope.core0.slice(1);
				$scope.core0.push(data[i].cpuCoreInfo.core0);
				$scope.core1 = $scope.core1.slice(1);
				$scope.core1.push(data[i].cpuCoreInfo.core1);
				$scope.core2 = $scope.core2.slice(1);
				$scope.core2.push(data[i].cpuCoreInfo.core2);
				$scope.core3 = $scope.core3.slice(1);
				$scope.core3.push(data[i].cpuCoreInfo.core3);
			}
			$scope.data = [$scope.core0, $scope.core1, $scope.core2, $scope.core3];
			// console.log(data);
		});
		$scope.data = [$scope.core0, $scope.core1, $scope.core2, $scope.core3];
		$scope.datasetOverride = [{
			yAxisID: 'y-axis-1'
		}];
		$scope.options = {
			scales: {
				yAxes: [{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				}]
			}
		};
		this.updateData = function() {
			console.log("working?");
			$scope.data = [];
			if ($scope.cpu0check) $scope.data.push($scope.core0);
			if ($scope.cpu1check) $scope.data.push($scope.core1);
			if ($scope.cpu2check) $scope.data.push($scope.core2);
			if ($scope.cpu3check) $scope.data.push($scope.core3);
		}
	}]);
	app.controller("NetworkCtrl", ['$scope', '$http', function($scope, $http) {
		$scope.labels = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s"];
		$scope.series = ['Upstream', 'Downstream'];
		var upstream = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var downstream = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		$scope.uSpeed = 0;
		$scope.dSpeed = 0;
		$http.get('data.json').then(function(res) {
			for (var i = 0; i < res.data.length; i++) {
				upstream = upstream.slice(1);
				upstream.push(data[i].KBrecv);
				downstream = downstream.slice(1);
				downstream.push(data[i].KBsent);
				
				$scope.uSpeed = data[i].KBrecv;
				$scope.dSpeed = data[i].KBsent;
			}
			$scope.data = [upstream, downstream];
		});
		$scope.data = [upstream, downstream];
		$scope.datasetOverride = [{
			yAxisID: 'y-axis-1'
		}];
		$scope.options = {
			scales: {
				yAxes: [{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				}]
			}
		};
	}]);
	app.controller('StorageCtrl', ['$scope','$http', function($scope,$http) {
		$scope.labels = ['Used', 'Free'];
		$scope.colours = [{
          "fillColor": "blue",
          "strokeColor": "rgba(207,100,103,1)",
          "pointColor": "rgba(220,220,220,1)",
          "pointStrokeColor": "#fff",
          "pointHighlightFill": "#fff",
          "pointHighlightStroke": "rgba(151,187,205,0.8)"
        }];
		$http.get('data.json').then(function(res) {
			data = res.data;
			$scope.data = [data[0].disk0.usedspace, data[0].disk0.freespace];
			$scope.mtpoint = data[0].disk0.mtpoint;
			$scope.total = data[0].disk0.totspace;

		});
		
	}]);
	app.controller("RamCtrl",['$scope','$http', function($scope,$http) {
		var data = [];
	    $scope.labels = [];
		$scope.data = [];
		$scope.top = [];
		$http.get('proc.json').then(function(res) {
			data = res.data;
			console.log(data);
			data = sortByKey(data, "memPerc");
			for (var i = 0; i < res.data.length && i < 10; i++) {
				$scope.labels.push(data[i].name);
				$scope.data.push(data[i].memPerc);
				$scope.top.push(data[i].name);
				$scope.top.reverse();
			}

		});

	}]);
	
	app.controller("TaskCtrl",['$scope','$http', function($scope,$http) {
		$scope.proc = [];
		$http.get('proc.json').then(function(res) {
			$scope.proc = res.data;
			$scope.proc = sortByKey($scope.proc, "memPerc").reverse();

		});

	}]);
	
	function sortByKey(array, key) {
	    return array.sort(function(a, b) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	}
	
})();