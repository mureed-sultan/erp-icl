var app = angular.module('myApp',[]);

app.controller('saleOrganizationCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////

	$scope.CfgSalesOrganizationSetup = {};
	$scope.newCfgSalesOrganizationSetup = {};
	$scope.editSalesOrganization = {};
	$scope.editSalesOrganization={};
	
	$scope.CfgSalesOrganizationSetup={};
	
	
	
	$scope.init = function(){
		
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		debugger;
	$scope.getSalesOrganization();
	};
	
	$scope.getSalesOrganization = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	    /* $http.get('/'+project_name+'/generateSalesOrganizationNo').success(function(data) {
	    	
				$scope.newCfgSalesOrganizationSetup.txtSalesOrganizationCode = data;
				
				});*/
			
		 $http.get('/'+project_name+'/getAllSalesOrganization').success(function(data) {
			 
			 debugger;
						$scope.CfgSalesOrganizationSetup = data;
						$scope.populateDataTable(data);
						}).error(function(data, status) {
							// debugger;
//							 alert("error");
							    
						     console.error('Repos error', status, data);
						  })
						  .finally(function() {
							 // debugger;
						    console.log("finally finished repos");
						    $(".se-pre-con").fadeOut("slow");
						  });;
	
	};

	
	$scope.addSalesOrganization = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();

		 debugger;
		var object = JSON.stringify($scope.newCfgSalesOrganizationSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewSalesOrganization',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Sale Organization");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Sale Organization added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            		alert(data);
            		$('#errMsgText').html("Unable to add Sale Organization \n due to duplication of  Sale Organization");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Sale Organization \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateSalesOrganization = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editSalesOrganization);
		$.ajax({
			url: '/'+project_name+'/updateSalesOrganization',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Sale Organization");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Sale Organization edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Sale Organization \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtSalesOrganizationCodeforEdit){
		//alert(txtSalesOrganizationCodeforEdit);
		$scope.editSalesOrganization = $filter("filter")($scope.CfgSalesOrganizationSetup, {serSalesOrganizationId:txtSalesOrganizationCodeforEdit})[0];
	};
	

	
	$scope.deleteSalesOrganization = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteSalesOrganization',
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
	
	
	$scope.selectUnselectAll=function(){
		$('tbody tr td input[type="checkbox"]').each(function(){
            $(this).prop('checked', $scope.checked);
        });
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  	
  	  	
  	  $.each(dataTable, function(index, saleOrganization) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+saleOrganization.serSalesOrganizationId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+saleOrganization.serSalesOrganizationId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+saleOrganization.serSalesOrganizationId+');angular.element(this).scope().$apply();" data-target="#editSalesOrganizationForm">Edit Sales Organization</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+saleOrganization.serSalesOrganizationId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    		  saleOrganization.txtCode,
	    		  saleOrganization.txtName,
	    	  saleOrganization.blnStatus===true?"Active":"InActive"
	    		  ]).draw(); 
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