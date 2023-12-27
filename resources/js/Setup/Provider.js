var app = angular.module('myApp',[]);

app.controller('providerCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgProviderSetup = {};
	$scope.providerSetup = {};
	$scope.editProvider = {};
	$scope.editProvider={};
	$scope.CfgProviderSetup={};
	$scope.lstCountry={};
	$scope.lstProviderAccount={};
	$scope.lstEHR ={};
	
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
		
		$scope.getProvider();
		};
	
	
	$scope.getProvider = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
//		    alert(appPath);
		   
		
	    
	     
        $http.get('/'+project_name+'/getAllProviderAccount').success(function(data) {
			 
			 debugger;
						$scope.lstProviderAccount = data;
						
						});
        
        $http.get('/'+project_name+'/getAllEhr').success(function(data) {
			 
			 debugger;
						$scope.lstEHR = data;
						
						});
        
        
			
		 $http.get('/'+project_name+'/getAllProvider').success(function(data) {
			 debugger;
						$scope.CfgProviderSetup = data;
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
		
	

	$scope.addProvider = function (){
		
		
		 
		
		
	
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
//		alert();
		 debugger;
		var object = JSON.stringify($scope.providerSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewProvider',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Provider");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Provider added successfully");
            		$('#successAlert').show();
            		$scope.providerSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Provider \n due to duplication of  Provider");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Provider \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateProvider = function(){
		
		
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editProvider);
		$.ajax({
			url: '/'+project_name+'/updateProvider',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Provider");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Provider edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Provider \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(providerNameforEdit){
		//alert(providerNameforEdit);
	
		$scope.editProvider = $filter('filter')
		(
				$scope.CfgProviderSetup,
				function(PP) {
					return (PP.providerid == providerNameforEdit)
				})[0];
	};
	

	
	$scope.deleteProvider = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteProvider',
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
            		$scope.providerSetup = {};
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
  	  $.each(dataTable, function(index, provider) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+provider.providerid+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+provider.providerid+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+provider.providerid+');angular.element(this).scope().$apply();" data-target="#editProviderForm">Edit Provider</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+provider.serProviderId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  provider.firstName,
	    	  provider.middleName,
	    	  provider.lastName,
	    	  isEmpty(provider.providerAccount)?"":provider.providerAccount.firstName,
	    	  isEmpty(provider.ehr)?"":provider.ehr.ehrName,
	    			  provider.npi,
	    			  provider.emailId,
	    			  provider.homePhoneNo,
	    			  provider.officePhoneNo,
	    			  provider.mobilePhoneNo,
	    	  ]).draw(); 
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