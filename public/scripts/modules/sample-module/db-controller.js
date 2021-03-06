define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

controllers.controller('DBController',['$state','$scope', 'DbService', '$injector', function($state, $scope, DbService,$injector){
	dbString = undefined;
	$scope.newconn = {
	'connectionName' : null,
        'username' : null,
        'password' : null,
        'host' : null,
        'port' : null,
	'database' : null
    };
	$scope.title="Add New Connection";
        $scope.modaltitle="Table Metadata";

/**********************************************************************************************************************/
/* resting connection details */
    $scope.reset = function() {
        $scope.title="Add New Connection";
        $scope.newconn = {};
    };
	
	$scope.createQuery = function(){
        $state.go('querymodular');
	
    };
/**********************************************************************************************************************/
/* connection and saving connection details */
        $scope.connect = function() {
		document.getElementById("connection-loading").style.display = 'block';
		$scope.databases=null;
    	$scope.newconn.port = parseInt($scope.newconn.port);
        if($scope.newconn.username==null||$scope.newconn.password==null||$scope.newconn.host==null||$scope.newconn.port==null||$scope.newconn.database==null)
          	{$scope.haveDetails=false;}
     	else if(angular.isNumber($scope.newconn.port)){ 
     	$scope.haveDetails=true;
      	 $scope.conn={
                "connectionName" : $scope.newconn.connectionName,
		"username" : $scope.newconn.username,
                "password" : $scope.newconn.password,
                "host" : $scope.newconn.host,
                "port" : $scope.newconn.port,
		"database": $scope.newconn.database };
                

      
// start of old version

        DbService.makeDbConnection($scope.conn)
        .then(function(dbconn){
		document.getElementById("connection-loading").style.display = 'none';
            $scope.databases = dbconn.MetaData;
            $scope.msg = dbconn.message;
            if($scope.databases==null){
            	$scope.glyfclass="glyphicon glyphicon-remove-sign";
             }else		
               $scope.glyfclass="glyphicon glyphicon-ok-sign";

           dbString = $scope.databases;
	

        }, function(error){

        });
	
// end of old version
            }
       else
         alert("Port No should be digits");
    };
/**********************************************************************************************************************/
/* initails loading of connection details */
		$scope.initConnection = function(){
			DbService.initiateConnectionDetails()
			.then(function(dbdetails){
					$scope.connections = dbdetails.allConnections;
				}, function(error){
					console.log("Failure");	
					});
					
					
			
		};


$scope.connectingLine = function(){
	DbService.initiateConnectionDetails()
	.then(function(response){
	},function(error){
		console.log("inside error of connectingLine");
	})
};
/**********************************************************************************************************************/

    $scope.select_db = function(connectionName) {
    $scope.title="Edit Connection";
    var i;
    for (i in $scope.connections) {
      if ($scope.connections[i].connectionName == connectionName) {
        $scope.newconn = angular.copy($scope.connections[i]);
      }
   }
	//$scope.Connection_Name=connectionName;
    };

$scope.navigateToReportWz= function(){
	var $state = $injector.get('$state');
	$state.go('reportwizard');
   document.querySelector('px-app-nav').markSelected('/reportwizard');
     
};
$scope.haveDetails=true;
        $scope.saveConn = function() {
		document.getElementById("connection-loading").style.display = 'block';
		$scope.databases=null;
    	$scope.newconn.port = parseInt($scope.newconn.port);
        if($scope.newconn.username==null||$scope.newconn.password==null||$scope.newconn.host==null||$scope.newconn.port==null||$scope.newconn.database==null)
          	{$scope.haveDetails=false;}
     	else if(angular.isNumber($scope.newconn.port)){ 
     	$scope.haveDetails=true;
      	 $scope.conn={
                "connectionName" : $scope.newconn.connectionName,
		"username" : $scope.newconn.username,
                "password" : $scope.newconn.password,
                "host" : $scope.newconn.host,
                "port" : $scope.newconn.port,
		"database": $scope.newconn.database };
                

      
// start of old version

        DbService.saveDBconn($scope.conn)
        .then(function(dbconn){
		document.getElementById("connection-loading").style.display = 'none';
		$scope.databases = dbconn.MetaData;
            $scope.msg = dbconn.msg;
		$scope.savedConnectionName=dbconn.insertedConnection;
            if($scope.databases==null){
            	$scope.glyfclass="glyphicon glyphicon-remove-sign";
		$scope.msg = "Unable to save, Please check the connection details.";
             }else{
               $scope.glyfclass="glyphicon glyphicon-ok-sign";
		if($scope.savedConnectionName==null){
			$scope.glyfclass="glyphicon glyphicon-remove-sign";
		}
		else{
			$scope.connections.push({"password":"","database":"","port":"","host":"","connectionName":$scope.savedConnectionName,"username":""});
		}
		}

        }, function(error){

        });
	saveDBconn
// end of old version
            }
       else
         alert("Port No should be digits");
    };
/**********************************************************************************************************************/
}// controller ends here

/*edit add new connection details title*/
]);
});

