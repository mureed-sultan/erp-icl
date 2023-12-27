var app = angular.module('myApp',[]);

app.controller('countryCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////

	$scope.CfgCountrySetup = {};
	$scope.newCfgCountrySetup = {};
	$scope.editCountry = {};
	$scope.editCountry={};
	
	$scope.CfgCountrySetup={};
	
	
	
	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		debugger;
	$scope.getCountry();
	};
	
	$scope.getCountry = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	    /* $http.get('/'+project_name+'/generateCountryNo').success(function(data) {
	    	
				$scope.newCfgCountrySetup.txtCountryCode = data;
				
				});*/
			
		 $http.get('/'+project_name+'/getAllCountry').success(function(data) {
			 
			 debugger;
						$scope.CfgCountrySetup = data;
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


	$scope.addCountry = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		 debugger;
		var object = JSON.stringify($scope.newCfgCountrySetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewCountry',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Country");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Country added successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	else if(data=='error'){
            		alert(data);
            		$('#errMsgText').html("Unable to add Country \n due to duplication of  Country");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Country \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateCountry = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editCountry);
		$.ajax({
			url: '/'+project_name+'/updateCountry',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Country");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Country edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Country \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtCountryCodeforEdit){
		//alert(txtCountryCodeforEdit);
		$scope.editCountry = $filter("filter")($scope.CfgCountrySetup, {serCountryId:txtCountryCodeforEdit})[0];
	};
	

	
	$scope.deleteCountry = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteCountry',
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
  	  	
  	  	
  	  $.each(dataTable, function(index, country) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+country.serCountryId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+country.serCountryId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+country.serCountryId+');angular.element(this).scope().$apply();" data-target="#editCountryForm">Edit Country</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+country.serCountryId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    		  country.txtName,
	    	  country.blnStatus===true?"Active":"InActive"
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