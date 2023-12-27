var app = angular.module('myApp',[]);

app.controller('customerCategoryCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgCustomerCategorySetup = {};
	$scope.newCfgCustomerCategorySetup = {};
	$scope.editCustomerCategory = {};
	$scope.editCustomerCategory={};
	$scope.CfgCustomerCategorySetup={};
	$scope.lstCountry={};
	
	$scope.init = function(){
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		$scope.getCustomerCategory();
		};
	
	
	$scope.getCustomerCategory = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	     $http.get('/'+project_name+'/generateCustomerCategoryNo').success(function(data) {
				$scope.newCfgCustomerCategorySetup.txtCustomerCategoryCode = data;
				
				}); 	
	     
       	
		 $http.get('/'+project_name+'/getAllCustomerCategory').success(function(data) {
			 debugger;
						$scope.CfgCustomerCategorySetup = data;
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
		
	

	$scope.addCustomerCategory = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		// debugger;
		var object = JSON.stringify($scope.newCfgCustomerCategorySetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewCustomerCategory',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Customer Category");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer Category added successfully");
            		$('#successAlert').show();
            		$scope.newCfgCustomerCategorySetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Customer Category \n due to duplication of  Customer Category");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Customer Category \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateCustomerCategory = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editCustomerCategory);
		$.ajax({
			url: '/'+project_name+'/updateCustomerCategory',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Customer Category");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer Category edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Customer Category \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtCustomerCategoryCodeforEdit){
		//alert(txtCustomerCategoryCodeforEdit);
		$scope.editCustomerCategory = $filter("filter")($scope.CfgCustomerCategorySetup, {serCustomerCategoryId:txtCustomerCategoryCodeforEdit})[0];
	};
	

	
	$scope.deleteCustomerCategory = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteCustomerCategory',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Customer Category");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer Category removed successfully");
            		$('#successAlert').show();
            		$scope.newCfgCustomerCategorySetup = {};
            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Customer Category to remove error");
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
  	  $.each(dataTable, function(index, customerCategory) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+customerCategory.serCustomerCategoryId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+customerCategory.serCustomerCategoryId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+customerCategory.serCustomerCategoryId+');angular.element(this).scope().$apply();" data-target="#editCustomerCategoryForm">Edit CustomerCategory</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+customerCategory.serCustomerCategoryId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
	    	  customerCategory.txtCustomerCategoryCode,
	    	  customerCategory.txtCustomerCategoryName,
	    	 	  customerCategory.blnStatus===true?"Active":"InActive"]).draw(); 
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