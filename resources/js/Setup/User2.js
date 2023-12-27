var app = angular.module('myApp',[]);

app.controller('userCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgUserSetup = {};
	$scope.newCfgUserSetup = {};
	$scope.editUser = {};
	$scope.editUser={};
	$scope.CfgUserSetup={};
	$scope.lstCountry={};
	
	$scope.init = function(){
		
		alert();
debugger;
		 

		$scope.getUser();
		};
	
		$scope.Appuser={};
	$scope.newPassword="";
	$scope.confirmPassword="";
	$scope.UpdatePassword = function (){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
			    project_name=appPath;
		debugger;
//		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		debugger;
		var value=$('#userId').val();
        if($scope.newPassword==$scope.confirmPassword){
        $scope.data = {
        		    userId: value,
                    oldPass:$scope.Appuser.password,
                    newPass:$scope.newPassword
                }
        var object = JSON.stringify($scope.data);
		debugger;
		$.ajax({
            url: '/'+project_name+'/UpdatePasswordReconfirm',
            type: 'Post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	alert(data);
            	if(data=='Failure'){
//            		alert(data);
            		$('#errMsgText').html("Unable to update Password");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
//            		alert(data);
            		$('#successMsgText').html("Password Updated successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='CPNM'){
            		
            		$('#errMsgText').html("Current Password is not Correct \n");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='error'){
            		
            		$('#errMsgText').html("Unable to update Password \n");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			
	  			$('#errMsgText').html("Unable to update Password \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	}else{
		
		$('#errMsgText').html("Your confirm  Password does not match With Password");
		$('#addErrorAlert').show();
		
	};
	
}
	$scope.getUser = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		    alert(appPath);
		   
debugger;
 $http.get('/'+project_name+'/getAllSubMenu').success(function(data) {
			 alert();
			 debugger;
						$scope.lstCountry = data;
						
						});


						alert($scope.lstCountry.length);
		
	    //  $http.get('/'+project_name+'/generateUserNo').success(function(data) {
		// 		$scope.newCfgUserSetup.txtUserCode = data;
				
		// 		}); 	
	     
        // $http.get('/'+project_name+'/getActiveCountry').success(function(data) {
			 
		// 	 debugger;
		// 				$scope.lstCountry = data;
						
		// 				});
			
		//  $http.get('/'+project_name+'/getAllUser').success(function(data) {
		// 	 debugger;
		// 				$scope.CfgUserSetup = data;
		// 				$scope.populateDataTable(data);
						
		// }).error(function(data, status) {
		// 	// debugger;
		// 	// alert("error");
			    
		//      console.error('Repos error', status, data);
		//   })
		//   .finally(function() {
		// 	 // debugger;
		//     console.log("finally finished repos");
		//     $(".se-pre-con").fadeOut("slow");
		//   });;
	};
		
	

	$scope.addUser = function (){
		
		
		 
		
		
	
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newCfgUserSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewUser',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add User");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("User added successfully");
            		$('#successAlert').show();
            		$scope.newCfgUserSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add User \n due to duplication of  User");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add User \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateUser = function(){
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editUser);
		$.ajax({
			url: '/'+project_name+'/updateUser',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit User");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("User edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit User \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtUserCodeforEdit){
		//alert(txtUserCodeforEdit);
		$scope.editUser = $filter("filter")($scope.CfgUserSetup, {serUserId:txtUserCodeforEdit})[0];
	};
	

	
	$scope.deleteUser = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteUser',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Region");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Region removed successfully");
            		$('#successAlert').show();
            		$scope.newCfgUserSetup = {};
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Region to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(ids)
        });
	};
	
	function isEmpty(val){
	    return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, user) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+user.serUserId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+user.serUserId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+user.serUserId+');angular.element(this).scope().$apply();" data-target="#editUserForm">Edit User</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+user.serUserId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  user.txtUserCode,
	    	  user.txtUserName,
	    	  isEmpty(user.cfgTblCountry)?"":user.cfgTblCountry.txtName,
	    	  isEmpty(user.numFreight14)?"":$scope.addCommas(user.numFreight14),
	    	  isEmpty(user.numFreight20)?"":$scope.addCommas(user.numFreight20),
	    	isEmpty(user.numFreight40)?"":$scope.addCommas(user.numFreight40),
	    	  user.blnStatus===true?"Active":"InActive"]).draw(); 
  	  });
	};
	
	
	$scope.addCommas=function (nStr)
	{
		
		if(isEmpty(nStr))
			return '';
		
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	
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