var app = angular.module('myApp',[]);

app.controller('forgetCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	
	$scope.init = function(){
	
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
//		    alert(appPath);
		   
		
	     
	};
		
	

	$scope.ForgetPassword = function (){
		$scope.ReportDTO={};
		
	//	alert($("#username").val());
		//return;
		$scope.ReportDTO.txtUserName=$("#username").val();
	
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.ReportDTO);
		
		$.ajax({
            url: '/'+project_name+'/ForgetPassword',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		alert("Internal Error");
            	}
            	else if(data=='NM'){
                    alert("Please Check You user name");
               		//$scope.init();
               	}
            	else if(data=='Success'){
                 alert("Password Send successfully");
            		//$scope.init();
            	}
            	else if(data=='error'){
            		alert("Internal Error");
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Baa \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	
	
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);