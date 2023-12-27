var app = angular.module('myApp',[]);

app.controller('customerCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgCustomerSetup = {};
	$scope.newCfgCustomerSetup = {};
	$scope.editCustomer = {};
	$scope.editCustomer={};
	$scope.CfgCustomerSetup={};
	$scope.lstCustomerCategory={};
	$scope.lstCity={};
	$scope.newCfgCustomerSetup.numFurtherTax=.02;

	$scope.lstDealer={};

	$scope.lstActiveDealer={};
	
	$scope.init = function(){
		
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		
		$scope.getCustomer();
		};
	
	
	$scope.getCustomer = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		
	     $http.get('/'+project_name+'/generateCustomerNo').success(function(data) {
				$scope.newCfgCustomerSetup.txtCustomerCode = data;
				
				}); 	
	     
        $http.get('/'+project_name+'/getActiveCustomerCategory').success(function(data) {
			 
			 debugger;
						$scope.lstCustomerCategory = data;
						
						});
        $http.get('/'+project_name+'/getActiveCity').success(function(data) {
			 
			 debugger;
						$scope.lstCity = data;
						
						});
        
        $http.get('/'+project_name+'/getActiveDealer').success(function(data) {
			 
			 debugger;
						$scope.lstDealer = data;
						
						});
        
$http.get('/'+project_name+'/getAllIncoTerm').success(function(data) {
			 
			
			$scope.lstIncoTerms = data;
			
			});
        
        $http.get('/'+project_name+'/getAllEmployees').success(function(data) {
			 
			
			$scope.lstEmployee = data;
			
			});
			
		 $http.get('/'+project_name+'/getAllCustomer').success(function(data) {
			 debugger;
						$scope.CfgCustomerSetup = data;
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
	
	
	
	$scope.gstSelection=function()
	{
		debugger;
		
		if($scope.newCfgCustomerSetup.blnIsGst===true)
			{
			$scope.newCfgCustomerSetup.numFurtherTax=0;
			
			
			}
		else
			{
			$scope.filerSelection();
			}
	}
	
	$scope.gstSelection_update=function()
	{
		debugger;
		
		if($scope.editCustomer.blnIsGst===true)
			{
			$scope.editCustomer.numFurtherTax=0;
			
			
			}
		else
			{
			$scope.filerSelection_update();
			}
	}
		
	$scope.filerSelection=function()
	{
		debugger;
		
		if($scope.newCfgCustomerSetup.blnIsGst===true)
		{
		$scope.newCfgCustomerSetup.numFurtherTax=0;
		
		
		}
		else
			{
			if($scope.newCfgCustomerSetup.blnIsFiler===true)
			{
			$scope.newCfgCustomerSetup.numFurtherTax=.01;
			$scope.editCustomer.numFurtherTax=.01;
			
			}
		else
			{
			$scope.newCfgCustomerSetup.numFurtherTax=.02;
			$scope.editCustomer.numFurtherTax=.02;
			}
			
			}
		
		
	}
	
	$scope.filerSelection_update=function()
	{
		debugger;
		if($scope.editCustomer.blnIsGst===true)
		{
		$scope.editCustomer.numFurtherTax=0;
		
		
		}
		else
			{

			if($scope.editCustomer.blnIsFiler===true)
				{
				
				$scope.editCustomer.numFurtherTax=.01;
				
				}
			else
				{
				
				$scope.editCustomer.numFurtherTax=.02;
				}
			}
		
	}


	$scope.addCustomer = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
	
		var object = JSON.stringify($scope.newCfgCustomerSetup);
		
		$.ajax({
            url: '/'+project_name+'/addNewCustomer',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Customer");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer added successfully");
            		$('#successAlert').show();
            		$scope.newCfgCustomerSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Customer \n due to duplication of  Customer");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Customer \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
            data: object
        });
	};
	
	$scope.updateCustomer = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		
		var object = JSON.stringify($scope.editCustomer);
		$.ajax({
			url: '/'+project_name+'/updateCustomer',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Customer");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Customer \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data:object
		});
	};
	
	$scope.populateEditDialog = function(txtCustomerCodeforEdit){
		//alert(txtCustomerCodeforEdit);
//		$scope.editCustomer = $filter("filter")($scope.CfgCustomerSetup, {serCustomerId:txtCustomerCodeforEdit})[0];
		$scope.editCustomer = $filter('filter')($scope.CfgCustomerSetup, function(dealer){
			return( dealer.serCustomerId === txtCustomerCodeforEdit) 
		 })[0];
	};
	

	
	$scope.deleteCustomer = function(){
		
		$(".se-pre-con").fadeIn("slow");
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteCustomer',
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
            		$scope.newCfgCustomerSetup = {};
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
  	  $.each(dataTable, function(index, customer) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+customer.serCustomerId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+customer.serCustomerId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+customer.serCustomerId+');angular.element(this).scope().$apply();" data-target="#editCustomerForm">Edit Customer</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+customer.serCustomerId+'"/>';
*/  		 // debugger;
  		
	      table.row.add([editDeleteColumn,++index,
//	    	  customer.txtCustomerCode,
	    	  customer.txtCustomerName,
	    	  customer.txtCustomerCode,
	    	  isEmpty(customer.cfgTblCustomer)?"":customer.cfgTblCustomer.txtCustomerName,
	    			  customer.txtPhoneNo,
	    			  customer.txtUserName,
	    			  /*isEmpty(customer.cfgTblCity)?"":customer.cfgTblCity.txtCityName,*/
	    			  customer.txtCnicNo,
	    			  isEmpty(customer.numBalance)?"" : customer.numBalance,
	    	  customer.blnStatus===true?"Active":"InActive"]).draw(); 
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