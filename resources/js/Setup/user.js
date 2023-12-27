var app = angular.module('myApp',[]);

app.controller('userCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgUserSetup = {};
	$scope.newCfgUserSetup = {};
	$scope.editUser = {};
	$scope.editUser={};
	$scope.CfgUserSetup={};
	$scope.lstCountry={};
	$scope.currentUser={};
	$scope.pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
	$scope.pattern_small="(?=.*[a-z])";
	$scope.pattern_caps="(?=.*[A-Z])";
	$scope.pattern_number="(?=.*[0-9])";
	$scope.pattern_sc="(?=.*[!@#\$%\^&\*])";
	
	$scope.pattern_new="^";
	$scope.init = function(){
		
		
		
		$scope.getUser();
		};
	
		$scope.Appuser={};
	$scope.newPassword="";
	$scope.confirmPassword="";
	$scope.UpdatePassword = function (){
		
		
		debugger;
		var msg='';
		if(!isEmpty($scope.currentUser))
			 {
			 if($scope.currentUser.cfgTblPasswordPolicy.blIsLowerUpper == true)
				 {
				 $scope.pattern_new=$scope.pattern_new+$scope.pattern_small+$scope.pattern_caps;
				 msg = msg+" ,one Small one Upper";
				 }
			 
			 if($scope.currentUser.cfgTblPasswordPolicy.blIsSpecialChaReq == true)
				 {
				 $scope.pattern_new=$scope.pattern_new+$scope.pattern_sc;
				 msg = msg+" ,one Special Character";
				 }
			 
			 if($scope.currentUser.cfgTblPasswordPolicy.blIsNumberRequired == true)
				 {
				 $scope.pattern_new=$scope.pattern_new+$scope.pattern_number;
				 msg = msg+" ,one number";
				 }
			 if(!isEmpty($scope.currentUser.cfgTblPasswordPolicy.numPassLength))
				 $scope.pattern_new=$scope.pattern_new+"(?=.{"+$scope.currentUser.cfgTblPasswordPolicy.numPassLength+",})";
			 
			 msg = msg+" contain "+$scope.currentUser.cfgTblPasswordPolicy.numPassLength+" Characters";
			 }
		else
			{
			$scope.pattern_new=$scope.pattern;
			msg='Password length should be  and must contain 8 character atleast one upper case, one  lower case, one special character and one number', 'Failed!'
			}
		
		 if(!(this.newPassword.match(this.pattern_new))) 
	      {
//	      alert('Password length should be  and must contain atleast one upper case, one  lower case, one special character and one number', 'Failed!');
			 alert('Password length should be'+msg);
	      	return;
	      }
		 
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
        		    userId: $scope.currentUser.serUserId,
                    oldPass:$scope.Appuser.password,
                    newPass:$scope.newPassword
                }
        var object = JSON.stringify($scope.data);
        
      //  alert();
        
		debugger;
		$.ajax({
            url: '/'+project_name+'/UpdatePasswordReconfirm',
            type: 'Post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            //	alert(data);
            	
            	if(data=='Failure'){
//            		alert(data);
            		$('#errMsgText').html("Unable to update Password");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
//            		alert(data);
            		$('#successMsgText').html("Password Updated successfully");
            		$('#successAlert').show();
            		
            		setTimeout(function () {
          			  $(function () {
          			
          				$scope.init();
          			   
          			  });
          			}, 7000);
            		
            	}
            	else if(data=='CPNM'){
            		
            		$('#errMsgText').html("Current Password is not Correct \n");
            		$('#addErrorAlert').show();
            	}
            		else if(data=='PAU'){
            		
            		$('#errMsgText').html("Password is already Used Try a new Password \n");
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
//		    alert(appPath);
		   
		    
		    
		    
		    $http.get('/'+project_name+'/getCurrentUser').success(function(data) {
				$scope.currentUser = data;
				
				}); 	
		
	     $http.get('/'+project_name+'/generateUserNo').success(function(data) {
				$scope.newCfgUserSetup.txtUserCode = data;
				
				}); 	
	     
        $http.get('/'+project_name+'/getActiveCountry').success(function(data) {
			 
			 debugger;
						$scope.lstCountry = data;
						
						});
			
		 $http.get('/'+project_name+'/getAllUser').success(function(data) {
			 debugger;
						$scope.CfgUserSetup = data;
						$scope.populateDataTable(data);
						
		}).error(function(data, status) {
			// debugger;
			// alert("error");
			    
		     console.error('Repos error', status, data);
		  })
		  .finally(function() {
			 // debugger;
		    console.log("finally finished repos");
		    $(".se-pre-con").fadeOut("slow");
		  });;
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
	
	
	$scope.close = function(){
		location.href = '/'+project_name+'/home';
	
	}
	
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