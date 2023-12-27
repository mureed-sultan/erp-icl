var app = angular.module('myApp',[]);

app.controller('productCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgProductSetup = {};
	$scope.newSlsTblSoDetail = {};
	$scope.editProductComponent = {};
	
	$scope.newSlsTblCustomerFeedback = {};

	$scope.loginCustomer = {};
	
	$scope.lstCustomer=[];
	 $scope.lstDealrsGroup =[];
	 
	$scope.isDealer=1;
	$scope.dealerCustomers =[];
	
	$scope.lstDealer={};
	$scope.delaer={};
	
	$scope.searchDTO={};
	 
	$scope.init = function(){
		
		debugger;
		 var pathArray = location.pathname.split('/');
		    var appPath = "";//"/";
		    for(var i=1; i<pathArray.length-1; i++) {
		        appPath += pathArray[i] ;
		        //+ "/";
		    }
		    project_name=appPath;
		$(".datepicker").datepicker({ "setDate": new Date(), dateFormat: "yy-mm-dd" });


		var d = new Date();
	    var curr_date = d.getDate();
	    if(curr_date <10)
	    	curr_date='0'+curr_date;
	    var curr_month = d.getMonth() + 1;
	    if(curr_month < 10)
	    	curr_month='0'+curr_month;
	    var curr_year = d.getFullYear();
	    d=curr_year + "-" + curr_month + "-" + curr_date;
	    $scope.newSlsTblCustomerFeedback.dteDate=d;
	    
	    $scope.searchCustomerFeedback();
	
		};
	
		$scope.searchCustomerFeedback = function(){
		
			var table = $('#data-table').DataTable();
			
	  	  	table.clear().draw();
	  	  	
	  	  $scope.searchDTO.dte_date_from=$("#dateFrom").val();
			
	  	$scope.searchDTO.dte_date_to=$("#dateTo").val();
			
	  	  
	  	//  var object = JSON.stringify($scope.searchDTO);
			var object = $scope.searchDTO;
			$.ajax({
				url: '/'+project_name+'/searchCustomerFeedback',
				type: 'post',
	          'headers': {
	  			'Content-Type': 'application/json'
	  		},
	          dataType: 'json',
				success: function (data) {
					$scope.lstSO = data;
					$scope.populateDataTable(data);
					
	          	if(data=='Failure'){
	          		$('#errMsgText').html("Unable to search ");
	          		$('#addErrorAlert').show();
	          	}
	          	else if(data=='Success'){
	          		
	          		$('#successMsgText').html(" search successfully");
	          		$('#successAlert').show();
	          		
	          	}
	          },
		  		'error': function(xhr, d, err){
		  			$('#errMsgText').html("Unable to search  \n Internal Error");
	      		$('#addErrorAlert').show();
	      		
		  		},complete: function(){
		  			$(".se-pre-con").fadeOut("slow");
				},

				data: angular.toJson(object)
			});
			
		};
		
		
		
		
		
		$scope.showRecipe = function(){
			
		};
		
		$scope.abc=function()
		{
//			alert();
		}
		
		$scope.resetDropDown=function()
		{
			

		}
	
	$scope.getProduct = function(){
		$(".se-pre-con").fadeIn("slow");

    	

		
	

	     
	     	  
	     	
	     	
	     
	};
	 
	$scope.searchPriceList= function(id){
		
	
	};

	$scope.showCustomers = function(){
//		alert();
		debugger;
//		if(isEmpty($scope.newSlsTblCustomerFeedback.cfgTblDealer.cfgTblGroupCustomer))
		if(isEmpty($scope.loginCustomer.blIsGroupCustomer))
				{
					$scope.dealerCustomers = $filter('filter')($scope.lstCustomer, function(cust){
						return(!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.serCustomerId == $scope.newSlsTblCustomerFeedback.cfgTblDealer.serCustomerId) ;
					});	
				}
		else
			{
			if(!isEmpty($scope.newSlsTblCustomerFeedback.cfgTblDealer) &&  $scope.newSlsTblCustomerFeedback.cfgTblDealer.blIsLabsa)
				{
					$scope.dealerCustomers = $filter('filter')($scope.lstGroupCustomers, function(cust){
						return(!isEmpty(cust.cfgTblCustomer) && cust.cfgTblCustomer.blIsLabsa) ;
					});	
				}
			else
				{
				$scope.dealerCustomers = $filter('filter')($scope.lstGroupCustomers, function(cust){
					return(!isEmpty(cust.cfgTblCustomer) && !(cust.cfgTblCustomer.blIsLabsa)) ;
				});	
				}
			}
		window.setTimeout( $scope.resetDropDown, 1000 );
		
		}; 
		
	$scope.addBookingDetail = function(){

		
		
	};
	
	$scope.refreshProductComponent = function(){
		
		$(".se-pre-con").fadeIn("slow");
		debugger;
		var ids="";
		$(".se-pre-con").fadeOut("slow");
}
	
	$scope.calculate=function()
	{

		

	}
	
	$scope.OnCustomerSelect=function()
	{

		    
		   
	}
	
	$scope.refresh = function() {
		$scope.refresh = true;
		$timeout(function() {
		  $scope.refresh = false;
		}, 0);
	};
	$scope.removeBookingDetail = function(){
		
	};
	

		
	

	$scope.addNewCustomerFeedback = function (){
		
		
		 if(isEmpty($scope.newSlsTblCustomerFeedback.cfgTblCustomer) )
		 {
			
		 alert(" Please select Dealer / Customer.");
			return;
			 
		 }
		

			
			$(".se-pre-con").fadeIn("slow");
			$('#addErrorAlert').hide();
			$('#successAlert').hide();
			 debugger;

		 
		 $scope.newSlsTblCustomerFeedback.dteDate=$("#date").val();
// 	    var object = $scope.newSlsTblSoDetail;
		 var object = $scope.newSlsTblCustomerFeedback;
		 
//		var object = $scope.lstSODetails;
		
		$.ajax({
            url: '/'+project_name+'/addNewCustomerFeedback',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Customer Feedback");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer Feedback added successfully");
            		$('#successAlert').show();
            		$scope.newSlsTblCustomerFeedback = {};
            		
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Customer Feedback \n due to duplication of  Product");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Customer Feedback \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
			data: angular.toJson(object)
//            data: object
        });
	};
	
	$scope.updateCustomerFeedback = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		 $scope.editCustomerFeedback.slsTblSoDetails= $scope.lstSODetails
//	 	  var object = $scope.newSlsTblSoDetail;
			 var object = $scope.editCustomerFeedback;
		
		$.ajax({
			url: '/'+project_name+'/updateCustomerFeedback',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Customer Feedback");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer Feedback edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Customer Feedback \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#editCloseButton').click();
			},
			data: angular.toJson(object)
		});
	};
	
	$scope.populateEditDialog = function(txtProductCodeforEdit){
		//alert(txtProductCodeforEdit);
		debugger;
		$scope.editCustomerFeedback = $filter("filter")($scope.lstSO, {serCustomerFeedbackId:txtProductCodeforEdit})[0];
		
	
		$scope.searchCustomerFeedbackDetail($scope.editCustomerFeedback.serCustomerFeedbackId)
	};
	
$scope.searchCustomerFeedbackDetail = function(id){
		
//		$(".se-pre-con").fadeIn("slow");
		debugger;
	
		$.ajax({
            url: '/'+project_name+'/searchCustomerFeedbackDetail',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	$scope.lstSODetails= data;
//            	alert("---lst");
//				$scope.populateDataTable(data);
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Customer Feedback");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		
            		/*$('#successMsgText').html("Product Component removed successfully");
            		$('#successAlert').show();
            		$scope.showRecipe();*/
//            		$scope.newCfgProductSetup = {};
//            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Customer Feedbackt to remove error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
			},
			data: JSON.stringify(id)
        });
	};
	
	
	$scope.deleteProductComponent = function(){
		
		$(".se-pre-con").fadeIn("slow");
		debugger;
		var ids="";
		$('tbody tr td input[type="checkbox"]').each(function(){
			if($(this).prop('checked')==true)
			{
				ids+=$(this).prop('id')+",";
			}
        });
		$.ajax({
            url: '/'+project_name+'/deleteProductComponent',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Customer Feedback ");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Customer Feedback removed successfully");
            		$('#successAlert').show();
            		$scope.showRecipe();
//            		$scope.newCfgProductSetup = {};
//            		$scope.init();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Product Component to remove error");
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
		
		$scope.calculate();
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, so) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+so.serCustomerFeedbackId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+so.serCustomerFeedbackId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+so.serCustomerFeedbackId+');angular.element(this).scope().$apply();" data-target="#editCustomerFeedbackForm">Edit Customer Feedback</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
*/  		 // debugger;
//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

  		
	      table.row.add([++index,
	    	  $filter('date')(new Date(so.dteDate), 'dd-MM-yyyy'),
	    	  isEmpty(so.cfgTblCustomer)?"":so.cfgTblCustomer.txtCustomerName,
	    			  so.txtCode,
	    	  so.txtRemarks
	    			 ]).draw(); 
  	  });
	};
	
	
	$scope.populateDataTable2=function(){
//		alert("----ava");
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