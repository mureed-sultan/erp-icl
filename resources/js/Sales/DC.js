var app = angular.module('myApp',[]);

app.controller('productCtrl', function($scope, $http, $filter){
	
	// /////////////////////////////////
	$scope.CfgProductSetup = {};
	$scope.newSlsTblSoDetail = {};
	$scope.editProductComponent = {};
	
	$scope.newSlsTblSaleOrder = {};
	$scope.newSlsTblSoDetail = {};
	
	$scope.lstProductCategory={};
	$scope.lstBrand={};
	$scope.lstProduct={};
	$scope.lstPacking={};
	$scope.lstCustomer={};
	
	$scope.lstSODetails=[];
	$scope.lstSO={};
	
	$scope.init = function(){
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
	    $scope.newSlsTblSaleOrder.dteDate=d;
	
		
		$scope.getProduct();
		};
	
	
	$scope.getProduct = function(){
		$(".se-pre-con").fadeIn("slow");
	   
		
		$http.get('/OPAL/generateSaleOrderNo').success(function(data) {
			$scope.newSlsTblSaleOrder.txtSaleOrderNo = data;
			
			});

	     
	     	$http.get('/OPAL/getAllProductCategory').success(function(data) {
			 
			 debugger;
						$scope.lstProductCategory = data;
						
						});
	     	
	     	/*$http.get('/OPAL/getAllBrand').success(function(data) {
				 
				 debugger;
							$scope.lstBrand = data;
							
							});*/
 
 
	     	$http.get('/OPAL/getAllProduct').success(function(data) {
				 
				 debugger;
							$scope.lstProduct = data;
							
							});
	     	
	     	$http.get('/OPAL/getAllCustomer').success(function(data) {
				 
				 debugger;
							$scope.lstCustomer = data;
							
							});
	    	$http.get('/OPAL/getAllProductDesign').success(function(data) {
				 
				 debugger;
							$scope.lstProductDesign = data;
							
							});
			

	     	$http.get('/OPAL/getAllProductQuality').success(function(data) {
				 
				 debugger;
							$scope.lstProductQuality = data;
							
							});
	     	
	     	$http.get('/OPAL/getAllSaleOrder').success(function(data) {
				 
				 debugger;
							$scope.lstSO = data;
//							$scope.populateDataTable(data);
							
							});
	
	};
	
	
	$scope.addBookingDetail = function(){
		debugger;
		$scope.lstSODetails.push(angular.copy($scope.newSlsTblSoDetail));
	};
	
	$scope.removeBookingDetail = function(){
		$scope.lstSODetails.pop(angular.copy($scope.newSlsTblSoDetail));
		$scope.lstSODetails
	};
	


		
	

	$scope.addNewSaleOrder = function (){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		 debugger;
//		var object = JSON.stringify($scope.lstSODetails);
		 
		 $scope.newSlsTblSaleOrder.slsTblSoDetails= $scope.lstSODetails
		 
		
// 	  var object = $scope.newSlsTblSoDetail;
		 var object = $scope.newSlsTblSaleOrder;
		 
//		var object = $scope.lstSODetails;
		
		$.ajax({
            url: '/OPAL/addNewSaleOrder',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to add Product");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product added successfully");
            		$('#successAlert').show();
            		$scope.newCfgProductSetup = {};
            		$scope.init();
            	}
            	else if(data=='error'){
            		$('#errMsgText').html("Unable to add Product \n due to duplication of  Product");
            		$('#addErrorAlert').show();
            	}
            },
	  		'error': function(xhr, d, err){
	  			$('#errMsgText').html("Unable to add Product \n Internal Error");
        		$('#addErrorAlert').show();
	  		},complete: function(){
	  			$(".se-pre-con").fadeOut("slow");
	  			$('#addCloseButton').click();
			},
			data: angular.toJson(object)
//            data: object
        });
	};
	
	$scope.updateSaleOrder = function(){
		$(".se-pre-con").fadeIn("slow");
		$('#addErrorAlert').hide();
		$('#successAlert').hide();
		//debugger;
		 $scope.editSaleOrder.slsTblSoDetails= $scope.lstSODetails
//	 	  var object = $scope.newSlsTblSoDetail;
			 var object = $scope.editSaleOrder;
		
		$.ajax({
			url: '/OPAL/updateSaleOrder',
			type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
			success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to edit Product");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product edit successfully");
            		$('#successAlert').show();
            		$scope.init();
            	}
            	
            },
	  		'error': function(xhr, d, err){
	  			//alert();
	  			$('#errMsgText').html("Unable to edit Product \n Internal Error");
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
		$scope.editSaleOrder = $filter("filter")($scope.lstSO, {serSaleOrderId:txtProductCodeforEdit})[0];
		
	
		$scope.searchSaleOrderDetail($scope.editSaleOrder.serSaleOrderId)
	};
	
$scope.searchSaleOrderDetail = function(){
		
//		$(".se-pre-con").fadeIn("slow");
		debugger;
	var id=$scope.newSlsTblSaleOrder.serSaleOrderId;
		$.ajax({
            url: '/OPAL/searchSaleOrderDetail',
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
            		$('#errMsgText').html("Unable to remove Product Component");
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
	  			$('#errMsgText').html("Product Component to remove error");
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
            url: '/OPAL/deleteProductComponent',
            type: 'post',
            'headers': {
    			'Content-Type': 'application/json'
    		},
            dataType: 'json',
            success: function (data) {
            	if(data=='Failure'){
            		$('#errMsgText').html("Unable to remove Product Component");
            		$('#addErrorAlert').show();
            	}
            	else if(data=='Success'){
            		$('#successMsgText').html("Product Component removed successfully");
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
	};	
	

	// Populate Data Table
	$scope.populateDataTable=function(dataTable){
		var table = $('#data-table').DataTable();
  	  	table.clear();
  	  $.each(dataTable, function(index, so) {
  		  var editDeleteColumn ='<div class="dropdown" id="dropdown'+so.serSaleOrderId+'">'+
									'<a href="" data-toggle="dropdown" onclick="angular.element(this).scope().populateEditDialog('+so.serSaleOrderId+');angular.element(this).scope().$apply();" ><i class="glyphicon glyphicon-pencil"></i>'+
							  		  '<ul class="dropdown-menu">'+  
							  		'<li><a href="" data-toggle="modal" onclick="angular.element(this).scope().populateEditDialog('+so.serSaleOrderId+');angular.element(this).scope().$apply();" data-target="#editSaleOrderForm">Edit Sale Order</a></li>'+
							  		  '</ul>';
/*							  		'</a><input type="checkbox" id="'+product.serProductId+'"/>';
*/  		 // debugger;
//  		var a ='<input  id="'+index+'"-"'+component.ser_child_product_id+'" ng-model="'+so.num_breakage+'" name="'+component.ser_child_product_id+'" type="text" class="form-control input-md "/>'

  		
	      table.row.add([editDeleteColumn,++index,
	    	  so.txtSaleOrderNo,
	    	  isEmpty(so.cfgTblCustomer)?"":so.cfgTblCustomer.txtCustomerName,
	    	  $filter('date')(new Date(so.dteDate), 'dd-MM-yyyy'),
	    	  (isEmpty(so.txtStatus) || so.txtStatus=='Pending')?"Pending":"Approved"
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