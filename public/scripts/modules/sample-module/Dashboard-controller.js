define(['angular', './sample-module'], function(angular, controllers) {
  'use strict';
    controllers.controller('Dashboardcontroller',['$state','$scope', 'DbService', function($state, $scope, DbService,$window) {
   
   
	$scope.reportsTable={};
	$scope.rs=0;
	$scope.rg=0;
	$scope.reportsCount=0;
	$scope.savedQueriesCount = 0;
    	$scope.initDashboardReport = function(){
 	   	console.log("inside initiate function");
 	   	DbService.dasboardTableDetails()
 	   	.then(function(reports){
 	   			console.log("success");
 	   			$scope.reportsTable=reports;
				$scope.latestReportName='';
 	   			console.log("length: "+$scope.reportsTable.allReports.length);
				$scope.reportsCount = $scope.reportsTable.allReports.length;
 	   			for(var i=0;i<$scope.reportsTable.allReports.length;i++){
 	   				if($scope.reportsTable.allReports[i].status=="true")
 	   					$scope.rs++;
 	   				else
 	   					$scope.rg++;
					$scope.latestReportName=$scope.reportsTable.allReports[i].reportName;
 	   				}
			DbService.getChartFromReport($scope.latestReportName)
			.then(function(chartData){
				$scope.chartdata = JSON.stringify(chartData.mainJSON);
				$scope.chartdrilldata = JSON.stringify(chartData.drillDownModel);
				$scope.reportName = JSON.stringify(chartData.reportName);
				$scope.type = JSON.stringify(chartData.chartType);
				console.log(chartData.chartType+"--"+chartData.drillDownModel);
				console.log("<div class='right-side-chart' id='right-side-chart-div'><bar-chart type='"+chartData.chartType+"' divid='container2' width=350 height=220 title='' subtitle='Click the columns to view versions.' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart></div>");
				$("#chart-div").append("<div class='right-side-chart' id='right-side-chart-div'><bar-chart type='"+chartData.chartType+"' divid='container2' width=350 height=220 title='' subtitle='Click the columns to view versions.' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart></div>");
		
				//..................................
				// Get the modal
			/*	var modal = document.getElementById('myModal');
				// Get the image and insert it inside the modal - use its "alt" text as a caption
				var img = document.getElementById("chart-div");
				var modalImg = document.getElementById("img01");
				var captionText = document.getElementById("caption");
				var chartdata1=  $scope.chartdata;
				var chartdrilldata1= $scope.chartdrilldata;
				var chertType = $scope.chartType;
				img.onclick = function(){
    					modal.style.display = "block";
    					//captionText.innerHTML = this.alt;
					$("#img01").append("<div class='right-side-chart1' id='right-side-chart-div1'><bar-chart type='"+chertType+"' divid='container2' title='' subtitle='Click the columns to view versions.' data='" + chartdata1 + "' drilldowndata='" + chartdrilldata1 + "'></bar-chart></div>");
					}

				// Get the <span> element that closes the modal
				var span = document.getElementsByClassName("close")[0];
				// When the user clicks on <span> (x), close the modal
				span.onclick = function() { 
    					modal.style.display = "none";
					}
*/
				//..................................



			},function(error){
    				console.log("failure");
 			});
 	   		},function(error){
    				console.log("failure");
 	   			});

	DbService.getQueriesSavedCount()
	.then(function(qcount){	
		$scope.savedQueriesCount = qcount.count;
		
	},function(error){
    		console.log("failure");
 	});

 };

//function for last generated chart...

$scope.displayChartFromReport = function(reportName){
	DbService.getChartFromReport(reportName)
	.then(function(chartData){
		
		$scope.chartdata = JSON.stringify(chartData.mainJSON);
		$scope.chartdrilldata = JSON.stringify(chartData.drillDownModel);
		$scope.reportName = JSON.stringify(chartData.reportName);
		$scope.type = JSON.stringify(chartData.chartType);
		
		$("#chart-div").append("<div class='right-side-chart' id='right-side-chart-div'><bar-chart type='"+chartData.chartType+"' divid='container2' width=350 height=220 title='' subtitle='Click the columns to view versions.' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart></div>");
		
	},function(error){
    		console.log("failure");
 	});

};

/*
 var dataS = [{
      'name': 'Microsoft IE',
      'y': 56.33,
      'drilldown': 'Microsoft IE'
    }, {
      'name': 'Chrome',
      'y': 24.03,
      'drilldown': 'Chrome'
    }, {
      'name': 'Firefox',
      'y': 10.38,
      'drilldown': 'Firefox'
    }, {
      'name': 'Safari',
      'y': 4.77,
      'drilldown': 'Safari'
    }, {
      'name': 'Opera',
      'y': 0.91,
      'drilldown': 'Opera'
    }, {
      'name': 'Proprietary',
      'y': 0.2,
      'drilldown': 'Proprietary'
    }];

    var dataD = [{
      'names': 'Microsoft IE',
      'id': 'Microsoft IE',
      'data': [
        ['v11.0', 24.13],
        ['v8.0', 17.2],
        ['v9.0', 8.11],
        ['v10.0', 5.33],
        ['v6.0', 1.06],
        ['v7.0', 0.5]
      ]
    }, {
      'names': 'Chrome',
      'id': 'Chrome',
      'data': [
        ['v40.0', 5],
        ['v41.0', 4.32],
        ['v42.0', 3.68],
        ['v39.0', 2.96],
        ['v36.0', 2.53],
        ['v43.0', 1.45],
        ['v31.0', 1.24],
        ['v35.0', 0.85],
        ['v38.0', 0.6],
        ['v32.0', 0.55],
        ['v37.0', 0.38],
        ['v33.0', 0.19],
        ['v34.0', 0.14],
        ['v30.0', 0.14]
      ]
    }, {
      'names': 'Firefox',
      'id': 'Firefox',
      'data': [
        ['v35', 2.76],
        ['v36', 2.32],
        ['v37', 2.31],
        ['v34', 1.27],
        ['v38', 1.02],
        ['v31', 0.33],
        ['v33', 0.22],
        ['v32', 0.15]
      ]
    }, {
      'names': 'Safari',
      'id': 'Safari',
      'data': [
        ['v8.0', 2.56],
        ['v7.1', 0.77],
        ['v5.1', 0.42],
        ['v5.0', 0.3],
        ['v6.1', 0.29],
        ['v7.0', 0.26],
        ['v6.2', 0.17]
      ]
    }, {
      'names': 'Opera',
      'id': 'Opera',
      'data': [
        ['v12.x', 0.34],
        ['v28', 0.24],
        ['v27', 0.17],
        ['v29', 0.16]
      ]
    }];
 						                  
    $scope.charttitle = "Browser market shares.";
    $scope.chartdata = JSON.stringify(dataS);
    $scope.chartdrilldata = JSON.stringify(dataD);
    */
 

  }]);
});
