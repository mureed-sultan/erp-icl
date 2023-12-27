var app = angular.module('myApp',[]);

app.controller('providerAccountCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgProviderAccountSetup = {};
	$scope.providerAccountSetup = {};
	$scope.editProviderAccount = {};
	$scope.editProviderAccount={};
	$scope.CfgProviderAccountSetup={};
	$scope.lstCountry={};
	$scope.re_password='';
	$scope.init = function(){
		
	/*	alert();
		
		debugger;
		var word="Deleveled";
		
		var lstWord=[];
		
		var c= word.length;
		
		for(  a=0; a <c;a++)
			{
			
			lstWord[a]=
			}*/
		
		$scope.getProviderAccount();
		};
	
	
	$scope.getProviderAccount = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
//		    alert(appPath);
		   
		
	    
        $http.get('/'+project_name+'/getActiveCountry').success(function(data) {
			 
			 debugger;
						$scope.lstCountry = data;
						
						});
        
        
			
		 $http.get('/'+project_name+'/getAllProviderAuthentication').success(function(data) {
			 debugger;
			 
						$scope.CfgProviderAccountSetup = data;
					
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
		
	

	$scope.addProviderAccount = function (){
		
		
		 if(!($scope.providerAccountSetup.password==$scope.re_password))
		 {
			 alert("Your confirm  Password does not match With Password");
			 return;
		 }
		
		
	
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.providerAccountSetup);
		
	//	alert();
		debugger;
		
		$.ajax({
            url: '/'+project_name+'/addNewProviderAuthenitication',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Provider Account");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='EXIST'){
            		$('#errMsgText').html("Provider Account already Exist.");
            		$('#addErrorAlert').show();
            		
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("ProviderAccount added successfully");
            		$('#successAlert').show();
            		$scope.providerAccountSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Provider Account \n due to duplication of  Provider Account");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Provider Account \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateProviderAccount = function(){
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editProviderAccount);
		$.ajax({
			url: '/'+project_name+'/updateProviderAuthentication',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Provider Account");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='EXIST'){
            		$('#errMsgText').html("Provider Account already Exist.");
            		$('#addErrorAlert').show();
            		
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Provider Account edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit ProviderAccount \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(providerAccountNameforEdit){
		//alert(providerAccountNameforEdit);
		$scope.editProviderAccount = $filter("filter")($scope.CfgProviderAccountSetup, {providerAuthid:providerAccountNameforEdit})[0];
	};
	

	
	$scope.deleteProviderAccount = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteProviderAccount',
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
            		$scope.providerAccountSetup = {};
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
  	  $.each(dataTable, function(index, providerAuthentication) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+providerAuthentication.providerAccountid+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+providerAuthentication.providerAuthid+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+providerAuthentication.providerAuthid+');angular.element(this).scope().$apply();" data-target="#editProviderAccountForm">Edit ProviderAccount</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+providerAccount.serProviderAccountId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  providerAuthentication.providerAccount.firstName,
	    	  providerAuthentication.providerAccount.middleName,
	    	  providerAuthentication.providerAccount.lastName,
	    	  providerAuthentication.providerAccount.emailId,
	    	  providerAuthentication.providerAccount.txtContact,
	    	  providerAuthentication.username]).draw(); 
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