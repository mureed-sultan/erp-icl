var app = angular.module('myApp',[]);

app.controller('passwordPolicyCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgPasswordPolicySetup = {};
	$scope.newCfgPasswordPolicySetup = {};
	$scope.editPasswordPolicy = {};
	$scope.editPasswordPolicy={};
	$scope.CfgPasswordPolicySetup={};
	$scope.lstCountry={};
	
	$scope.init = function(){
		
	
		$scope.getPasswordPolicy();
		};
	
	
	$scope.getPasswordPolicy = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
//		    alert(appPath);
		   
		
	     /*$http.get('/'+project_name+'/generatePasswordPolicyNo').success(function(data) {
				$scope.newCfgPasswordPolicySetup.txtPasswordPolicyCode = data;
				
				}); 	*/
	     
        $http.get('/'+project_name+'/getActiveCountry').success(function(data) {
			 
			 debugger;
						$scope.lstCountry = data;
						
						});
			
		 $http.get('/'+project_name+'/getAllPasswordPolicy').success(function(data) {
			 debugger;
						$scope.CfgPasswordPolicySetup = data;
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
		
	

	$scope.addPasswordPolicy = function (){
		
		
		 
		
		
	
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
	
		 debugger;
		var object = JSON.stringify($scope.newCfgPasswordPolicySetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewPasswordPolicy',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add PasswordPolicy");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Password Policy added successfully");
            		$('#successAlert').show();
            		$scope.newCfgPasswordPolicySetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add PasswordPolicy \n due to duplication of  Password Policy");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Password Policy \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updatePasswordPolicy = function(){
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editPasswordPolicy);
		$.ajax({
			url: '/'+project_name+'/updatePasswordPolicy',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Password Policy");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Password Policy edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Password Policy \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtPasswordPolicyCodeforEdit){
		//alert(txtPasswordPolicyCodeforEdit);
//		$scope.editPasswordPolicy = $filter("filter")($scope.CfgPasswordPolicySetup, {serPasswordPolicyId:txtPasswordPolicyCodeforEdit})[0];
		
		
		$scope.editPasswordPolicy = $filter('filter')
		(
				$scope.CfgPasswordPolicySetup,
				function(PP) {
					return (PP.serPasswordPolicyId == txtPasswordPolicyCodeforEdit)
				})[0];
		
	};
	

	
	$scope.deletePasswordPolicy = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deletePasswordPolicy',
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
            		$scope.newCfgPasswordPolicySetup = {};
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
  	  $.each(dataTable, function(index, passwordPolicy) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+passwordPolicy.serPasswordPolicyId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+passwordPolicy.serPasswordPolicyId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+passwordPolicy.serPasswordPolicyId+');angular.element(this).scope().$apply();" data-target="#editPasswordPolicyForm">Edit PasswordPolicy</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+passwordPolicy.serPasswordPolicyId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  passwordPolicy.txtCode,
	    	  passwordPolicy.numHistoryCount,
	    	  passwordPolicy.numExpireDays,
	    	  passwordPolicy.numAttempt,
	    	  passwordPolicy.numPassLength,
	    	  passwordPolicy.blIsNumberRequired,
	    	  passwordPolicy.blIsSpecialChaReq,
	    	  passwordPolicy.blIsLowerUpper,
	    	 
	    	  passwordPolicy.blnStatus===true?"Active":"InActive"]).draw(); 
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