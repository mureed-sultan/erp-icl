var app = angular.module('myApp',[]);

app.controller('aDCtrl', function($scope, $http, $filter){

	
	$scope.user={};
	$scope.Appuser={};
	$scope.newPassword="";
	$scope.confirmPassword="";
	$scope.selectedId="";
	$scope.project_name={};

	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;

		
		$http.get('/'+project_name+'/getActiveUser').success(function(data){
	
			$scope.Appuser = data;
		
			
		}).error(function(data, status) {
		
		     console.error('Repos error', status, data);
		  }) .finally(function() {
				 // debugger;
			    console.log("finally finished repos");
		//	    alert($scope.Appuser.length);
			    $(".se-pre-con").fadeOut("slow");
			
			  });
		
		
		debugger;
	   
		
		
	};
	
	$scope.UpdateAdminPassword = function (){
		debugger;
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		debugger;
		
        $scope.data = {
        		    userId: $scope.selectedId,
                    oldPass:"",
                    newPass:$scope.newPassword
                }
        var object = JSON.stringify($scope.data);
		debugger;
		$.ajax({
            url: '/'+project_name+'/UpdatePasswordAdmin',
            type: 'Post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            
            	if(data=='Failure'){
            		alert(data);
            		$('#errMsgText').html("Unable to update Password");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            	
            		$('#successMsgText').html("Password Updated successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to update Password \n");
            		$('#addErrorAlert').show();
            	}
            },
	  		
            data: object
        });
	
	
}



});
	